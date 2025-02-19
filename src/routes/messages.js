const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJwt.js');
const messageController = require('../controllers/messageController.js');

router.post('/:senderId/:receiverId', verifyJWT, (req,res,next) => {
    messageController.createMessage(req,res,next);
})

router.get('/:user1/:user2', verifyJWT, (req,res,next) => {
    messageController.getMessages(req,res,next);
})


module.exports = router;