import mongoose from "mongoose";

const { model, Schema, models } = mongoose;

const submissionSchema = new Schema({
    formFieldsReply: [],
    assignment: {
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


const Submission = models?.submission || model("submission", submissionSchema);

export default Submission;