import React from 'react';

const OtherDefsWrd = (props) => {
    return (
        <div className='otherDefsWrdCntr'>
            <p className='meaningNmb'>{props.number}</p>
            <p className='otherDefWrd'>{props.def}</p>
        </div>
    );
}

export default OtherDefsWrd;