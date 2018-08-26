import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { host } from 'storybook-host';

export const makeHostStory = (
  name: string,
  func: (width: number, height: number) => any
) => {
  storiesOf(name, module)
    .addDecorator(
      host({
        height: '100%',
        width: '100%',
        border: '1px solid lightgray',
      })
    )
    .add('default', () => (
      <ReactResizeDetector handleWidth={true} handleHeight={true}>
        {(width: number, height: number) => func(width, height)}
      </ReactResizeDetector>
    ));
};
