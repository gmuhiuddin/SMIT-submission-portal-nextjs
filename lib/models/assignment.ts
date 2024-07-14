import mongoose from "mongoose";

const { model, Schema, models } = mongoose;

const assignmentSchema = new Schema({
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    classRoom: {
        type: Schema.Types.ObjectId,
        ref: "classRooms",
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    webScrnShot: String,
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });
      
    
const Assignment = models?.assignment || model("assignment", assignmentSchema);

export default Assignment;