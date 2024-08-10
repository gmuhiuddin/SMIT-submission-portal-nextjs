// import React from "react";
// import { getTeacherAssignment } from "@/lib/actions/auth/assignment";
// import SubmissionFormDisplay from "@/components/shared/submissionFormDisplay";
// import StudentToggle from "@/components/shared/studentsToggle";
// import SideBar from "@/components/ui/SideBar";

// interface Assignment {
//     params: {
//         class_room_id: string
//     }
// }

// const Assignment: React.FC<Assignment> = async ({ params: { class_room_id } }) => {
//     const assignment: any = await getTeacherAssignment(class_room_id);

//     if (!assignment?.success) return <p>404</p>;

//     return (
//         <div className="flex w-screen h-screen pt-16 justify-between p-3">
//             <div className="p-3 overflow-y-auto">
//                 Students
//                 <StudentToggle students={assignment.students} classRoomId={assignment.classRoom._id} submissions={assignment.submissions} />
//             </div>
//             <div className="">
//                 Submissions
//                 {assignment.submissions.length ? assignment.submissions.map((element: any, index: number) => {

//                     return (
//                         <div key={index} className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white my-3">
//                             <div>
//                                 <span className="flex text-lg font-semibold">
//                                     <img src={element.student.image} alt={element.student.name} className="w-12 h-12 rounded-full object-cover mr-3" />
//                                     {element.student.name}
//                                 </span>
//                                 <span className="block text-sm text-gray-500 mt-1">
//                                     <SubmissionFormDisplay fields={assignment.assignment.formFields} sumbissionFields={element.formFieldsReply} />
//                                 </span>
//                             </div>
//                         </div>
//                     )
//                 }) : "No submissions"}
//             </div>
//             <div className="p-3 overflow-y-auto">
//                 Comments
//                 {assignment.comments.length ? assignment.comments.map((element: any, index: number) => {
//                     return (
//                         <div key={index} className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white my-3">
//                             <img src={element.student.image} alt={element.student.name} className="w-12 h-12 rounded-full object-cover mr-4" />
//                             <div>
//                                 <span className="block text-lg font-semibold">{element.student.name}
//                                 </span>
//                                 <span className="block text-sm text-gray-500">{element.txt}</span>
//                             </div>
//                         </div>
//                     )
//                 }) : "No comments"}
//             </div>
//         </div>
//     );
// };

// export default Assignment;

import React from "react";
import { getTeacherAssignment } from "@/lib/actions/auth/assignment";
import Modal from "@/components/ui/modal";
import SubmissionFormDisplay from "@/components/shared/submissionFormDisplay";
import StudentToggle from "@/components/shared/studentsToggle";
import "./style.css";
import TeacherAssignmentDetail from "@/components/ui/teacherAstDetail";

interface Assignment {
    params: {
        class_room_id: string
    }
}

const Assignment: React.FC<Assignment> = async ({ params: { class_room_id } }) => {
    const assignment: any = await getTeacherAssignment(class_room_id);

    if (!assignment?.success) return <p>404</p>;

    return (
        <TeacherAssignmentDetail assignment={assignment}/>
    );
    // return (
    //     // <div className="assignment-main-container flex flex-col md:flex-row w-full pt-1 justify-between p-3">
    //     //     {/* Students Component */}
    //     //     <div className="md:w-4/12 w-full p-3 overflow-y-auto bg-gray-100 md:bg-transparent">
    //     //         <h2 className="text-lg font-semibold mb-3">Students</h2>
    //     //         <StudentToggle students={assignment.students} classRoomId={assignment.classRoom._id} submissions={assignment.submissions} />
    //     //     </div>

    //     //     {/* Submissions Component */}
    //     //     <div className="md:w-6/12 w-full p-3">
    //     //         <h2 className="text-lg font-semibold mb-3">Submissions</h2>
    //     //         {assignment.submissions.length ? assignment.submissions.map((element: any, index: number) => (
    //     //             <div key={index} className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white my-3">
    //     //                 <div>
    //     //                     <span className="flex text-lg font-semibold">
    //     //                         <img src={element.student.image} alt={element.student.name} className="w-12 h-12 rounded-full object-cover mr-3" />
    //     //                         {element.student.name}
    //     //                     </span>
    //     //                     <span className="block text-sm text-gray-500 mt-1">
    //     //                         <SubmissionFormDisplay fields={assignment.assignment.formFields} sumbissionFields={element.formFieldsReply} />
    //     //                     </span>
    //     //                 </div>
    //     //             </div>
    //     //         )) : "No submissions"}
    //     //     </div>

    //     //     {/* Comments Component */}
    //     //     <div className="md:w-3/12 w-full p-3 overflow-y-auto max-h-9/12 bg-gray-100 md:bg-transparent">
    //     //         <h2 className="text-lg font-semibold mb-3">Comments</h2>
    //     //         {assignment.comments.length ? assignment.comments.map((element: any, index: number) => (
    //     //             <div key={index} className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white my-3 w-full">
    //     //                 <img src={element.student.image} alt={element.student.name} className="w-12 h-12 rounded-full object-cover mr-4" />
    //     //                 <div className="w-9/12 break-words">
    //     //                     <span className="block text-lg font-semibold">{element.student.name}</span>
    //     //                     <span className="block w-full text-sm text-gray-500 break-words">{element.txt}</span>
    //     //                 </div>
    //     //             </div>
    //     //         )) : "No comments"}
    //     //     </div>
    //     // </div>
    //     <div className="assignment-main-container flex flex-col md:flex-row w-full pt-1 justify-between p-3 h-full">
    //         {/* Students Component */}
    //         <div className="md:w-4/12 w-full p-3 overflow-y-auto bg-gray-100 md:bg-transparent">
    //             <h2 className="text-lg font-semibold mb-3">Students</h2>
    //             <button className="md:hidden block"
    //             // onClick={() => setIsStudentModalOpen(true)}
    //             >Show Students</button>
    //             <StudentToggle students={assignment.students} classRoomId={assignment.classRoom._id} submissions={assignment.submissions} />
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
    //             <button className="md:hidden block"
    //             // onClick={() => setIsCommentModalOpen(true)}
    //             >Show Comments</button>
    //             {assignment.comments.length ? assignment.comments.map((element: any, index: number) => (
    //                 <div key={index} className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white my-3 w-full">
    //                     <img src={element.student.image} alt={element.student.name} className="w-12 h-12 rounded-full object-cover mr-4" />
    //                     <div className="w-9/12 break-words">
    //                         <span className="block text-lg font-semibold">{element.student.name}</span>
    //                         <span className="block w-full text-sm text-gray-500 break-words">{element.txt}</span>
    //                     </div>
    //                 </div>
    //             )) : "No comments"}
    //         </div>

    //         {/* Student Modal */}
    //         <Modal isOpen={false}
    //             // onClose={() => setIsStudentModalOpen(false)}
    //             title="Students">
    //             <StudentToggle students={assignment.students} classRoomId={assignment.classRoom._id} submissions={assignment.submissions} />
    //         </Modal>

    //         {/* Comment Modal */}
    //         <Modal isOpen={false}
    //             //  onClose={() => setIsCommentModalOpen(false)}
    //             title="Comments">
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
};

export default Assignment;