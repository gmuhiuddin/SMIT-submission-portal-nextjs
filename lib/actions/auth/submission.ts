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
import { toObject } from "./helpingFuncs";

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
            isDeleted: false
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

        const submissionFields: any = [];

        for (const element of assignment.formFields) {
            const field = values.formFieldsReply.get(element.id);

            if (element.required && !field) return console.log("All fields are required");

            if (element.type == "Multiple Files" || element.type == "Multiple Images" || element.type == "file" || element.type == "image") {
                if (element.type == "file") {

                    if (field instanceof File && field.size > 0) {

                        const fileContentType = field?.type || "text/plain";

                        const filename = `${nanoid()}.${fileContentType.split("/")[1]}`;

                        const blob = await put(filename, field, {
                            contentType: fileContentType,
                            access: "public",
                        });

                        submissionFields.push({
                            id: element.id,
                            name: field.name,
                            type: fileContentType,
                            url: blob?.url,
                            downloadUrl: blob?.downloadUrl,
                        });
                    };
                } else if (element.type == "image") {

                    if (field instanceof File && field.size > 0) {

                        const fileContentType = field?.type || "images/*";

                        const filename = `${nanoid()}.${fileContentType.split("/")[1]}`;

                        const blob = await put(filename, field, {
                            contentType: fileContentType,
                            access: "public",
                        });

                        submissionFields.push({
                            id: element.id,
                            name: field.name,
                            type: fileContentType,
                            url: blob?.url,
                            downloadUrl: blob?.downloadUrl,
                        });
                    };
                } else if (element.type == "Multiple Images") {
                    // Multiple images uploading work

                    const filesOrImages: any = [];
                    let filesLength: any = field;
                    filesLength = +filesLength;

                    for (let i = 0; i < filesLength; i++) {
                        const file = values.formFieldsReply.get(`${element.id}-${i}`);

                        if (file instanceof File && file.size > 0) {

                            const fileContentType = file?.type || "images/*";

                            const filename = `${nanoid()}.${fileContentType.split("/")[1]}`;

                            const blob = await put(filename, file, {
                                contentType: fileContentType,
                                access: "public",
                            });

                            filesOrImages.push({
                                name: file.name,
                                type: blob.contentType,
                                url: blob.url,
                                downloadUrl: blob.downloadUrl,
                            });
                        };
                    };

                    element.type == "Multiple Files" ?
                        submissionFields.push({
                            id: element.id,
                            files: filesOrImages
                        }) :
                        submissionFields.push({
                            id: element.id,
                            images: filesOrImages
                        });
                } else if (element.type == "Multiple Files") {
                    // Multiple images uploading work

                    const filesOrImages: any = [];
                    let filesLength: any = field;
                    filesLength = +filesLength;

                    for (let i = 0; i < filesLength; i++) {
                        const file = values.formFieldsReply.get(`${element.id}-${i}`);

                        if (file instanceof File && file.size > 0) {

                            const fileContentType = file?.type || "text/plain";

                            const filename = `${nanoid()}.${fileContentType.split("/")[1]}`;

                            const blob = await put(filename, file, {
                                contentType: fileContentType,
                                access: "public",
                            });

                            filesOrImages.push({
                                name: file.name,
                                type: blob.contentType,
                                url: blob.url,
                                downloadUrl: blob.downloadUrl,
                            });
                        };
                    };

                    element.type == "Multiple Files" ?
                        submissionFields.push({
                            id: element.id,
                            files: filesOrImages
                        }) :
                        submissionFields.push({
                            id: element.id,
                            images: filesOrImages
                        });
                };
            } else {
                submissionFields.push({
                    id: element.id,
                    value: field
                });
            };
        };

        const submissionData = await Submission.create({
            formFieldsReply: submissionFields,
            student: values.student,
            assignment: values.assignment,
        });

        const indexOfWarn = existingUser.warnSend.findIndex((warn: any) => warn.classroomId == assignment.classRoom);

        existingUser.warnSend.splice(indexOfWarn, 1);

        await existingUser.save();

        return { success: "Submission successful", submission: toObject(submissionData) };
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

        return { success: "Submission fetched successfully", submission: toObject(submission) };
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Something went wrong!" };
    };
};

export const getStudentsSubmission = async (assignmentId: string) => {
    try {
        const user = await currentUser();

        if (!user) {
            return { error: "Unauthorized" };
        };

        await connectDB();

        const existingUser = await User.findById(user?._id);

        if (!existingUser || existingUser.role == "student") {
            return { error: "Unauthorized" };
        };

        const submissions = await Submission.find({
            assignment: assignmentId
        });

        return { success: "submissions fetched successfully", submissions: submissions.map(toObject) };
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Something went wrong!" };
    };
};

export const updateSubmission = async () => { };