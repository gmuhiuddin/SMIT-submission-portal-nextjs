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

const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7
);

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

interface ReactPost {
    _id: string;
    icon: string;
    studentId: string;
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

const sendEmailToStudentsForCreateingPost = async (classRoomId: FormDataEntryValue | null) => {

    const classRoom = await ClassRoom.findById(classRoomId).populate("students");

    classRoom?.students.forEach(async (element: { email: any; }) => {

        await transporter.sendMail({
            from: '"SMIT-Student-submission-portal" <noreply@smit.com>', // Sender address
            to: element?.email, // List of receivers
            subject: "New post", // Subject line
            text: "New post on your classroom click here to check the post", // Plain text body
        });
    })

};

export const addPost = async (values: FormData) => {
    try {
        const user = await currentUser();

        if (!user) {
            return { error: "Unauthorized" };
        };

        await connectDB();

        const existingUser = await User.findById(user?._id);

        if (!existingUser || existingUser.role == "student") {
            return { error: "Unauthorized" };
        }

        const postData: {
            title?: any;
            description?: any;
            classRoom?: any;
            teacher?: any;
            imageDownloadUrls?: any;
            imageUrls?: any;
            FileUrls?: any;
        } = {
            title: values.get("title"),
            description: values.get("description"),
            classRoom: values.get("classRoom"),
            teacher: values.get("teacher"),
            imageUrls: [],
            FileUrls: [],
        };

        const imagesLengthStr = values.get("image-length") || 0;
        const imagesLength = +imagesLengthStr;
        const filesLengthStr = values.get("file-length") || 0;
        const filesLength = +filesLengthStr;

        for (let i = 0; i < imagesLength; i++) {
            const image = values.get(`image-${i + 1}`);

            if (image instanceof File && image.size > 0) {
                const imageContentType = image?.type || "image/*";

                const filename = `${nanoid()}.${imageContentType.split("/")[1]}`;

                const blob = await put(filename, image, {
                    contentType: imageContentType,
                    access: "public",
                });

                postData?.imageUrls.push({
                    name: image.name,
                    url: blob?.url,
                    downloadUrl: blob?.downloadUrl,
                });
            };
        };

        for (let i = 0; i < filesLength; i++) {
            const file = values.get(`file-${i + 1}`);

            if (file instanceof File && file.size > 0) {
                const fileContentType = file?.type || "text/plain";

                const filename = `${nanoid()}.${fileContentType.split("/")[1]}`;

                const blob = await put(filename, file, {
                    contentType: fileContentType,
                    access: "public",
                });

                postData?.FileUrls.push({
                    name: file.name,
                    url: blob?.url,
                    downloadUrl: blob?.downloadUrl,
                });
            };
        };

        if (Object.keys(postData).length < 5) {
            return { error: "All fields are required" };
        }

        await Post.create({
            ...postData,
        });

        const classRoomId = values.get("classRoom");

        await sendEmailToStudentsForCreateingPost(classRoomId);

        return { success: "Post was create" };
    } catch (error) {
        return error instanceof Error
            ? { error: error.message }
            : { error: "Something went wrong!" };
    };
};

export const reactPost = async (values: ReactPost) => {
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

        const post = await Post.findById(values._id);

        const reactionIndex = post ? post.reactions.findIndex((element: {
            studentId?: string;
            icon?: string;
        }) => element.studentId == values.studentId) : -1;

        if (reactionIndex != -1) {
            post.reactions[reactionIndex].icon = values.icon;

            await post.save();
        } else {
            post.reactions.push({
                icon: values.icon || "thumbs",
                studentId: values.studentId,
            });

            await post.save();
        };

        return { success: "Reaction was added successfully" };
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Something went wrong!" };
    };
};

export const removeReactPost = async () => { };