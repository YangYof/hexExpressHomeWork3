
var express = require('express');
var router = express.Router();
const Post = require("../model/posts.js")

router.get('/', async(req, res) =>{
    const posts = await Post.find();
    res.status(200).json({
        "success":"true",
        posts
    })
});

router.post('/', async(req, res) =>{
    const data = req.body;
    const newPost = await Post.create({
        name: data.name,
        tags: data.tags,
        type: data.type,
        image:data.image,
        content: data.content,
        likes: data.likes,
        comments: data.comments
    });
    res.status(200).json({
        "success":"true",
        posts:newPost
    })
});

router.delete('/', async(req, res) =>{
    const posts = await Post.deleteMany({})
    res.status(200).json({
        "success":"true",
        posts
    })
});

router.delete('/:id', async(req, res) =>{
    const data = req.params;
    const posts = await Post.findByIdAndDelete({
        "_id":data.id,
    })
    res.status(200).json({
        "success":"true",
        posts
    })
});

router.patch('/:id', async(req, res) =>{
    const data = req.params;
    const updateInfo = req.body;
    const posts = await Post.findOneAndUpdate({
        "_id":data.id,
    },{
        name: updateInfo.name,
        tags: updateInfo.tags,
        type: updateInfo.type,
        image:updateInfo.image,
        content: updateInfo.content,
        likes: updateInfo.likes,
        comments: updateInfo.comments
    });
    res.status(200).json({
        "success":"true",
        posts
    })
});

router.options('/', async(req, res) =>{
    res.status(200).json({
        "success":"true"
    })
});


module.exports = router;
