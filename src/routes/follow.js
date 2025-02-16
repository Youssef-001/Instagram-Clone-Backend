const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJwt.js');
const followController = require('../controllers/followController.js');



router.post('/:senderId/:receiverId', verifyJWT, (req,res,next) => {
    followController.followUser(req,res,next);
})


module.exports = router;


