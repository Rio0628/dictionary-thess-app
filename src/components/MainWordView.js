import React from  'react';
import OtherDefsWrd from './OtherDefsWrd';

const MainWordView = () => {
    return (
        <div className='mainWordContainer'>
            <div className='dctnryViewWord'>
                <div className='dctnryBtn'>Dictionary</div>
                <div className='thsrsBtn'>Thesaurus</div>
                <div className='mainInfoWrd'>
                    <h2 className='searchedWord'>Sample Word</h2>
                    <div className='audioWord'></div>
                    <div className='saveWrdBtn'>save</div>
                    <h3 className='prnctnWord'>[ sam-puhl, sahm- ]</h3>
                </div>
                <p className='mainWrdDef'>This is the definition for the main word (This is a sample)</p>
                
                <h3 className='otherMeaningsWrd'>Other Meanings of Word (Provisional Title)</h3>
                 {/* Once the component is made and the call to the API is made this object will be passed as an individual component so automize the multiple meanings */}
                
                <OtherDefsWrd number='1' />
                <OtherDefsWrd number='2'/>
                <OtherDefsWrd number='3'/>
            </div>
            

            {/* <div className='thsrsViewWord'>
                <div className='dctnryBtn'>Dictionary</div>
                <div className='thsrsBtn'>Thesaurus</div>
                <div className='mainInfoWrd'>
                    <h2 className='searchedWord'>Sample Word</h2>
                    <div className='audioWord'></div>
                    <div className='saveWrdBtn'>save</div>
                    <h3 className='prnctnWord'>[ sam-puhl, sahm- ]</h3>
                </div>

                <h3 className='synmsHeading'>Synonyms</h3>
                <div className='synmsContainer'>
                    <p className='synonymWrd'>Synonym 1</p>
                    <p className='synonymWrd'>Synonym 2</p>
                    <p className='synonymWrd'>Synonym 3</p>
                    <p className='synonymWrd'>Synonym 4</p>
                    <p className='synonymWrd'>Synonym 4</p>
                </div>

                <h3 className='antnymHeading'>Antonyms</h3>
                <div className='antnymContainer'>
                    <p className='antnymWrd'>Antonym 1</p>
                    <p className='antnymWrd'>Antonym 2</p>
                    <p className='antnymWrd'>Antonym 3</p>
                    <p className='antnymWrd'>Antonym 4</p>
                </div>
            </div> */}
          </div>
    );
}

export default MainWordView;