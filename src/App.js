import React, { Component } from 'react';
import Axios from 'axios';
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
      mainCompTriggered: true,
      sidebarTriggered: false, 
      dctnryTriggered: true,
      thsrsTriggered: false, 
      wrdOfDayTriggered: false,
      wordSaved: false, 
      searchInput: '',
    };
  }
  
  render () {
    let indSvdWrdContainer = [];

    const onChange = (e) => {
      // console.log(e.target.value)

      if (e.target.className === 'searchbar') {
        this.setState({ searchInput: e.target.value });
      }
    }

    const onClick = (e) => {
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
        this.setState({ mainCompTriggered: true });
        this.setState({ wrdOfDayTriggered: false });
      }

      if (e.target.className === 'thsrsBtn') { 
        this.setState({ thsrsTriggered: true });
        this.setState({ dctnryTriggered: false })
        this.setState({ appPalette: 'thesaurus' });
      }

      if (e.target.className === 'wordOfDay') {
        this.setState({ appPalette: '' });
        this.setState({ thsrsTriggered: false });
        this.setState({ mainCompTriggered: false })
        this.setState({ wrdOfDayTriggered: true });
      }

      if (e.target.className === 'saveWrdBtn' || e.target.className === 'saveBtn') {
        // words object { 'Word 1', 'Word 2', 'Word 3' } if word is not there then that 
        this.setState({ wordSaved: true });
      }

      if (e.target.className === 'savedWords') {
        const wrapper = this.wrdsWrapperRef.current;
        wrapper.classList.toggle('active');
      }
    }

    for (let i = 0; i < 10; i++) {
      indSvdWrdContainer.push( <IndSavedWord onClick={onClick} key={'word ' + i} /> );
    }

    Axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/pancake?key=b2d6053e-0412-4ae8-b6a0-a0ff8a827bac`).then(data => console.log(data.data));

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

          {this.state.mainCompTriggered ? <MainWordView onClick={onClick} state={this.state.dctnryTriggered} palette={this.state.appPalette}/> : null}
          
          {/* <WordOfTheDay onClick={onClick}/> */}
          
        </div>
        
      </div>
    );
  }
}

