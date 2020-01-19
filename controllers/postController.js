const Post = require('../models/post/postModel');
const User = require('../models/user/userModel');

module.exports.getPosts = async (start, limit, filter) =>{
    const posts = await Post.find();
    
    
    return posts;
}

module.exports.getTotalPosts = async () => {
    const quantity = await Post.estimatedDocumentCount();
    return quantity;
}

module.exports.getFullPost = async postId => {
    const post = await Post.findById(postId);
    return post;
}

module.exports.createPost = async (postObj) => {

    if(!postObj.summary || postObj.summary === ""){
        const summarySize = postObj.body.length < 250 ? postObj.body.length : 250;
        postObj.summaryData = {
            autogenerated: true,
            summary: postObj.body.substr(0, summarySize)
        };
    }else{
        postObj.summaryData = {
            autogenerated: false,
            summary: postObj.summary
        };
    }
    return await new Post(postObj).save();
}

module.exports.createComment = async (text, authorId, postId) => {
    const post = await Post.findById(postId);
    if(!post)
        console.log(`No exite el post id ${postId}`);
    
    const comment = {
        text,
        author: authorId
    };    

    post.comments.push(comment);
    return await post.save();    
}

module.exports.likePost = async (postId) => {

    // Incementar los likes del post
    const post = await Post.findById(postId);
    post.pointsData.likes++;
    return await post.save();
}

module.exports.unLikePost = async (postId) => {

    // Incementar los likes del post
    const post = await Post.findById(postId);
    post.pointsData.likes--;
    return await post.save();
}