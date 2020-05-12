import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './App.scss';

import Home from "./components/home/Home";
import Bank from "./components/bank/Bank";

import Context from "./context/Context";
import PostModal from "./components/PostModal/PostModal";
import AddPostModal from "./components/addPostModal/AddPostModal";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
    const [isShowAddPostModal, setIsShowAddPostModal] = useState(false);
    const [isShowPostModal, setIsShowPostModal] = useState(false);
    const [activePost, setActivePost] = useState();

    const openPostModal = (post) => {
        setActivePost(post);
        setIsShowPostModal(true);
    };

    const openAddPostModal = () => {
        setIsShowAddPostModal(true);
    };

    const closePostModal = () => {
        setIsShowPostModal(false);
    };

    const closeAddPostModal = () => {
        setIsShowAddPostModal(false);
    };

    return (
        <Context.Provider value={
            {
                openPostModal,
                openAddPostModal,
                closePostModal,
                closeAddPostModal,
                isShowPostModal,
                isShowAddPostModal,
                activePost
            }
        }>
            <div className="app">
                {
                    isShowPostModal ?
                        <PostModal closeFuntion={closePostModal} post={activePost}/> :
                        null
                }
                {
                    isShowAddPostModal ?
                        <AddPostModal closeFuntion={closeAddPostModal}/> :
                        null
                }
                <Router>
                    <Switch>
                        <Route path='/knowledgebank'>
                            <Bank/>
                        </Route>
                        <Route path='/dashboard'>
                            <Dashboard/>
                        </Route>
                        <Route exact path='/'>
                            <Home/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </Context.Provider>
    );
};

export default App;
