import mongoose, { Model } from "mongoose";

const { model, Schema, models } = mongoose;

const assignmentSchema = new Schema({
    teacher: {
        type: String,
        required: true
    },
    classRoom: {
        type: String,
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
    description: {
        type: String,
        required: true
    },
    formFields: {
        type: [],
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });
      
    
const Assignment = models?.assignment || model("assignment", assignmentSchema);

export default Assignment;