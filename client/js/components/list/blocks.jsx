import React from 'react';

export default function Blocks(props) {
    console.log('###blocks');
    console.log(props);

    return (
        <div className='word-list__blocks'>
            <ul>
                {props.blocks.map((item, i) =>
                    <li key={i} className='box word-list__blocks--item'>
                        <span>{item === null ? '\u00A0' : item}</span>
                    </li>
                )}
            </ul>
        </div>
    )
};
