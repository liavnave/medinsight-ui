import React from 'react';
import classnames from 'classnames';
import './TextInput.scss'

const TextInput = (props) => {
    const classes = classnames('text-input', {
        'text-input--flex': props.type === 'textarea'
    });

    const renderInput = () => {
        if (props.type === 'text') {
            return <input className='text-input__input' id={props.id} placeholder={props.placeholder}/>;
        }

        if (props.type === 'textarea') {
            return <textarea className='text-input__input' id={props.id} placeholder={props.placeholder}/>;
        }
        return null;
    };

    return (
        <div className={classes}>
            <div className='text-input__title'>{props.title}</div>
            {
                renderInput()
            }
        </div>
    );
};

TextInput.defaultProps = {
    placeholder: '',
    title: 'title',
    type: 'text'
};

export default TextInput;
