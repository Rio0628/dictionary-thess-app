import React from  'react';
import OtherDefsWrd from './OtherDefsWrd';

const MainWordView = (props) => {
    let synContainer = [], antContainer = [];

    for (let i = 0; i < 5; i++) {
        synContainer.push( <p className='synonymWrd' onClick={props.onClick} key={'key ' + i}>Synonym {i + 1}</p> );
    }

    for (let i = 0; i < 5; i++) {
        antContainer.push( <p className= 'antnymWrd' onClick={props.onClick} key={'key ' + i}>Antonym {i + 1}</p> );
    }

    return (
        <div className='mainWordContainer'>
            {props.state ? 
                <div className='dctnryViewWord'>
                    <div className='dctnryBtn' onClick={props.onClick}>Dictionary</div>
                    <div className='thsrsBtn' onClick={props.onClick}>Thesaurus</div>
                    <div className='mainInfoWrd'>
                        <h2 className='searchedWord'>Sample Word</h2>
                        <div className='audioWord' onClick={props.onClick}></div>
                        <div className='saveWrdBtn' onClick={props.onClick}>save</div>
                        <h3 className='prnctnWord'>[ sam-puhl, sahm- ]</h3>
                    </div>
                    <p className='mainWrdDef'>This is the definition for the main word (This is a sample)</p>
                
                    <h3 className='otherMeaningsWrd'>Other Meanings of Word (Provisional Title)</h3>
                    {/* Once the component is made and the call to the API is made this object will be passed as an individual component so automize the multiple meanings */}
                
                    <OtherDefsWrd number='1' />
                    <OtherDefsWrd number='2' />
                    <OtherDefsWrd number='3' />
                </div>
            :
                <div className={'thsrsViewWord ' + props.palette}>
                    <div className='dctnryBtn' onClick={props.onClick}>Dictionary</div>
                    <div className='thsrsBtn' onClick={props.onClick}>Thesaurus</div>
                    <div className='mainInfoWrd'>
                        <h2 className='searchedWord'>Sample Word</h2>
                        <div className='audioWord' onClick={props.onClick}></div>
                        <div className='saveWrdBtn' onClick={props.onClick}>save</div>
                        <h3 className='prnctnWord'>[ sam-puhl, sahm- ]</h3>
                    </div>

                    <h3 className='synmsHeading'>Synonyms</h3>
                    <div className='synmsContainer'>
                        {synContainer}
                    </div>

                    <h3 className='antnymHeading'>Antonyms</h3>
                    <div className='antnymContainer'>
                        {antContainer}
                    </div>
                </div>
            }
            {/* <div className='dctnryViewWord'>
                <div className='dctnryBtn' onClick={props.onClick}>Dictionary</div>
                <div className='thsrsBtn' onClick={props.onClick}>Thesaurus</div>
                <div className='mainInfoWrd'>
                    <h2 className='searchedWord'>Sample Word</h2>
                    <div className='audioWord' onClick={props.onClick}></div>
                    <div className='saveWrdBtn' onClick={props.onClick}>save</div>
                    <h3 className='prnctnWord'>[ sam-puhl, sahm- ]</h3>
                </div>
                <p className='mainWrdDef'>This is the definition for the main word (This is a sample)</p>
                
                <h3 className='otherMeaningsWrd'>Other Meanings of Word (Provisional Title)</h3>
                 Once the component is made and the call to the API is made this object will be passed as an individual component so automize the multiple meanings
                
                <OtherDefsWrd number='1' />
                <OtherDefsWrd number='2'/>z
                <OtherDefsWrd number='3'/>
            </div> */}
            
          </div>
    );
}

export default MainWordView;