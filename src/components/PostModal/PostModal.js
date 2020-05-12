import React, { useEffect, useState } from 'react';
import './PostModal.scss';
import Modal from "../Modal/Modal";
import translations from "./translations";
import Comments from "../Comments/Comments";

const PostModal = (props) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {

        },
        []
    );

    const {
        closeFuntion,
        post
    } = props;
    return (
        <Modal
            showOverlay={true}
            overlayClasses='add-post-overlay'
            modalClasses='add-post-modal'
        >
            <div className='add-post-modal__header'>
                <div className='post-modal__header-text'>{post.subject}</div>
                <div className='add-post-modal__header-image' onClick={closeFuntion}/>
            </div>
            <div className='post-modal__context'>
                <div className='post-modal__location'>
                    {`${post.institution}, ${post.country}`}
                </div>
                <div className='post-modal__profession'>
                    {post.profession}
                </div>
                <div className='post-modal__content'>
                    <div className='post-modal__content-post'>{post.content}</div>
                    <Comments containerClass='post-modal__content-comments' postId={post.id}/>
                </div>
                <div className='post-modal__date'>
                    <div className='post-modal__date-icon'/>
                    <div className='post-modal__date-title'>{translations.date}</div>
                    <div className='post-modal__date-text'>{post.date_published}</div>
                </div>
                {
                    post.category ? <div className='post-modal__category'>
                        <div className='post-modal__category-icon'/>
                        <div className='post-modal__category-title'>{translations.category}</div>
                        <div className='post-modal__category-text'>{post.category}</div>
                    </div> : null
                }
            </div>
            <div className='add-post-modal__footer'>
                <div className='add-post-modal__footer-contact'>{translations.contact}</div>
            </div>
        </Modal>
    );
};

export default PostModal;
