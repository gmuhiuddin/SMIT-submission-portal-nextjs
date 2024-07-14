import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { IconButton, Card, CardActions, CardContent, CardMedia, Typography, Button, Box, } from '@mui/material';
import { FolderOutlined as FolderOutlinedIcon, PermContactCalendarOutlined as PermContactCalendarOutlinedIcon } from '@mui/icons-material'; ``
import { getTeacherClassrooms } from '@/lib/actions/auth/classRoom';
import "./style.css";
import { currentUser } from '@/lib/session';

const TeacherDashboard = async () => {
  const user = await currentUser();

  const classRooms = await getTeacherClassrooms();
  // console.log(classRooms);
  
  return (
    <div className="flex justify-center flex-wrap class-room-main-container">

      {classRooms?.classRooms && classRooms?.classRooms?.map((element, index) => {
        return (

          <Box key={index} className="m-1 class-room-card" sx={{ Py: 6, background: '#0976A9', color: 'white', borderRadius: '20px' }}>
            <Typography sx={{ padding: '30px', cursor: 'pointer' }}>
              <h1 className='text-3xl border-b-2 font-semibold pb-2'>{element?.title}</h1>
              <p className='text-2xl border-b-2 mt-2 font-semibold inline-block w-max mb-2 teacher-name'>SMIT-{element?.batch} ({user?.name})</p>
              <p className='w-max '>{element?.timeAndLocation?.days} {element?.timeAndLocation?.time}</p>
              <Link href={`/class-room/${element?._id}`}>
                <Button
                  variant='contained'
                  sx={{ background: '#8BC34A', py: 2, px: 4, mt: 2, borderRadius: '30px', ":hover": { background: '#4CAF50' } }}>
                  See Activity</Button>
              </Link>
            </Typography>
            <CardMedia
              sx={{ height: 'auto' }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent className='cursor-pointer' >
            </CardContent>
          </Box>
        )
      })}
    </div >
  );
};

export default TeacherDashboard;