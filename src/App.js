import React, { Component } from 'react';
import searchIcon from './images/searchIcon.png';

export default class App extends Component {
  render () {
    return (
      <div className='container'>
        <div className='headbarContainer'>
          <p className='appLogo'><span>Dicti</span>onary</p>
        
          <div className='searchbarContainer'>
            <input type='text' placeholder='Enter a word...' className='searchbar'/>
            <div className='searchbarBtn'><img src={searchIcon} alt='search button'/></div>
          </div>

          <div className='loginBtn'>Login</div>
        </div>

        
      </div>
    );
  }
}

