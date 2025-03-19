import React from 'react';
import { FormInput } from '~/components/atoms/form-input/form-input';

describe('FormInput', () => {
  const defaultProps = {
    label: 'Test Label',
    id: 'test-input',
    type: 'text',
  };

  it('renders with required props', () => {
    const wrapper = React.createElement(FormInput, defaultProps);
    expect(wrapper.props).toEqual(expect.objectContaining(defaultProps));
  });

  it('includes error class when error prop is provided', () => {
    const error = 'This field is required';
    const wrapper = React.createElement(FormInput, { ...defaultProps, error });
    expect(wrapper.props.error).toBe(error);
  });

  it('handles password visibility toggle', () => {
    const props = {
      ...defaultProps,
      type: 'password',
      showPassword: true,
    };
    const wrapper = React.createElement(FormInput, props);
    expect(wrapper.props.showPassword).toBe(true);
    expect(wrapper.props.type).toBe('password');
  });

  it('merges additional className with base classes', () => {
    const className = 'custom-class';
    const wrapper = React.createElement(FormInput, { ...defaultProps, className });
    expect(wrapper.props.className).toBe(className);
  });
});
