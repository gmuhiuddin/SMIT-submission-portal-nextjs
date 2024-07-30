"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Assignment {
    _id: string;
    teacher?: string | number,
    classRoom?: string | number,
    dueDate?: string,
    title?: string,
    description?: string,
    formFields?: any;
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
                    <div key={index}>
                        {element.title}
                        <Link href={`/assignment/${element._id}`}><Button className="ml-3">See activity</Button></Link>
                    </div>
                )
            }) : "No assignment"}
        </div>
    );
};

export default AssignmentComponent;