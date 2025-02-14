
const authController = require('../controllers/authController.ts');
const router = require ('express').Router();


router.post('/signup', (req: Request, res: Response) => {
    authController.signup(req, res);
})


module.exports = router;