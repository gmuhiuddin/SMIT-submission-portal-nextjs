import { getTeacherClassrooms } from '@/lib/actions/auth/classRoom';
import { IconButton, Card, CardActions, CardContent, CardMedia, Typography, Button, Box, } from '@mui/material';
import { FolderOutlined as FolderOutlinedIcon, PermContactCalendarOutlined as PermContactCalendarOutlinedIcon } from '@mui/icons-material'; ``
import React from 'react';
import Link from 'next/link';

const TeacherDashboard = async () => {

  const classRooms = await getTeacherClassrooms();

  return (
    <div className="flex justify-center flex-wrap">
      {/* <main className="flex-1 p-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}

      {classRooms?.classRooms && classRooms?.classRooms?.map(element => {
        return (

          <Box className="m-1" sx={{ width: '31%', Py: 6, background: '#0976A9', color: 'white', borderRadius: '20px' }}>
            <Typography sx={{ paddingLeft: '30px' }} gutterBottom variant="h5" component="div">
            </Typography>
            <Typography sx={{ padding: '30px', cursor: 'pointer' }}>
              <h1 className='text-3xl border-b-2 font-semibold pb-2'>{element?.title} evelopment</h1>
              <p className='text-2xl border-b-2 mt-2 font-semibold inline-block w-max mb-2'>SMIT-10 (Sir Kashif)</p>
              <p className='w-max text-[#5d8f25]'>MWF 11Am - 1 Pm</p>
              <h1 className='mt-2'>Enrolled</h1>
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
      {/* </div>
      </main> */}

      {/* <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; 2024 Teacher Dashboard. All rights reserved.
      </footer> */}
    </div >
  );
};

export default TeacherDashboard;