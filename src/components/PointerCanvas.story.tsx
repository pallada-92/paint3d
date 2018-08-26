import { action } from '@storybook/addon-actions';
import * as React from 'react';

import { makeHostStory } from '../utils/story';
import PointerCanvas from './PointerCanvas';

/*
const action = (name: string) => (arg: any) => {
  console.log(name, arg);
};
*/

makeHostStory('PointerCanvas', (width: number, height: number) => (
  <PointerCanvas
    width={width}
    height={height}
    onDraw={action('draw')}
    onRotate={action('rotate')}
    onScroll={action('scroll')}
  />
));
