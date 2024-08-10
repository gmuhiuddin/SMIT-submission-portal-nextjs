"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StudentAssignmentCard from "../ui/studentAssignmentCard";
import { getStudentSubmission } from "@/lib/actions/auth/submission";

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
};

const AssignmentComponent: React.FC<AssignmentComponentProps> = ({ assignments }) => {

    const [asgs, setAsgs] = useState<any>(null);

    useEffect(() => {
        if(assignments.length){
            const fetchData = async () => {
                const data = await Promise.all(assignments.map(async (element: any) => {
                    const studentSubmission = await getStudentSubmission(element._id);
    
                    return {
                        ...element,
                        isSubmited: studentSubmission.success ? true : false,
                    };
                }));
    
                setAsgs(data);
            };

            fetchData();
        }else{
            setAsgs([]);
        };

    }, []);
    
    if (!asgs) return <>Loading...</>;

    return (
        <div>
            {asgs.length ? asgs.map((element: any, index: number) => {
                return (
                    <StudentAssignmentCard
                    key={index}
                    astId={element?._id}
                        title={element?.title}
                        description={element?.description}
                        isSubmitted={element?.isSubmited}
                        hasWarning={false}
                    />
                )
            }) : "No assignment"}
        </div>
    );
};

export default AssignmentComponent;