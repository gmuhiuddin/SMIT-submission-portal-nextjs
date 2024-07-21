import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsUp, faFaceSadTear, faFaceLaugh, faFaceAngry } from '@fortawesome/free-solid-svg-icons';
import './style.css'

interface HoverEmojisProps {
    state: React.Dispatch<React.SetStateAction<boolean>>;
    emojeeName: (icon: string) => void;
    emojiChange: (icon: string) => void;
}

const HoverEmojis: React.FC<HoverEmojisProps> = ({ state, emojeeName, emojiChange }) => {

    const iconClicked = (icon: string) => {
        emojiChange(icon);
        
        setTimeout(() => {
            state(false);
        }, 500);
    };

    return (
        <div onMouseEnter={() => {
            state(true);
        }} onMouseLeave={() => {
            setTimeout(() => {
                state(false);
            }, 500);
        }} className='emoji-container'>
            <FontAwesomeIcon
                onClick={() => iconClicked("Heart")}
                className='icon heart-icon' icon={faHeart}
            />
            <FontAwesomeIcon
                onClick={() => iconClicked("Like")}
                className='icon thumbsUp-icon' icon={faThumbsUp}
            />
            <FontAwesomeIcon
                onClick={() => iconClicked("Haha")}
                className='icon laugh-icon' icon={faFaceLaugh}
            />
            <FontAwesomeIcon
                onClick={() => iconClicked("Sad")}
                className='icon sad-icon' icon={faFaceSadTear}
            />
            <FontAwesomeIcon
                onClick={() => iconClicked("Angry")}
                className='icon angry-icon' icon={faFaceAngry}
            />
        </div>
    );
};

export default HoverEmojis;