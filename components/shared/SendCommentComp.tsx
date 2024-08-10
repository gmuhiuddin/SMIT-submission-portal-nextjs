"use client";

import React, { ChangeEvent, useState } from 'react';
import { sendComment } from "@/lib/actions/auth/comment";

interface SendComment {
    assignmentId: string;
}

const SendCommentComp: React.FC<SendComment> = ({assignmentId}) => {

    const [commentTxt, setCommentTxt] = useState<string>("");
    const [err, setErr] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const handleSendComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccess("");
        setErr("");

        const res = await sendComment({
            postId: assignmentId,
            txt: commentTxt
        });

        if(res.success){
            setCommentTxt("");
            setSuccess("Comment sent successful");
        }else{
            setErr(res.error || "Some thing went wrong!");
        };
    };

    return(
        <form onSubmit={handleSendComment}>
            <input type='text' value={commentTxt} onChange={(e) => setCommentTxt(e.target.value)} placeholder='Commect' />
            <button type="submit">Send</button>
        </form>
    )
};

export default SendCommentComp;