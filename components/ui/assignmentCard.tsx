import Link from 'next/link';
import React from 'react';

interface AssignmentCardProps {
    title: string;
    totalStudents: number;
    submissions: number;
    notSubmitted: number;
    dueDate: string;
    assignmentId: number | string;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ title, totalStudents, submissions, notSubmitted, dueDate, assignmentId }) => {
    return (
        <div className="w-full h-auto bg-white shadow-md rounded-lg flex flex-col p-4 mb-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">{title}</h2>
                <Link href={`/assignment/${assignmentId}`}>
                    <button className="text-blue-500 hover:text-blue-700 font-semibold bg-transparent border border-blue-500 hover:bg-blue-50 px-3 py-1 rounded transition">
                        See Activity
                    </button>
                </Link>
            </div>
            <div className="flex-1 flex items-center justify-between text-sm md:text-base text-gray-700 mt-2">
                <div>
                    <p>Total Students: <span className="font-semibold">{totalStudents}</span></p>
                </div>
                <div>
                    <p>Submissions: <span className="font-semibold text-green-600">{submissions}</span></p>
                </div>
                <div>
                    <p>Not Submitted: <span className="font-semibold text-red-600">{notSubmitted}</span></p>
                </div>
                <div>
                    <p>Due Date: <span className="font-semibold">{dueDate}</span></p>
                </div>
            </div>
        </div>
    );
};

export default AssignmentCard;
