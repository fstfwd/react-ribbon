/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import React from 'react';
import ClassNames from 'classnames';
import RibbonBase from './RibbonBase';
import RibbonAppMenuSeperator from './RibbonAppMenuSeperator';
import { newGUID } from './Utility';

/**
 * RibbonAppMenuItem
 * @extends RibbonBase
 * @class
 */
export default class RibbonAppMenuItem extends RibbonBase {
  /**
   * RibbonAppMenuItem constructor
   * @param {object} props - React component properties
   */
  constructor( props ) {
    super( props );

    let actived = ( props.actived === true );
    let content = props.content;

    this.state = Object.assign( this.state,
      {
        actived: actived,
        content: content
      });

    this.handleClick = this.handleClick.bind( this );
  }

  /**
   * Item type.
   * @return {string} - Item type for identification.
   */
  get type() {
    return this.props.type;
  }

  /**
   * Panel has seperator or not.
   * @return {bool} - If true, panel will be seperated with other panels by a panel seperator.
   */
  get seperator() {
    return this.props.seperator;
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
  }

  /**
   * Tab actived state.
   * @return {bool} - If true, it repsents tab is selected currently.
   */
  get actived() {
    return this.state.actived;
  }

  /**
   * Tab actived state.
   * @return {bool} [actived = false] - If true, it repsents tab is selected currently.
   */
  set actived( actived = false ) {
    const isActived = ( actived === true );
    const prop = { actived: isActived };

    const onStateChange = this.props.onStateChange;
    onStateChange && onStateChange( this.id, prop, true );

    this.setState( prop );
  }

  /**
   * Menu content handler for rendering app menu content.
   * @return {Function} - Menu content handler.
   */
  get content() {
    return this.state.content;
  }

  /**
   * Menu content handler for rendering app menu content.
   * @param {Function} [content] - Menu content handler.
   */
  set content( content ) {
    if( !(content instanceof Function) ) throw 'Input content handler is invalid.';

    const prop = { content };
    const onStateChange = this.props.onStateChange;
    onStateChange && onStateChange( this.id, prop );

    this.setState( prop );
  }

  /**
   * Tab clicking event handler
   */
  handleClick() {
    const onMenuClick = this.props.onMenuClick;
    onMenuClick && onMenuClick( this.id );
  }

  render() {
    const scope = this;
    const dynCSS = ClassNames({
      'ui-ribbon-active': this.actived,
      'ui-ribbon-disabled': ( this.enabled === false ),
      'ui-ribbon-invisible': this.hidden
    });

    const createSeperator = ( seperator = true ) => {
      if( seperator ) {
        const id = newGUID();
        return(
          <RibbonAppMenuSeperator key={ id } id={ id } />
        );
      }
    };

    return (
      <div>
        { createSeperator( this.seperator ) }
        <li key={ this.id } className={ dynCSS } onClick={ this.handleClick }>
            <div> { this.displayName } </div>
        </li>
      </div>
    );
  }
}

RibbonAppMenuItem.propTypes = {
  id: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  seperator: React.PropTypes.bool,
  actived: React.PropTypes.bool,
  content: React.PropTypes.func,
  onMenuClick: React.PropTypes.func,
  onStateChange: React.PropTypes.func
};

RibbonAppMenuItem.defaultProps = {
  id: newGUID(),
  type: 'ui-ribbon-app-menu-normal',
  seperator: false,
  actived: false
};