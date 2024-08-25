"use server";

import connectDB from "@/lib/db";
import { generateTeacherCreationToken } from "@/lib/jwt-token";
import { sendTeacherCreationEmail } from "@/lib/mailer";
import { User } from "@/lib/models/auth.model";
import { currentUser } from "@/lib/session";

export const sendTeacherCreatingEmail = async (emailObj: { email: string }) => {
  try {
    const { email } = emailObj;

    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    };

    await connectDB();

    const existingUser = await User.findById(user?._id);

    if (!existingUser || existingUser.role !== "admin") {
      return { error: "Unauthorized" };
    };

    if (!email) {
      return { error: "Invalid email!" }
    }

    await connectDB();

    const teacherCreationToken = await generateTeacherCreationToken({ email });
    // console.log({passwordResetToken})

    await sendTeacherCreationEmail(
      email,
      teacherCreationToken
    );

    // const passwordResetToken = await generatePasswordResetToken(email)

    // await sendPasswordResetEmail(
    //   passwordResetToken.email,
    //   passwordResetToken.token
    // )

    return { success: "Teacher creation email sent!" }
  } catch (error) {
    return { error: error instanceof Error ? error : "Something went wring!" };
  };
};

export const checkTeacherWasExist = async (email: string | undefined) => {
  try {

    if (!email) {
      return { error: "Invalid email!" }
    }

    const teacher = await User.findOne({
      role: "teacher",
      email
    });

    return { success: "Teacher fetched successfully", isTeacherExist: Boolean(teacher) };
  } catch (error) {
    return { error: error instanceof Error ? error : "Something went wring!" };
  };
};