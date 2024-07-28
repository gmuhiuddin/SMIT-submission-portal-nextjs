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
import FormBuilder from '@/components/ui/FormBuilder';
import { faLinesLeaning } from '@fortawesome/free-solid-svg-icons';
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

type FieldType = 'text' | 'number' | 'file' | 'image' | 'radio' | 'checkbox' | 'select';

interface Field {
    id: number;
    label: string;
    type: FieldType;
    required: boolean;
    options?: string[];
}

const CreateAssignment: React.FC<CreateAssignmentPorps> = ({ params: { class_room_id } }) => {

    const { data: session, status, update } = useSession({ required: true });
    const user = session?.user;

    const [title, setTitle] = useState<string | null>("");
    const [description, setDescription] = useState<string | null>("");
    const [dueDate, setDueDate] = useState<string | null>("");
    const [classRoom, setClassRoom] = useState<any>("");
    const [file, setFile] = useState<null | File>();
    const [image, setImage] = useState<null | File>();
    const [err, setErr] = useState<string | null>();
    const [success, setSuccess] = useState<string | null>();
    const [fields, setFields] = useState<Field[]>([]);
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
    const [createForm, setCreateForm] = useState<boolean>(false);
    const [ assignmentCreatePending, setAssignmentCreatePending] = useState<boolean>(false);

    const handleCreateAssignment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAssignmentCreatePending(true);
        setErr("")
        setSuccess("")

        if (!fields.length) return alert("Please add form fields");

        try {
            const res: AssignmentRes = await addAssignment({
                title, description, dueDate, classRoom: class_room_id, formFields: fields
            });
            console.log(res);

            if (res?.success) {
                setSuccess(res?.success);
                window.location.href = `/class-room/${class_room_id}`
            } else {
                setErr(res?.error);
                setAssignmentCreatePending(false);
            };
        } catch (error) {
            setErr(error instanceof Error ? error.message : "Some thing went wrong!");
            setAssignmentCreatePending(false);
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

    const date = new Date();
    const minDateForDueDate = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 + String(date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? 0 + String(date.getDate() + 1) : date.getDate() + 1}`;;

    if (!classRoom || assignmentCreatePending) return <p>loading</p>;

    if (!Object.keys(classRoom).length) return <p>404</p>;

    if (createForm) return <FormBuilder setFields={setFields} fields={fields} closeFormBuilder={() => setCreateForm(false)} />;

    return (
        <div className='h-screen pt-20 w-full'>
            <Link href={`/class-room/${class_room_id}`}>
                <Button
                    size="lg"
                    className="mt-16 absolute left-3 top-6 text-white px-4 py-2 rounded-md"
                >
                    Go back
                </Button></Link >
            <div className='flex flex-col justify-center w-full bg-#000'>
                <div className='flex p-6'>
                    <form className='flex-col flex' onSubmit={handleCreateAssignment}>
                        <input placeholder='Title' value={title as string} onChange={e => setTitle(e.target.value)} type="text" />
                        <input placeholder='description' value={description as string} onChange={e => setDescription(e.target.value)} type="text" />
                        <input placeholder='due date' min={minDateForDueDate} value={dueDate as string} onChange={e => setDueDate(e.target.value)} type="date" />
                        <button onClick={() => setCreateForm(true)}>create a custom form</button>
                        <p>form preview</p>
                        {fields.map((field) => (
                            <div key={field.id} className="field-wrapper">
                                <div className="preview-field">
                                    <label className="preview-label">
                                        {field.label}
                                        {field.required && ' *'}
                                        {field.type === 'text' && <input type="text" disabled required={field.required} />}
                                        {field.type === 'number' && <input disabled type="number" required={field.required} />}
                                        {field.type === 'file' && (
                                            <div className="file-input-wrapper">
                                                <label className="file-input-label" htmlFor={`file-${field.id}`}>Choose File</label>
                                                <input type="file" disabled id={`file-${field.id}`} required={field.required} />
                                            </div>
                                        )}
                                        {field.type === 'image' && (
                                            <div className="file-input-wrapper">
                                                <label className="file-input-label" htmlFor={`image-${field.id}`}>Choose Image</label>
                                                <input disabled type="file" accept="image/*" id={`image-${field.id}`} required={field.required} />
                                            </div>
                                        )}
                                        {field.type === 'radio' && (
                                            <div className="custom-radio-wrapper">
                                                {field.options?.map((option, index) => (
                                                    <label key={index} className="custom-radio-label">
                                                        <input
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
                                        {field.type === 'checkbox' && <input type="checkbox" required={field.required} />}
                                        {field.type === 'select' && (
                                            <select disabled required={field.required}>
                                                {field.options?.map((option, index) => (
                                                    <option key={index} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </label>
                                </div>
                            </div>
                        ))}

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
        </div>
    );
};

export default CreateAssignment;