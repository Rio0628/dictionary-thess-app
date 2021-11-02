import React from  'react';

const MainWordView = () => {
    return (
        <div className='mainWordContainer'>
            <div className='dctnryViewWord'>
                <div className='dctnryBtn'>Dictionary</div>
                <div className='thsrsBtn'>Thesaurus</div>
                <div className='mainInfoWrd'>
                    <h2 className='searchedWord'>Sample Word</h2>
                    <div className='audioWord'></div>
                    <h3 className='prnctnWord'>Sample pronc</h3>
                </div>
                <p clasName='mainWrdDef'>This is the definition for the main word (This is a sample)</p>
                
                <h3 className='otherMeaningsWrd'>Other Meanings of Word (Provisional Title)</h3>
                {/* Once the component is made and the call to the API is made this object will be passed as an individual component so automize the multiple meanings */}
                
                <div className='otherDefsWrdCntr'>
                    <p className='meaningNmb'>Meaning One</p>
                    <p className='otherDefWrd'>This is a sample of another definition of the main word</p>
                </div>
            </div>
            

            {/* Thesearus view goes here */}
          </div>
    );
}

export default MainWordView;