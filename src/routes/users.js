const router = require('express').Router();
const verifyJwt = require('../middlewares/verifyJwt')
const userController = require('../controllers/userController')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })


router.patch('/:userId/profile' , upload.single('avatar') , verifyJwt, (req,res,next) => {
    userController.updateProfile(req,res,next);
})

router.patch('/:userId/password',verifyJwt, (req,res,next) => {
    userController.updatePassword(req,res,next)
})


module.exports = router;