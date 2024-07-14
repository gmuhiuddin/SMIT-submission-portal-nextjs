"use client"

import Head from 'next/head';
import { useSession } from "next-auth/react"
import { addClassRoom } from "@/lib/actions/auth/classRoom"
import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateClassroomPage = () => {
  const [className, setClassName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  const { data: session, status, update } = useSession({ required: true });
  const user = session?.user;

  interface timeAndLocation {
    time: string;
    location: string;
    days: string;
  }

  const [title, setTitle] = useState<string | undefined>();
  const [batch, setBatch] = useState<string | undefined>();
  const [timeAndLoca, setTimeAndLoca] = useState<string | undefined>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await addClassRoom({
        title, batch, timeAndLocation: {
          time: "11-00:13-00",
          location: "Bahadurabad",
          days: "weeekdays"
        }, teacher: user?._id
      });
      console.log(res);
      
      if (res?.error) {
        console.log("error", res.error);
      } else {
        console.log(res);
        window.location.href = "/teacher-dashboard";
      };
    } catch (error) {
      console.log("error", error instanceof Error && error.message);
    };

  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Reset request status if email is changed
    setRequestSent(false);
  };

  return (
    <>
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
            <form onSubmit={handleSubmit}>
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
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
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
                
                {/* Email for Connection Request */}
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email for Connection Request
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => e.preventDefault()}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {requestSent && (
                    <p className="text-sm text-green-600 mt-2">Connection request sent to {email}</p>
                  )}
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Classroom
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateClassroomPage;

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
