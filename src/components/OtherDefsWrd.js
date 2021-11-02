import React from 'react';

const OtherDefsWrd = (props) => {
    return (
        <div className='otherDefsWrdCntr'>
            <p className='meaningNmb'>{props.number}</p>
            <p className='otherDefWrd'>This is a sample of another definition of the main word</p>
        </div>
    );
}

export default OtherDefsWrd;