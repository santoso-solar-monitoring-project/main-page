import React, { useEffect } from 'react';
import './App.css';
import IVPlot from 'components/IVPlot';
import TitleBar from 'components/TitleBar';
import CirclePlot from 'components/CirclePlot';
import { Weather } from 'components/Weather';
import M from 'moment-timezone';

function App() {
  document.title = 'Santoso Solar Monitoring Project';
  useEffect(() => {
    const msUntilMidnight = (now = +M()) => +M(now).endOf('day').add(1, 'ms') - now;
    const reload = () => location.reload(true);
    const id = setTimeout(reload, msUntilMidnight());
    return () => clearTimeout(id);
  }, []);

  return (
    <React.Fragment>
      <TitleBar />
      <div className='main'>
        <div className='row'>
          <div className='caption' style={{ width: 'fit-content' }}>
            <CirclePlot panelIdx={0} />
            <div>Power</div>
          </div>
          <div className='caption'>
            <div
              style={{
                width: '100%',
              }}
            >
              <IVPlot channelNames={[ 'ch0', 'ch1' ]} />
            </div>
            <div>
              <span style={{ color: 'hsl(210, 100%, 86%)' }}>Voltage</span> {' & '}
              <span style={{ color: 'hsl(330, 100%, 86%)' }}>Current</span>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='caption' style={{ width: 'fit-content' }}>
            <CirclePlot panelIdx={1} />
            <div>Power</div>
          </div>
          <div className='caption'>
            <div
              style={{
                width: '100%',
              }}
            >
              <IVPlot channelNames={[ 'ch2', 'ch3' ]} />
            </div>
            <div>
              <span style={{ color: 'hsl(210, 100%, 86%)' }}>Voltage</span> {' & '}
              <span style={{ color: 'hsl(330, 100%, 86%)' }}>Current</span>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='caption' style={{ width: 'fit-content' }}>
            <CirclePlot panelIdx={2} />
            <div>Power</div>
          </div>
          <div className='caption'>
            <div
              style={{
                width: '100%',
              }}
            >
              <IVPlot channelNames={[ 'ch4', 'ch5' ]} />
            </div>
            <div>
              <span style={{ color: 'hsl(210, 100%, 86%)' }}>Voltage</span> {' & '}
              <span style={{ color: 'hsl(330, 100%, 86%)' }}>Current</span>
            </div>
          </div>
        </div>
        <Weather style={{ height: '20vh' }} />
      </div>
    </React.Fragment>
  );
}

export default App;
