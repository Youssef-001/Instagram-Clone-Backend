const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJwt.js');
const messageController = require('../controllers/messageController.js');

router.post('/:senderId/:receiverId', verifyJWT, (req,res,next) => {
    messageController.createMessage(req,res,next);
})


module.exports = router;