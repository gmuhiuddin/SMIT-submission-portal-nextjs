import { getTeacherAssignments } from '@/lib/actions/auth/assignment';
import { getStudentClassroom } from '@/lib/actions/auth/classRoom';
import React from 'react';
import { currentUser } from '@/lib/session';
import TabsComponent from '@/components/ui/tabsComponent';
import AssignmentsComponent from '@/components/shared/assignmentsComponent';
import PostsComponent from '@/components/shared/postsComponent';
import "./style.css";

interface ClassRoomId {
    class_room_id: string | number;
}

interface ClassRoomInterface {
    params: ClassRoomId;
}

const ClassRoom: React.FC<ClassRoomInterface> = async ({ params: { class_room_id } }) => {

    const user = await currentUser();

    const classRoom = await getStudentClassroom(class_room_id);

    if (!classRoom?.success) return <p>404</p>;

    const tabs = [
        { label: 'Assignments', content: <AssignmentsComponent assignments={classRoom.assignments} />, textColor: '#007B83' },
        { label: 'Posts', content:  <PostsComponent posts={classRoom.posts} />, textColor: '#007B83' },
      ];

    return (
        <div className="flex class-room-container">
        <TabsComponent tabs={tabs} />

            {/* <div className='grow'>
                Posts
                {classRoom?.posts?.map((element, index) => {
                    return (    
                        <p key={index}>{element?.title}</p>
                    );
                })}
            </div>
            <div className='grow'>
                Class room
                {classRoom?.assignments?.map((element, index) => {
                    return (
                        <p key={index}>{element?.title}</p>
                    );
                })}
            </div> */}

        </div>
    );
};

export default ClassRoom;