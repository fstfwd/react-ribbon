/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import React from 'react';
import ClassNames from 'classnames';
import RibbonItem from './RibbonItem';
import RibbonTooltip from './RibbonTooltip';
import RibbonTooltipData from './data/RibbonTooltipData';
import { newGUID, stderr } from './Utility';

/**
 * RibbonButton
 * @extends RibbonItem
 * @class
 */
export default class RibbonButton extends RibbonItem {
  /**
   * RibbonButton constructor
   * @param {object} props - React component properties
   */
  constructor( props ) {
    super( props );

    let icon = props.icon;
    let tooltip = props.tooltip;
    let toggleable = ( props.toggleable === true );
    let clickHandler = props.clickHandler;

    this.state = Object.assign( this.state,
      {
        icon,
        tooltip,
        toggleable,
        clickHandler
      });

    this.handleClick = this.handleClick.bind( this );
    this.handleMouseOver = this.handleMouseOver.bind( this );
    this.handleMouseOut = this.handleMouseOut.bind( this );
  }

  /**
   * Button role.
   * @return {string}
   */
  get role() {
    return this.props.role;
  }

  /**
   * Button icon.
   * @return {string} - Button icon path.
   */
  get icon() {
    return this.state.icon;
  }

  /**
   * Button icon.
   * @return {string} icon - Button icon path.
   */
  set icon( icon ) {
    if( typeof icon !== 'string' ) throw 'Input type should be a string.';

    const prop = { icon };
    const onStateChange = this.props.onStateChange;
    onStateChange && onStateChange( this.id, prop );

    this.setState( prop );
  }

  /**
   * Button toggleable state.
   * @return {bool} - If true, it repsents button is toggled currently.
   */
  get toggleable() {
    return this.state.toggleable;
  }

  /**
   * Button toggleable state.
   * @return {bool} [toggleable = false] - If true, it repsents button is toggled currently.
   */
  set toggleable( toggleable = false ) {
    const isToggleable = ( toggleable === true );

    const prop = { toggleable: isToggleable };
    const onStateChange = this.props.onStateChange;
    onStateChange && onStateChange( this.id, prop );

    this.setState( prop );
  }

  /**
   * Button click eveent handler.
   * @return {Function} - Click eveent handler.
   */
  get clickHandler() {
    return this.state.clickHandler;
  }

  /**
   * Button click eveent handler.
   * @param {Function} handler - Click eveent handler.
   */
  set clickHandler( handler ) {
    if( !(handler instanceof Function) )
      throw 'Input clicking handler is invalid.';

    const prop = { clickHandler: handler };
    const onStateChange = this.props.onStateChange;
    onStateChange && onStateChange( this.id, prop );

    this.setState( prop );
  }

  /**
   * Button tooltip comopent.
   * @return {RibbonTooltip} - Rendered RibbonTooltip component.
   */
  get tooltip() {
    return this.refs.tooltip;
  }

  set tooltip( tooltip ) {
    if( !(tooltip instanceof RibbonTooltipData) )
      throw '[RibbonButton] Input tooltip data is invalid.';

    const prop = { tooltip };
    const onStateChange = this.props.onStateChange;
    onStateChange && onStateChange( this.id, prop );

    this.setState( prop );
  }

  /**
   * Create tooltip
   * @return {RibbonTooltip} - RibbonTooltip instance (not rendered).
   */
  createTooltip() {
    const scope = this;
    const data = this.state.tooltip;
    if( !data ) return;

    if( !(data instanceof RibbonTooltipData) && data )
      return stderr( '%c[RibbonButton] Input tooltip data is invalid.', 'color:red;' );

    const updateTooltip = ( id, data ) => {
      let tooltip = scope.state.tooltip;

      if( tooltip.id !== id ) return;

      Object.assign( tooltip, data );

      const prop = { tooltip };
      const onStateChange = scope.props.onStateChange;
      onStateChange && onStateChange( scope.id, prop );

      scope.setState( prop );
    };

    return (
      <RibbonTooltip
        key={ data.id }
        id={ data.id }
        name={ data.name }
        displayName={ data.title }
        content={ data.content }
        enabled={ data.enabled }
        hidden={ data.hidden }
        onStateChange={ updateTooltip }
        ref="tooltip" />
    );
  }

  /**
   * Button clicking event handler.
   */
  handleClick( event ) {
    if( !this.enabled ) return;

    const clickHandler = this.props.clickHandler;
    clickHandler && clickHandler( event );
  }

  /**
   * Button hovering over event handler.
   */
  handleMouseOver() {
    const tooltip = this.tooltip;
    tooltip && tooltip.show();
  }

  /**
   * Button hovering out event handler.
   */
  handleMouseOut() {
    const tooltip = this.tooltip;
    tooltip && tooltip.hide();
  }

  render() {
    const outerDynCSS = ClassNames({
      'ui-ribbon-disabled': ( this.enabled === false ),
      'ui-ribbon-invisible': this.hidden
    });

    const innerDynCSS = ClassNames({
      'ui-ribbon-active': this.actived
    });

    const formatLegend = ( legend ) => {
      const texts = legend.split( '\\n' );
      let guid = newGUID();
      let result = <span key={ guid } id={ guid }>{ legend }</span>;

      if( texts.length > 1 ) {
        result = texts.map(( txt ) => {
          let guid = newGUID();
          return (
              <span key={ guid } id={ guid }>
                { txt }
                <br />
              </span>
          );
        });
      }
      return result;
    };

    return (
      <a
        key={ this.id }
        id={ this.id }
        className={ outerDynCSS }
        onClick={ this.handleClick }
        onMouseOver={ this.handleMouseOver }
        onMouseOut={ this.handleMouseOut } >

        <div
          role={ this.role }
          className={ 'ui-ribbon-button ' + this.type + ' ui-ribbon-relative ui-ribbon-inline ui-ribbon-center ' + innerDynCSS } >

          <img src={ this.icon } />
          <div className="ui-ribbon-button-legend">
            { formatLegend( this.displayName ) }
          </div>
          { this.createTooltip() }
        </div>
      </a>
    );
  }
}

RibbonButton.propTypes = {
  id: React.PropTypes.string.isRequired,
  role: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string,
  tooltip: React.PropTypes.instanceOf( RibbonTooltipData ),
  toggleable: React.PropTypes.bool,
  clickHandler: React.PropTypes.func,
  onStateChange: React.PropTypes.func
};

RibbonButton.defaultProps = {
  id: newGUID(),
  role: 'ui-ribbon-button',
  type: 'ui-ribbon-button',
  icon: '',
  toggleable: false
};
