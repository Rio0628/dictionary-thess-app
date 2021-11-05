import React, { Component } from 'react';
import AsyncStorage from 'react';
import Axios from 'axios';
import randomWords from 'random-words';
import searchIcon from './images/searchIcon.png';
import MainWordView from './components/MainWordView';
import WordOfTheDay from './components/WordOfTheDay';
import IndSavedWord from './components/IndSavedWord';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.navWrapperRef = React.createRef();
    this.wrdsWrapperRef = React.createRef();
    this.state = {
      mainCompTriggered: false,
      sidebarTriggered: false, 
      dctnryTriggered: true,
      thsrsTriggered: false, 
      wrdOfDayTriggered: false,
      wordSaved: false, 
      searchInput: 'house',
      wrdOfDay: '',
      savedWrds: ['sample', 'test', 'code', 'program'],
    };
  }

  componentDidMount () {
  
    const word = randomWords();
    this.setState({ wrdOfDay: word });
  }

  
  render () {
    let indSvdWrdContainer = [];
    // window.localStorage.setItem('savedWords', JSON.stringify(this.state.savedWrds));
    console.log(this.state.savedWrds)

    const wordIsSaved = (w) => {
      // Function to check if word has been saved before
      const word = this.state.savedWrds.filter(indWord => indWord === w);
      
      if (word[0] === this.state.currentWord.word) {
        this.setState({ wordSaved: true });
      }
      else { this.setState({ wordSaved: false }); }
    } 

    const wrdDayOn = () => {
      if (this.state.wrdOfDayTriggered) {
        return 'wordDayOn'
      }
      else return ''
    }
  
    const onChange = (e) => {
      // console.log(e.target.value)

      if (e.target.className === 'searchbar') {
        this.setState({ searchInput: e.target.value });
      }
    }

    const onClick = async (e) => {
      console.log(e.target);
      
      if (e.target.className === 'appLogo' || e.target.className === 'wordOfDay' || e.target.className === 'suggestWord') {
        const wrapper = this.navWrapperRef.current;
        wrapper.classList.toggle('active');   
      }

      if (e.target.className === 'dctnryBtn' || e.target.className === 'suggestWord') {
        this.setState({ dctnryTriggered: true })
        this.setState({ thsrsTriggered: false }) 
        this.setState({ appPalette: '' });
      }

      if (e.target.className === 'suggestWord') {
        const word = randomWords();
        let dataAPI, object;
        
        await Axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=b2d6053e-0412-4ae8-b6a0-a0ff8a827bac`).then(data => dataAPI = data.data[0]);
    
        try {
          object = {word: word, type: dataAPI.fl, defs: dataAPI.shortdef, pronounciation: dataAPI.hwi.prs[0].mw, audio: dataAPI.hwi.prs[0].sound}
        } catch(e) { alert(e) }
        
        this.setState({ currentWord: object });
      }

      if (e.target.className === 'suggestWord') {
        this.setState({ mainCompTriggered: true });
        this.setState({ wrdOfDayTriggered: false });
      }

      if (e.target.className === 'thsrsBtn') {
        let dataAPI;
        await Axios.get(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${this.state.currentWord.word}?key=87af984c-5a0d-461a-b285-97a61ea9b8ab`).then(data => dataAPI = data.data[0]);
        
        const ants = dataAPI.meta.ants.map(ant => ant);
        const syns = dataAPI.meta.syns.map(syn => syn);

        for (let i = 0; i < ants.length; i++) {
          Array.prototype.push.apply(ants[0], ants[i + 1]);
        }
        for (let i = 0; i < syns.length; i++) {
          Array.prototype.push.apply(syns[0], syns[i + 1]);
        }

        let object = {syns: syns[0], ants: ants[0]};
        this.setState({ thsrsWord: object })
        this.setState({ thsrsTriggered: true });
        this.setState({ dctnryTriggered: false })
        this.setState({ appPalette: 'thesaurus' });
        
      }

      if (e.target.className === 'synonymWrd' || e.target.className === 'antnymWrd') {
        let dataAPI, object;
    
        await Axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${e.target.getAttribute('name')}?key=b2d6053e-0412-4ae8-b6a0-a0ff8a827bac`).then(data => dataAPI = data.data[0]);
    
        try {
          object = {word: e.target.getAttribute('name'), type: dataAPI.fl, defs: dataAPI.shortdef, pronounciation: dataAPI.hwi.prs[0].mw, audio: dataAPI.hwi.prs[0].sound}
        } catch(e) { alert(e) }
        
        this.setState({ currentWord: object });
        this.setState({ dctnryTriggered: true })
        this.setState({ thsrsTriggered: false }) 
        this.setState({ appPalette: '' });
        wordIsSaved(object.word);
      }

      if (e.target.className === 'wordOfDay') {
        this.setState({ appPalette: '' });
        this.setState({ thsrsTriggered: false });
        this.setState({ mainCompTriggered: false })
        this.setState({ wrdOfDayTriggered: true });
      }

      if (e.target.className === 'saveWrdBtn ' || e.target.className === 'saveBtn ') {
        // words object { 'Word 1', 'Word 2', 'Word 3' } if word is not there then that 
        this.setState({ wordSaved: true });

        this.setState(prevState => ({ savedWrds: [...prevState.savedWrds, this.state.currentWord.word ] }));

      }

      if (e.target.className === 'savedWords') {
        const wrapper = this.wrdsWrapperRef.current;
        wrapper.classList.toggle('active');
      }

      if (e.target.className === 'indSavedWrd') {
        let dataAPI, object;

        await Axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${e.target.getAttribute('name')}?key=b2d6053e-0412-4ae8-b6a0-a0ff8a827bac`).then(data => dataAPI = data.data[0]);
    
        try {
          object = {word: e.target.getAttribute('name'), type: dataAPI.fl, defs: dataAPI.shortdef, pronounciation: dataAPI.hwi.prs[0].mw, audio: dataAPI.hwi.prs[0].sound}
        } catch(e) { alert(e) }
        
        this.setState({ currentWord: object });
        this.setState({ dctnryTriggered: true })
        this.setState({ thsrsTriggered: false }) 
        this.setState({ appPalette: '' });
        if (!this.state.mainCompTriggered) { this.setState({ mainCompTriggered: true }); }
      }

      if (e.target.className === 'removeBtn') {
        let words = this.state.savedWrds.filter(word => word !== e.target.getAttribute('name'));
        this.setState({ savedWrds: words });
        await sessionStorage.setItem('savedWords', JSON.stringify(this.state.savedWrds));
      }

      if (e.target.className === 'searchbarBtn') {
        let dataAPI;
    
        await Axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${this.state.searchInput}?key=b2d6053e-0412-4ae8-b6a0-a0ff8a827bac`).then(data => dataAPI = data.data[0]);
    
        let object = {word: this.state.searchInput, type: dataAPI.fl, defs: dataAPI.shortdef, pronounciation: dataAPI.hwi.prs[0].mw, audio: dataAPI.hwi.prs[0].sound}
        this.setState({ currentWord: object });
        this.setState({ mainCompTriggered: true });

        wordIsSaved(object.word);
      }

    }
  
    for (let i = 0; i < this.state.savedWrds.length; i++) {
      indSvdWrdContainer.push( <IndSavedWord onClick={onClick} word={this.state.savedWrds[i]} key={'word ' + i} /> );
    }

    

    return (
      <div className='container'>
        <div className={'headbarContainer ' + this.state.appPalette}>
          <p className='appLogo' onClick={onClick}><span>Dicti</span>onary</p>
          <div className='searchbarContainer'>
            <input type='text' placeholder='Enter a word...' className='searchbar' onChange={onChange}/>
            <div className='searchbarBtn' onClick={onClick}><img src={searchIcon} alt='search button'/></div>
          </div>
        </div>
          
        <div ref={this.navWrapperRef} className={'sidebar active ' + this.state.appPalette}>
            <p className='wordOfDay' onClick={onClick}>Word of The Day</p>
            <p className='suggestWord' onClick={onClick}>Suggest a Word</p>
            <p className='savedWords' onClick={onClick}>Saved Words</p>
             
            <div ref={this.wrdsWrapperRef} className={'savedWrdsContainer ' + this.state.appPalette}>
              {indSvdWrdContainer}
            </div>
        </div>


        <div className='mainViewDctnry'>

          {this.state.wrdOfDayTriggered ? <WordOfTheDay onClick={onClick}/> : null }

          {this.state.mainCompTriggered ? <MainWordView info={this.state.currentWord} thsrsInfo={this.state.thsrsWord} onClick={onClick} state={this.state.dctnryTriggered} isWrdSaved={this.state.wordSaved} isThsrsOn={this.state.thsrsTriggered} palette={this.state.appPalette}/> : <h1 className={'previewHeading ' + wrdDayOn()}>Search a Word to View its Definition</h1>}
          
          {/* {!this.state.mainCompTriggered || !this.state.wrdOfDayTriggered ? <h1>Hello</h1> : null} */}

          {/* <WordOfTheDay onClick={onClick}/> */}
          
        </div>
        
      </div>
    );
  }
}

