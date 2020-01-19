const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: String,
    points: {type: Number, default: 0},
    postsLoved: [{type: Schema.Types.ObjectId}],
    postsFollowed: [{type: Schema.Types.ObjectId}],
    achievements: [{type: String, required: true}]
    //chatFirends
});

module.exports = mongoose.model('User', userSchema);