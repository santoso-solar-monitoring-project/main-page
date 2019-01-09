import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import IV_Plot from '../components/IV_Plot';
import CornersTest from 'components/GoodCanvas/CornersTest';

import { withKnobs, select, number } from '@storybook/addon-knobs';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role='img' aria-label='so cool'>
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('GoodCanvas', module)
  .addDecorator(withKnobs)
  .add('Corners Test', () => {
    const boxSizing = select('box-sizing', {
      'border-box': 'border-box',
      'content-box': 'content-box',
    });
    const borderWidth = number('borderWidth', 20, {
      range: true,
      min: 0,
      max: 100,
      step: 1,
    });

    return (
      <CornersTest
        style={{
          border: `${borderWidth}px solid red`,
          boxSizing: boxSizing,
        }}
      />
    );
  });

storiesOf('IV Plot', module).add('default', () => {
  return <IV_Plot />;
});

storiesOf('Legend of Potato Hero', module).add('🥔', () => {
  return (
    <p style={{ color: 'magenta' }}>
      Once upon a time, I saw a potato laying outside my door. I wondered what
      it was doing out there. Instead of asking i brought it inside mY room. It
      was shivering because of the cold. I felt extremely guilty leaving it
      outside, so my instinct was to imediately bring it inside. I brought
      inside and gave it a blanket I felt better imediately. Ahhhh, look at me
      im the superhero of this situation now everyone in town considers me a
      hero. When you walk past me remember to thank me for saving the life of a
      fellow potato. ('-')
    </p>
  );
});
