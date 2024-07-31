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

interface Submission {
    formFieldsReply: string;
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

        const post = await Assignment.findOne({
            _id: values.assignment,
            isDeleted: false
        });

        if (!post) {
            return { error: "Incorrect post" };
        };

        await Submission.create({
            ...values
        });

        return { success: "Comment sent successfully" };
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Something went wrong!" };
    };
};

export const getSubmissions = async (postId: string) => {
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

        const post = await Post.findOne({
            _id: postId,
            isDeleted: false
        });

        if (!post) {
            return { error: "Incorrect post" };
        };

        const comments = await Comment.find({
            post: postId,
        }).populate({
            path: 'student',
            select: 'name image'
        });

        return { success: "Comment sent successfully", comments: JSON.stringify(comments) };
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Something went wrong!" };
    };
};