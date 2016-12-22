import React from 'react';

export const Alphabet = (props) => {
    return (
        <div className='box alphabet-list' onClick={(e) => {console.log(e.target); console.log(e.target.textContent)}}>
            <ul>
                {props.alphabet.map((item, i) =>
                    <li key={i} className='alphabet-list__item'>{item}</li>
                )}
            </ul>
        </div>
    )
};
