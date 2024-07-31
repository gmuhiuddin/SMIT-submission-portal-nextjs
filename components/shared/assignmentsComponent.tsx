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
};

const AssignmentComponent: React.FC<AssignmentComponentProps> = ({ asisgnments }) => {

    return (
        <div>
            {asisgnments.length ? asisgnments.map((element: any, index: number) => {
                return (
                    <div key={index}>
                        {element.title}
                        <Link href={`/std-assignment/${element._id}`}><Button className="ml-3">See activity</Button></Link>
                    </div>
                )
            }) : "No assignment"}
        </div>
    );
};

export default AssignmentComponent;