import { getTeacherAssignments } from '@/lib/actions/auth/assignment';
import { getTeacherClassroom } from '@/lib/actions/auth/classRoom';
import React from 'react';
import { currentUser } from '@/lib/session';

interface ClassRoomId {
    class_room_id: string | number;
}

interface ClassRoomInterface {
    params: ClassRoomId;
}

interface Assignment {
    _id: string;
    teacher: string;
    classRoom: string;
    dueDate: string;
    title: string;
    description: string;
    webScrnShot: string;
    content: string;
}

interface AssignmentsRes {
    success?: string;
    error?: string;
    assignments?: Assignment[];
}

const ClassRoom: React.FC<ClassRoomInterface> = async ({params: { class_room_id }}) => {

    const user = await currentUser();
    
    const classRoom = await getTeacherClassroom(class_room_id);
    if(!classRoom?.success) return <p>404</p>;
    const assignments = await getTeacherAssignments(class_room_id);
    
    return (
        <div>
            {classRoom?.students?.map(element => {
                return (
                    <p>{element.name}</p>
                );
            })}
            Class room
            {assignments?.assignments?.map((element, index) => {
                return (
                    <p key={index}>{element?.title}</p>
                );
            })}
        </div>
    )
};

export default ClassRoom;