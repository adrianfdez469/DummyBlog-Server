const User = require('../models/user/userModel');

module.exports.getUserByName = async (username) => {

    try{
        const user = await User.findOne({
            username: username
        });
        return user;
    }catch(err){
        console.log(err);
    }
}

module.exports.logInByCredentials = async (username, password) => {

    try{
        const user = await User.findOne({
            username: username,
            password: password
        });
        return user;
    }catch(err){
        console.log(err);
    }
}

module.exports.getUserById = async (id) => {

    try{
        if(!id)
            return null;
        const userId = id.toString();
        const user = await User.findById(userId);
        return user;
    }catch(err){
        console.log(err);
    }
}

module.exports.addUser = async (email, username, password, confirmpassword) => {
    try{

        if(password !== confirmpassword)
            return null;
        const encriptedPassword = password; // Use bcrypt for encrypt the password and storage on DB

        const createdUser = new User({
            username: username,
            password: encriptedPassword,
            email: email
        });

        return await createdUser.save();
    }catch(err){
        console.log(err);        
    }
}

module.exports.AddLikedPostToUser = async (userId, postId) => {
    const user = await User.findById(userId);
    user.postsLoved.push(postId);
    await user.save();
    return user;
}

module.exports.RemoveLikedPostToUser = async (userId, postId) => {
    const user = await User.findById(userId);

    user.postsLoved = user.postsLoved.filter(p => p.toString() !== postId.toString());
    
    await user.save();
    return user;
}

module.exports.UserFullFillAchievement = async (userId, achievemnt) => {
    
    const user = await User.findById(userId);
    user.achievements.push(achievemnt.text);
    user.points += achievemnt.points;
    user.points = user.points <= 0 ? 0 : user.points;
    await user.save();
    return user;
}

module.exports.UserAchievments = () => {
    return {
        likedPost: {
            text: 'Earn 5 points if your post is liked',
            points: 5
        },
        unlikePost: {
            text: 'Loose 5 points if your post is unliked',
            points: -5
        },
        whritePost: {
            text: 'Earn 50 points for every post you publish',
            points: 50
        },
        whriteComment: {
            text: 'Earn 10 points for each comment you whrite about a post',
            points: 10
        },
        likedComment: {
            text: 'Earn 2 points for each liked comment you wrote',
            points: 2
        },
        unlikedComment: {
            text: 'Loose 5 points for each unliked comment you wrote',
            points: -5
        }
    };
}