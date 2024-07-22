import mongoose from "mongoose";

const { model, Schema, models } = mongoose;

const commentSchema = new Schema({
    txt: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "post",
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},
    {
        timestamps: true
    });


const Comment = models?.comment || model("comment", commentSchema);

export default Comment;