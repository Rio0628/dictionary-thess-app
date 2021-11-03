import React from 'react';

const WordOfTheDay = () => {
    return (
        <div className='wrdOfDayCntr'>
            <h1 className='wordHeading'>Sample Word</h1>
            <div className='pron-audioContainer'>
                <div className='prnctnWrd'>[ sam-puhl, sahm- ]</div>
                <div className='audioWrd'></div>
                <div className='lineBreak'></div>
                <div className='saveBtn'>Save</div>
            </div>

            <div className='infoWrdMngContainer'>
                <h2 className='dfntnHeading'>Definition</h2>
                <p className='mainDefWrd'>This is a sample definition of the word</p>
            </div>

            <div className='exmapleContainer'>
                <h2 className='exampleHeading'>Example</h2>
                <p className='exampleOfWrd'>This is a sentence example using the sample word</p>
            </div>

            <div className='mainSynonymCntr'>
                <h3 className='synonymHeading'>Synonyms</h3>
                <div className='synonymsCntr'>
                    <p className='synDayWrd'>Synonym</p>
                    <p className='synDayWrd'>Synonym</p>
                    <p className='synDayWrd'>Synonym</p>
                </div>
            </div>
            
        
        </div>
    );
}

export default WordOfTheDay;