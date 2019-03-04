import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IVPlot from 'components/IVPlot';

class App extends Component<{}, { bleh: number }> {
  render() {
    // return 'blehehehehehe';
    return (
      <div style={{ padding: '1vw' }}>
        <IVPlot channelNames={['ch0', 'ch1']} />
        <br />
        <IVPlot channelNames={['ch2', 'ch3']} />
        <br />
        <IVPlot channelNames={['ch4', 'ch5']} />
      </div>
    );
    // return (
    //   <div className='App'>
    //     <header className='App-header'>
    //       <img src={logo} className='App-logo' alt='logo' />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className='App-link'
    //         href='https://reactjs.org'
    //         target='_blank'
    //         rel='noopener noreferrer'
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    // );
  }
}

export default App;
