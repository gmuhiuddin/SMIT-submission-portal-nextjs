"use server"

import React from "react";
import nodemailer from 'nodemailer';
import connectDB from "@/lib/db";
import { User } from "@/lib/models/auth.model";
import ClassRoom from "@/lib/models/classRooms";
import { currentUser } from "@/lib/session";
import { toObject } from "./helpingFuncs";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendWarningToStudent = async (studentId: any, classroomId: any) => {
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

        const course = await ClassRoom.findOne({
            _id: classroomId,
            students: studentId
        });

        if (!course) {
            return { error: "Incorrect class room" }
        };

        const student = await User.findOne({
            _id: studentId,
            role: "student"
        });

        if (!student) {
            return { error: "Incorrect student" }
        };

        const date = new Date();
        const todayDate = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 + String(date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? 0 + String(date.getDate()) : date.getDate()}`;

        if (student.warnSend.find((warn: any) => warn?.classroomId == course._id && warn?.warnDate == todayDate)) {
            return { error: "Student have a warning" }
        };

        const indexOfWarn = student.warnSend.findIndex((warn: any) => warn?.classroomId == course._id);

        indexOfWarn != "-1" ? student.warnSend.splice(indexOfWarn, 1, {
            warnDate: todayDate,
            classroomId: course._id
        }) : student.warnSend.push({
            warnDate: todayDate,
            classroomId: course._id
        });

        await student.save();

        await transporter.sendMail({
            from: '"SMIT-Student-submission-portal" <noreply@smit.com>', // Sender address
            to: student?.email, // List of receivers
            subject: "Warning", // Subject line
            text: `Teacher send you warning for not responding on class room.`, // Plain text body
        });

        return { success: "Warning was send successfully" };
    } catch (error) {
        return { error: error instanceof Error ? error : "Something went wrong!" };
    };
};

export const ExitStudentFromClassroom = async (studentId: any, classroomId: any) => {
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

        const course = await ClassRoom.findOne({
            _id: classroomId,
            students: studentId
        });

        if (!course) {
            return { error: "Incorrect class room" }
        };

        const student = await User.findOne({
            _id: studentId,
            role: "student"
        });

        if (!student.warnSend.find((warn: any) => warn?.classroomId == course._id)) {
            return { error: "Please send warning first" };
        };

        const stdIndex = course.students.indexOf(studentId);

        course.students.splice(stdIndex, 1);

        await course.save();

        const indexOfWarn = student.warnSend.findIndex((warn: any) => warn?.classroomId == course._id);

        student.warnSend.splice(indexOfWarn, 1);

        await student.save();

        await transporter.sendMail({
            from: '"SMIT-Student-submission-portal" <noreply@smit.com>', // Sender address
            to: student?.email, // List of receivers
            subject: "Class room removing email", // Subject line
            text: `Teacher remove you from classroom`, // Plain text body
        });

        return { success: "Student remove successfully" };
    } catch (error) {
        return { error: error instanceof Error ? error : "Something went wrong!" };
    };
};

export const getStudents = async (classroomId: any) => {
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
    
        const classRoom = await ClassRoom.findById(classroomId).populate({
            path: 'students',
            select: 'name image'
        });

        if(!classRoom) return { error: "Incorrect class room!"};
    
        return { success: "Students fetched successfully", students: classRoom.students.map(toObject)};
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Something went wrong!" };
    };
};

export const getStudentWarn = async (classroomId: any) => {
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

        const warnHave = existingUser.warnSend.some((std: any) => std.classroomId == classroomId);
    
        return { success: "Students fetched successfully", warnHave: warnHave};
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Something went wrong!" };
    };
};