import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const classRoomSchema = new Schema({
    timeAndLocation: {
        type: {},
        required: true
    },
    description: {
        type: String,
        required: true
    },
    batch: {
        type: Number,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    students: [{type: Schema.Types.ObjectId, ref: "User"}],
}, {
    timestamps: true
});

const ClassRoom = models.classRooms || model("classRooms", classRoomSchema);

export default ClassRoom;