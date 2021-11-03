import React, { Component } from 'react';
import searchIcon from './images/searchIcon.png';
import MainWordView from './components/MainWordView';
import WordOfTheDay from './components/WordOfTheDay';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainCompTriggered: true,
      sidebarTriggered: false, 
      dctnryTriggered: true,
      thsrsTriggered: false, 
      wrdOfDayTriggered: false,
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
          

          {this.state.wrdOfDayTriggered ? <WordOfTheDay onClick={onClick}/> : null }

          {this.state.mainCompTriggered ? <MainWordView onClick={onClick} state={this.state.dctnryTriggered} palette={this.state.appPalette}/> : null}
          
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

