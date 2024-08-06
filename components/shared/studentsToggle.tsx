"use client";

import React, { useState } from "react";
import StudentCart from "../ui/studentCart";

interface StudentToggle {
    students: any;
    submissions: any;
    classRoomId: any;
}

const StudentToggle: React.FC<StudentToggle> = ({ students, submissions, classRoomId }) => {
    const [showUnsbmStd, setShowUnsbmStd] = useState(false);

    const getUnSbmStd = () => {
        const sbmStdId = submissions.map((element: any) => element.student._id);

        const stds: any = [];

        students.map((element: any) => {
            !sbmStdId.includes(element._id) && stds.push(element);
        });

        return stds;
    };
    
    return (
        <>
        {
            showUnsbmStd ?
            <StudentCart students={getUnSbmStd()} showWarnOrDelBtn={true} classRoomId={classRoomId} />
            :
            <StudentCart students={students} showWarnOrDelBtn={true} classRoomId={classRoomId} />
        }
        </>
    )
};

export default StudentToggle;