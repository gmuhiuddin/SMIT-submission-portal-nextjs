import mongoose, { Model } from "mongoose";

const { model, Schema, models } = mongoose;

const submissionSchema = new Schema({
    formFieldsReply: [],
    assignment: {
        type: Schema.Types.ObjectId,
        ref: "assignment",
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


const Submission: Model<typeof submissionSchema> = models?.submission || model("submission", submissionSchema);

export default Submission;