import * as React from 'react';

import { makeHostStory } from '../utils/story';
import Synchronizer from './Synchronizer';
import Controls from './Controls';
import StrokeCanvas from './StrokeCanvas';
import PointerCanvas from './PointerCanvas';

makeHostStory('Synchronizer', (width: number, height: number) => (
  <Synchronizer>
    {({ addStroke, data }) => (
      <Controls
        addStroke={addStroke}
        data3d={data}
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
    )}
  </Synchronizer>
));
