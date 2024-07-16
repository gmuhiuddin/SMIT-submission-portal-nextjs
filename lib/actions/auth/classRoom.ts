"use server";

import { string, z } from "zod";
import bcrypt from "bcryptjs";

import { currentUser } from "@/lib/session";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/auth.model";
import { SettingsValidation } from "@/lib/validations/auth";
import { generateToken } from "@/lib/jwt-token";
// import { generateVerificationToken } from "@/lib/token"
import { sendVerificationEmail } from "@/lib/mailer";
import ClassRoom from "@/lib/models/classRooms";
import nodemailer from "nodemailer";
// import { sendVerificationEmail } from "@/lib/mail"

// type SettingsInput = z.infer<typeof SettingsValidation> & {
//     [key: string]: any
// }

interface classRoomTimeAndLocation {
  time: string;
  location: string;
  days: string;
}

interface StudentEmail {
  value: string | number;
  id: string | number;
}

interface classRoom {
  title?: string;
  batch?: string | number;
  description?: string;
  teacher?: string | number;
  studentsEmail?: StudentEmail[];
  timeAndLocation: classRoomTimeAndLocation;
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

export const addClassRoom = async (values: classRoom) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    await connectDB();

    const existingUser = await User.findById(user?._id);

    if (!existingUser || existingUser.role == "student") {
      return { error: "Unauthorized" };
    }

    if (Object.keys(values).length < 6) {
      return { error: "All fields are required" };
    };

    const classroomData = { ...values };

    delete classroomData.studentsEmail;

    const classRoom = await ClassRoom.create({
      ...classroomData,
    });

    values?.studentsEmail?.forEach(async (element) => {
      const user = await User.findOne({
        email: element.value,
        role: "student",
      });

      if (user) {
        classRoom.students.push(user?._id);

        await classRoom.save();

        await transporter.sendMail({
          from: '"SMIT-Student-submission-portal" <noreply@smit.com>', // Sender address
          to: user?.email, // List of receivers
          subject: "Class room adding email", // Subject line
          text: "Your successfully adding on a SMIT submission web", // Plain text body
        });
      };
    });

    return { success: "Class was create", classRoom };
  } catch (error) {
    console.log("error", error);
  }
};

export const getTeacherClassrooms = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    await connectDB();

    const existingUser = await User.findById(user?._id);

    if (!existingUser || existingUser.role == "student") {
      return { error: "Unauthorized" };
    }

    const classRooms = await ClassRoom.find({
      teacher: user._id,
    });

    return { success: "Class was create", classRooms };
  } catch (error) {
    console.log("error", error);
  }
};

export const getTeacherClassroom = async (classRoomId?: string | number) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    await connectDB();

    const existingUser = await User.findById(user?._id);

    if (!existingUser || existingUser.role == "student") {
      return { error: "Unauthorized" };
    }

    const classRoom = await ClassRoom.findOne({
      _id: classRoomId,
      teacher: user?._id,
    });

    return { success: "Class was create", classRoom };
  } catch (error) {
    console.log("error", error);
  }
};
