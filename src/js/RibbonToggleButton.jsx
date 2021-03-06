/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import React from 'react';
import RibbonPushButton from './RibbonPushButton';

/**
 * RibbonToggleButton
 * @class
 */
export default class RibbonToggleButton extends RibbonPushButton {
  /**
   * RibbonToggleButton constructor
   * @param {object} props - React component properties
   */
  constructor( props ) {
    super( props );

    this.handleClick = this.handleClick.bind( this );
  }

  /**
   * Button clicking event handler.
   * @override
   */
  handleClick( event ) {
    if( !this.enabled ) return;

    if( this.toggleable ) {
      const isActived = !this.actived;

      const prop = { actived: isActived };
      const onStateChange = this.props.onStateChange;
      onStateChange && onStateChange( this.id, prop );

      this.setState( prop );

      // For de/activating button by changing button's actived property.
      const onGroupCurrentChange = this.props.onGroupCurrentChange;
      onGroupCurrentChange && onGroupCurrentChange();
    }

    const clickHandler = this.props.clickHandler;
    clickHandler && clickHandler( event );
  }
}

RibbonToggleButton.propTypes = {
  type: React.PropTypes.string.isRequired,
  role: React.PropTypes.string.isRequired,
  onGroupCurrentChange: React.PropTypes.func,
  onStateChange: React.PropTypes.func
};

RibbonToggleButton.defaultProps = {
  role: 'ui-ribbon-button-toggle',
  type: 'ui-ribbon-button-big'
};
