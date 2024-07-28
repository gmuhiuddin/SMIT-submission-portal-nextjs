import React from 'react';
import { currentUser } from '@/lib/session';
import { getTeacherAssignments } from '@/lib/actions/auth/assignment';
import { getTeacherClassroom } from '@/lib/actions/auth/classRoom';
import TabsComponent from '@/components/ui/tabsComponent';
import TeacherAssignmentsComponent from '@/components/shared/TeacherAssignmentsComponent';
import TeacherPostsComponent from '@/components/shared/TeacherPostsComponent';
import './style.css'

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

const ClassRoom: React.FC<ClassRoomInterface> = async ({ params: { class_room_id } }) => {

    const user = await currentUser();

    const classRoom = await getTeacherClassroom(class_room_id);
    if (!classRoom?.success) return <p>404</p>;
    const assignments = await getTeacherAssignments(class_room_id);
    
    const tabs = [
        { label: 'Assignments', content: <TeacherAssignmentsComponent asisgnments={assignments?.assignments} classRoomId={class_room_id} />, textColor: '#007B83' },
        { label: 'Posts', content:  <TeacherPostsComponent posts={classRoom.posts} classRoomId={class_room_id} />, textColor: '#007B83' },
      ];

    return (
        <div className='flex class-room-container'>
            <TabsComponent tabs={tabs} />
        </div>
    )
};

export default ClassRoom;