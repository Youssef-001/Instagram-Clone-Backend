// userAuth.test.js
const request = require('supertest');
const { app } = require('../../app');  // Adjust the path based on your file structure
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mockPrisma = require('./__mocks__/prisma'); // Correct import of the mock
const userService = require('../../services/userService');  // Adjust based on your file structure
require('dotenv').config();

// Mock Prisma Client
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => mockPrisma),
  };
});

// Mock userService createUser method
jest.mock('../../services/userService', () => ({
  createUser: jest.fn().mockResolvedValue({
    googleId: '1',
    email: 'test@example.com',
    username: 'new_user',
  }),
}));

// Mock Passport.js
jest.mock('passport', () => ({
  use: jest.fn(),
  initialize: jest.fn(() => (req, res, next) => next()),
  session: jest.fn(() => (req, res, next) => next()),
  authenticate: jest.fn(() => (req, res, next) => {
    req.user = { googleId: '12345', email: 'test@example.com', jwtToken: 'fake-jwt', isNew: false };
    next();
  }),
  serializeUser: jest.fn(() => (user, done) => done(null, user.googleId)),
  deserializeUser: jest.fn(() => (id, done) => done(null, { googleId: id, email: 'test@example.com' })),
}));

describe('Google Authentication Routes', () => {
  let prisma;

  beforeEach(() => {
    prisma = new PrismaClient();
  });

  test('POST /auth/google/signup should create a new user and return a JWT', async () => {
    const res = await request(app)
      .post('/auth/google/signup')
      .send({ email: 'test@example.com', googleId: '12345', username: 'new_user' });

    // Check if the status is 200 (OK)
    expect(res.status).toBe(200);

    // Check if the response contains the expected message and token
    expect(res.body).toHaveProperty('message', 'Username set successfully');
    expect(res.body).toHaveProperty('jwtToken');

    // Verify that the userService.createUser was called with the correct parameters
    expect(userService.createUser).toHaveBeenCalledWith('12345', 'test@example.com', 'new_user');

    // Verify that a JWT token is being returned (you can test its format too)
    const decodedToken = jwt.verify(res.body.jwtToken, process.env.JWT_SECRET);
    expect(decodedToken).toHaveProperty('email', 'test@example.com');
    expect(decodedToken).toHaveProperty('name', 'new_user');
  });

  test('POST /auth/google/signup should return an error if username is already taken', async () => {
    // Mock the findUnique call to return an existing user
    mockPrisma.user.findUnique.mockResolvedValue({
      username: 'yusef0x1',
    });

    const res = await request(app)
      .post('/auth/google/signup')
      .send({ email: 'test@example.com', googleId: '12345', username: 'existing_user' });

    // Check for the correct error response
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Username already taken');
  });
});
