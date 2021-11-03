import React, { Component } from 'react';
import searchIcon from './images/searchIcon.png';
import MainWordView from './components/MainWordView';
import WordOfTheDay from './components/WordOfTheDay';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarTriggered: false, 
      dctnryTriggered: true,
      thsrsTriggered: false, 
      wordSaved: false,
    };
  }
  
  render () {

    const onClick = (e) => {
      console.log(e.target);
      
      if (e.target.className === 'appLogo') { this.setState({ sidebarTriggered: !this.state.sidebarTriggered }); }
      if (e.target.className === 'dctnryBtn' || e.target.className === 'suggestWord') {
        this.setState({ dctnryTriggered: true })
        this.setState({ thsrsTriggered: false }) 
        this.setState({ appPalette: '' });
      }

      if (e.target.className === 'thsrsBtn') { 
        this.setState({ thsrsTriggered: true });
        this.setState({ dctnryTriggered: false })
        this.setState({ appPalette: 'thesaurus' });
      }
    }
  

    console.log(this.state.appPalette)
    console.log(this.state.thsrsTriggered)

    return (
      <div className='container'>
        <div className={'headbarContainer ' + this.state.appPalette}>
          <p className='appLogo' onClick={onClick}><span>Dicti</span>onary</p>
          <div className='searchbarContainer'>
            <input type='text' placeholder='Enter a word...' className='searchbar'/>
            <div className='searchbarBtn'><img src={searchIcon} alt='search button'/></div>
          </div>
        </div>
          
        <div className='mainViewDctnry'>

          <MainWordView onClick={onClick} state={this.state.dctnryTriggered} palette={this.state.appPalette}/>
          {/* <WordOfTheDay onClick={onClick}/> */}
          <div className={'sidebar active ' + this.state.appPalette}>
              <p className='wordOfDay' onClick={onClick}>Word of The Day</p>
              <p className='suggestWord' onClick={onClick}>Suggest a Word</p>
              <p className='savedWords' onClick={onClick}>Saved Words</p>
          </div>
        </div>
        
      </div>
    );
  }
}

