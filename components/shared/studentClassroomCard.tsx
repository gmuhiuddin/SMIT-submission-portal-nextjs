import Link from 'next/link';
import React from 'react';
import { FaExclamationTriangle, FaClipboardList, FaEdit, FaEye } from 'react-icons/fa';

interface ClassroomCardProps {
    title: string;
    batch: string;
    timing: string;
    days: string;
    lastActivity: string | null;
    hasWarning: boolean;
    hasNewAssignment: boolean;
    classroomId: any;
    teacherName: string;
}

const convertDays = (days: string): string => {
    const daysMap: { [key: string]: string } = {
        'MWF': 'Monday, Wednesday, Friday',
        'TT': 'Tuesday, Thursday',
        'SS': 'Saturday, Sunday',
    };

    return daysMap[days] || days;
};

const convertTime = (time: string): string => {
    const [start, end] = time.split(' - ');

    const convert = (t: string) => {
        const [hour, minute] = t.split(':').map(Number);
        const ampm = hour >= 12 ? 'pm' : 'am';
        const adjustedHour = hour % 12 || 12;
        return `${adjustedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
    };

    return `${convert(start)} - ${convert(end)}`;
};

const ClassroomCard: React.FC<ClassroomCardProps> = ({
    title,
    batch,
    timing,
    days,
    lastActivity,
    hasWarning,
    hasNewAssignment,
    classroomId,
    teacherName,
}) => {

    return (
        <div className="classroom-card shadow-lg rounded-lg p-6 bg-white transition-all duration-300 ease-in-out transform hover:scale-100 hover:shadow-xl h-72 w-96 flex flex-col justify-between">
            <div className="card-header flex flex-col items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600">Batch: {batch}</p>
                <p className="text-sm text-gray-600">Teacher: {teacherName}</p>
                <p className="text-sm text-gray-600">Timing: {convertTime(timing)}</p>
                <p className="text-sm text-gray-600">Days: {convertDays(days)}</p>
            </div>
            <div className="card-buttons flex space-x-2 mb-4">
                <Link href={`/std-class-room/${classroomId}`}>
                    <button
                        className="see-activity-btn flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    >
                        <FaEye className="mr-2" />
                        See Activity
                    </button>
                </Link>
            </div>
            <div className="card-bottom flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="last-activity text-sm text-gray-600">
                    Last Activity: {lastActivity || "null"}
                </div>
                <div className="icons flex space-x-4">
                    {hasWarning && (
                        <FaExclamationTriangle className="text-yellow-500" title="Warning" />
                    )}
                    {hasNewAssignment && (
                        <FaClipboardList className="text-blue-500" title="New Assignment" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassroomCard;