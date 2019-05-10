// Find all possible textDescriptions
export default {};
(async function() {
  console.clear();
  console.log('hello');
  const root = 'https://api.weather.gov/zones/forecast';
  let i = { current: 0 },
    failed = { current: 0 };

  // descriptions seen before
  const a = new Set([
    'Clear',
    'Mostly Clear',
    'Partly Cloudy',
    'Cloudy',
    'Mostly Cloudy',

    'Smoke',
    'Haze',
    'Fog',
    'Fog/Mist',
    'Light Drizzle',
    'Drizzle',
    'Light Rain',
    'Rain',
    'Heavy Rain',
    'Thunderstorms',
    'Unknown Precipitation',

    'Light Snow',
    'Snow Grains',
    'Snow',
    'Blowing Snow',

    'Breezy',
    'Windy',
    '',
  ]);

  const range =
    new Date().getHours() === 19 // guard, change me
      ? [4000, 5000]
      : (console.log('not running'), [0, 0]);
  let last = Promise.resolve();
  await fetch(root)
    .then(r => r.json())
    .then(d =>
      Promise.all(
        d.features.slice(...range).map((region, j) =>
          fetch(region.id)
            .then(r => r.json())
            .then(d => {
              if (!d.properties) console.log(d);
              Promise.all(
                d.properties.observationStations
                  // .slice(0, 5)
                  .map((station, _, { length }) => {
                    last = last.finally(() =>
                      // log = console.log(i.current++)
                      fetch(`${station}/observations/latest`)
                        .then(r => r.json())
                        .then(
                          (
                            d,
                            log = d && d.properties
                              ? null //console.log(i.current)
                              : console.log({ d, station }, i.current),
                            but = i.current % 200 === 199
                              ? console.clear()
                              : null
                          ) =>
                            d.properties.textDescription
                              .split(' and ')
                              .map(
                                x => (
                                  a.add(x),
                                  console.log(i.current++, x, a.has(x))
                                )
                              )
                        )
                        .catch(error =>
                          //  {
                          //   failed++;
                          // }
                          console.error(
                            'inner',
                            {
                              length,
                              i: i.current,
                              failed: ++failed.current,
                            },
                            error
                          )
                        )
                    );
                  })
              ).catch(
                error => (
                  console.error('all', i.current, error), console.assert(false)
                )
              );
            })
            .catch(error => console.error('top all', j, error))
        )
      )
    );
  // .finally(() => {
  //   console.log((window.a = a));
  // });
  console.log(
    (window.a = a),
    (window.b = {
      get i() {
        return i.current;
      },
      get failed() {
        return failed.current;
      },
    })
  );
})();
