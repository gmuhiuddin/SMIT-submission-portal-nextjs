"use server"

import nodemailer from 'nodemailer';
import cron from 'node-cron';
import Assignment from "@/lib/models/assignment";
import ClassRoom from "@/lib/models/classRooms";
import Submission from "@/lib/models/submission";
import dayjs from 'dayjs';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const CheckDailyAssignmentSubmissionDate = async () => {
    cron.schedule('59 58 23 * * *', async () => {
        // This runs every day at 23:59

        const assignments = await Assignment.find({
            isDeleted: false
        });

        const dueDateOfAst = dayjs().add(1, 'day').format('YYYY-MM-DD');

        await Promise.all(assignments.map(async ast => {

            if (ast.dueDate == dueDateOfAst) {

                const classRoom = await ClassRoom.findOne({
                    isDeleted: false,
                    _id: ast.classRoom
                }).populate({
                    path: 'students',
                    select: 'name image email'
                });

                const submissions = await Submission.find({
                    assignment: ast._id
                });

                const sbmStdId = submissions.map((element: any) => element.student);

                await Promise.all(classRoom.students.map(async (std: any) => {

                    if (!sbmStdId.includes(std._id)) {
                        await transporter.sendMail({
                            from: '"SMIT-Student-submission-portal" <noreply@smit.com>', // Sender address
                            to: std?.email, // List of receivers
                            subject: "Assignment submission alert", // Subject line
                            html: `
                            <p>Submit the assignment for your class ${classRoom.title}. The assignment was due on ${ast.dueDate} at 23:59.</p>
                            <p>
                              <a href="http://localhost:3000/std-assignment/${ast._id}" style="text-decoration: none;">
                                <button style="padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                                  See Assignment
                                </button>
                              </a>
                            </p>
                          `,
                        });
                    };
                }));
            };
        }));
    });
};