import React from 'react';
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
    posts: Post[];
}> = ({ posts }) => {

    return (
        <div>
        {posts.length ? posts.map((element, index) => {
            return <PostForTeacher key={index} postObj={element}/>
        }) : "No posts"}
        </div>
    );
};

export default PostsComponent;