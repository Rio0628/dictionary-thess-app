import React from 'react';

const WordOfTheDay = (props) => {
    let synContainer = [], stemsContainer = [], synsPresent = false, stemsPresent = false;

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

    if (props.thsrsInfo.syns) { synsPresent = true }
    if (props.info.stems) { stemsPresent = true }

    if (stemsPresent) {
        if (props.info.stems.length >= 15) {
            for (let i = 0; i < 15; i++) {
                stemsContainer.push( <p className='stemWrd' name={props.info.stems[i]} onClick={props.onClick} key={'key ' + i}>{props.info.stems[i]}</p> );
            }
        }
        else {
            for (let i = 0; i < props.info.stems.length; i++) {
                stemsContainer.push( <p className='stemWrd' name={props.info.stems[i]} onClick={props.onClick} key={'key ' + i}>{props.info.stems[i]}</p> );
            }
        }     
    }
    
    if (synsPresent) {
        if (props.thsrsInfo.syns.length >= 15) {
            for (let i = 0; i < 15; i++) {
                synContainer.push( <p className='synonymWrd' name={props.thsrsInfo.syns[i]} onClick={props.onClick} key={'key ' + i}>{props.thsrsInfo.syns[i]}</p> );
            }
        }
        else {
            for (let i = 0; i < props.thsrsInfo.syns.length; i++) {
                synContainer.push( <p className='synonymWrd' name={props.thsrsInfo.syns[i]} onClick={props.onClick} key={'key ' + i}>{props.thsrsInfo.syns[i]}</p> );
            }
        }     
    }

    return (
        <div className='wrdOfDayCntr'>
            <h1 className='wordHeading'>{capitalize(props.info.word)}</h1>
            <div className='pron-audioContainer'>
                <div className='prnctnWrd'>[ {props.info.pronounciation} ]</div>
                <div className='audioWrd' onClick={props.onClick}></div>
                <div className='lineBreak'></div>
                <div className={'saveBtn ' + clrSaveButton()}  onClick={props.onClick}>{props.isWrdSaved ? 'saved' : 'save'}</div>
            </div>
            <p className='typeWrd'>{capitalize(props.info.type)}</p>

            <div className='infoWrdMngContainer'>
                <h2 className='dfntnHeading'>Definition</h2>
                <p className='mainDefWrd'>{props.info.defs[0]}</p>
            </div>

            <div className='stemsContainer'>
                <h2 className='stemsHeading'>Stems</h2>
                <div className='stemsCntr'>
                    {stemsPresent ? stemsContainer : <h3 className='noStemsHeading'>There are no stems present.</h3>}
                </div>
            </div>

            <div className='mainSynonymCntr'>
                <h3 className='synonymHeading'>Synonyms</h3>
                <div className='synonymsCntr'>
                    {synsPresent ? synContainer : <h3 className='noSynsHeading'>There are no Synnonyms present.</h3>}
                </div>
            </div>
            
        
        </div>
    );
}

export default WordOfTheDay;