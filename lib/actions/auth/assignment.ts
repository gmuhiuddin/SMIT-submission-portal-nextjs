"use server"

import React from "react";
import { currentUser } from "@/lib/session";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/auth.model";
import ClassRoom from "@/lib/models/classRooms";
import Assignment from "@/lib/models/assignment";

interface Assignment {
    teacher?: string | number;
    classRoom?: string | number;
    dueDate?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    webScrnShot?: string | undefined;
    url?: string | undefined;
    file?: any;
}

export const addAssignment = async (values: Assignment) => {
    try {
        const user = await currentUser();
    
        if (!user) {
            return { error: "Unauthorized" }
        };
    console.log(values?.file)
        await connectDB();
    
        const existingUser = await User.findById(user?._id);
    
        if (!existingUser || existingUser.role == "student") {
            return { error: "Unauthorized" }
        };
    
        if(Object.keys(values).length < 6){
            return { error: "All fields are required" };
        };
    
        await Assignment.create({
            ...values
        });

        return { success: "Assignment was create" }
    } catch (error) {
        return error instanceof Error ? { error: error.message } : { error: "Something went wrong!" };
    };
};

export const getTeacherAssignments = async (classRoomId?: string | number) => {
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
        
        const assignmentsRes = await Assignment.find({
            classRoom: classRoomId,
            teacher: user._id
        });
    
        return { success: "Assignments fetched successfully", assignments: assignmentsRes }
    } catch (error) {
        console.log("error", error);
    }
};

export const getTeacherAssignment = async (assignmentId?: string | number, classRoomId?: string | number) => {
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

        const assignment = await Assignment.findOne({
            teacher: user._id, _id: assignmentId, classRoom: classRoomId
        });
    
        return { success: "Assignment fetched successfully", assignment }
    } catch (error) {
        console.log("error", error);
    }
};

export const deleteTeacherAssignment = async (assignmentId?: string | number) => {
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

        await Assignment.findOneAndDelete({
            teacher: user._id, _id: assignmentId
        });
    
        return { success: "Assignment deleted successfully" }
    } catch (error) {
        console.log("error", error);
    }
};