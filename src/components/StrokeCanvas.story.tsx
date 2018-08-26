import * as React from 'react';

import { makeHostStory } from '../utils/story';
import StrokeCanvas from './StrokeCanvas';
import { randomStrokes2d } from '../utils/random';

makeHostStory('StrokeCanvas', (width: number, height: number) => (
  <StrokeCanvas
    width={width}
    height={height}
    data={randomStrokes2d(width, height, 100)}
  />
));
