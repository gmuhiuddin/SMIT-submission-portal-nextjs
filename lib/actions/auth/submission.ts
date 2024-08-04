"use server";

import React from "react";
import nodemailer from "nodemailer";
import { currentUser } from "@/lib/session";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/auth.model";
import ClassRoom from "@/lib/models/classRooms";
import Assignment from "@/lib/models/assignment";
import { put } from "@vercel/blob";
import { customAlphabet } from "nanoid";
import Post from "@/lib/models/post";
import Comment from "@/lib/models/comment";
import Submission from "@/lib/models/submission";

const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7
);

interface Submission {
    formFieldsReply: FormData;
    student: string;
    assignment: string;
}

export const addSubmission = async (values: Submission) => {
    try {
        const user = await currentUser();

        if (!user) {
            return { error: "Unauthorized" };
        };

        await connectDB();

        const existingUser = await User.findById(user?._id);

        if (!existingUser || existingUser.role == "teacher") {
            return { error: "Unauthorized" };
        };

        const assignment = await Assignment.findOne({
            _id: values.assignment,
            // isDeleted: false
        });

        if (!assignment) {
            return { error: "Incorrect assignment" };
        };

        const date = new Date();
        const nowDate = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 + String(date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? 0 + String(date.getDate()) : date.getDate()}`;

        if (assignment.dueDate < nowDate) {
            return { error: "Assignment submission date was due!" };
        };

        const submission = await Submission.findOne({
            student: values.student,
            assignment: values.assignment,
        });

        if (submission) {
            return { error: "You submited this assignment" };
        };

        const submissionFields: { res?: string; images?: any; id: any; files?: any; }[] = [];

        assignment.formFields.forEach(async (element: any, index: number) => {
            const field = values.formFieldsReply.get(element.id);

            if (element.required && !field) throw new Error("Please fill all fields");

            if (element.type == "file" || element.type == "image") {

                if (element.type == "file") {
                    const filesLength: any = field;
                    const files: any = [];

                    for (let i = 0; i < filesLength; i++) {
                        const file = values.formFieldsReply.get(`id-${element.id}-${i - 1}`);
                        if (file instanceof File && file.size > 0) {
                            const fileContentType = file?.type || "text/plain";

                            const filename = `${nanoid()}.${fileContentType.split("/")[1]}`;

                            const blob = await put(filename, file, {
                                contentType: fileContentType,
                                access: "public",
                            });

                            files.push({
                                name: file.name,
                                type: file?.type || "text/plain",
                                url: blob?.url,
                                downloadUrl: blob?.downloadUrl,
                            });
                        };
                    };

                    submissionFields.push({
                        id: element.id,
                        files: files
                    });
                } else {
                    const filesLength: any = field;
                    const images: any = [];
console.log(filesLength);

                    for (let i = 0; i < filesLength; i++) {
                        const file = values.formFieldsReply.get(`id-${element.id}-${i}`);
                        console.log(file);
                        
                        if (file instanceof File && file.size > 0) {
                            const fileContentType = file?.type || "image/*";

                            const filename = `${nanoid()}.${fileContentType.split("/")[1]}`;

                            const blob = await put(filename, file, {
                                contentType: fileContentType,
                                access: "public",
                            });

                            images.push({
                                name: file.name,
                                type: file?.type || "images/*",
                                url: blob?.url,
                                downloadUrl: blob?.downloadUrl,
                            });
                        };

                        if(filesLength-1 == i){
                            submissionFields.push({
                                id: element.id,
                                images: images
                            });
                        };
                    };
                };
            } else {
                submissionFields.push({
                    id: element.id,
                    res: field as string
                })
            };

        });

        // await Submission.create({
        //     formFieldsReply: submissionFields,
        //     student: values.student,
        //     assignment: values.assignment,
        // });
        console.log("Submission", submissionFields);
        

        return { success: "Submission successful" };
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Something went wrong!" };
    };
};

export const getStudentSubmission = async (assignmentId: string) => {
    try {
        const user = await currentUser();

        if (!user) {
            return { error: "Unauthorized" };
        };

        await connectDB();

        const existingUser = await User.findById(user?._id);

        if (!existingUser || existingUser.role == "teacher") {
            return { error: "Unauthorized" };
        };

        const submission = await Submission.findOne({
            assignment: assignmentId,
            student: user._id as string
        });

        if (!submission) {
            return { error: "Submission not found1" };
        };

        return { success: "Submission fetched successfully", submission };
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Something went wrong!" };
    };
};

export const updateSubmission = async () => { };