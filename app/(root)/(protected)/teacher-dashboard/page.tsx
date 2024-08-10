import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { IconButton, Card, CardActions, CardContent, CardMedia, Typography, Button, Box, } from '@mui/material';
import { getTeacherClassrooms } from '@/lib/actions/auth/classRoom';
import { currentUser } from '@/lib/session';
import "./style.css";
import TeacherClassroomCard from '@/components/shared/teacherClassroomCard';

const TeacherDashboard = async () => {
  const user: any = await currentUser();

  const classRooms: any = await getTeacherClassrooms();

  if (!classRooms) return <>Check your internet connection</>;

  return (
    <div className="flex p-6 justify-center flex-wrap w-full class-room-main-container gap-4">

      {classRooms?.classRooms && classRooms.classRooms.length ? classRooms?.classRooms?.map((element: any, index: number) => {
        return (
          <TeacherClassroomCard
            key={index}
            title={element.title}
            batch={`SMIT-${element.batch}`}
            timing={element.timeAndLocation.time}
            days={element.timeAndLocation.days}
            lastActivity={element.latestAssignment.title}
            hasNewAssignment={true}
            classroomId={element?._id}
          />
        )
      })
        :
        "No class rooms"
      }
    </div>
  );
};

export default TeacherDashboard;