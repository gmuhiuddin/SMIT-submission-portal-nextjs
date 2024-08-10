"use server";

import { currentUser } from "@/lib/session";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/auth.model";
import { SettingsValidation } from "@/lib/validations/auth";
import { generateToken } from "@/lib/jwt-token";
// import { generateVerificationToken } from "@/lib/token"
import { sendVerificationEmail } from "@/lib/mailer";
import ClassRoom from "@/lib/models/classRooms";
import nodemailer from "nodemailer";
import Post from "@/lib/models/post";
import Assignment from "@/lib/models/assignment";
import { toObject } from "./helpingFuncs";
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

interface ClassRoom {
  title?: string;
  batch?: string | number;
  description?: string;
  teacher?: string | number;
  studentsEmail?: StudentEmail[];
  timeAndLocation: classRoomTimeAndLocation;
}

interface EditClassRoom {
  title?: string;
  batch?: string | number;
  description?: string;
  teacher?: string | number;
  studentsEmail?: StudentEmail[];
  timeAndLocation: classRoomTimeAndLocation;
  _id: number | string;
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

export const addClassRoom = async (values: ClassRoom) => {
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

    values?.studentsEmail?.forEach(async (element, index) => {
      const user = await User.findOne({
        email: element.value,
        role: "student",
      });

      if (user) {
        classRoom.students.push(user?._id);

        await transporter.sendMail({
          from: '"SMIT-Student-submission-portal" <noreply@smit.com>', // Sender address
          to: user?.email, // List of receivers
          subject: "Class room adding email", // Subject line
          text: "You are successfully adding on a SMIT submission web", // Plain text body
        });
      };

      if (values?.studentsEmail?.length == index + 1) {
        await classRoom.save();
      };
    });

    return { success: "Class was create", classRoom: toObject(classRoom) };
  } catch (error) {
    console.log("error", error);
  }
};

export const editClassRoom = async (values: EditClassRoom) => {
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

    const classRoom = await ClassRoom.findByIdAndUpdate(values._id, {
      ...classroomData,
    });

    values?.studentsEmail?.forEach(async (element, index) => {
      const user = await User.findOne({
        email: element.value,
        role: "student",
      });

      if (user) {
        classRoom.students.push(user?._id);

        await transporter.sendMail({
          from: '"SMIT-Student-submission-portal" <noreply@smit.com>', // Sender address
          to: user?.email, // List of receivers
          subject: "Class room adding email", // Subject line
          text: "Your successfully adding on a SMIT submission web", // Plain text body
        });
      };

      if (values?.studentsEmail?.length == index + 1) {
        await classRoom.save();
      };
    });

    return { success: "Class was create", classRoom: toObject(classRoom) };
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

    return { success: "Class was create", classRooms: classRooms.map(toObject) };
  } catch (error) {
    console.log("error", error);
  }
};

export const getTeacherClassroom = async (classRoomId?: string | number) => {
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

    const classRoom = await ClassRoom.findOne({
      _id: classRoomId,
      teacher: user?._id,
    });

    const students = await User.find({
      _id: classRoom?.students,
      role: "student"
    }).select("-password -isTwoFactorEnabled -emailVerified -provider -role -lastActivity");

    const posts = await Post.find({
      classRoom: classRoom._id,
      isDeleted: false
    });

    return { success: "Class was create", classRoom: toObject(classRoom), students: students.map(toObject), posts: posts.map(toObject) };
  } catch (error) {
    console.log("error", error);
  }
};

export const getStudentClassrooms = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    await connectDB();

    const existingUser = await User.findById(user?._id);

    if (!existingUser || existingUser.role == "teacher") {
      return { error: "Unauthorized" };
    }

    const classRooms: any = await ClassRoom.find({
      students: user._id,
    }).populate("teacher");

    const classRoomsWithWarn = classRooms.map((element: any) => {
      const copyElement = { ...element._doc };

      if (existingUser.warnSend.some((warn: any) => warn.classroomId == element._id.toString())) {
        copyElement.warnHave = true;
      } else {
        copyElement.warnHave = false;
      };

      return copyElement;
    });

    return { success: "Class was create", classRooms: classRoomsWithWarn };
  } catch (error) {
    console.log("error", error);
  }
};

export const getStudentClassroom = async (classRoomId?: string | number) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    await connectDB();

    const existingUser = await User.findById(user?._id);

    if (!existingUser || existingUser.role == "teacher") {
      return { error: "Unauthorized" };
    }

    const classRoom = await ClassRoom.findOne({
      _id: classRoomId,
      students: user?._id,
    }).populate("teacher");

    const assignments = await Assignment.find({
      classRoom: classRoom._id,
    });

    const posts = await Post.find({
      classRoom: classRoom._id,
      isDeleted: false
    });

    return { success: "Class was create", classRoom: toObject(classRoom), posts: posts.map(toObject), assignments: assignments.map(toObject) };
  } catch (error) {
    console.log("error", error);
  }
};