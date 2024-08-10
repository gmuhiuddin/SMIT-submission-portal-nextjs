import React from 'react';
import Link from 'next/link';
import { IconButton, Card, CardActions, CardContent, CardMedia, Typography, Button, Box, } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { getStudentClassrooms } from '@/lib/actions/auth/classRoom';
import { currentUser } from '@/lib/session';
import "../teacher-dashboard/style.css";
import StudentClassroomCard from '@/components/shared/studentClassroomCard';

async function StudentDashboard() {

    const user = await currentUser();

    const classRooms = await getStudentClassrooms();

    if (!classRooms) return <>Check your internet connnection</>;

    return (
        <div className="flex p-6 justify-center flex-wrap w-full class-room-main-container gap-4">

            {classRooms?.classRooms && classRooms.classRooms.length ? classRooms?.classRooms?.map((element: any, index: number) => {

                return (
                    <StudentClassroomCard
                        teacherName={element.teacher.name}
                        key={index}
                        title={element.title}
                        batch={`SMIT-${element.batch}`}
                        timing={element.timeAndLocation.time}
                        days={element.timeAndLocation.days}
                        lastActivity={element.latestAssignment?.title || null}
                        hasNewAssignment={!element?.submission}
                        hasWarning={element.warnHave}
                        classroomId={element?._id}
                    />
                )
            })
                : "No class rooms"}
        </div>
    );
};

export default StudentDashboard;