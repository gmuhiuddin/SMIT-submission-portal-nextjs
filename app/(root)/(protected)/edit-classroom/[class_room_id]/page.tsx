"use client"

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from "next/link";
import { useSession } from "next-auth/react"
import { editClassRoom } from "@/lib/actions/auth/classRoom"
import TagInputComponent from '@/components/ui/tagInput';
import { getTeacherClassroom } from '@/lib/actions/auth/classRoom';
import { cn } from '@/lib/utils';
import BlurLoader from '@/components/shared/blurLoader'
import { Button } from "@/components/ui/button";
import './style.css';

interface ClassRoomId {
  class_room_id: string | number;
}

interface CreateAssignmentPorps {
  params: ClassRoomId;
}

interface Students {
  name: string;
  _id: string;
  image: string;
  email: string;
}

const EditClassroomPage: React.FC<CreateAssignmentPorps> = ({ params: { class_room_id } }) => {
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [batch, setBatch] = useState<string | undefined>();
  const [time, setTime] = useState<string | undefined>();
  const [location, setLoca] = useState<string | undefined>();
  const [day, setDay] = useState<string | undefined>();
  const [tags, setTags] = useState<{ id: string; value: string }[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [classRoom, setClassRoom] = useState<any>("");
  const [ students, setStudents ] = useState<Students[]>();

  const { data: session, status, update } = useSession({ required: true });
  const user = session?.user;

  const timeOptValue = ["09:00 - 11:00", "11:00 - 13:00", "14:00 - 16:00", "17:00 - 19:00", "19:00 - 21:00", "21:00 - 23:00"];
  const dayOptValue = ["MWF", "TW", "SS"];
  const LocaiotnOptValue = ["Gulshan", "Bahadurabad", "Numaish"];

  useEffect(() => {
    checkClassRoom();
}, []);

async function checkClassRoom() {
    try {
        const classRoomRes = await getTeacherClassroom(class_room_id);

  setStudents(classRoomRes?.students || []);
        setClassRoom(classRoomRes?.classRoom || {});
    } catch (error) {
        console.log(error);
    };
};

useEffect(() => {
  setTitle(classRoom?.title);
  setBatch(classRoom?.batch);
  setDescription(classRoom?.description);
  setDay(classRoom?.timeAndLocation?.days);
  setTime(classRoom?.timeAndLocation?.time);
  setLoca(classRoom?.timeAndLocation?.location);
}, [classRoom]);

  const handleSubmit = async () => {
    setIsPending(true);

    try {
      const res = await editClassRoom({
        title, description: description as string, batch, timeAndLocation: {
          time: time as string,
          location: location as string,
          days: day as string,
        }, teacher: user?._id, studentsEmail: tags, _id: class_room_id
      });
      
      if (res?.error) {
        console.log("error", res.error);
      setIsPending(false);
      } else {
        window.location.href = "/teacher-dashboard";
      };
    } catch (error) {
      console.log("error", error instanceof Error && error.message);
      setIsPending(false);
    };

  };

  const handleTagsChange = (newTags: { id: string; value: string; }[]) => {
    setTags(newTags);
  };

  if (!classRoom) return <p>loading</p>;

    if (!Object.keys(classRoom).length) return <p>404</p>;
  
  return (
    <>
    <Link href="/">
    <Button
        size="lg"
        className="mt-16 absolute left-3 top-3 text-white px-4 py-2 rounded-md"
      >
        Go Dashboard
      </Button></Link>
    <div className='main-containers create-class-room-main-container'>
      {isPending && <BlurLoader />}
    <Head>
        <title>Create Classroom - Your App Name</title>
        <meta name="description" content="Create a new classroom on Your App Name" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Create Classroom</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Fill in the details to create a new classroom and manage connection requests.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8">
                {/* Classroom Name */}
                <div>
                  <label htmlFor="class-name" className="block text-sm font-medium text-gray-700">
                    Classroom Name
                  </label>
                  <input
                    type="text"
                    id="class-name"
                    name="class-name"
                    autoComplete="class-name"
                    disabled={isPending}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border border-slate-500 px-3 py-1 rounded-md focus:outline-none focus:border-slate-950 w-full"
                  />
                </div>
                <div>
                  <label htmlFor="class-name" className="block text-sm font-medium text-gray-700">
                    Batch
                  </label>
                  <input
                    type="number"
                    disabled={isPending}
                    id="class-name"
                    name="class-name"
                    autoComplete="class-name"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    required
                    className="border border-slate-500 px-3 py-1 rounded-md focus:outline-none focus:border-slate-950 w-full"
                  />
                </div>
                <div>
                  <label htmlFor="class-name" className="block text-sm font-medium text-gray-700">
                    Day
                  </label>
                  <select
                    disabled={isPending}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        )}
        value={day}
        onChange={e => setDay(e.target.value)}
      >
        <option value="undefined" selected disabled>Please days</option>
        {dayOptValue.map((element, index) => (
          <option key={index} value={element}>
            {element}
          </option>
        ))}
      </select>
      </div>
                <div>
                  <label htmlFor="class-name" className="block text-sm font-medium text-gray-700">
                  Time
                  </label>
                  <select
                    disabled={isPending}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        )}
        value={time}
        onChange={e => setTime(e.target.value)}
      >
        <option value="undefined" selected disabled>Please select time</option>
        {timeOptValue.map((element, index) => (
          <option key={index} value={element}>
            {element}
          </option>
        ))}
      </select>
                </div>
                <div>
                  <label htmlFor="class-name" className="block text-sm font-medium text-gray-700">
                  Location
                  </label>
                  <select
                    disabled={isPending}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        )}
        value={location}
        onChange={e => setLoca(e.target.value)}
      >
        <option value="undefined" selected disabled>Please select locaiton</option>
        {LocaiotnOptValue.map((element, index) => (
          <option key={index} value={element}>
            {element}
          </option>
        ))}
      </select>
                </div>
                {/* Description */}
                <div className="sm:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-slate-500 px-3 py-2 rounded-md focus:outline-none focus:border-slate-950 w-full"
                  ></textarea>
                </div>
                <div className="sm:col-span-2">
                  <p className="block text-sm font-medium text-gray-700">
                    Students
                  </p>
{students ? students.length ? students.map(element => {
  return(
    <p>{element.name}</p>
  )
}) : "No students" : "Students fetching"}
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email for Connection Request
                  </label>
                </div>
              </div>
                <TagInputComponent tags={tags} 
              disabled={isPending}
                  setTags={handleTagsChange} />
              <div className="mt-5 sm:mt-6">
                <button
                    disabled={isPending}
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleSubmit}
                >
                Edit Classroom
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default EditClassroomPage;

// // components/AddClassRoomForm.js
// "use client"

// import { useSession } from "next-auth/react"
// import { addClassRoom } from "@/lib/actions/auth/classRoom"
// import React, { FormEvent, useState } from "react";
// import { useRouter } from "next/router";

// const AddClassRoomForm: React.FC = () => {
//   const { data: session, status, update } = useSession({ required: true });
//   const user = session?.user;

//   interface timeAndLocation {
//     time: string;
//     location: string;
//     days: string;
//   }

//   const [title, setTitle] = useState<string | undefined>();
//   const [batch, setBatch] = useState<string | undefined>();
//   const [timeAndLoca, setTimeAndLoca] = useState<string | undefined>();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const res = await addClassRoom({
//         title, batch, timeAndLocation: {
//           time: "11-00:13-00",
//           location: "Bahadurabad",
//           days: "weeekdays"
//         }, teacher: user?._id
//       });
      
//       if (res?.error) {
//         console.log("error", res.error);
//       } else {
        
//       };
//     } catch (error) {
//       console.log("error", error instanceof Error && error.message);
//     };

//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="text-center text-3xl font-extrabold text-gray-900">Add Class Room</h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//                 Class Title
//               </label>
//               <input
//                 value={title}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
//                 type="text"
//                 id="title"
//                 name="title"
//                 autoComplete="off"
//                 required
//                 className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
//               />
//             </div>

//             <div>
//               <label htmlFor="batch" className="block text-sm font-medium text-gray-700">
//                 Batch Details
//               </label>
//               <input
//                 value={batch}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBatch(e.target.value)}
//                 type="text"
//                 id="batch"
//                 name="batch"
//                 autoComplete="off"
//                 required
//                 className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="timeAndLocation"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Time and Location
//               </label>
//               <input
//                 value={timeAndLoca}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimeAndLoca(e.target.value)}
//                 type="text"
//                 id="timeAndLocation"
//                 name="timeAndLocation"
//                 autoComplete="off"
//                 required
//                 className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
//               />
//             </div>

//             <div className="flex items-center justify-end">
//               <button
//                 type="submit"
//                 className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
//               >
//                 Add Class Room
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddClassRoomForm;
