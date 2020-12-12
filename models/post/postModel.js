const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    body: String,
    views: { type: Number, required: true, default: 0},
    author: Schema.Types.ObjectId,
    authorPoints: Number,
    tags: [String],
    summaryData: {
        autogenerated: {type: Boolean},
        summary: {type: String}    
    },
    pointsData: {
        //user: Schema.Types.ObjectId,
        //calification: Number
        likes: Number,
        //dislikes: Number
    },
    comments: [{
        text: {type: String, required: true},
        author: Schema.Types.ObjectId,
        likes: {type: Number, default: 0, required: true},
        dislikes: {type: Number, default: 0, required: true}
    }]
}, {
    timestamps: true
}); 

module.exports = mongoose.model('Post', PostSchema);