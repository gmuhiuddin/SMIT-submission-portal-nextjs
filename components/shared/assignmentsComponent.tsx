"use client";

import React from "react";

interface Assignment {
    _id: string;
    teacher: "123456",
    classRoom: "123456",
    dueDate: "2024-07-25",
    title: "Olx clone",
    description: "bla bla bla",
    webScrnShot: "https://quiz.saylaniwelfare.com/images/smit.png",
    content: "https://quiz.saylaniwelfare.com/images/smit.png"
};

interface AssignmentComponentProps {
    asisgnments: Assignment[];
};

const AssignmentComponent: React.FC<AssignmentComponentProps> = ({ asisgnments }) => {
    console.log("asisgnments", asisgnments);

    const assignmentsArr = [
        {
            teacher: "123456",
            classRoom: "123456",
            dueDate: "2024-07-25",
            title: "Olx clone",
            description: "bla bla bla",
            webScrnShot: "https://quiz.saylaniwelfare.com/images/smit.png",
            content: "https://quiz.saylaniwelfare.com/images/smit.png"
        }
    ];

    return (
        <div>
            {assignmentsArr.map((element, index) => {
                return (
                    <div key={index} className="w-full bg-green-400 p-2 rounded">
                    {element.title}
                    </div>
                )
            })}
        </div>
    );
};

export default AssignmentComponent;