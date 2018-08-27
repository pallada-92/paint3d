import * as React from 'react';

import Controls from './Controls';
import PointerCanvas from './PointerCanvas';
import StrokeCanvas from './StrokeCanvas';
import Synchronizer from './Synchronizer';

import FitWindow from './FitWindow';

const App = () => (
  <Synchronizer>
    {({ addStroke, data: data3d }) => (
      <FitWindow>
        {(width: number, height: number) => (
          <Controls
            addStroke={addStroke}
            data3d={data3d}
            width={width}
            height={height}
          >
            {({ onDraw, onRotate, onScroll, data: data2d }) => (
              <React.Fragment>
                <StrokeCanvas width={width} height={height} data={data2d} />
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
      </FitWindow>
    )}
  </Synchronizer>
);

export default App;
