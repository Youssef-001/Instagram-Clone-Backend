const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function createUser(email, username, bdate ,password) {
   
}



module.exports = {createUser}

