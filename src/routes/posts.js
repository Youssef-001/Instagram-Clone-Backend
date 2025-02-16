const router = require('express').Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const postsController = require('../controllers/postsController.js');
const verifyJWT = require('../middlewares/verifyJwt.js');

router.post('/', verifyJWT,upload.single('avatar'), (req, res, next) => {

    postsController.createPost(req,res, next);
});

router.get('/form', (req,res) => {
    res.render("postForm");
})

router.get('/:userId', (req,res,next) => {
    postsController.getUserPosts(req,res,next);
})

module.exports = router;


