"use server"

import React from "react";
import nodemailer from 'nodemailer';
import { currentUser } from "@/lib/session";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/auth.model";
import ClassRoom from "@/lib/models/classRooms";
import Assignment from "@/lib/models/assignment";
import Submissions from "@/lib/models/submission";
import Comment from "@/lib/models/comment";
import { toObject } from "./helpingFuncs";

type FieldType = 'text' | 'number' | 'file' | 'image' | 'files' | 'images' | 'radio' | 'checkbox' | 'select';

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

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendEmailToStudentsForCreateingAssignment = async (classRoomId: FormDataEntryValue | null, dueDate: string) => {

    const classRoom = await ClassRoom.findById(classRoomId).populate("students");

    classRoom?.students.forEach(async (element: { email: any; }) => {

        await transporter.sendMail({
            from: '"SMIT-Student-submission-portal" <noreply@smit.com>', // Sender address
            to: element?.email, // List of receivers
            subject: "New assignment", // Subject line
            text: `New assignment on your class room ${classRoom.title}. Assignment due date was ${dueDate} and time is 23:59`, // Plain text body
        });
    })

};

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

        const assignment = await Assignment.create({
            ...values, teacher: existingUser._id
        });

        await sendEmailToStudentsForCreateingAssignment(assignment.classRoom, assignment.dueDate)

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

        return { success: "Assignments fetched successfully", assignments: assignmentsRes.map(toObject) }
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
        }).populate({
            path: 'student',
            select: 'name image'
        });

        return { success: "Assignment fetched successfully", assignment: toObject(assignment), students: students.map(toObject), classRoom: toObject(classRoom), comments: comments.map(toObject) || [], submissions: submissions.map(toObject) };
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
            _id: assignmentId
        });

        if(!assignment) return {error: "Assignment was not found!"};

        const classRoom = await ClassRoom.findOne({
            _id: assignment.classRoom,
            students: user._id
        }).select("-students");

        if(!classRoom) return {error: "Class was deleted"};

        return { success: "Assignment fetched successfully", assignment: toObject(assignment), classRoom: toObject(classRoom) }
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Something went wrong!" };
    };
};