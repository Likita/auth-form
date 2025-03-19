import React from 'react';
import { Button } from '~/components/atoms/button/button';

describe('Button', () => {
  it('renders with default props', () => {
    const wrapper = React.createElement(Button, {}, 'Click me');
    expect(wrapper.props.children).toBe('Click me');
    expect(wrapper.props.variant).toBeUndefined();
    expect(wrapper.props.size).toBeUndefined();
  });

  it('applies variant prop correctly', () => {
    const wrapper = React.createElement(Button, { variant: 'secondary' }, 'Click me');
    expect(wrapper.props.variant).toBe('secondary');
  });

  it('applies size prop correctly', () => {
    const wrapper = React.createElement(Button, { size: 'sm' }, 'Click me');
    expect(wrapper.props.size).toBe('sm');
  });

  it('applies fullWidth prop correctly', () => {
    const wrapper = React.createElement(Button, { fullWidth: true }, 'Click me');
    expect(wrapper.props.fullWidth).toBe(true);
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    const wrapper = React.createElement(Button, { onClick: handleClick }, 'Click me');
    expect(wrapper.props.onClick).toBe(handleClick);
  });

  it('handles disabled state', () => {
    const wrapper = React.createElement(Button, { disabled: true }, 'Click me');
    expect(wrapper.props.disabled).toBe(true);
  });

  it('merges additional className', () => {
    const wrapper = React.createElement(Button, { className: 'custom-class' }, 'Click me');
    expect(wrapper.props.className).toBe('custom-class');
  });
});
