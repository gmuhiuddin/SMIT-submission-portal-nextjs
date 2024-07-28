"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    asisgnments?: Assignment[] | any;
    classRoomId: string | number;
};

const AssignmentComponent: React.FC<AssignmentComponentProps> = ({ asisgnments, classRoomId }) => {
    console.log("asisgnments", asisgnments);

    return (
        <div>
            <Link href={`/create-assignment/${classRoomId}`}>
                <Button
                    size="lg"
                    className="mt-24 absolute right-3 top-6 text-white px-4 py-2 rounded-md"
                >
                    Create assignment
                </Button></Link>
            {asisgnments.length ? asisgnments.map((element: any, index: number) => {
                return (
                    <div key={index}>{element.title}</div>
                )
            }) : "No assignment"}
        </div>
    );
};

export default AssignmentComponent;