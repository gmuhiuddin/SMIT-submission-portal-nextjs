import React from "react";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { getTeacherAssignment } from "@/lib/actions/auth/assignment";

interface Assignment {
    params: {
        class_room_id: string
    }
}

const Assignment: React.FC<Assignment> = async ({ params: { class_room_id } }) => {
    const assignment: any = await getTeacherAssignment(class_room_id);

    if (!assignment?.success) return <p>404</p>;

    return (
        <div className="flex w-screen h-screen pt-16 justify-between p-3">
            <div className="p-3 overflow-y-auto">
                Students
                {assignment.students.map((element: any, index: number) => {
                    return (
                        <div key={index} className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white my-3">
                            <img src={element.image} alt={element.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                            <div>
                                <span className="block text-lg font-semibold">{element.name}  
                                    <button
                                    //   onClick={sendWarningToStudent}
                                    className="text-yellow-500 hover:text-yellow-700"
                                >
                                    <FaExclamationTriangle className="ml-20 w-4 h-4" />
                                </button>
                                    <button
                                        //   onClick={onDelete}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash className="ml-2 w-4 h-4" />
                                    </button>
                                </span>
                                <span className="block text-sm text-gray-500">{element.email}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="">
                Submissions
                {assignment.submissions.length ? assignment.submissions.map((element: any, index: number) => {
                    return (
                        <div key={index} className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white my-3">
                            <img src={element.image} alt={element.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                            <div>
                                <span className="block text-lg font-semibold">{element.name}  
                                    <button
                                    //   onClick={sendWarningToStudent}
                                    className="text-yellow-500 hover:text-yellow-700"
                                >
                                    <FaExclamationTriangle className="ml-20 w-4 h-4" />
                                </button>
                                    <button
                                        //   onClick={onDelete}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash className="ml-2 w-4 h-4" />
                                    </button>
                                </span>
                                <span className="block text-sm text-gray-500">{element.email}</span>
                            </div>
                        </div>
                    )
                }) : "No submissions"}
            </div>
            <div className="p-3 overflow-y-auto bg-black">
                Comments
                {assignment.comments.length ? assignment.comments.map((element: any, index: number) => {
                    return (
                        <div key={index} className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white my-3">
                            <img src={element.image} alt={element.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                            <div>
                                <span className="block text-lg font-semibold">{element.name}  
                                    <button
                                    //   onClick={sendWarningToStudent}
                                    className="text-yellow-500 hover:text-yellow-700"
                                >
                                    <FaExclamationTriangle className="ml-20 w-4 h-4" />
                                </button>
                                    <button
                                        //   onClick={onDelete}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash className="ml-2 w-4 h-4" />
                                    </button>
                                </span>
                                <span className="block text-sm text-gray-500">{element.email}</span>
                            </div>
                        </div>
                    )
                }) : "No comments"}
            </div>
        </div>
    );
};

export default Assignment;