"use client"

import React, { ChangeEvent, useEffect, useState } from 'react';
import { put } from '@vercel/blob';
// import { revalidatePath } from 'next/cache';
import { getTeacherClassroom } from '@/lib/actions/auth/classRoom';
import { useSession } from 'next-auth/react';
import { FormError } from "@/components/shared/form-error"
import { FormSuccess } from "@/components/shared/form-success"
import { Button } from '@mui/material';
import { addPost } from '@/lib/actions/auth/post';
import BlurLoader from '@/components/shared/blurLoader'
// import MultiInput from '@/components/ui/MultiInput'

interface ClassRoomId {
    class_room_id: string | number;
}

interface CreateAssignmentPorps {
    params: ClassRoomId;
}

interface AssignmentRes {
    success?: string | undefined;
    error?: string | undefined;
};

interface Images {
    files: File[];
}

interface ImagesData {
    image: string | null;
}

const CreateAssignment: React.FC<CreateAssignmentPorps> = ({ params: { class_room_id } }) => {

    const { data: session, status, update } = useSession({ required: true });
    const user = session?.user;

    const [title, setTitle] = useState<string | null>("");
    const [description, setDescription] = useState<string | null>("");
    // const [dueDate, setDueDate] = useState<string | null>("");
    // const [content, setContent] = useState<string | null>("");
    const [classRoom, setClassRoom] = useState<any>("");
    const [errMsg, setErr] = useState<string>("");
    const [successMsg, setSuccess] = useState<string>("");
    const [filesData, setFilesData] = useState<ImagesData[]>([]);
    const [imageData, setImagesData] = useState<ImagesData[]>([]);
    const [files, setFiles] = useState<Images>({ files: [] });
    const [images, setImages] = useState<Images>({ files: [] });
    const [isPending, setIsPending] = useState<boolean>(false);

    const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setErr("");
        setSuccess("");

        try {
            const formData = new FormData();

            formData.append('image-length', images.files.length.toString());
            formData.append('file-length', files?.files?.length.toString());
            images?.files.forEach((element, index) => {
                formData.append(`image-${index + 1}`, element);
            });
            files?.files.forEach((element, index) => {
                formData.append(`file-${index + 1}`, element);
            })
            formData.append('title', title as string);
            formData.append('description', description as string);
            formData.append('teacher', user?._id as string);
            formData.append('classRoom', class_room_id as any);

            const res: AssignmentRes | undefined = await addPost(formData as FormData);

            if (res?.success) {
                setSuccess(res?.success);
                setIsPending(false);
                window.location.href = `/class-room/${class_room_id}`;
            } else {
                setErr(res?.error || "Some thing went wrong!");
                setIsPending(false);
            };
        } catch (error) {
            setErr(error instanceof Error ? error.message : "Some thing went wrong!");
            setIsPending(false);
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

    async function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
        const file = e.currentTarget.files && e.currentTarget.files[0];
        if (file) {
            if (file.size / 1024 / 1024 > 50) {
                setErr('File size too big (max 50MB)')
            } else {
                setFiles({ files: [...files?.files, file] });
                const reader = new FileReader();
                reader.onload = (e) => {
                    setFilesData((prev) => ([...prev, { image: e.target?.result as string }]))
                };
                reader.readAsDataURL(file);
            }
        }
    };

    async function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
        const file = e.currentTarget.files && e.currentTarget.files[0];

        if (file) {
            if (file.size / 1024 / 1024 > 50) {
                setErr('File size too big (max 50MB)')
            } else {
                setImages({ files: [...images?.files, file] });
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImagesData((prev) => ([...prev, { image: e.target?.result as string }]))
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const deleteImage = (index: number) => {
        const imagesCopy = [...imageData];
        const imagesFileCopy = [...images?.files];

        imagesFileCopy.splice(index, 1);
        imagesCopy.splice(index, 1);

        setImages({ files: imagesFileCopy });
        setImagesData(imagesCopy);
    };

    const deleteFile = (index: number) => {
        const filesCopy = [...filesData];
        const filesFileCopy = [...files.files];

        filesFileCopy.splice(index, 1);
        filesCopy.splice(index, 1);

        setFiles({ files: filesFileCopy });
        setFilesData(filesCopy);
    };

    if (!classRoom) return <p>loading</p>;

    if (!Object.keys(classRoom).length) return <p>404</p>;

    return (
        <div className='flex justify-center w-full bg-#000'>
            {isPending && <BlurLoader />}
            <div className='flex p-6 bg-#000'>
                <form className='flex-col flex' onSubmit={handleCreatePost}>
                    <input placeholder='Title' value={title as string} onChange={e => setTitle(e.target.value)} type="text" />
                    <input placeholder='description' value={description as string} onChange={e => setDescription(e.target.value)} type="text" />
                    {/* <input placeholder='due date' value={dueDate} onChange={e => setDueDate(e.target.value)} type="date" />
                    <input placeholder='content' value={content} onChange={e => setContent(e.target.value)} type="text" /> */}
                    <input placeholder='Image' accept="image/*" onChange={handleChangeImage} type="file" />
                    {imageData?.map((element, index) => {
                        return (
                            <>
                                <img className="w-20" key={index} src={element?.image as string} />
                                <p className='cursor-pointer' onClick={() => deleteImage(index)}>x</p>
                            </>
                        )
                    })}

                    <input accept=".pdf,.doc,.gif,.txt" className="h-12" placeholder='File' onChange={handleChangeFile} type="file" />
                    {files?.files?.map((element, index) => {
                        return (
                            <p key={index}>{element?.name} <span className='cursor-pointer' onClick={() => deleteFile(index)}>x</span></p>
                        )
                    })}
                    <FormError message={errMsg} />
                    <FormSuccess message={successMsg} />
                    <Button
                        className="mt-16 bg-black hover:bg-zinc-700 text-white px-4 py-2 rounded-md"
                        type="submit"
                    >
                        Create assignment
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateAssignment;