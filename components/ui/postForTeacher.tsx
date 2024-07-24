"use client";

import ShowMoreTxt from './showMoreTxt';
import React, { useEffect, useState } from 'react';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTrashAlt } from 'react-icons/fa';
import { faThumbsUp, faShareSquare, faComment, faPaperPlane, faHeart, faFaceSadTear, faFaceLaugh, faFaceAngry } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { getComment as getCommentsFromDb } from '@/lib/actions/auth/comment'
import styles from './DownloadableImage.module.css';
import './style.css';
import { deletePost } from '@/lib/actions/auth/post';

interface ImageUrl {
    url?: string;
    downloadUrl?: string;
    name?: string;
}

interface PostObj {
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

interface PostProps {
    postObj: PostObj;
}

interface Comment {
    txt: string;
    post: string;
    student: any;
}

const Post: React.FC<PostProps> = ({ postObj }) => {
console.log(postObj);

    const { data: session, status, update } = useSession({ required: true });
    const user = session?.user;

    const [likes, setLikes] = useState<number>(0);
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [commentSentIsProcessing, setCommentSentIsProcessing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setLikes(postObj.reactions.length);
        getComments();
    }, [postObj]);

    async function getComments() {
        const cmts: {
            success?: string;
            error?: string;
            comments?: string;
        } = await getCommentsFromDb(postObj._id);

        if (cmts?.success) {
            setComments(cmts?.comments && JSON.parse(cmts?.comments) || []);
        } else {
            setErr(cmts?.error || "Something went wrong!");
        };
    };

    const handleDeletePost = async () => {
        const isConfirmDeletePost = confirm("Please confirm you want to delete a post");

        if(isConfirmDeletePost){
            const res = await deletePost(postObj._id as string);

            console.log(res);
        };
    };

    return (
        <div className='post-container'>
            <div className='img-name-container'>
                <h1 className='title-txt'>Title: {postObj.title}</h1>
                <FaTrashAlt size={20} className='mt-3 mr-3 cursor-pointer' onClick={handleDeletePost}/>
                {/* <img className='logo-img' src={postObj.thumbnail} alt='user image' />
                <span className='user-name'>{postObj.brand}</span> */}
            </div>
            <span className='desc-txt'>
                <ShowMoreTxt text={postObj.description} maxLength={65} />
            </span>
            <div style={{ position: 'relative', borderTop: '1px solid black' }}>
                <div className='grid-img-container flex flex-wrap justify-center'>
                    {postObj?.imageUrls?.map(element => {
                        return (
                            <div className={styles.imageContainer}>
                                <img src={element.url} alt={element.name} />
                                <a target="_blank" href={element.downloadUrl} download className={styles.downloadIcon}>
                                    <FontAwesomeIcon icon={faDownload} size="2x" />
                                </a>
                            </div>
                        )
                    })}
                </div>
                <div className='grid-img-container flex flex-wrap justify-center'>
                    {postObj?.fileUrls?.map(element => {
                        return (
                            <div className={styles.fileContainer}>
                                <img src={element.url} alt={element.name} />
                                <a target="_blank" href={element.downloadUrl} download className={styles.downloadIcon}>
                                    <FontAwesomeIcon icon={faDownload} size="2x" />
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
            <br />
            <div className='like-comment-container'>
                <button
                    className="btn-for-show-likes"
                >
                    👍 Like {likes}
                </button>

                <div className='comment-container flex-col'>
                    {comments ? comments.length ? comments.map(element => {
                        return (
                            <div className='p-3 w-full shadow-inner rounded'>
                                <span className='flex items-center'>
                                    <img src={element.student.image} className='rounded-full h-10' />
                                    <p className='ml-3'>{element.student.name}</p>
                                </span>
                                <p className='std-comment-txt'>{element.txt}
                                </p>
                            </div>
                        )
                    }) : "No comments" : "Comments loading"}

                </div>
            </div>
        </div>
    );
};

export default Post;