import React from 'react';
import Post from '../ui/post';

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
            return <Post key={index} postObj={element}/>
        }) : "No posts"}
        </div>
    );
};

export default PostsComponent;