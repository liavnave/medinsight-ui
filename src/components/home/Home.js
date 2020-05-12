import React, { useState, useEffect, useContext } from 'react';
import './Home.scss';
import translations from './translations';

import postsService from '../../services/posts.service.js';

import Header from "../header/Header";
import AddButton from "../addButton/AddButton";

import Context from "../../context/Context";

const Home = () => {
    const [latestPosts, setLatestPosts] = useState([]);

    const context = useContext(Context);

    async function getLatestPosts() {
        const result = await postsService.getLatestPosts();
        setLatestPosts(result.data);
    }

    useEffect(() => {
        getLatestPosts();
    }, []);

    const renderLatestPosts = () => {
        return latestPosts.map((post) => {
            return (<div key={post.id} className='home-latest-posts__post'>
                <div
                    className='home-latest-posts__post-title'
                    title={post.subject}
                    onClick={() => {
                        context.openPostModal(post);
                    }}
                >
                    {post.subject.toUpperCase()}
                </div>
                <div className='home-latest-posts__post-text'>{post.content}</div>
                <div className='home-latest-posts__post-footer'>{post.full_name}</div>
            </div>);
        });
    };

    return (
        <div className='home'>
            <Header type='home'/>
            <div className='home-description'>
                <div className='home-description__content'>
                    <div className='home-description__text'>
                        {translations.mainText}
                    </div>
                    <div className='home-description__buttons'>
                        <AddButton classes='home-description__add-button nobreak'/>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon fill="white" points="0,50 100,80 100,100, 0,100"/>
                </svg>
                <div className='header__logo'/>
            </div>
            <div className='home-latest-posts'>
                <div className='home-latest-posts__title'>
                    {translations.latestPosts}
                </div>
                <div className='home-latest-posts__container'>
                    {renderLatestPosts()}
                </div>
            </div>
        </div>
    );
};

export default Home;
