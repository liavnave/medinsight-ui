import React from 'react';
import {
    Link
} from "react-router-dom";
import './Header.scss';
import AddButton from '../addButton/AddButton'
import translations from './translations';

const Header = (props) => {
    const { type } = props;
    return (
        <div className={`header header-${type}`}>
            <Link to='/' className='header__title'>
                <div className='header__main-title nobreak'>{translations.mainTitle}</div>
                <div className='header__second-title nobreak'>{translations.title}</div>
            </Link>
            <div className='header__buttons'>
                <Link to='/knowledgebank' className='header__button header__button-bank'>
                    {translations.bank}
                </Link>
                <Link to='/dashboard' className='header__button header__button-dashboard'>
                    {translations.dashboard}
                </Link>
                <AddButton classes='header__button header__button-add'/>
            </div>
        </div>
    );
};

export default Header;
