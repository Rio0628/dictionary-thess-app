import React, { Component } from 'react';
import searchIcon from './images/searchIcon.png';
// import MainWordView from './components/MainWordView';
import WordOfTheDay from './components/WordOfTheDay';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarTriggered: false, 
    };
  }
  
  render () {

    const onClick = (e) => {
      console.log(e.target);
      
      if (e.target.className === 'appLogo') { this.setState({ sidebarTriggered: !this.state.sidebarTriggered }); }
    }
    console.log(this.state.sidebarTriggered)
    return (
      <div className='container'>
        <div className='headbarContainer'>
          <p className='appLogo' onClick={onClick}><span>Dicti</span>onary</p>
          <div className='searchbarContainer'>
            <input type='text' placeholder='Enter a word...' className='searchbar'/>
            <div className='searchbarBtn'><img src={searchIcon} alt='search button'/></div>
          </div>
        </div>
          
        <div className='mainViewDctnry'>

          {/* <MainWordView /> */}
          <WordOfTheDay />
          <div className='sidebar'>
              <p className='wordOfDay' onClick={onClick}>Word of The Day</p>
              <p className='suggestWord' onClick={onClick}>Suggest a Word</p>
              <p className='savedWords' onClick={onClick}>Saved Words</p>
          </div>
        </div>
        
      </div>
    );
  }
}

