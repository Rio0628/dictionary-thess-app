import React, { Component } from 'react';
import searchIcon from './images/searchIcon.png';
import MainWordView from './components/MainWordView';

export default class App extends Component {
  render () {
    return (
      <div className='container'>
        <div className='headbarContainer'>
          <p className='appLogo opened'><span>Dicti</span>onary</p>
          <div className='searchbarContainer'>
            <input type='text' placeholder='Enter a word...' className='searchbar'/>
            <div className='searchbarBtn'><img src={searchIcon} alt='search button'/></div>
          </div>
          <div className='loginBtn'>Login</div>
        </div>
          
        <div className='mainViewDctnry'>

          <MainWordView />
          <div className='sidebar'>
              <p className='wordOfDay'>Word of The Day</p>
              <p className='suggestWord'>Suggest a Word</p>
              <p className='savedWords'>Saved Words</p>
          </div>
        </div>
        
      </div>
    );
  }
}

