import React, { useEffect, useState, useContext } from 'react';
import './Bank.scss';

import Header from "../header/Header";
import { Table } from 'react-fluid-table';

import translations from './translations'
import postsService from "../../services/posts.service";

import Context from '../../context/Context';

const Bank = () => {
    const [posts, setPosts] = useState([]);
    const context = useContext(Context);
    const renderCell = ({row}) => {
        return (
            <div
                className='bank-table__read'
                onClick={() => {
                    context.openPostModal(row);
                }}>{translations.read}</div>
        );
    };
    const header = [
        { key: "", expander: true, width: 30 },
        { key: "category", header: "Category", width: 120 },
        { key: "subject", header: "Title", width: 120 },
        { key: "content", header: "Content" },
        { key: "country", header: "Country", width: 120 },
        { key: "date_published", header: "Published Date", width: 120 },
        { key: "read", cell: renderCell, width: 120 },
    ];

    const handleChange = debounce(() => {
        getPosts();
    }, 500);

    async function getPosts() {
        let result = [];
        const sentence = document.getElementById('bank-search-id').value;
        if (sentence) {
            result = await postsService.getPostsBySearch(sentence);
        } else {
            result = await postsService.getPosts();
        }
        setPosts(result.data);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <React.Fragment>
            <Header type='bank'/>
            <div className='bank'>
                <div className='bank-title'>
                    <div className='bank-title__text'>{translations.title}</div>
                    <div className='bank-title__description'>{translations.description1}</div>
                    <div className='bank-title__description'>{translations.description2}</div>
                </div>
                <div className='bank-input'>
                    <input id='bank-search-id' className='bank-input__text' onChange={handleChange}/>
                    <div className='bank-input__icon'/>
                </div>
                <div className='bank-table'>
                    <Table
                        data={posts}
                        columns={header}
                        estimatedRowHeight={150}
                        rowHeight={40}
                        minColumnWidth={100}
                        subComponent={({row}) => {
                            return (<div className='bank-table__sub'>{row.content}</div>);
                        }}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export default Bank;
