// "use client"

// import { addAssignment } from '@/lib/actions/auth/assignment';
// import React, { ChangeEvent, useEffect, useState } from 'react';
// import { put } from '@vercel/blob';
// // import { revalidatePath } from 'next/cache';
// import { getTeacherClassroom } from '@/lib/actions/auth/classRoom';
// import { useSession } from 'next-auth/react';
// import Link from "next/link";
// import { Try } from '@mui/icons-material';
// import { Button } from '@/components/ui/button';
// import FormBuilder from '@/components/ui/FormBuilder';
// import { faLinesLeaning } from '@fortawesome/free-solid-svg-icons';
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

// type FieldType = 'text' | 'number' | 'files' | 'images' | 'file' | 'image' | 'radio' | 'checkbox' | 'select';

// interface Field {
//     id: number;
//     label: string;
//     type: FieldType;
//     required: boolean;
//     options?: string[];
// }

// const CreateAssignment: React.FC<CreateAssignmentPorps> = ({ params: { class_room_id } }) => {

//     const { data: session, status, update } = useSession({ required: true });
//     const user = session?.user;

//     const [title, setTitle] = useState<string | null>("");
//     const [description, setDescription] = useState<string | null>("");
//     const [dueDate, setDueDate] = useState<string | null>("");
//     const [classRoom, setClassRoom] = useState<any>("");
//     // const [file, setFile] = useState<null | File>();
//     // const [image, setImage] = useState<null | File>();
//     const [err, setErr] = useState<string | null>();
//     const [success, setSuccess] = useState<string | null>();
//     const [fields, setFields] = useState<Field[]>([]);
//     // const [fileData, setFileData] = useState<{
//     //     image: string | null
//     // }>({
//     //     image: null,
//     // });
//     // const [imageData, setImageData] = useState<{
//     //     image: string | null
//     // }>({
//     //     image: null,
//     // });
//     const [createForm, setCreateForm] = useState<boolean>(false);
//     const [assignmentCreatePending, setAssignmentCreatePending] = useState<boolean>(false);

//     const handleCreateAssignment = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setAssignmentCreatePending(true);
//         setErr("")
//         setSuccess("")

//         if (!fields.length) return alert("Please add form fields");

//         try {
//             const res: AssignmentRes = await addAssignment({
//                 title, description, dueDate, classRoom: class_room_id, formFields: fields
//             });
//             console.log(res);

//             if (res?.success) {
//                 setSuccess(res?.success);
//                 window.location.href = `/class-room/${class_room_id}`
//             } else {
//                 setErr(res?.error);
//                 setAssignmentCreatePending(false);
//             };
//         } catch (error) {
//             setErr(error instanceof Error ? error.message : "Some thing went wrong!");
//             setAssignmentCreatePending(false);
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

//     // async function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
//     //     const file = e.currentTarget.files && e.currentTarget.files[0];

//     //     if (file) {
//     //         if (file.size / 1024 / 1024 > 50) {
//     //             setErr('File size too big (max 50MB)')
//     //         } else {
//     //             setImage(file);
//     //             const reader = new FileReader();
//     //             reader.onload = (e) => {
//     //                 setImageData((prev) => ({ ...prev, image: e.target?.result as string }))
//     //             };
//     //             reader.readAsDataURL(file);
//     //         }
//     //     }
//     // };

//     const date = new Date();
//     date.setDate(date.getDate() + 1);
//     const minDateForDueDate = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 + String(date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? 0 + String(date.getDate()) : date.getDate()}`;

//     if (!classRoom || assignmentCreatePending) return <p>loading</p>;

//     if (!Object.keys(classRoom).length) return <p>404</p>;

//     if (createForm) return <FormBuilder setFields={setFields} fields={fields} closeFormBuilder={() => setCreateForm(false)} />;

//     return (
//         <div className='h-screen pt-20 w-full'>
//             <Link href={`/class-room/${class_room_id}`}>
//                 <Button
//                     size="lg"
//                     className="mt-16 absolute left-3 top-6 text-white px-4 py-2 rounded-md"
//                 >
//                     Go back
//                 </Button></Link >
//             <div className='flex flex-col justify-center w-full bg-#000'>
//                 <div className='flex p-6'>
//                     <form className='flex-col flex' onSubmit={handleCreateAssignment}>
//                         <input placeholder='Title' value={title as string} onChange={e => setTitle(e.target.value)} type="text" />
//                         <input placeholder='description' value={description as string} onChange={e => setDescription(e.target.value)} type="text" />
//                         <input placeholder='due date' min={minDateForDueDate} value={dueDate as string} onChange={e => setDueDate(e.target.value)} type="date" />
//                         <button onClick={() => setCreateForm(true)}>create a custom form</button>
//                         <p>form preview</p>
//                         {fields.map((field) => (
//                             <div key={field.id} className="field-wrapper">
//                                 <div className="preview-field">
//                                     <label className="preview-label">
//                                         {field.label}
//                                         {field.required && ' *'}
//                                         {field.type === 'text' && <input type="text" disabled required={field.required} />}
//                                         {field.type === 'number' && <input disabled type="number" required={field.required} />}
//                                         {field.type === 'file' && (
//                                             <div className="file-input-wrapper">
//                                                 <label className="file-input-label" htmlFor={`file-${field.id}`}>Choose File</label>
//                                                 <input type="file" disabled id={`file-${field.id}`} required={field.required} />
//                                             </div>
//                                         )}
//                                         {field.type === 'image' && (
//                                             <div className="file-input-wrapper">
//                                                 <label className="file-input-label" htmlFor={`image-${field.id}`}>Choose Image</label>
//                                                 <input disabled type="file" accept="image/*" id={`image-${field.id}`} required={field.required} />
//                                             </div>
//                                         )}
//                                         {field.type === 'radio' && (
//                                             <div className="custom-radio-wrapper">
//                                                 {field.options?.map((option, index) => (
//                                                     <label key={index} className="custom-radio-label">
//                                                         <input
//                                                             disabled
//                                                             type="radio"
//                                                             name={`radio-${field.id}`}
//                                                             required={field.required}
//                                                         />
//                                                         {option}
//                                                     </label>
//                                                 ))}
//                                             </div>
//                                         )}
//                                         {field.type === 'checkbox' && <input type="checkbox" required={field.required} />}
//                                         {field.type === 'select' && (
//                                             <select disabled required={field.required}>
//                                                 {field.options?.map((option, index) => (
//                                                     <option key={index} value={option}>
//                                                         {option}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                         )}
//                                     </label>
//                                 </div>
//                             </div>
//                         ))}

//                         <Button
//                             size="lg"
//                             className="mt-16 bg-black hover:bg-zinc-700 text-white px-4 py-2 rounded-md"
//                             type="submit"
//                         >
//                             Create assignment
//                         </Button>
//                     </form>
//                 </div>
//             </div >
//         </div>
//     );
// };

// export default CreateAssignment;

// components/CreateAssignment.tsx

"use client";

import { addAssignment } from "@/lib/actions/auth/assignment";
import React, { useEffect, useState } from "react";
import { getTeacherClassroom } from "@/lib/actions/auth/classRoom";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormBuilder from "@/components/ui/FormBuilder";
import '../../teacher-dashboard/style.css';
import BlurLoader from "@/components/shared/blurLoader";

interface ClassRoomId {
    class_room_id: string | number;
}

interface CreateAssignmentProps {
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

type FieldType =
    | "url"
    | "text"
    | "image"
    | "file"
    | "images"
    | "files"
    | "number"
    | "radio"
    | "checkbox"
    | "select";

interface Field {
    id: number;
    label: string;
    type: FieldType;
    required: boolean;
    options?: string[];
}

const CreateAssignment: React.FC<CreateAssignmentProps> = ({ params: { class_room_id } }) => {
    const { data: session } = useSession({ required: true });
    const user = session?.user;

    const [title, setTitle] = useState<string | null>("");
    const [description, setDescription] = useState<string | null>("");
    const [dueDate, setDueDate] = useState<string | null>("");
    const [classRoom, setClassRoom] = useState<any>("");
    const [err, setErr] = useState<string | null>();
    const [success, setSuccess] = useState<string | null>();
    const [fields, setFields] = useState<Field[]>([]);
    const [createForm, setCreateForm] = useState<boolean>(false);
    const [assignmentCreatePending, setAssignmentCreatePending] = useState<boolean>(false);

    useEffect(() => {
        checkClassRoom();
    }, []);

    async function checkClassRoom() {
        try {
            const classRoomRes = await getTeacherClassroom(class_room_id);
            setClassRoom(classRoomRes?.classRoom || {});
        } catch (error) {
            console.log(error);
        }
    }

    const handleCreateAssignment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAssignmentCreatePending(true);
        setErr("");
        setSuccess("");

        if (!fields.length) return alert("Please add form fields");

        try {
            const res: AssignmentRes = await addAssignment({
                title,
                description,
                dueDate,
                classRoom: class_room_id,
                formFields: fields,
            });

            if (res?.success) {
                setSuccess(res?.success);
                window.location.href = `/class-room/${class_room_id}`;
            } else {
                setErr(res?.error);
                setAssignmentCreatePending(false);
            }
        } catch (error) {
            setErr(error instanceof Error ? error.message : "Something went wrong!");
            setAssignmentCreatePending(false);
        }
    };

    const date = new Date();
    date.setDate(date.getDate() + 1);
    const minDateForDueDate = `${date.getFullYear()}-${
        date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;

    if (!classRoom) return <p className="text-center mt-10">Loading...</p>;

    if (!Object.keys(classRoom).length) return <p className="text-center mt-10">404 - Classroom Not Found</p>;

    if (createForm) return <FormBuilder setFields={setFields} fields={fields} closeFormBuilder={() => setCreateForm(false)} />;

    return (
        <>
         <Link href={`/class-room/${class_room_id}`}>
                        <Button
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        >
                            Go Back
                        </Button>
                    </Link>
        <div className="class-room-main-container min-h-screen flex flex-col justify-center items-center p-4 lg:w-1/3 md:w-3/6 sm:w-4/6 max-[640px]:w-5/6">
        {assignmentCreatePending && <BlurLoader />}
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-800">Create Assignment</h1>
                </div>
                <form className="mt-6 space-y-4" onSubmit={handleCreateAssignment}>
                    <div className="flex flex-col space-y-2">
                        <label className="text-gray-700">Title</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md"
                            placeholder="Title"
                            value={title as string}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="text-gray-700">Description</label>
                        <textarea
                            className="p-2 border border-gray-300 rounded-md"
                            placeholder="Description"
                            value={description as string}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="text-gray-700">Due Date</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md"
                            placeholder="Due Date"
                            min={minDateForDueDate}
                            value={dueDate as string}
                            onChange={(e) => setDueDate(e.target.value)}
                            type="date"
                            required
                        />
                    </div>
                    <button
                        className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        onClick={() => setCreateForm(true)}
                        type="button"
                    >
                        Create Custom Form
                    </button>
                    <p className="mt-4 text-gray-600">Form Preview</p>
                    <div className="space-y-4">
                        {fields.map((field) => (
                            <div key={field.id} className="field-wrapper">
                                <div className="preview-field flex flex-col">
                                    <label className="preview-label text-gray-700">
                                        {field.label}
                                        {field.required && " *"}
                                    </label>
                                    {field.type === "text" && (
                                        <input className="p-2 border border-gray-300 rounded-md" type="text" disabled required={field.required} />
                                    )}
                                    {field.type === "number" && (
                                        <input className="p-2 border border-gray-300 rounded-md" type="number" disabled required={field.required} />
                                    )}
                                    {field.type === "file" && (
                                        <div className="file-input-wrapper">
                                            <input
                                                className="p-2 border border-gray-300 rounded-md"
                                                type="file"
                                                disabled
                                                required={field.required}
                                            />
                                        </div>
                                    )}
                                    {field.type === "image" && (
                                        <div className="file-input-wrapper">
                                            <input
                                                className="p-2 border border-gray-300 rounded-md"
                                                type="file"
                                                accept="image/*"
                                                disabled
                                                required={field.required}
                                            />
                                        </div>
                                    )}
                                    {field.type === "radio" && (
                                        <div className="custom-radio-wrapper">
                                            {field.options?.map((option, index) => (
                                                <label key={index} className="custom-radio-label">
                                                    <input
                                                        className="mr-2"
                                                        disabled
                                                        type="radio"
                                                        name={`radio-${field.id}`}
                                                        required={field.required}
                                                    />
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                    {field.type === "checkbox" && (
                                        <input className="mr-2" type="checkbox" disabled required={field.required} />
                                    )}
                                    {field.type === "select" && (
                                        <select className="p-2 border border-gray-300 rounded-md" disabled required={field.required}>
                                            {field.options?.map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {err && <p className="text-red-500">{err}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <Button
                        size="lg"
                        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        type="submit"
                    >
                        Create Assignment
                    </Button>
                </form>
            </div>
        </div>
        </>
    );
};

export default CreateAssignment;