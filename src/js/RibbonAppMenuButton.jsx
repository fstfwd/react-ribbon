/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import React from 'react';
import RibbonAppMenuItem from './RibbonAppMenuItem';
import { newGUID } from './utility';

/**
 * RibbonAppMenuButton
 * @extends RibbonAppMenuItem
 * @class
 */
export default class RibbonAppMenuButton extends RibbonAppMenuItem {
  /**
   * RibbonAppMenuButton constructor
   * @param {object} props - React component properties
   */
  constructor( props ) {
    super( props );

    this.handleClick = this.handleClick.bind( this );
  }

  /**
   * Button click eveent handler.
   * @return {Function} - Click eveent handler.
   */
  get clickHandler() {
    return this.state.content;
  }

  /**
   * Button click eveent handler.
   * @param {Function} handler - Click eveent handler.
   */
  set clickHandler( handler ) {
    if( !(handler instanceof Function) ) throw 'Input clicking handler is invalid.';

    this.content = handler;
  }

  /**
   * Menu clicking event handler
   */
  handleClick( event ) {
    if( !this.enabled ) return;

    const onClick = this.state.content;
    onClick && onClick( event );
  }
}

RibbonAppMenuButton.propTypes = {
  id: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  seperator: React.PropTypes.bool,
  actived: React.PropTypes.bool,
  content: React.PropTypes.func,
  onStateChange: React.PropTypes.func
};

RibbonAppMenuButton.defaultProps = {
  id: newGUID(),
  type: 'ui-ribbon-app-menu-button',
  seperator: true,
  actived: false
};