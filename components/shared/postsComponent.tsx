import React from 'react';
import Post from '../ui/post';

interface Post {
    title: string;
    description: string;
    imageUrls?: string;
    fileUrls?: string;
    classRoom: string;
}

const PostsComponent: React.FC<{
    posts: Post[];
}> = ({ posts }) => {
    
    return (
        <div 
        //  className='main-container'
        >
        {posts.map((element, index) => {
            return <Post key={index} postObj={element}/>
        })}
        </div>
    );
};

export default PostsComponent;