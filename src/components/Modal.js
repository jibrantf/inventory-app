import React from 'react';
import './styles.css';

const Modal = ({ isOpen, onClose, content, type }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="close-button">Close</button>
                {type === 'pdf' ? (
                    <iframe src={content} width="100%" height="500px" title="PDF Viewer"></iframe>
                ) : (
                    <pre>{content}</pre>
                )}
            </div>
        </div>
    );
};

export default Modal;