"use client"

import { useState } from 'react';
import Head from 'next/head';
import Link from "next/link";
import { useSession } from "next-auth/react"
import { addClassRoom } from "@/lib/actions/auth/classRoom"
import TagInputComponent from '@/components/ui/tagInput';
import { cn } from '@/lib/utils';
import BlurLoader from '@/components/shared/blurLoader'
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/shared/form-error"
import { FormSuccess } from "@/components/shared/form-success"
import './style.css';

const CreateClassroomPage = () => {
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [batch, setBatch] = useState<string | undefined>();
  const [time, setTime] = useState<string | undefined>();
  const [location, setLoca] = useState<string | undefined>();
  const [day, setDay] = useState<string | undefined>();
  const [tags, setTags] = useState<{ id: string; value: string }[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | undefined>("");
  const [successMsg, setSuccessMsg] = useState<string | undefined>("");

  const { data: session, status, update } = useSession({ required: true });
  const user = session?.user;

  const timeOptValue = ["09:00 - 11:00", "11:00 - 13:00", "14:00 - 16:00", "17:00 - 19:00", "19:00 - 21:00", "21:00 - 23:00"];
  const dayOptValue = ["MWF", "TW", "SS"];
  const LocaiotnOptValue = ["Gulshan", "Bahadurabad", "Numaish"];

  const handleSubmit = async () => {
    setIsPending(true);

    try {
      const res = await addClassRoom({
        title, description: description as string, batch, timeAndLocation: {
          time: time as string,
          location: location as string,
          days: day as string,
        }, teacher: user?._id, studentsEmail: tags
      });

      if (res?.error) {
        setErrMsg(res.error);
        setIsPending(false);
      } else {
        window.location.href = "/teacher-dashboard";
      };
    } catch (error) {
      setErrMsg(error instanceof Error ? error.message : "Something went wrong!");
      setIsPending(false);
    };

  };

  const handleTagsChange = (newTags: { id: string; value: string; }[]) => {
    setTags(newTags);
  };

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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email for Connection Request
                  </label>
                </div>
              </div>
              <TagInputComponent tags={tags}
                disabled={isPending}
                setTags={handleTagsChange} />
              <div className="mt-5 sm:mt-6">
              <FormError message={errMsg} />
              <FormSuccess message={successMsg} />
                <button
                  disabled={isPending}
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleSubmit}
                >
                  Create Classroom
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateClassroomPage;