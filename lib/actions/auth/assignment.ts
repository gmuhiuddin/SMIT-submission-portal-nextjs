"use server"

import React from "react";
import { currentUser } from "@/lib/session";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/auth.model";
import ClassRoom from "@/lib/models/classRooms";
import Assignment from "@/lib/models/assignment";
import Submissions from "@/lib/models/submission";
import Comment from "@/lib/models/comment";

type FieldType = 'text' | 'number' | 'file' | 'image' | 'radio' | 'checkbox' | 'select';

interface Field {
    id: number;
    label: string;
    type: FieldType;
    required: boolean;
    options?: string[];
}

interface Assignment {
    classRoom?: string | number;
    dueDate?: string | null;
    title?: string | null;
    description?: string | null;
    formFields: Field[];
}

export const addAssignment = async (values: Assignment) => {
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

        if (Object.keys(values).length < 5) {
            return { error: "All fields are required" };
        };

        await Assignment.create({
            ...values, teacher: existingUser._id
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
            classRoom: classRoomId, teacher: existingUser._id
        });

        return { success: "Assignments fetched successfully", assignments: assignmentsRes }
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Something went wrong!" };
    };
};

export const getTeacherAssignment = async (assignmentId?: string | number) => {
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
            _id: assignmentId, teacher: user._id,
        });

        const classRoom = await ClassRoom.findOne({
            _id: assignment.classRoom,
            teacher: user?._id,
        });

        const students = await User.find({
            _id: classRoom?.students,
            role: "student"
        }).select("-password -isTwoFactorEnabled -emailVerified -provider -role -lastActivity");

        const comments = await Comment.find({
            post: assignment._id
        }).populate({
            path: 'student',
            select: 'name image'
        });

        const submissions = await Submissions.find({
            assignment: assignment._id,
        });

        return { success: "Assignment fetched successfully", assignment, students, classRoom, comments: comments || [], submissions }
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Something went wrong!" };
    };
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
            _id: assignmentId
        });

        return { success: "Assignment deleted successfully" }
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Something went wrong!" };
    };
};

export const getStudentAssignment = async (assignmentId?: string | number) => {
    try {
        const user = await currentUser();

        if (!user) {
            return { error: "Unauthorized" }
        };

        await connectDB();

        const existingUser = await User.findById(user?._id);

        if (!existingUser || existingUser.role == "teacher") {
            return { error: "Unauthorized" }
        };

        const assignment = await Assignment.findOne({
            _id: assignmentId, teacher: user._id,
        });

        const classRoom = await ClassRoom.findOne({
            _id: assignment.classRoom,
            teacher: user?._id,
        });

        return { success: "Assignment fetched successfully", assignment, classRoom }
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Something went wrong!" };
    };
};