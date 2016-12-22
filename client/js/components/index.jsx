import * as Header from './header';
import React from 'react';

export const app = (props) => {
    return (
        <div>
            <Header.main />
            <div className='container wrapper'>
                {props.children}
            </div>
        </div>
      );
};
