import React from 'react';
import './Dashboard.scss';
import Header from "../header/Header";
import Iframe from 'react-iframe';
import translations from "./translations";

const Dashboard = (props) => {
    return (
        <div className='dashboard'>
            <Header type='dashboard'/>
            <div className='dashboard-title'>
                <div className='dashboard-title__text'>{translations.title}</div>
                <div className='dashboard-title__description'>{translations.description1}</div>
                <div className='dashboard-title__description'>{translations.description2}</div>
                <div className='dashboard-title__icon'></div>
            </div>
            <div className='dashboard__iframe'>
                <Iframe url="http://10.50.18.243:30845/app/main#/dashboards/5e84e22981f7e6002c6cff99?embed=true&r=false&t=true"
                        id="dashbaord-iframe-id"
                        className="dashboard-iframe"
                        display="initial"
                        position="relative"/>
            </div>
        </div>
    );
};

export default Dashboard;
