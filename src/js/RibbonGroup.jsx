/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import React from 'react';
import ClassNames from 'classnames';
import RibbonItem from './RibbonItem';
import RibbonButton from './RibbonButton';
import RibbonPushButton from './RibbonPushButton';
import RibbonToggleButton from './RibbonToggleButton';
import RibbonItemData from './data/RibbonItemData';
import RibbonButtonData from './data/RibbonButtonData';
import RibbonPushButtonData from './data/RibbonPushButtonData';
import RibbonToggleButtonData from './data/RibbonToggleButtonData';
import { newGUID, stderr } from './Utility';

const Items = Symbol( 'items' );

/**
 * RibbonGroup
 * @extends RibbonItem
 * @class
 */
export default class RibbonGroup extends RibbonItem {
  /**
   * RibbonGroup constructor
   * @param {object} props - React component properties
   */
  constructor( props ) {
    super( props );

    this.state = Object.assign( this.state,
      {
        items: [].concat( props.items )
      });

    this[Items] = [];
  }

  /**
   * Panel's children items
   * @return {[RibbonButtonData]} - Ribbon item data.
   */
  get items() {
    return this[Items];
  }

  /**
   * Instance edis/en-able status.
   * @return {bool} - If false, make instance be disabled.
   */
  get enabled() {
    return super.enabled;
  }

  /**
   * Instance edis/en-able status.
   * @param {bool} [enabled = true] - If false, make instance be disabled.
   */
  set enabled( enabled = true ) {
    if( this.hidden ) return;

    const isEnabled = ( enabled === true );
    super.enabled = isEnabled;

    // Cascaded applying changes
    this.items.map( ( item ) => {
      item.enabled = isEnabled;
    });
  }

  /**
   * Instance is hidden or not.
   * @return {bool} - If false, instance is going to disppear on the UI.
   */
  get hidden() {
    return super.hidden;
  }

  /**
   * Instance is hidden or not.
   * @return {bool} [hidden = false]- If false, instance is going to disppear on the UI.
   */
  set hidden( hidden = false ) {
    const isHidden = ( hidden === true );
    super.hidden = isHidden;

    // Cascaded applying changes
    this.items.map( ( item ) => {
      item.hidden = isHidden;
    });
  }

  /**
   * Add new RibbonButton by given data.
   * @param {RibbonButtonData} itemData - Ribbon button data for creating new item in the RibbonGroup.
   * @return {RibbonButton} - Rendered RibbonButton component.
   */
  addItem( itemData ) {
    const idx = this.items.findIndex( ( item ) => ( item.id == itemData.id || item.name === itemData.name ) );
    if( !(itemData instanceof RibbonButtonData) || idx !== -1 )
      return stderr( '%c[RibbonGroup] Input itemData is invalid or duplicate.', 'color:red;' );

    const items = this.state.items.concat( itemData );

    const prop = { items };
    const onStateChange = this.props.onStateChange;
    onStateChange && onStateChange( this.id, prop );

    this.setState( prop );

    return this.items[ this.items.length -1 ];
  }

  componentWillUpdate( nextProps, nextState ) {
    this[Items].length = 0;
  }

  render() {
    const scope = this;
    const items = this.state.items;

    const updateItem = ( id, data ) => {
      let items = scope.state.items;
      const item = items.find( ( item ) => item.id === id );
      if( !item ) return;

      Object.assign( item, data );

      const prop = { items };
      const onStateChange = scope.props.onStateChange;
      onStateChange && onStateChange( scope.id, prop );

      scope.setState( prop );
    };

    const createItem = ( item ) => {
      let result;
      if( item.type === 'ui-ribbon-button-big' ) {
        const RibbonPushButtonLike = ( item.role === 'ui-ribbon-button-toggle' ) ? RibbonToggleButton : RibbonPushButton;
        result = (
          <RibbonPushButtonLike
            key={ item.id }
            id={ item.id }
            name={ item.name }
            displayName={ item.displayName }
            enabled={ item.enabled }
            hidden={ item.hidden }
            type={ item.type }
            actived={ item.actived }
            icon={ item.icon }
            tooltip={ item.tooltip }
            toggleable={ item.toggleable }
            clickHandler={ item.clickHandler }
            onStateChange={ updateItem }
            ref={ ( c ) => { if( c ) scope.items.push( c ); } } />
          );
      }

      return result;
    };

    const dynCSS = ClassNames({
      'ui-ribbon-disabled': ( this.enabled === false ),
      'ui-ribbon-invisible': this.hidden
    });

    return (
      <div
        key={ this.id }
        id={ this.id }
        className={ 'ui-ribbon-group ui-ribbon-inline ' + dynCSS }>

        { items.map( createItem ) }
      </div>
    );
  }
}

RibbonGroup.propTypes = {
  id: React.PropTypes.string.isRequired,
  items: React.PropTypes.arrayOf( React.PropTypes.instanceOf( RibbonButtonData ) ),
  onStateChange: React.PropTypes.func
};

RibbonGroup.defaultProps = {
  id: newGUID(),
  items: []
};
