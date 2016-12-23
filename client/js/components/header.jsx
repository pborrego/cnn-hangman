import React from 'react';

export default function Header({children}) {
    return (
        <div className='cnn-hangman__app--header'>
            <h1> CNN Hangman </h1>
            {children}
        </div>
    );
};
