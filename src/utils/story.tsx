import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import ReactResizeDetector from 'react-resize-detector';

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
      <ReactResizeDetector handleWidth handleHeight>
        {(width: number, height: number) => func(width, height)}
      </ReactResizeDetector>
    ));
};
