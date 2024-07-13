import mongoose from "mongoose";

const { Schema, model } = mongoose;

const classRoomSchema = new Schema({
    timeAndLocation: {
        type: Object,
        required: true
    },
    batch: {
        type: Object,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
});

const ClassRoom = model("classroom", classRoomSchema);

export default ClassRoom;