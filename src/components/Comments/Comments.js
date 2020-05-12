import React, {useEffect, useState, Fragment} from 'react';
import classnames from 'classnames';
import './Comments.scss';
import postsService from "../../services/posts.service";

const Comments = (props) => {
    const [comments, setComments] = useState([]);
    const {
        postId,
        containerClass
    } = props;
    async function getComments() {
        const result = await postsService.getComments(postId);
        setComments(result.data);
    }

    useEffect(() => {
        getComments();
    }, []);

    const classes = classnames('comments', containerClass);

    const renderComments = () => {
        return comments.map((comment) => {
            return (
                <div key={comment.id} className='comments__comment'>
                    <div className='comments__comment-author'>{comment.full_name}</div>
                    <div className='comments__comment-date'>{comment.date_published}</div>
                    <div className='comments__comment-content'>{comment.content}</div>
                </div>
            );
        });
    };

    return (
        <Fragment>
            {
                comments.length === 0 ? null : <div className={classes}>
                    {
                        renderComments()
                    }
                </div>
            }
        </Fragment>
    );
};

export default Comments;
