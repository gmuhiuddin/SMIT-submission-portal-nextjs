"use client";

import React, { useState } from "react";
import { ExitStudentFromClassroom, sendWarningToStudent } from "@/lib/actions/auth/student";
import { FaExclamationTriangle, FaTrash } from "react-icons/fa";
import CustomAlert from "./customAlert";

interface StudentCart {
    showWarnOrDelBtn?: boolean;
    students?: any;
    classRoomId: any;
}

const StudentCart: React.FC<StudentCart> = ({ showWarnOrDelBtn, students, classRoomId }) => {

    const [success, setSuccess] = useState<string>("");
    const [err, setErr] = useState<string>("");

    const sendWarnToStudent = async (_id: any) => {
        setSuccess("");
        setErr("");

        const res = await sendWarningToStudent(_id, classRoomId);

        if (res.success) {
            setSuccess(res.success as string);
        } else {
            setErr(res.error as string);
        };
    };

    const removeStdFromClassRoom = async (_id: any) => {
        setSuccess("");
        setErr("");

        const res = await ExitStudentFromClassroom(_id, classRoomId);
        console.log(res);

        if (res.success) {
            setSuccess(res.success as string);
        } else {
            setErr(res.error as string);
        };
    };

    return (
        <>
            {students.map((student: any, index: number) => {
                return (
                    <div key={index} className="flex items-center p-2 border border-gray-300 rounded-lg shadow-md bg-white my-2 w-full">
                        <img src={student.image} alt={student.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                        <div className="w-9/12 break-words">
                            <span className="block text-md font-semibold">{student.name}
                                <button
                                    onClick={() => sendWarnToStudent(student?._id)}
                                    className="text-yellow-500 hover:text-yellow-700"
                                >
                                    <FaExclamationTriangle className="ml-2 w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => removeStdFromClassRoom(student?._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrash className="ml-2 w-4 h-4" />
                                </button>
                            </span>
                            <span className="block w-full text-sm text-gray-500 break-words">{student.email}</span>
                        </div>
                    </div>
                )
            })}
            {success && <CustomAlert txt={success} isErrMsg={false}/>}
            {err && <CustomAlert txt={err} isErrMsg={true}/>}
        </>
    );
};

export default StudentCart;