/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import React from 'react';
import RibbonBase from './RibbonBase';
import { newGUID } from './Utility';

/**
 * RibbonItem
 * @extends RibbonBase
 * @class
 */
export default class RibbonItem extends RibbonBase {
  /**
   * RibbonItem constructor
   * @param {object} props - React component properties
   */
  constructor( props ) {
    super( props );
    
    let actived = ( props.actived === true );

    this.state = Object.assign( this.state, { actived } );
  }

  /**
   * Item type.
   * @return {string} - Item type for identification.
   */
  get type() {
    return this.props.type;
  }
  
  /**
   * Item actived state.
   * @return {bool} - If true, it repsents item is actived currently.
   */
  get actived() {
    return this.state.actived;
  }

  /**
   * Item actived state.
   * @return {bool} [actived = false] - If true, it repsents item is actived currently.
   */
  set actived( actived = false ) {
    const isActived = ( actived === true );
    const prop = { actived: isActived };

    const onStateChange = this.props.onStateChange;
    onStateChange && onStateChange( this.id, prop );

    this.setState( prop );
  }
}

RibbonItem.propTypes = {
  id: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  actived: React.PropTypes.bool,
  onStateChange: React.PropTypes.func
};

RibbonItem.defaultProps = {
  id: newGUID(),
  type: 'ui-ribbon-panel-item',
  actived: false
};
