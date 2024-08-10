import React from "react";
import "@/app/(root)/(protected)/assignment/[class_room_id]/style.css";

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    title: string;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, title }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button className="modal-close" 
                    // onClick={onClose}
                    >X</button>
                </div>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;