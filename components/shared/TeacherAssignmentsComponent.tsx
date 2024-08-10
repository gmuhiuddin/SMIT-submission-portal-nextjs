"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AssignmentCard from "../ui/assignmentCard";
import { getStudents } from "@/lib/actions/auth/student";
import { getStudentsSubmission } from "@/lib/actions/auth/submission";

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
    assignments?: Assignment[] | any;
    classRoomId: string | number;
};

const AssignmentComponent: React.FC<AssignmentComponentProps> = ({ assignments, classRoomId }) => {

    const [asgs, setAsgs] = useState<null | any>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (assignments.length) {
                const data = await Promise.all(assignments.map(async (element: any) => {
                    const students: any = await getStudents(element.classRoom);
                    const studentsLength = students?.students.length;

                    const submissions: any = await getStudentsSubmission(element._id);
                    const submissionsLength = submissions?.submissions.length;

                    return {
                        ...element,
                        totalStudents: studentsLength,
                        submissions: submissionsLength,
                        notSubmitted: studentsLength - submissionsLength,
                    };
                }));
                setAsgs(data);
            } else {
                setAsgs([]);
            };
        };

        fetchData();
    }, [assignments]);

    if (!asgs) return <>Loading...</>;

    return (
        <div>
            <Link href={`/create-assignment/${classRoomId}`}>
                <Button
                    size="lg"
                    className="mt-24 absolute right-3 top-6 text-white px-4 py-2 rounded-md"
                >
                    Create assignment
                </Button></Link>
            <div className="pt-6">
                {asgs.length ? asgs.map((element: any, index: number) => {

                    return (
                        <AssignmentCard
                            key={index}
                            assignmentId={element?._id}
                            title={element?.title}
                            totalStudents={element.totalStudents}
                            submissions={element.submissions}
                            notSubmitted={element.notSubmitted}
                            dueDate={element.dueDate}
                        />
                    )
                }) : "No assignment"}
            </div>
        </div>
    );
};

export default AssignmentComponent;