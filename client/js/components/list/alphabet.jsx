import React from 'react';

export default function Alphabet({alphabet}) {
    return (
        <div className='box alphabet-list' onClick={(e) => {console.log(e.target); console.log(e.target.textContent)}}>
            <ul>
                {alphabet.map((item, i) => (
                    <li key={i} className='alphabet-list__item'>{item}</li>
                ))}
            </ul>
        </div>
    );
};
