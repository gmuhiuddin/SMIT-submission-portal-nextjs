import mongoose from "mongoose";

const { model, Schema, models } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    classRoom: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    imageDownloadUrl: String,
    imageUrl: String,
    FileDownloadUrl: String,
},
    {
        timestamps: true
    });


const Post = models?.post || model("post", postSchema);

export default Post;