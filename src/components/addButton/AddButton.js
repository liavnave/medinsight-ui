import React, { useContext, Fragment } from 'react';
import classnames from 'classnames'
import './AddButton.scss';
import translations from './translations';

import Context from "../../context/Context";

const AddButton = (props) => {
    const classes = classnames(props.classes, 'add-button');
    const context = useContext(Context);
    return (
        <Fragment>
            <div className={classes} onClick={context.openAddPostModal}>{translations.add}</div>
        </Fragment>
    );
};

export default AddButton;
