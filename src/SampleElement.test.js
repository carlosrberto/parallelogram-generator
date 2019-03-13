import React from 'react';
import { shallow } from 'enzyme';
import SampleElement from './SampleElement';

describe('SampleElement', () => {
  it('SampleElement should render', () => {
    shallow(<SampleElement>text</SampleElement>);
  });
});
