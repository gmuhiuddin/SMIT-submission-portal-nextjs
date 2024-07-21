"use client";

import ShowMoreTxt from '../ui/showMoreTxt';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShareSquare, faComment, faPaperPlane, faHeart, faFaceSadTear, faFaceLaugh, faFaceAngry } from '@fortawesome/free-solid-svg-icons';
import HoverEmojis from '../ui/hover-emoji';
import './style.css';
import { reactPost } from '@/lib/actions/auth/post';
import { auth } from '@/auth';
import { useSession } from 'next-auth/react';

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
    console.log(postObj);

    const { data: session, status, update } = useSession({ required: true });
    const user = session?.user;

    const images = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Dw7-4lVfRq74_YEiPEt4e-bQ0_6UA2y73Q&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Dw7-4lVfRq74_YEiPEt4e-bQ0_6UA2y73Q&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Dw7-4lVfRq74_YEiPEt4e-bQ0_6UA2y73Q&s"];
    const [isLiked, setIsLiked] = useState(false);
    const [emoji, setEmoji] = useState(false);
    const [emojiName, setEmojiName] = useState<string>('');
    const [inputValue, setInputValue] = useState('');
    const [err, setErr] = useState('');

    const likeBtnClicked = async () => {

        const res = await reactPost({
            studentId: user?._id as string,
            icon: "thumbs",
            _id: postObj._id
        });

        if (res.success) {
            setIsLiked(!isLiked);
        } else {
            setErr(res.error || "Some thing went wrong!");
        };

        setEmoji(false);
    };

    const emojiChange = async (icon: string) => {
        // setIsLiked(!isLiked);

        const res = await reactPost({
            studentId: user?._id as string,
            icon: icon,
            _id: postObj._id
        });

        if (res.success) {
            setEmojiName(icon);
        } else {
            setErr(res.error || "Some thing went wrong!");
        };
    };

    useEffect(() => {
        const isLikedFromDb = postObj.reactions.find(element => element.studentId == user?._id);

        if (isLikedFromDb) {
            isLikedFromDb?.icon == "thumbs" ?
                setIsLiked(true)
                :
                setEmojiName(isLikedFromDb.icon);
        } else {
            setIsLiked(false);
        };
    }, []);

    const handleSendComment = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(inputValue);
    };

    let emojiIcon: any;

    if (emojiName == "Heart") {
        emojiIcon = faHeart;
    } else if (emojiName == "Sad") {
        emojiIcon = faFaceSadTear;
    } else if (emojiName == "Angry") {
        emojiIcon = faFaceAngry;
    } else if (emojiName == "Haha") {
        emojiIcon = faFaceLaugh;
    } else if (emojiName == "Like") {
        emojiIcon = faThumbsUp;
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
                {emoji && <HoverEmojis emojeeName={setEmojiName} emojiChange={emojiChange} state={setEmoji} />}
            </div>
            <br />
            <div className='icon-container'>
                <div
                    onMouseEnter={() => {
                        setTimeout(() => {
                            setEmoji(true);
                        }, 700);
                    }}
                    className='like-icon'
                    onClick={likeBtnClicked}
                >
                    {emojiName ? <span className='txt'>
                        <FontAwesomeIcon className='like-beside-icon heart-icon' icon={emojiIcon} />
                        {emojiName}
                    </span> : <span className='txt'><FontAwesomeIcon className={!isLiked ? 'like-img' : 'liked-img'} icon={faThumbsUp} /> Like</span>}
                </div>

                <div className='txt-input-container'>
                    <form onSubmit={handleSendComment}>
                        <input required onChange={(e) => setInputValue(e.target.value)} value={inputValue} placeholder='Write a comment...' type='text' className='user-comment-txt' />
                        <input style={{ display: 'none' }} id='submit-btn' type='submit' />
                        <label onClick={() => setInputValue('')} htmlFor='submit-btn'><FontAwesomeIcon className='comment-btn cursor-pointer' icon={faPaperPlane} /></label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Post;