import React from 'react';

export const app = (props) => {
    return (
        <div className='game'>
          {props.children}
        </div>
      );
};
