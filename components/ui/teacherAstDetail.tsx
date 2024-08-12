"use client";

import React, { useState } from "react";
import SubmissionFormDisplay from "@/components/shared/submissionFormDisplay";
import StudentToggle from "@/components/shared/studentsToggle";
import { ExitStudentFromClassroom, sendWarningToStudent } from "@/lib/actions/auth/student";
import { FaExclamationTriangle, FaTrash } from "react-icons/fa";
import Modal from "@/components/ui/modal";
import "./style.css";
import CustomAlert from "./customAlert";

interface Assignment {
    assignment: any;
}

const TeacherAssignmentDetail: React.FC<Assignment> = ({ assignment }) => {
    const [showAllStudents, setShowAllStudents] = useState(false);
    const [showAllComments, setShowAllComments] = useState(false);

    const limitedStudents = assignment.students.slice(0, 3);
    const limitedComments = assignment.comments.slice(0, 3);

    const [success, setSuccess] = useState<string>("");
    const [err, setErr] = useState<string>("");

    const sendWarnToStudent = async (_id: any) => {
        setErr("");
        setSuccess("");

        const res = await sendWarningToStudent(_id, assignment.assignment.classRoom);

        if (res.success) {
            setSuccess(res.success as string);
        } else {
            setErr(res.error as string);
        };
    };

    const removeStdFromClassRoom = async (_id: any) => {
        setErr("");
        setSuccess("");

        const res = await ExitStudentFromClassroom(_id, assignment.assignment.classRoom);

        if (res.success) {
            setSuccess(res.success as string);
        } else {
            setErr(res.error as string);
        };
    };

    // return (
    //     <div className="assignment-main-container flex flex-col md:flex-row w-full pt-1 justify-between p-3">
    //         {/* Students Component */}
    //         <div className="md:w-4/12 w-full p-3 overflow-y-auto bg-gray-100 md:bg-transparent">
    //             <h2 className="text-lg font-semibold mb-3">Students</h2>
    //             {!showAllStudents && limitedStudents.map((student: any, index: number) => (
    //                 <div key={index} className="flex items-center p-2 border border-gray-300 rounded-lg shadow-md bg-white my-2 w-full">
    //                     <img src={student.image} alt={student.name} className="w-10 h-10 rounded-full object-cover mr-3" />
    //                     <div className="w-9/12 break-words">
    //                         <span className="block text-md font-semibold">{student.name}
    //                             <button
    //                             onClick={() => sendWarnToStudent(student?._id)}
    //                             className="text-yellow-500 hover:text-yellow-700"
    //                         >
    //                             <FaExclamationTriangle className="ml-2 w-4 h-4" />
    //                         </button>
    //                             <button
    //                                 onClick={() => removeStdFromClassRoom(student?._id)}
    //                                 className="text-red-500 hover:text-red-700"
    //                             >
    //                                 <FaTrash className="ml-2 w-4 h-4" />
    //                             </button>
    //                         </span>
    //                         <span className="block w-full text-sm text-gray-500 break-words">{student.email}</span>
    //                     </div>
    //                 </div>
    //             ))}
    //             {showAllStudents && <StudentToggle students={assignment.students} classRoomId={assignment.classRoom._id} submissions={assignment.submissions} />}
    //             {!showAllStudents && assignment.students.length > 3 && (
    //                 <button className="text-blue-500 underline mt-2" onClick={() => setShowAllStudents(true)}>Show More Students</button>
    //             )}
    //         </div>

    //         {/* Submissions Component */}
    //         <div className="md:w-6/12 w-full p-3">
    //             <h2 className="text-lg font-semibold mb-3">Submissions</h2>
    //             {assignment.submissions.length ? assignment.submissions.map((element: any, index: number) => (
    //                 <div key={index} className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white my-3">
    //                     <div>
    //                         <span className="flex text-lg font-semibold">
    //                             <img src={element.student.image} alt={element.student.name} className="w-12 h-12 rounded-full object-cover mr-3" />
    //                             {element.student.name}
    //                         </span>
    //                         <span className="block text-sm text-gray-500 mt-1">
    //                             <SubmissionFormDisplay fields={assignment.assignment.formFields} sumbissionFields={element.formFieldsReply} />
    //                         </span>
    //                     </div>
    //                 </div>
    //             )) : "No submissions"}
    //         </div>

    //         {/* Comments Component */}
    //         <div className="md:w-3/12 w-full p-3 overflow-y-auto max-h-9/12 bg-gray-100 md:bg-transparent">
    //             <h2 className="text-lg font-semibold mb-3">Comments</h2>
    //             {!showAllComments && limitedComments.map((comment: any, index: number) => (
    //                 <div key={index} className="flex items-center p-2 border border-gray-300 rounded-lg shadow-md bg-white my-2 w-full">
    //                     <img src={comment.student.image} alt={comment.student.name} className="w-10 h-10 rounded-full object-cover mr-3" />
    //                     <div className="w-9/12 break-words">
    //                         <span className="block text-md font-semibold">{comment.student.name}</span>
    //                         <span className="block w-full text-sm text-gray-500 break-words">{comment.txt}</span>
    //                     </div>
    //                 </div>
    //             ))}
    //             {showAllComments && assignment.comments.map((comment: any, index: number) => (
    //                 <div key={index} className="flex items-center p-2 border border-gray-300 rounded-lg shadow-md bg-white my-2 w-full">
    //                     <img src={comment.student.image} alt={comment.student.name} className="w-10 h-10 rounded-full object-cover mr-3" />
    //                     <div className="w-9/12 break-words">
    //                         <span className="block text-md font-semibold">{comment.student.name}</span>
    //                         <span className="block w-full text-sm text-gray-500 break-words">{comment.txt}</span>
    //                     </div>
    //                 </div>
    //             ))}
    //             {!showAllComments && assignment.comments.length > 3 && (
    //                 <button className="text-blue-500 underline mt-2" onClick={() => setShowAllComments(true)}>Show More Comments</button>
    //             )}
    //         </div>

    //         {/* Student Modal */}
    //         <Modal isOpen={isStudentModalOpen} onClose={() => setIsStudentModalOpen(false)} title="Students">
    //             <StudentToggle students={assignment.students} classRoomId={assignment.classRoom._id} submissions={assignment.submissions} />
    //         </Modal>

    //         {/* Comment Modal */}
    //         <Modal isOpen={isCommentModalOpen} onClose={() => setIsCommentModalOpen(false)} title="Comments">
    //             {assignment.comments.length ? assignment.comments.map((element: any, index: number) => (
    //                 <div key={index} className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white my-3 w-full">
    //                     <img src={element.student.image} alt={element.student.name} className="w-12 h-12 rounded-full object-cover mr-4" />
    //                     <div className="w-9/12 break-words">
    //                         <span className="block text-lg font-semibold">{element.student.name}</span>
    //                         <span className="block w-full text-sm text-gray-500 break-words">{element.txt}</span>
    //                     </div>
    //                 </div>
    //             )) : "No comments"}
    //         </Modal>
    //     </div>
    // );
    return (
        <div className="assignment-main-container flex flex-col md:flex-row w-full pt-1 justify-between p-3">
            {/* Students Component */}
            <div className="md:w-4/12 w-full p-3 overflow-y-auto bg-gray-100 md:bg-transparent order-2 md:order-1">
                <h2 className="text-lg font-semibold mb-3">Students</h2>
                {!showAllStudents ? 
                <StudentToggle students={limitedStudents} classRoomId={assignment.classRoom._id} submissions={assignment.submissions} />
                // limitedStudents.map((student: any, index: number) => (
                //     <div key={index} className="flex items-center p-2 border border-gray-300 rounded-lg shadow-md bg-white my-2 w-full">
                //         <img src={student.image} alt={student.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                //         <div className="w-9/12 break-words">
                //             <span className="block text-md font-semibold">{student.name}
                //                 <button
                //                     onClick={() => sendWarnToStudent(student?._id)}
                //                     className="text-yellow-500 hover:text-yellow-700"
                //                 >
                //                     <FaExclamationTriangle className="ml-2 w-4 h-4" />
                //                 </button>
                //                 <button
                //                     onClick={() => removeStdFromClassRoom(student?._id)}
                //                     className="text-red-500 hover:text-red-700"
                //                 >
                //                     <FaTrash className="ml-2 w-4 h-4" />
                //                 </button>
                //             </span>
                //             <span className="block w-full text-sm text-gray-500 break-words">{student.email}</span>
                //         </div>
                //     </div>
                // ))
                : showAllStudents && <StudentToggle students={assignment.students} classRoomId={assignment.classRoom._id} submissions={assignment.submissions} />}
                {!showAllStudents && assignment.students.length > 3 && (
                    <button className="text-blue-500 underline mt-2" onClick={() => setShowAllStudents(true)}>Show More Students</button>
                )}
                {showAllStudents && assignment.students.length > 3 && (
                    <button className="text-blue-500 underline mt-2" onClick={() => setShowAllStudents(false)}>Show Less Students</button>
                )}
            </div>

            {/* Submissions Component */}
            <div className="md:w-6/12 w-full p-3 order-1 md:order-2">
                <h2 className="text-lg font-semibold mb-3">Submissions</h2>
                {assignment.submissions.length ? assignment.submissions.map((element: any, index: number) => (
                    <div key={index} className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white my-3">
                        <div>
                            <span className="flex text-lg font-semibold">
                                <img src={element.student.image} alt={element.student.name} className="w-12 h-12 rounded-full object-cover mr-3" />
                                {element.student.name}
                            </span>
                            <span className="block text-sm text-gray-500 mt-1">
                                <SubmissionFormDisplay fields={assignment.assignment.formFields} sumbissionFields={element.formFieldsReply} />
                            </span>
                        </div>
                    </div>
                )) : "No submissions"}
            </div>

            {/* Comments Component */}
            <div className="md:w-3/12 w-full p-3 overflow-y-auto max-h-9/12 bg-gray-100 md:bg-transparent order-3">
                <h2 className="text-lg font-semibold mb-3">Comments</h2>
                {!showAllComments && limitedComments.map((comment: any, index: number) => (
                    <div key={index} className="flex items-center p-2 border border-gray-300 rounded-lg shadow-md bg-white my-2 w-full">
                        <img src={comment.student.image} alt={comment.student.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                        <div className="w-9/12 break-words">
                            <span className="block text-md font-semibold">{comment.student.name}</span>
                            <span className="block w-full text-sm text-gray-500 break-words">{comment.txt}</span>
                        </div>
                    </div>
                ))}
                {showAllComments && assignment.comments.map((comment: any, index: number) => (
                    <div key={index} className="flex items-center p-2 border border-gray-300 rounded-lg shadow-md bg-white my-2 w-full">
                        <img src={comment.student.image} alt={comment.student.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                        <div className="w-9/12 break-words">
                            <span className="block text-md font-semibold">{comment.student.name}</span>
                            <span className="block w-full text-sm text-gray-500 break-words">{comment.txt}</span>
                        </div>
                    </div>
                ))}
                {!showAllComments && assignment.comments.length > 3 && (
                    <button className="text-blue-500 underline mt-2" onClick={() => setShowAllComments(true)}>Show More Comments</button>
                )}
                {showAllComments && assignment.comments.length > 3 && (
                    <button className="text-blue-500 underline mt-2" onClick={() => setShowAllComments(false)}>Show Less Comments</button>
                )}
            </div>
            {success && <CustomAlert txt={success} isErrMsg={false} />}
            {err && <CustomAlert txt={err} isErrMsg={true} />}
        </div>
    )
};

export default TeacherAssignmentDetail;