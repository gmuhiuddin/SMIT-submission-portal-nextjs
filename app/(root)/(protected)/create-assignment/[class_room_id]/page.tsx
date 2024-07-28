"use client"

import { addAssignment } from '@/lib/actions/auth/assignment';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { put } from '@vercel/blob';
// import { revalidatePath } from 'next/cache';
import { getTeacherClassroom } from '@/lib/actions/auth/classRoom';
import { useSession } from 'next-auth/react';
import Link from "next/link";
import { Try } from '@mui/icons-material';
import { Button } from '@/components/ui/button';
// import MultiInput from '@/components/ui/MultiInput'

interface ClassRoomId {
    class_room_id: string | number;
}

interface CreateAssignmentPorps {
    params: ClassRoomId;
}

interface AssignmentRes {
    success?: any;
    error?: any;
}

interface ClassroomRes {
    success?: any;
    error?: any;
    classRoom?: any;
}

const CreateAssignment: React.FC<CreateAssignmentPorps> = ({ params: { class_room_id } }) => {

    const { data: session, status, update } = useSession({ required: true });
    const user = session?.user;

    const [title, setTitle] = useState<string | null>("");
    const [description, setDescription] = useState<string | null>("");
    const [dueDate, setDueDate] = useState<string | null>("");
    const [content, setContent] = useState<string | null>("");
    const [classRoom, setClassRoom] = useState<any>("");
    const [file, setFile] = useState<null | File>();
    const [image, setImage] = useState<null | File>();
    const [err, setErr] = useState<string | null>();
    const [success, setSuccess] = useState<string | null>();
    const [fileData, setFileData] = useState<{
        image: string | null
    }>({
        image: null,
    });
    const [imageData, setImageData] = useState<{
        image: string | null
    }>({
        image: null,
    });

    const handleCreateAssignment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErr("")
        setSuccess("")

        try {
            // const res: AssignmentRes = await addAssignment({
            //     title, description, dueDate, url, teacher: user?._id, classRoom: class_room_id, file
            // });

            // if (res?.success) {
            //     setSuccess(res?.success);
            // } else {
            //     setErr(res?.error);
            // };
        } catch (error) {
            setErr(error instanceof Error ? error.message : "Some thing went wrong!")
        };
    };

    useEffect(() => {
        checkClassRoom();
    }, []);

    async function checkClassRoom() {
        try {
            const classRoomRes = await getTeacherClassroom(class_room_id);

            setClassRoom(classRoomRes?.classRoom || {});
        } catch (error) {
            console.log(error);
        };
    };

    async function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
        const file = e.currentTarget.files && e.currentTarget.files[0];

        if (file) {
            if (file.size / 1024 / 1024 > 50) {
                setErr('File size too big (max 50MB)')
            } else {
                setImage(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImageData((prev) => ({ ...prev, image: e.target?.result as string }))
                };
                reader.readAsDataURL(file);
            }
        }
    };

    if (!classRoom) return <p>loading</p>;

    if (!Object.keys(classRoom).length) return <p>404</p>;

    return (
        <>
        <Link href={`/class-room/${class_room_id}`}>
            <Button
                size="lg"
                className="mt-24 absolute right-3 top-6 text-white px-4 py-2 rounded-md"
            >
                Go back
            </Button></Link >
                <div className='flex justify-center w-full bg-#000'>
                    <div className='flex p-6 bg-#000'>
                        <form className='flex-col flex' onSubmit={handleCreateAssignment}>
                            <input placeholder='Title' value={title as string} onChange={e => setTitle(e.target.value)} type="text" />
                            <input placeholder='description' value={description as string} onChange={e => setDescription(e.target.value)} type="text" />
                            <input placeholder='due date' value={dueDate as string} onChange={e => setDueDate(e.target.value)} type="date" />
                            <input placeholder='content' value={content as string} onChange={e => setContent(e.target.value)} type="text" />
                            <input placeholder='content' onChange={handleChangeImage} type="file" />
                            <input placeholder='Title' value={title as string} onChange={e => setTitle(e.target.value)} type="text" />
                            <input placeholder='description' value={description as string} onChange={e => setDescription(e.target.value)} type="text" />
                            <input placeholder='due date' value={dueDate as string} onChange={e => setDueDate(e.target.value)} type="date" />
                            <input placeholder='content' value={content as string} onChange={e => setContent(e.target.value)} type="text" />
                            <input placeholder='content' onChange={handleChangeImage} type="file" />
                            <input placeholder='Title' value={title as string} onChange={e => setTitle(e.target.value)} type="text" />
                            <input placeholder='description' value={description as string} onChange={e => setDescription(e.target.value)} type="text" />
                            <input placeholder='due date' value={dueDate as string} onChange={e => setDueDate(e.target.value)} type="date" />
                            <input placeholder='content' value={content as string} onChange={e => setContent(e.target.value)} type="text" />
                            <input placeholder='content' onChange={handleChangeImage} type="file" />
                            <input placeholder='Title' value={title as string} onChange={e => setTitle(e.target.value)} type="text" />
                            <input placeholder='description' value={description as string} onChange={e => setDescription(e.target.value)} type="text" />
                            <input placeholder='due date' value={dueDate as string} onChange={e => setDueDate(e.target.value)} type="date" />
                            <input placeholder='content' value={content as string} onChange={e => setContent(e.target.value)} type="text" />
                            <input placeholder='content' onChange={handleChangeImage} type="file" />
                            <input placeholder='Title' value={title as string} onChange={e => setTitle(e.target.value)} type="text" />
                            <input placeholder='description' value={description as string} onChange={e => setDescription(e.target.value)} type="text" />
                            <input placeholder='due date' value={dueDate as string} onChange={e => setDueDate(e.target.value)} type="date" />
                            <input placeholder='content' value={content as string} onChange={e => setContent(e.target.value)} type="text" />
                            <input placeholder='content' onChange={handleChangeImage} type="file" />
                            <input placeholder='Title' value={title as string} onChange={e => setTitle(e.target.value)} type="text" />
                            <input placeholder='description' value={description as string} onChange={e => setDescription(e.target.value)} type="text" />
                            <input placeholder='due date' value={dueDate as string} onChange={e => setDueDate(e.target.value)} type="date" />
                            <input placeholder='content' value={content as string} onChange={e => setContent(e.target.value)} type="text" />
                            <input placeholder='content' onChange={handleChangeImage} type="file" />
                            <Button
                                size="lg"
                                className="mt-16 bg-black hover:bg-zinc-700 text-white px-4 py-2 rounded-md"
                                type="submit"
                            >
                                Create assignment
                            </Button>
                        </form>
                    </div>
                </div >
        </>
    );
};

export default CreateAssignment;