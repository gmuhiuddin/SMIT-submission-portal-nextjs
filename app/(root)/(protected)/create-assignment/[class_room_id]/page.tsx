// "use client"

// import { addAssignment } from '@/lib/actions/auth/assignment';
// import React, { ChangeEvent, useEffect, useState } from 'react';
// import { put } from '@vercel/blob';
// // import { revalidatePath } from 'next/cache';
// import { getTeacherClassroom } from '@/lib/actions/auth/classRoom';
// import { useSession } from 'next-auth/react';
// import { Try } from '@mui/icons-material';
// import { setStudentForTeacherClassRoom } from '@/lib/actions/auth/student';
// import { Button } from '@mui/material';
// // import MultiInput from '@/components/ui/MultiInput'

// interface ClassRoomId {
//     class_room_id: string | number;
// }

// interface CreateAssignmentPorps {
//     params: ClassRoomId;
// }

// interface AssignmentRes {
//     success?: any;
//     error?: any;
// }

// interface ClassroomRes {
//     success?: any;
//     error?: any;
//     classRoom?: any;
// }

// const CreateAssignment: React.FC<CreateAssignmentPorps> = ({ params: { class_room_id } }) => {

//     const { data: session, status, update } = useSession({ required: true });
//     const user = session?.user;

//     const [title, setTitle] = useState<string | null>("");
//     const [description, setDescription] = useState<string | null>("");
//     const [dueDate, setDueDate] = useState<string | null>("");
//     const [content, setContent] = useState<string | null>("");
//     const [classRoom, setClassRoom] = useState<any>("");
//     const [file, setFile] = useState<any>();
//     const [err, setErr] = useState<string | null>();
//     const [success, setSuccess] = useState<string | null>();

//     const handleCreateAssignment = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setErr("")
//         setSuccess("")

//         try {
//             const res: AssignmentRes = await addAssignment({
//                 title, description, dueDate, url, teacher: user?._id, classRoom: class_room_id, file
//             });

//             if (res?.success) {
//                 setSuccess(res?.success);
//             } else {
//                 setErr(res?.error);
//             };
//         } catch (error) {
//             setErr(error instanceof Error ? error.message : "Some thing went wrong!")
//         };
//     };

//     useEffect(() => {
//         checkClassRoom();
//     }, []);

//     async function checkClassRoom() {
//         try {
//             const classRoomRes = await getTeacherClassroom(class_room_id);

//             setClassRoom(classRoomRes?.classRoom || {});
//         } catch (error) {
//             console.log(error);
//         };
//     };

//     async function handleChangeImage (e : ChangeEvent<HTMLInputElement>)  {
//         const fileRes = e.target.files?.[0];

//             const blob = await put(fileRes?.name, fileRes, {
//               access: 'public',
//             });
//             // revalidatePath('/');
//             console.log(blob)
//             // return blob;
//         // setFile();
//     };

//     if (classRoom && !Object.keys(classRoom).length) return <p>404</p>;

//     return (
//         <div className='flex justify-center w-full bg-#000'>
//             <div className='flex p-6 bg-#000'>
//                 <form className='flex-col flex' onSubmit={handleCreateAssignment}>
//                     <input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} type="text" />
//                     <input placeholder='description' value={description} onChange={e => setDescription(e.target.value)} type="text" />
//                     <input placeholder='due date' value={dueDate} onChange={e => setDueDate(e.target.value)} type="date" />
//                     <input placeholder='content' value={content} onChange={e => setContent(e.target.value)} type="text" />
//                     <input placeholder='content' value={file} onChange={handleChangeImage} type="file" />
//                     <Button
//                         size="lg"
//                         className="mt-16 bg-black hover:bg-zinc-700 text-white px-4 py-2 rounded-md"
//                         type="submit"
//                     >
//                         Create assignment
//                     </Button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateAssignment;
'use client';

// import type { PutBlobResult } from '@vercel/blob';
// import { useState, useRef } from 'react';

// export default function AvatarUploadPage() {
//   const inputFileRef = useRef<HTMLInputElement>(null);
//   const [blob, setBlob] = useState<PutBlobResult | null>(null);

//   return (
//     <>
//       <h1>Upload Your Avatar</h1>

//       <form
//         onSubmit={async (event) => {
//           event.preventDefault();

//           if (!inputFileRef.current?.files) {
//             throw new Error('No file selected');
//           }

//           const file = inputFileRef.current.files[0];

//           const response = await fetch(
//             `/api/file?filename=${file?.name}`,
//             {
//               method: 'POST',
//               body: file,
//             },
//           );

//           if (!response.ok) {
//             throw new Error('Failed to upload file');
//         }

//           const newBlob = (await response.json()) as PutBlobResult;

//           setBlob(newBlob);
//         }}
//       >
//         <input name="file" ref={inputFileRef} type="file" required />
//         <button type="submit">Upload</button>
//       </form>
//       {blob && (
//         <div>
//           Blob url: <a href={blob.url}>{blob.url}</a>
//         </div>
//       )}
//     </>
//   );
// }


// Work 


"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { put } from '@vercel/blob';
// import { revalidatePath } from 'next/cache';
import { getTeacherClassroom } from '@/lib/actions/auth/classRoom';
import { useSession } from 'next-auth/react';
import { Try } from '@mui/icons-material';
import { setStudentForTeacherClassRoom } from '@/lib/actions/auth/student';
import { Button } from '@mui/material';
import { addPost } from '@/lib/actions/auth/addPost';
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
    // const [dueDate, setDueDate] = useState<string | null>("");
    // const [content, setContent] = useState<string | null>("");
    const [classRoom, setClassRoom] = useState<any>("");
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
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<File | null>(null);

    const handleCreateAssignment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErr("");
        setSuccess("");

        try {
            const formData = new FormData();
            formData.append('file', file as File);
            formData.append('image', image as File);
            formData.append('title', title as string);
            formData.append('description', description as string);
            formData.append('teacher', user?._id as string);
            formData.append('classRoom', class_room_id as any);

            const res: AssignmentRes | undefined = await addPost(formData as FormData);
console.log(res);

            if (res?.success) {
                setSuccess(res?.success);
            } else {
                setErr(res?.error);
            };
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

    async function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
        const file = e.currentTarget.files && e.currentTarget.files[0];
        if (file) {
            if (file.size / 1024 / 1024 > 50) {
                setErr('File size too big (max 50MB)')
            } else {
                setFile(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    setFileData((prev) => ({ ...prev, image: e.target?.result as string }))
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
                setImage(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImageData((prev) => ({ ...prev, image: e.target?.result as string }))
                };
                reader.readAsDataURL(file);
            }
        }
    };

    if (classRoom && !Object.keys(classRoom).length) return <p>404</p>;

    return (
        <div className='flex justify-center w-full bg-#000'>
            <div className='flex p-6 bg-#000'>
                <form className='flex-col flex' onSubmit={handleCreateAssignment}>
                    <input placeholder='Title' value={title as string} onChange={e => setTitle(e.target.value)} type="text" />
                    <input placeholder='description' value={description as string} onChange={e => setDescription(e.target.value)} type="text" />
                    {/* <input placeholder='due date' value={dueDate} onChange={e => setDueDate(e.target.value)} type="date" />
                    <input placeholder='content' value={content} onChange={e => setContent(e.target.value)} type="text" /> */}
                    <img className="w-20" src={imageData?.image as string} />
                    <input placeholder='Image' accept="image/*" onChange={handleChangeImage} type="file" />

                    <img src={fileData?.image as string} />
                    <input accept=".jpg,.jpeg,.png,.gif,.txt" className="h-12" placeholder='File' onChange={handleChangeFile} type="file" />
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