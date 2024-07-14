"use server"

import React from "react";
import { currentUser } from "@/lib/session";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/auth.model";
import ClassRoom from "@/lib/models/classRooms";
import Assignment from "@/lib/models/assignment";
import { put } from '@vercel/blob'
import { customAlphabet } from 'nanoid'
import Post from "@/lib/models/post";

const nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    7
)

// interface Assignment {
//     teacher?: string | number;
//     classRoom?: string | number;
//     dueDate?: string | undefined;
//     title?: string | undefined;
//     description?: string | undefined;
//     webScrnShot?: string | undefined;
//     url?: string | undefined;
//     file?: any;
// }

export const addPost = async (values: FormData) => {
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

        const postData: {
            title?: any;
            description?: any;
            classRoom?: any;
            teacher?: any;
            imageDownloadUrl?: any;
            imageUrl?: any;
            FileDownloadUrl?: any;
        } = {
            title: values.get("title"),
            description: values.get("description"),
            classRoom: values.get("classRoom"),
            teacher: values.get("teacher"),
        };

        if (values.get("image")) {
            const file = values.get("image") || '';

            const contentType = file?.type || 'image/*';
            const filename = `${nanoid()}.${contentType.split('/')[1]}`

            const blob = await put(filename, file, {
                contentType,
                access: 'public',
            });

            postData.imageUrl = blob?.url;
            postData.imageDownloadUrl = blob?.downloadUrl;
        };

        if (values.get("file") !== "null" || values.get("file")) {
            const file = values.get("file") || '';

            const contentType = file?.type || 'text/plain';
            const filename = `${nanoid()}.${contentType.split('/')[1]}`

            const blob = await put(filename, file, {
                contentType,
                access: 'public',
            });

            postData.FileDownloadUrl = blob?.downloadUrl;
        };

        if(Object.keys(postData).length < 5){
            return { error: "All fields are required" };
        };

        await Post.create({
            ...postData
        });

        return { success: "Post was create" }
    } catch (error) {
        return error instanceof Error ? { error: error.message } : { error: "Something went wrong!" };
    };
};