

const userService = require('../services/userService.ts');

async function signup(req: Request, res: Response) {

    console.log('hello world');
  try {
    // const user = await User.create(req.body);
    // res.status(201).json({ user });
  } catch (error) {
    // res.status(400).json({ error: error.message });
    
  }
}

module.exports = {signup}   