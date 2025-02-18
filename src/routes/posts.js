const router = require('express').Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const postsController = require('../controllers/postsController.js');
const verifyJWT = require('../middlewares/verifyJwt.js');
const commentController = require('../controllers/commentController.js');
router.post('/', verifyJWT,upload.single('avatar'), (req, res, next) => {

    postsController.createPost(req,res, next);
});

router.get('/form', (req,res) => {
    res.render("postForm");
})

router.get('/:userId', (req,res,next) => {
    postsController.getUserPosts(req,res,next);
})

router.get('/feed/:userId', (req, res, next) => {
    const { userId } = req.params;
    const { cursor, limit } = req.query;

    // Default limit to 10 posts per request
    const pageSize = parseInt(limit) || 10;
    postsController.getFeed(req, res, next, { userId, cursor, pageSize });
});


router.post('/:postId/comments', verifyJWT, (req,res, next) => {
    commentController.createComment(req,res,next)
})

router.get('/:postId/comments', verifyJWT, (req,res, next) => {
    commentController.getComments(req,res,next)
})



module.exports = router;


