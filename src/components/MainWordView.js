import React from  'react';
import OtherDefsWrd from './OtherDefsWrd';

const MainWordView = (props) => {
    let synContainer = [], antContainer = [], otherWrdsCntr = [], synsPresent = false, antsPresent = false;
    
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
    
    const clrSaveButton = () => {
        if (props.isWrdSaved) {
            return 'saved';
        }
        else return '';
    }

    if (props.info.defs.length > 3) {
        for (let i = 1; i <= 3; i++) {
            otherWrdsCntr.push( <OtherDefsWrd number={i} def={props.info.defs[i]} key={'Def ' + i}/> );
        }
    }
    else {
        for (let i = 1; i < props.info.defs.length; i++) {
            otherWrdsCntr.push( <OtherDefsWrd number={i} def={props.info.defs[i]} key={'Def ' + i}/> );
        }
    }

    // Conditionals to see if there are synonyms and antonyms 
    if (props.isThsrsOn) {
        if (props.thsrsInfo.syns) { synsPresent = true }
        if (props.thsrsInfo.ants) { antsPresent = true }
    }
    
    if (synsPresent) {
        if (props.thsrsInfo.syns.length >= 20) {
            for (let i = 0; i < 20; i++) {
                synContainer.push( <p className='synonymWrd' name={props.thsrsInfo.syns[i]} onClick={props.onClick} key={'key ' + i}>{props.thsrsInfo.syns[i]}</p> );
            }
        }
        else {
            for (let i = 0; i < props.thsrsInfo.syns.length; i++) {
                synContainer.push( <p className='synonymWrd' name={props.thsrsInfo.syns[i]} onClick={props.onClick} key={'key ' + i}>{props.thsrsInfo.syns[i]}</p> );
            }
        }
            
    }

    if (antsPresent) {
        if (props.thsrsInfo.ants.length >= 20) {
            for (let i = 0; i < 20; i++) {
                antContainer.push( <p className='antnymWrd' name={props.thsrsInfo.ants[i]} onClick={props.onClick} key={'key ' + i}>{props.thsrsInfo.ants[i]}</p> );
            }
        }
        else {
            for (let i = 0; i < props.thsrsInfo.ants.length; i++) {
                antContainer.push( <p className='antnymWrd' name={props.thsrsInfo.ants[i]} onClick={props.onClick} key={'key ' + i}>{props.thsrsInfo.ants[i]}</p> );
            }
        }
    }
    

    return (
        <div className='mainWordContainer'>
            {props.state ? 
                <div className='dctnryViewWord'>
                    <div className='dctnryBtn' onClick={props.onClick}>Dictionary</div>
                    <div className='thsrsBtn' onClick={props.onClick}>Thesaurus</div>
                    <div className='mainInfoWrd'>
                        <h2 className='searchedWord'>{capitalize(props.info.word)}</h2>
                        <div className='audioWord' onClick={props.onClick}></div>
                        <div className={'saveWrdBtn ' + clrSaveButton()} onClick={props.onClick}>{props.isWrdSaved ? 'saved' : 'save'}</div>
                        <h3 className='prnctnWord'>[ {props.info.pronounciation} ]</h3>
                    </div>
                    <p className='typeWrd'>{capitalize(props.info.type)}</p>

                    <p className='mainWrdDef'>{props.info.defs[0]}</p>
                
                    {props.info.defs.length > 1 ? 
                        <div className='otherMeaningsCntr'>
                            <h3 className='otherMeaningsWrd'>Other Meanings of {capitalize(props.info.word)}</h3>
                            {otherWrdsCntr}
                        </div>
                    : null}
                    
                    
                </div>
            :
                <div className={'thsrsViewWord ' + props.palette}>
                    <div className='dctnryBtn' onClick={props.onClick}>Dictionary</div>
                    <div className='thsrsBtn' onClick={props.onClick}>Thesaurus</div>
                    <div className='mainInfoWrd'>
                        <h2 className='searchedWord'>{capitalize(props.info.word)}</h2>
                        <div className='audioWord' onClick={props.onClick}></div>
                        <div className={'saveBtn' + clrSaveButton()} onClick={props.onClick}>{props.isWrdSaved ? 'saved' : 'save'}</div>
                        <h3 className='prnctnWord'>[ {props.info.pronounciation} ]</h3>
                    </div>
                    <p className='typeWrd'>{capitalize(props.info.type)}</p>

                    <h3 className='synmsHeading'>Synonyms</h3>
                    <div className='synmsContainer'>
                        {synsPresent ? synContainer : <h1 className='noWrdPresent'>No Synonyms are Present.</h1>}
                    </div>

                    <h3 className='antnymHeading'>Antonyms</h3>
                    <div className='antnymContainer'>
                        {antsPresent ? antContainer : <h1 className='noWrdPresent'>No Antonyms are Present.</h1>}
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