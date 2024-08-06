"use server"

import React from "react";
import nodemailer from 'nodemailer';
import connectDB from "@/lib/db";
import { User } from "@/lib/models/auth.model";
import ClassRoom from "@/lib/models/classRooms";
import { currentUser } from "@/lib/session";

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

        const date = new Date();
        const todayDate = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 + String(date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? 0 + String(date.getDate()) : date.getDate()}`;

        if (student.warnSend == todayDate) {
            return { error: "Student have a warning" }
        };

        await transporter.sendMail({
            from: '"SMIT-Student-submission-portal" <noreply@smit.com>', // Sender address
            to: student?.email, // List of receivers
            subject: "Warning", // Subject line
            text: `Teacher send you warning for not responding on class room.`, // Plain text body
        });

        student.warnSend = todayDate;

        await student.save();

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

        if (!student.warnSend) {
            return { error: "Please send warning first" };
        };

        await transporter.sendMail({
            from: '"SMIT-Student-submission-portal" <noreply@smit.com>', // Sender address
            to: student?.email, // List of receivers
            subject: "Class room removing email", // Subject line
            text: `Teacher remove you from classroom`, // Plain text body
        });

        const stdIndex = course.students.indexOf(studentId);

        course.students.splice(stdIndex, 1);

        await course.save();

        return { success: "Warning was send successfully" };
    } catch (error) {
        return { error: error instanceof Error ? error : "Something went wrong!" };
    };
};