import React, { useEffect, useRef, useState } from 'react';
import Skycons from './skycons';

// eslint-disable-next-line
const LOG = (...x) => (console.log(...x), x.slice(-1)[0]);

const FETCH = async (url, ...args) => (await fetch(url, ...args)).json();
const KEY = 'AIzaSyCQ7_0LJbkOSwEni30tqih4e_vN2fDIZ9k';

const ID = Object.freeze({
  root: '1fIbkh2C2daDOJPk-vvpWKOTbHOwvjiS2',
  derived: '1qMCRSfBtrOWzzYP5HQjk9J4uipNkbaDP',
  measurements: '1nvk-XK9SY1_KmdSXyGzGLjNIJXDipFKO',
  solcast: '1Tgn9yD6HzDxOV4uOBrOHWWQ2FVuc41yJ',
});

async function getRange(spreadsheetId, range = 'A1:Z1000000') {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${KEY}`;
  return (await FETCH(url)).values;
}

async function mostRecentFile(folder) {
  const url = `https://www.googleapis.com/drive/v3/files?orderBy=recency&q=%27${ID[
    folder
  ]}%27%20in%20parents&pageSize=1&key=${KEY}`;
  return (await FETCH(url)).files[0].id;
}

export function Weather(props) {
  const ref = useRef(null);
  const skycons = useRef(null);
  const [ status, setStatus ] = useState({
    temp: NaN,
    descrip: '',
    irradiance: NaN,
  });

  // Fetch weather.gov data
  useEffect(() => {
    const update = () =>
      fetch('https://api.weather.gov/stations/KATT/observations/latest')
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { properties: { textDescription: descrip, temperature: { value: temp } } } = data;
          skycons.current = setIcons(ref.current, descrip);
          setStatus(status => ({
            ...status,
            descrip,
            temp: fahr(temp).toFixed(0) + ' °F',
          }));
          LOG(descrip + ' ' + fahr(temp).toFixed(0) + ' °F');
        })
        .catch(error => console.error(error));

    update();
    const id = setInterval(update, 15 * 60e3);
    return () => {
      clearInterval(id);
      skycons.current && skycons.current.pause();
    };
  }, []);

  // Fetch Solcast data
  useEffect(() => {
    const update = () =>
      mostRecentFile('solcast')
        .then(id => getRange(id))
        .then(d => {
          const irradiance = getIrradiance(d).toFixed(0);
          setStatus(status => ({
            ...status,
            irradiance,
          }));
        })
        .catch(error => console.error(error));

    update();
    const id = setInterval(update, 15 * 60e3);
    return () => clearInterval(id);
  }, []);

  // Size the Canvas resolution
  const sizeCanvas = () => {
    const dpr = window.devicePixelRatio;
    const elem = ref.current;
    const { height } = elem.getBoundingClientRect();
    const [ bufferW, bufferH ] = [ height, height ].map(x => Math.ceil(x * dpr));
    const [ newW, newH ] = [ bufferW, bufferH ].map(x => x / dpr);
    elem.style.width = newW + 'px';
    elem.style.height = newH + 'px';
    elem.width = bufferW;
    elem.height = bufferH;
  };
  useEffect(() => {
    sizeCanvas();
    // window.addEventListener('resize', sizeCanvas);
    // return () => window.removeEventListener('resize', sizeCanvas);
  }, []);

  const [ alpha, setAlpha ] = useState('10');
  const [ scale, setScale ] = useState(1);
  const container = useRef(null);
  return (
    <div
      onMouseEnter={function() {
        setScale(1.02);
      }}
      onMouseMove={function(e) {
        const { clientX: x, clientY: y } = e.nativeEvent;
        const elem = container.current;
        const { width, height, left, top } = elem.getBoundingClientRect();
        const fromCenter = Math.hypot((x - left) / width - 0.5, (y - top - height / 2) / width) * 2;
        const alpha = 8 * fromCenter + 16 * (1 - fromCenter);
        setAlpha((~~alpha).toString(16).padStart(2, '0'));
      }}
      onMouseLeave={function() {
        setAlpha('10');
        setScale(1);
      }}
      ref={container}
      style={{
        display: 'flex',
        color: 'white',
        // position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%,-50%)',
        // border: '1px solid purple',
        ...props,
      }}
    >
      <div
        style={{
          height: '5.5em',
          padding: '20px',
          paddingRight: 0,
          background: `#ffffff${alpha}`,
          borderRadius: 'calc(2.75em + 20px)',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'right center',
          // border: '2px solid white',
        }}
      >
        <div
          style={{
            height: '100%',
            // border: '2px solid red',
            overflow: 'hidden',
          }}
        >
          <canvas
            ref={ref}
            style={{
              height: '100%',
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '5.5em',
          padding: '20px',
          background: `#ffffff${alpha}`,
          borderRadius: 'calc(2.75em + 20px)',
          // border: '2px solid green',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'left center',
        }}
      >
        <div
          style={{
            // border: '1px solid blue',
            height: '80%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
            paddingRight: '.5ex',
          }}
        >
          <div
            style={{
              userSelect: 'all',
              // border: '1px solid cyan',
            }}
          >
            <span>{`${status.descrip}`}</span>
            <span style={{ opacity: 0.618 }}>{` ${status.temp}`}</span>
          </div>
          <div style={{ userSelect: 'all' }}>
            <span style={{ fontSize: '3em' }}>{`${status.irradiance}`}</span>
            <span style={{ opacity: 0.5, whiteSpace: 'nowrap' }}>
              {' Watts / m'}
              <sup style={{ fontSize: 0 }}>^</sup>
              <sup>2</sup>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Convert weather.gov textDescription to Skycon compatible icon name
const LUT = {
  _: [
    [ /Clear Day/, 'clear-day' ],
    [ /Clear Night/, 'clear-night' ],
    [ /Partly Cloudy/, 'partly-cloudy-day' ],
    [ /Partly Cloudy/, 'partly-cloudy-night' ],
    [ /Cloudy|Mostly Cloudy/, 'cloudy' ],
    [ /Rain|Thunderstorms/, 'sleet' ],
    [ /Drizzle|Unknown Precipitation/, 'rain' ],
    [ /Snow/, 'snow' ],
    [ /Windy|Breezy/, 'wind' ],
    [ /Fog|Smoke|Haze|Mist/, 'fog' ],
  ],
  get: function(textDescription) {
    const hour = new Date().getHours();
    const daytime = hour >= 7 && hour < 19;
    textDescription += daytime ? ' Day' : ' Night';
    const match =
      this._.find(([ pattern ]) => pattern.test(textDescription)) ||
      (daytime ? this._[0] : this._[1]);
    return LOG(match[1]);
  },
};

// Create a Skycon, attach to canvas, play, return the Skycon
function setIcons(canvas, textDescription) {
  const skycons = new Skycons({ color: 'white', speed: 1.5 });
  const currentIcon = LUT.get(textDescription);
  skycons.add(canvas, currentIcon);
  skycons.play();
  return skycons;
}

const fahr = x => x * 9 / 5 + 32;

const derivedConfig = {
  fields: [
    'Timestamp',
    'Local Time',
    'MPPT Power (W)',
    'MPPT Energy Accumulated (Wh)',
    'Load-Only Power (W)',
    'Load-Only Energy Accumulated (Wh)',
    'Total Irradiance (W/m^2)',
    'Theoretical Power (W)',
    'Theoretical Energy Accumulated (Wh)',
  ],
  panelArea: 1.56,
  panelTilt: 28.5,
  panelAzimuth: 185.7,
};

// See EE462L Week 4 Lab document.
function calculateTotalIrradiance(sample) {
  const { dhi, dni, zenith: sunZenith, azimuth: sunAzimuth } = sample;
  const { panelArea, panelTilt, panelAzimuth } = derivedConfig;
  // Convert trig functions to use degrees instead of radians.
  const [ cos, sin ] = [ Math.cos, Math.sin ].map(f => x => f(x / 180 * Math.PI));
  const cosBetaIncident =
    sin(sunZenith) * sin(panelTilt) * cos(sunAzimuth - panelAzimuth) +
    cos(sunZenith) * cos(panelTilt);
  const irradiation = (dhi + dni * cosBetaIncident) * panelArea;
  return irradiation;
}

const getPeriodEnd = row => (row ? new Date(row.slice(-2)[0]) : NaN);

function getIrradiance(d) {
  const now = Date.now() - 30 * 60e3;
  const present = d.find(row => getPeriodEnd(row) > now);

  new Date(present.slice(-2)[0]);
  const sample = {
    dni: +present[4],
    dhi: +present[7],
    zenith: +present[9],
    azimuth: +present[10],
  };
  return calculateTotalIrradiance(sample);
}
