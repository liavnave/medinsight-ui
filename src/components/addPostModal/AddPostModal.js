import React from 'react';
import './AddPostModal.scss';
import Modal from "../Modal/Modal";
import translations from "./translations";
import TextInput from "../textInput/TextInput";

import postsService from "../../services/posts.service";

const addPostModal = (props) => {
    const closeFuntion = props.closeFuntion;

    const getInputValue = (id) => {
        return document.getElementById(id).value;
    };

    const handlePublishClick = async () => {
        const fullName = getInputValue('addPostFullName');
        const email = getInputValue('addPostEmail');
        const profession = getInputValue('addPostProfession');
        const institution = getInputValue('addPostInstitution');
        const country = getInputValue('addPostCountry');
        const subject = getInputValue('addPostSubject');
        const category = getInputValue('addPostCategory');
        const content = getInputValue('addPostText');

        const data = {
            'full_name': fullName,
            email,
            profession,
            institution,
            country,
            subject,
            content,
            category
        };
        await postsService.addPost(data);
        closeFuntion();
    };
    return (
        <Modal
            showOverlay={true}
            overlayClasses='add-post-overlay'
            modalClasses='add-post-modal'
        >
            <div className='add-post-modal__header'>
                <div className='add-post-modal__header-text'>{translations.title}</div>
                <div className='add-post-modal__header-image' onClick={closeFuntion}/>
            </div>
            <div className='add-post-modal__context'>
                <div className='add-post-modal__context-left'>
                    <TextInput id='addPostFullName' title={translations.fullName}/>
                    <TextInput id='addPostEmail' title={translations.email}/>
                    <TextInput id='addPostProfession' title={translations.profession}/>
                    <TextInput id='addPostInstitution' title={translations.institution}/>
                    <TextInput id='addPostCountry' title={translations.postCountry}/>
                    <TextInput id='addPostCategory' title={translations.postCategory}/>
                </div>
                <div className='add-post-modal__context-divider'/>
                <div className='add-post-modal__context-right'>
                    <TextInput id='addPostSubject' title={translations.postTitle}/>
                    <TextInput id='addPostText' type='textarea' title={translations.postText}/>
                </div>
            </div>
            <div className='add-post-modal__footer'>
                <div className='add-post-modal__footer-publish' onClick={handlePublishClick}>{translations.publish}</div>
            </div>
        </Modal>
    );
};

export default addPostModal;
