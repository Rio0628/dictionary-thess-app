import React, { Component } from 'react';
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
      searchInput: '',
      wrdOfDay: {word: 'test', date: '5-10-2021'},
      savedWrds: ['sample', 'test', 'code', 'program'],
    };
  }

  componentDidMount () {
    // Creates a new word of day object with a date and a random word.
    const date = new Date();

    const wrdOfDay = {word: randomWords(), date: date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear()};

    // Check if the word of day object has the same date as the word of day state. 
    if (this.state.wrdOfDay.date !== wrdOfDay.date) {
      this.setState({ wrdOfDay: wrdOfDay });
    }
    
    
  }
  
  render () {
    let indSvdWrdContainer = [];

    const wordIsSaved = (w) => {
      // Function to check if word has been saved before to display the saved or save content
      const word = this.state.savedWrds.filter(indWord => indWord === w);
      
      if (word[0] === this.state.currentWord.word) {
        this.setState({ wordSaved: true });
      }
      else { this.setState({ wordSaved: false }); }
    } 

    const wrdDayOn = () => {
      // Check to see if the word of day state is set to true
      if (this.state.wrdOfDayTriggered) {
        return 'wordDayOn'
      }
      else return ''
    }
  
    const onChange = (e) => {
      // Gather the change in the searchbar and input it into its state
      if (e.target.className === 'searchbar') {
        this.setState({ searchInput: e.target.value });
      }
    }

    const onClick = async (e) => {
      
      // Takes care of showing the sidebar 
      if (e.target.className === 'appLogo' || e.target.className === 'wordOfDay' || e.target.className === 'suggestWord') {
        const wrapper = this.navWrapperRef.current;
        wrapper.classList.toggle('active');   
      }


      if (e.target.className === 'dctnryBtn' || e.target.className === 'suggestWord') {
        this.setState({ dctnryTriggered: true })
        this.setState({ thsrsTriggered: false }) 
        this.setState({ appPalette: '' });
      }

      // Creates a random word, calls the API (Both dictionary and thesaurus), and forms the objects required
      if (e.target.className === 'suggestWord') {
        const word = randomWords();
        let dataAPI, object;
        
        try {
          await Axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=b2d6053e-0412-4ae8-b6a0-a0ff8a827bac`).then(data => dataAPI = data.data[0]);
        } catch(err) { alert('Error Fetching Word') }
        
        object = {word: word, type: dataAPI.fl, defs: dataAPI.shortdef, pronounciation: dataAPI.hwi.prs[0].mw, audio: dataAPI.hwi.prs[0].sound}
        
        this.setState({ currentWord: object });
        this.setState({ mainCompTriggered: true });
        this.setState({ wrdOfDayTriggered: false });
      }

      if (e.target.className === 'thsrsBtn') {
        let dataAPI;

        try {
          await Axios.get(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${this.state.currentWord.word}?key=87af984c-5a0d-461a-b285-97a61ea9b8ab`).then(data => dataAPI = data.data[0]);
        } catch(err) { alert('Error Fetching Word'); }
        
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

      // If word is clicked it will call the main dictionary API call and show info of said word
      if (e.target.className === 'synonymWrd' || e.target.className === 'antnymWrd' || e.target.className === 'stemWrd' || e.target.className === 'indSavedWrd') {
        let dataAPI, object;
    
        try {
          await Axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${e.target.getAttribute('name')}?key=b2d6053e-0412-4ae8-b6a0-a0ff8a827bac`).then(data => dataAPI = data.data[0]);
        } catch(err) { alert('Error Fetching Word'); }
    
        object = {word: e.target.getAttribute('name'), type: dataAPI.fl, defs: dataAPI.shortdef, pronounciation: dataAPI.hwi.prs[0].mw, audio: dataAPI.hwi.prs[0].sound}
        
        this.setState({ currentWord: object });
        this.setState({ mainCompTriggered: true })
        this.setState({ wrdOfDayTriggered: false });
        this.setState({ thsrsTriggered: false }) 
        this.setState({ appPalette: '' });
        if (!this.state.mainCompTriggered) { this.setState({ mainCompTriggered: true }); }
        wordIsSaved(object.word);
      }

      // Calls the both of the API calls with the word of the word of day state 
      if (e.target.className === 'wordOfDay') {
        let dataAPI, dataAPIthsrs, object;
        
        try {
          await Axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${this.state.wrdOfDay.word}?key=b2d6053e-0412-4ae8-b6a0-a0ff8a827bac`).then(data => dataAPI = data.data[0]);
        } catch(e) { alert('Error Fetching Word') }
        
        object = {word: this.state.wrdOfDay.word, type: dataAPI.fl, defs: dataAPI.shortdef, pronounciation: dataAPI.hwi.prs[0].mw, audio: dataAPI.hwi.prs[0].sound, stems: dataAPI.meta.stems}
        
        await Axios.get(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${this.state.wrdOfDay.word}?key=87af984c-5a0d-461a-b285-97a61ea9b8ab`).then(data => dataAPIthsrs = data.data[0]);
        
        const ants = dataAPIthsrs.meta.ants.map(ant => ant);
        const syns = dataAPIthsrs.meta.syns.map(syn => syn);

        for (let i = 0; i < ants.length; i++) {
          Array.prototype.push.apply(ants[0], ants[i + 1]);
        }
        for (let i = 0; i < syns.length; i++) {
          Array.prototype.push.apply(syns[0], syns[i + 1]);
        }

        let objectThsrs = {syns: syns[0], ants: ants[0]};
        this.setState({ thsrsWord: objectThsrs })

        this.setState({ currentWord: object });
        this.setState({ appPalette: '' });
        this.setState({ thsrsTriggered: false });
        this.setState({ mainCompTriggered: false })
        this.setState({ wrdOfDayTriggered: true });
      }

      // Saves current word within the savedWrds state
      if (e.target.className === 'saveWrdBtn ' || e.target.className === 'saveBtn ') {
        this.setState({ wordSaved: true });

        this.setState(prevState => ({ savedWrds: [...prevState.savedWrds, this.state.currentWord.word ] }));

      }

      // Shows the savedWords container
      if (e.target.className === 'savedWords') {
        const wrapper = this.wrdsWrapperRef.current;
        wrapper.classList.toggle('active');
      }

      // Removes the said word from the savedWords state 
      if (e.target.className === 'removeBtn') {
        let words = this.state.savedWrds.filter(word => word !== e.target.getAttribute('name'));
        this.setState({ savedWrds: words });
      }

      // Callos the main dictionary API call using the searchInput state as the word
      if (e.target.className === 'searchbarBtn') {
        let dataAPI;
    
        try {
          await Axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${this.state.searchInput}?key=b2d6053e-0412-4ae8-b6a0-a0ff8a827bac`).then(data => dataAPI = data.data[0]);
        } catch(err) { alert('Error Fetching Word') }
        
        let object = {word: this.state.searchInput, type: dataAPI.fl, defs: dataAPI.shortdef, pronounciation: dataAPI.hwi.prs[0].mw, audio: dataAPI.hwi.prs[0].sound}
        this.setState({ currentWord: object });
        this.setState({ mainCompTriggered: true });

        wordIsSaved(object.word);
      }

      // Plays the audio of the pronounciation of the word
      if (e.target.className === 'audioWrd' || e.target.className === 'audioWord') {
        let frstLttr = this.state.currentWord.word.split('');

        let url = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${frstLttr[0]}/${this.state.currentWord.audio.audio}.mp3`;
        
        let audio = new Audio(url);
        audio.play().catch(error => alert('Audio for Pronounciation not Available.'))
      }

    }
  
    // Displays the individual saved words
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

          {this.state.wrdOfDayTriggered ? <WordOfTheDay info={this.state.currentWord} thsrsInfo={this.state.thsrsWord} isWrdSaved={this.state.wordSaved} onClick={onClick}/> : null }

          {this.state.mainCompTriggered ? <MainWordView info={this.state.currentWord} thsrsInfo={this.state.thsrsWord} onClick={onClick} state={this.state.dctnryTriggered} isWrdSaved={this.state.wordSaved} isThsrsOn={this.state.thsrsTriggered} palette={this.state.appPalette}/> : null }
          
          {!this.state.mainCompTriggered && !this.state.wrdOfDayTriggered ? <h1 className={'previewHeading ' + wrdDayOn()}>Search a Word to View its Definition</h1> : null}
          
        </div>
        
      </div>
    );
  }
}

