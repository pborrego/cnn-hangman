import React from 'react';

export const main = (props) => {
    return (
        <div className='cnn-hangman__app--header'>
            <h1> CNN Hangman </h1>
            {props.children}
        </div>
      );
};
