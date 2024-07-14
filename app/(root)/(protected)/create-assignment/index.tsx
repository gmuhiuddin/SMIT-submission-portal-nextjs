"use client"

import { addAssignment } from '@/lib/actions/auth/assignment';
import React, { useState } from 'react';
// import MultiInput from '@/components/ui/MultiInput'

interface CreateAssignmentPorps {
    classRoomId?: string | number;
    uid?: string | number;
}

const CreateAssignment: React.FC<CreateAssignmentPorps> = ({ classRoomId, uid }) => {
    const [title, setTitle] = useState<string | null>();
    const [description, setDescription] = useState<string | null>();
    const [dueDate, setDueDate] = useState<string | null>();
    const [content, setContent] = useState<string | null>();
    const [err, setErr] = useState<string | null>();
    const [success, setSuccess] = useState<string | null>();

    const handleCreateAssignment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErr("")
        setSuccess("")

        try {
            const res = await addAssignment({
                title, description, dueDate, content, teacher: uid, classRoom: classRoomId
            });

            if (res?.success) {
                setSuccess(res.success);
            } else {
                setErr(res?.error);
            };
        } catch (error) {
            setErr(error instanceof Error ? error.message : "Some thing went wrong!")
        };
    };

    return (
        <>
            <p>Create assignment
            </p>
            <form onSubmit={handleCreateAssignment}>
                <input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} type="text" />
                <input placeholder='description' value={description} onChange={e => setDescription(e.target.value)} type="text" />
                <input placeholder='due date' value={dueDate} onChange={e => setDueDate(e.target.value)} type="date" />
                <input placeholder='content' value={content} onChange={e => setContent(e.target.value)} type="text" />
                <button type='submit'>Create assignment</button>
            </form>
        </>
    );
};

export default CreateAssignment;