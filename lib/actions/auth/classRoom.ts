"use server"

import { string, z } from "zod"
import bcrypt from "bcryptjs"

import { currentUser } from "@/lib/session"
import connectDB from "@/lib/db"
import { User } from "@/lib/models/auth.model"
import { SettingsValidation } from "@/lib/validations/auth"
import { generateToken } from "@/lib/jwt-token"
// import { generateVerificationToken } from "@/lib/token"
import { sendVerificationEmail } from "@/lib/mailer"
import ClassRoom from "@/lib/models/classRooms"
import React from "react"
// import { sendVerificationEmail } from "@/lib/mail"

// type SettingsInput = z.infer<typeof SettingsValidation> & {
//     [key: string]: any
// }

interface classRoomTimeAndLocation {
    time: string;
    location: string;
    days: string;
}

interface classRoom {
    title?: string;
    batch?: string | number;
    teacher?: string | number;
    timeAndLocation: classRoomTimeAndLocation;
}

export const addClassRoom = async (values: classRoom) => {
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
    
        if(Object.keys(values).length < 4){
            return { error: "All fields are required" };
        };
    
        const classRoom = await ClassRoom.create({
            ...values
        });
    
        return { success: "Class was create", classRoom }
    } catch (error) {
        console.log("error", error);
    }
};

export const getTeacherClassrooms = async () => {
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

        const classRooms = await ClassRoom.find({
            teacher: user._id
        });
    
        return { success: "Class was create", classRooms }
    } catch (error) {
        console.log("error", error);
    }
};

export const getTeacherClassroom = async (classRoomId?: string | number) => {
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

        const classRoom = await ClassRoom.findOne({
            _id: classRoomId,
            teacher: user?._id
        });

        return { success: "Class was create", classRoom }
    } catch (error) {
        console.log("error", error);
    }
};