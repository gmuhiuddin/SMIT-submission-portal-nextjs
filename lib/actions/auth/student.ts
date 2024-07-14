"use server"

import React from "react"
import { currentUser } from "@/lib/session"
import connectDB from "@/lib/db"
import { User } from "@/lib/models/auth.model"

const setStudentForTeacherClassRoom = async (classRoomId: number | string) => {
    try {
        const user = await currentUser();
    
        if (!user) {
            return { error: "Unauthorized" }
        };
    
        await connectDB();
    
        const existingUser = await User.findById(user?._id);
    
        if (!existingUser || existingUser.role == "student") {
            return { error: "Unauthorized" }
        };

        const students = await User.find({
            classRoom: classRoomId,
            role: "student"
        });

        return { success: "Students fetched successfully", students};
    } catch (error) {
      return error instanceof Error ? { error: error.message} : { error: "Some thing went wrong!"}; 
    };
};

export { setStudentForTeacherClassRoom };
// export const addClassRoom = async (values: classRoom) => {
//     try {
//         const user = await currentUser();
    
//         if (!user) {
//             return { error: "Unauthorized" }
//         };
    
//         await connectDB();
    
//         const existingUser = await User.findById(user?._id);
    
//         if (!existingUser || existingUser.role == "student") {
//             return { error: "Unauthorized" }
//         };
    
//         if(Object.keys(values).length < 4){
//             return { error: "All fields are required" };
//         };
    
//         const classRoom = await ClassRoom.create({
//             ...values
//         });
    
//         return { success: "Class was create", classRoom }
//     } catch (error) {
//         console.log("error", error);
//     }
// };

// export const getTeacherClassrooms = async () => {
//     try {
//         const user = await currentUser();
    
//         if (!user) {
//             return { error: "Unauthorized" }
//         };
    
//         await connectDB();
    
//         const existingUser = await User.findById(user?._id);
    
//         if (!existingUser || existingUser.role == "student") {
//             return { error: "Unauthorized" }
//         };

//         const classRooms = await ClassRoom.find({
//             teacher: user._id
//         });
    
//         return { success: "Class was create", classRooms }
//     } catch (error) {
//         console.log("error", error);
//     }
// };

// export const getTeacherClassroom = async (classRoomId?: string | number) => {
//     try {
//         const user = await currentUser();
    
//         if (!user) {
//             return { error: "Unauthorized" }
//         };
    
//         await connectDB();
    
//         const existingUser = await User.findById(user?._id);
    
//         if (!existingUser || existingUser.role == "student") {
//             return { error: "Unauthorized" }
//         };

//         const classRoom = await ClassRoom.findOne({
//             teacher: user._id, _id: classRoomId
//         });
    
//         return { success: "Class was create", classRoom }
//     } catch (error) {
//         console.log("error", error);
//     }
// };