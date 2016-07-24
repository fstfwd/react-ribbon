/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import React from 'react';
import ClassNames from 'classnames';
import RibbonBase from './RibbonBase';
import RibbonAppMenuItem from './RibbonAppMenuItem';
import RibbonAppMenuItemData from './data/RibbonAppMenuItemData';
import { newGUID } from './utility';

const Items = Symbol( 'items' );

/**
 * RibbonAppTab
 * @extends RibbonBase
 * @class
 */
export default class RibbonAppTab extends RibbonBase {
	/**
	 * RibbonAppTab constructor
	 * @param {object} props - React component properties
	 */
	constructor( props ) {
		super( props );

		this.state = Object.assign( this.state,
			{
				items: [].concat( props.items )
			});

		this[Items] = [];

		this.handleClick = this.handleClick.bind( this );
		this.handleClose = this.handleClose.bind( this );
	}

	/**
	 * Tab type.
	 * @return {string} - Tab type for identification.
	 */
	get type() {
		return this.props.type;
	}

	/**
	 * Panel's children items
	 * @return {[RibbonItemData]} - Ribbon item data.
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

		const prop = { enabled: isEnabled, actived: false };
		const onStateChange = this.props.onStateChange;
		onStateChange && onStateChange( this.id, prop, true );

		this.setState( prop );

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
		const isEnabled = !isHidden;

		const prop = { hidden: isHidden, enabled: isEnabled, actived: false };
		const onStateChange = this.props.onStateChange;
		onStateChange && onStateChange( this.id, prop, true );

		this.setState( prop );

		// Cascaded applying changes
		this.items.map( ( item ) => {
			item.hidden = isHidden;
		});
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
	 * Add new RibbonAppMenuItem by given data.
	 * @param {RibbonAppMenuItemData} itemData - Ribbon item data for creating new item on the app menu.
	 * @return {RibbonAppMenuItem} - Rendered RibbonAppMenuItem component.
	 */
	addItem( itemData ) {
		const idx = this.items.findIndex( ( item ) => ( item.id === itemData.id || item.name === itemData.name ) );
		if( !(itemData instanceof RibbonAppMenuItemData) || idx !== -1 )
			return console.log( '%c[RibbonAppTab] Input itemData is invalid or duplicate.', 'color:red;' );

		const items = this.state.items.concat( itemData );

		const prop = { items };
		const onStateChange = this.props.onStateChange;
		onStateChange && onStateChange( this.id, prop, true );

		this.setState( prop );

		return this.items[ this.items.length -1 ];
	}

	componentWillUpdate( nextProps, nextState ) {
		this[Items].length = 0;
	}

	/**
	 * Tab clicking event handler
	 */
	handleClick( event ) {
		const onClick = this.props.onClick;
		onClick && onClick( this.id );
	}

	handleClose( event ) {
		event.stopPropagation();

		this.actived = false;
	}

	render() {
		const scope = this;
		const dynCSS = ClassNames({
			'ui-ribbon-active': this.actived,
			'ui-ribbon-disabled': ( this.enabled === false ),
			'ui-ribbon-invisible': this.hidden,
			'ui-ribbon-inline': ( this.hidden === false )
		});

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

		return (
			<li
				key={ this.id }
				id={ this.id }
				className={ this.type + " " + dynCSS }
				role="ui-ribbon-tab"
				onClick={ this.handleClick } >

				<span className="ui-ribbon-uppercase">{ this.displayName }</span>
				<div className="ui-ribbon-tab-application-contents ui-ribbon-absolute">
					<div id="ribbon-nav-application-menu">
						<div className="ribbon-nav-back-arrow" onClick={ this.handleClose }></div>
						<ul role="ribbon-nav-application-menu-items">
							{
								this.state.items.map( ( item ) => {
									return <RibbonAppMenuItem
														key={ item.id }
														id={ item.id }
														name={ item.name }
														displayName={ item.displayName }
														enabled={ item.enabled }
														hidden={ item.hidden }
														type={ item.type }
														actived={ item.actived }
														onStateChange={ updateItem }
														ref={ ( c ) => { if( c ) scope.items.push( c ) } } />
								})
							}
						</ul>
					</div>
					<div role="ribbon-nav-application-menu-content">
					</div>
				</div>
			</li>
		);
	}
}

RibbonAppTab.propTypes = {
	id: React.PropTypes.string.isRequired,
	type: React.PropTypes.string.isRequired,
	actived: React.PropTypes.bool,
	items: React.PropTypes.arrayOf( React.PropTypes.instanceOf( RibbonAppMenuItemData ) ),
	onStateChange: React.PropTypes.func
};

RibbonAppTab.defaultProps = {
	id: newGUID(),
	type: 'ui-ribbon-tab-application',
	actived: false,
	items: []
};