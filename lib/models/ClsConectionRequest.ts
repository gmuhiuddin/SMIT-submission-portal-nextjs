import mongoose from "mongoose";

const { Schema, model } = mongoose;

const classRoomSchema = new Schema({
    classId: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Accecpted"],
        default: "Pending"
    }
}, {
    timestamps: true
});

const ClassRoom = model("clsaddreqs", classRoomSchema);

export default ClassRoom;