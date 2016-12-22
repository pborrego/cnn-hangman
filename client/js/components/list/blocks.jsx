import React from 'react';

export const blocks = (props) => {
    console.log('###blocks');
    console.log(props);
    return (
        <div className='word-list__blocks'>
            <ul>
                {props.blocks.map((item, i) =>
                    <li key={i} className='word-list__blocks--item'>
                        <span>{item === null ? '\u00A0' : item}</span>
                    </li>
                )}
            </ul>
        </div>
    )
};
