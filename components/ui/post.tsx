"use client";

import ShowMoreTxt from '../ui/showMoreTxt';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShareSquare, faComment, faPaperPlane, faHeart, faFaceSadTear, faFaceLaugh, faFaceAngry } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { likePost, disLikePost } from '@/lib/actions/auth/post';
import { useSession } from 'next-auth/react';
import { sendComment } from '@/lib/actions/auth/comment';

interface Reaction {
    icon: string;
    studentId: string;
}

interface PostObj {
    title: string;
    // brand: string;
    _id: string;
    description: string;
    reactions: Reaction[];
    // images: string[];
}

interface FbPostsProps {
    postObj: PostObj;
}

const Post: React.FC<FbPostsProps> = ({ postObj }) => {
    const { data: session, status, update } = useSession({ required: true });
    const user = session?.user;

    const images = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Dw7-4lVfRq74_YEiPEt4e-bQ0_6UA2y73Q&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Dw7-4lVfRq74_YEiPEt4e-bQ0_6UA2y73Q&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Dw7-4lVfRq74_YEiPEt4e-bQ0_6UA2y73Q&s"];
    const [isLiked, setIsLiked] = useState(false);
    const [likeBtnIsProcessing, setLikeBtnIsProcessing] = useState(false);
    const [commentSentIsProcessing, setCommentSentIsProcessing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState('');

    const likeBtnWasLiked = async () => {
        setLikeBtnIsProcessing(true);

        if (isLiked) {
            const res = await disLikePost({
                studentId: user?._id as string,
                _id: postObj._id
            });

            if (res.success) {
                setIsLiked(!isLiked);
                setLikeBtnIsProcessing(false);
            } else {
                setErr(res.error || "Some thing went wrong!");
                setLikeBtnIsProcessing(false);
            };
        } else {
            const res = await likePost({
                studentId: user?._id as string,
                _id: postObj._id
            });

            if (res.success) {
                setIsLiked(!isLiked);
                setLikeBtnIsProcessing(false);
            } else {
                setErr(res.error || "Some thing went wrong!");
                setLikeBtnIsProcessing(false);
            };
        };

    };

    useEffect(() => {
        const isLikedFromDb = postObj.reactions.includes(user?._id);

        if (isLikedFromDb) {
            setIsLiked(true)
        } else {
            setIsLiked(false);
        };
    }, []);

    const handleSendComment = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErr("");
        setSuccess("");
        setCommentSentIsProcessing(true);

        const res: {
            success?: string;
            error?: string;
        } = await sendComment({
            txt: inputValue,
            studentId: user?._id as string,
            postId: postObj?._id as string,
        });
        
        if (res?.success) {
            setSuccess("Comment sent successfully");
            setInputValue("");
            setCommentSentIsProcessing(false);
        } else {
            setErr(res?.error || "Something went wrong!");
            setCommentSentIsProcessing(false);
        };
    };

    return (
        <div className='post-container'>
            <div className='img-name-container'>
                {/* <img className='logo-img' src={postObj.thumbnail} alt='user image' />
                <span className='user-name'>{postObj.brand}</span> */}
            </div>
            <span className='desc-txt'>
                <ShowMoreTxt text={postObj.description} maxLength={65} />
            </span>
            <div style={{ position: 'relative', borderTop: '1px solid black' }}>
                <div className='grid-img-container flex flex-wrap justify-center'>
                    {images.map(element => <img className='m-1' src={element} />)}
                </div>
            </div>
            <br />
            <div className='icon-container'>
                {likeBtnIsProcessing
                    ?
                    <div className="btn_spinner_container">
                        <div className="btn_spinner"></div>
                    </div>
                    :
                    <button
                        className={isLiked ? "liked_button" : "like_button"}
                        onClick={likeBtnWasLiked}
                    >
                        👍 Like
                    </button>
                }

                <div className='txt-input-container'>
                    <form onSubmit={handleSendComment}>
                        <input required onChange={(e) => setInputValue(e.target.value)} value={inputValue} placeholder='Write a comment...' type='text' className='user-comment-txt' />
                        <input style={{ display: 'none' }} id='submit-btn' type='submit' />
                        {commentSentIsProcessing
                            ?
                            <div className='btn_spinner_container'>
                                <div className="btn_spinner"></div>
                            </div>
                            :
                            <label htmlFor='submit-btn' className='send-btn'>Send</label>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Post;