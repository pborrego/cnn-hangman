import Header from './header';
import React from 'react';

export default function App(props) {
    return (
        <div>
            <Header />
            <div className='container wrapper'>
                {props.children}
            </div>
        </div>
    );
};
