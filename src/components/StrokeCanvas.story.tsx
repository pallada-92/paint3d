import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { host } from 'storybook-host';
import ReactResizeDetector from 'react-resize-detector';

import StrokeCanvas from './StrokeCanvas';
import { randomStrokes2d } from '../utils/random';

storiesOf('StrokeCanvas', module)
  .addDecorator(
    host({
      height: '100%',
      width: '100%',
      border: '1px solid lightgray',
    })
  )
  .add('default', () => (
    <ReactResizeDetector handleWidth handleHeight>
      {(width: number, height: number) => (
        <StrokeCanvas
          width={width}
          height={height}
          data={randomStrokes2d(width, height, 100)}
        />
      )}
    </ReactResizeDetector>
  ));
