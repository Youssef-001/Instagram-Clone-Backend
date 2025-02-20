const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJwt.js');
const notificationController = require('../controllers/notificationController');

router.post('/:receiverId', (req,res,next) => {

    notificationController.createNotification(req,res,next);

})


module.exports = router;