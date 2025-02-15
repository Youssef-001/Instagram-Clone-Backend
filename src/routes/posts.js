const router = require('express').Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const postsController = require('../controllers/postsController.js');
const verifyJWT = require('../middlewares/verifyJwt.js');

router.post('/', verifyJWT,upload.single('avatar'), (req, res, next) => {

    postsController.createPost(req,res, next);
});

router.get('/', (req,res) => {
    res.render("postForm");
})

module.exports = router;


