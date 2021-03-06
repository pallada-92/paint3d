import * as React from 'react';

import { Stroke3d } from '../types';
import { randomStrokes3d } from '../utils/random';
import { makeHostStory } from '../utils/story';
import Controls from './Controls';
import PointerCanvas from './PointerCanvas';
import StrokeCanvas from './StrokeCanvas';

makeHostStory('Controls', (width: number, height: number) => (
  <Controls
    addStroke={(stroke: Stroke3d) => console.log(stroke)}
    data3d={randomStrokes3d(10000, 10000, 10000, 5000)}
    width={width}
    height={height}
  >
    {({ onDraw, onRotate, onScroll, data }) => (
      <React.Fragment>
        <StrokeCanvas width={width} height={height} data={data} />
        <PointerCanvas
          width={width}
          height={height}
          onDraw={onDraw}
          onRotate={onRotate}
          onScroll={onScroll}
        />
      </React.Fragment>
    )}
  </Controls>
));
