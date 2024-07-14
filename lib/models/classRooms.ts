import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const classRoomSchema = new Schema({
    timeAndLocation: {
        type: {},
        required: true
    },
    batch: {
        type: Object,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const ClassRoom = models.classRooms || model("classRooms", classRoomSchema);

export default ClassRoom;