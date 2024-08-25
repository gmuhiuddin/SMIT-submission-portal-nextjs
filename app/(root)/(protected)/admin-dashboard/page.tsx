import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { IconButton, Card, CardActions, CardContent, CardMedia, Typography, Button, Box, } from '@mui/material';
import { getAdminsClassrooms } from '@/lib/actions/auth/classRoom';
import { currentUser } from '@/lib/session';
import StudentClassroomCard from '@/components/shared/studentClassroomCard';
import TeacherClassroomCard from '@/components/shared/teacherClassroomCard';
import "./style.css";

const AdminDashboard = async () => {
    const user: any = await currentUser();

    const classRooms: any = await getAdminsClassrooms();

    if (!classRooms) return <>Check your internet connection</>;

    return (
        <div className="flex p-6 justify-center w-full class-room-main-container gap-4">
            Admin dashboard
        </div>
    );
};

export default AdminDashboard;