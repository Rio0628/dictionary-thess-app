import React from 'react';

const IndSavedWord = (props) => {

    // Capitalized the first letter of each word 
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    return (
        <div className='indSavedWrdCntr'>
            <p className='indSavedWrd' name={props.word} onClick={props.onClick}>{capitalize(props.word)}</p>
            <p className='removeBtn' name={props.word} onClick={props.onClick}>X</p>
        </div>
        
    )
}

export default IndSavedWord; 