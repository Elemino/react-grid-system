import React from 'react';
import * as style from './style.css.js';
import { getViewPort } from '../../util';

export default class Visible extends React.Component {
  static propTypes = {
    /**
     * Content of the component
     */
    children: React.PropTypes.element,
    /**
     * Show on extra small devices
     */
    xs: React.PropTypes.bool,
    /**
     * Show on small devices
     */
    sm: React.PropTypes.bool,
    /**
     * Show on medium devices
     */
    md: React.PropTypes.bool,
    /**
     * Show on large devices
     */
    lg: React.PropTypes.bool,
  };

  static contextTypes = {
    phone: React.PropTypes.bool,
    tablet: React.PropTypes.bool,
    breakpoints: React.PropTypes.arrayOf(React.PropTypes.number),
  };

  static defaultProps = {
    xs: false,
    sm: false,
    md: false,
    lg: false,
  };

  componentWillMount = () => {
    this.setViewport();
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.setViewport);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.setViewport);
  }

  setViewport = () => {
    this.setState({ viewport: getViewPort(this.context) });
  }

  render = () => {
    if (!style.visible({
      viewport: this.state.viewport,
      xs: this.props.xs,
      sm: this.props.sm,
      md: this.props.md,
      lg: this.props.lg,
      breakpoints: this.context.breakpoints,
    })) return false;
    return this.props.children;
  }
}
