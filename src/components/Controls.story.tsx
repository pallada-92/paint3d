import * as React from 'react';

import { makeHostStory } from '../utils/story';
import Controls from './Controls';
import StrokeCanvas from './StrokeCanvas';
import PointerCanvas from './PointerCanvas';
import { randomStrokes3d } from '../utils/random';

makeHostStory('Controls', (width: number, height: number) => (
  <Controls
    data3d={randomStrokes3d(10000, 10000, 10000, 100)}
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
