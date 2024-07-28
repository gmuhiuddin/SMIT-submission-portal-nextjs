import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PostForTeacher from '../ui/postForTeacher';

interface ImageUrl {
    url?: string;
    downloadUrl?: string;
    name?: string;
}

interface Post {
    title: string;
    classRoom: string;
    teacher: string;
    __v: number;
    _id: string;
    description: string;
    reactions: string[];
    createdAt: Date;
    updatedAt: Date;
    imageUrls?: ImageUrl[];
    fileUrls?: ImageUrl[];
}

const PostsComponent: React.FC<{
    classRoomId: string | number;
    posts: Post[];
}> = ({ posts, classRoomId }) => {

    return (
        <div>
            <Link href={`/create-post/${classRoomId}`}>
                <Button
                    size="lg"
                    className="mt-24 absolute right-3 top-6 text-white px-4 py-2 rounded-md"
                >
                    Create post
                </Button></Link>
            {posts.length ? posts.map((element, index) => {
                return <PostForTeacher key={index} postObj={element} />
            }) : "No posts"}
        </div>
    );
};

export default PostsComponent;