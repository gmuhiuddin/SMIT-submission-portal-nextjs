import React from "react";
import { getTeacherAssignment } from "@/lib/actions/auth/assignment";
import SubmissionFormDisplay from "@/components/shared/submissionFormDisplay";
import StudentToggle from "@/components/shared/studentsToggle";

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
                <StudentToggle students={assignment.students} classRoomId={assignment.classRoom._id} submissions={assignment.submissions} />
            </div>
            <div className="">
                Submissions
                {assignment.submissions.length ? assignment.submissions.map((element: any, index: number) => {

                    return (
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
                    )
                }) : "No submissions"}
            </div>
            <div className="p-3 overflow-y-auto">
                Comments
                {assignment.comments.length ? assignment.comments.map((element: any, index: number) => {
                    return (
                        <div key={index} className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white my-3">
                            <img src={element.student.image} alt={element.student.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                            <div>
                                <span className="block text-lg font-semibold">{element.student.name}
                                </span>
                                <span className="block text-sm text-gray-500">{element.txt}</span>
                            </div>
                        </div>
                    )
                }) : "No comments"}
            </div>
        </div>
    );
};

export default Assignment;