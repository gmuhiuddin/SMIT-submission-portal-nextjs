"use client";

import React, { useState } from "react";
import { ExitStudentFromClassroom, sendWarningToStudent } from "@/lib/actions/auth/student";
import { FaExclamationTriangle, FaTrash } from "react-icons/fa";

interface StudentCart {
    showWarnOrDelBtn?: boolean;
    students?: any;
    classRoomId: any;
}

const StudentCart: React.FC<StudentCart> = ({ showWarnOrDelBtn, students, classRoomId }) => {

    const [success, setSuccess] = useState<string>("");
    const [err, setErr] = useState<string>("");

    const sendWarnToStudent = async (_id: any) => {
        const res = await sendWarningToStudent(_id, classRoomId);
console.log(res);

        // if (res.success) {
        //     setSuccess(res.success as string);
        // } else {
        //     setErr(res.error as string);
        // };
    };

    const removeStdFromClassRoom = async (_id: any) => {
        const res = await ExitStudentFromClassroom(_id, classRoomId);
        console.log(res);

        // if (res.success) {
        //     setSuccess(res.success as string);
        // } else {
        //     setErr(res.error as string);
        // };
    };

    return (
        <>
            {students.map((element: any, index: number) => {
                return (
                    <div key={index} className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white my-3">
                        <img src={element.image} alt={element.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                        <div>
                            <span className="block text-lg font-semibold">{element.name}
                                {showWarnOrDelBtn &&
                                    <>
                                        <button
                                            onClick={() => sendWarnToStudent(element?._id)}
                                            className="text-yellow-500 hover:text-yellow-700"
                                        >
                                            <FaExclamationTriangle className="ml-20 w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => removeStdFromClassRoom(element?._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash className="ml-2 w-4 h-4" />
                                        </button>
                                    </>}
                            </span>
                            <span className="block text-sm text-gray-500">{element.email}</span>
                        </div>
                    </div>
                )
            })}
        </>
    );
};

export default StudentCart;