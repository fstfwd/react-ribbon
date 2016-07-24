/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import React from 'react';
import ClassNames from 'classnames';
import RibbonBase from './RibbonBase';
import RibbonAppMenuItem from './RibbonAppMenuItem';
import RibbonAppMenuButton from './RibbonAppMenuButton';
import RibbonAppMenuItemData from './data/RibbonAppMenuItemData';
import RibbonAppMenuButtonData from './data/RibbonAppMenuButtonData';
import { newGUID } from './utility';

const Items = Symbol( 'items' );
const Current = Symbol( 'current' );
const Default = Symbol( 'default' );

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
		this[Current] = undefined;
		this[Default] = undefined;

		this.handleClick = this.handleClick.bind( this );
		this.handleClose = this.handleClose.bind( this );
		this.handleItemClick = this.handleItemClick.bind( this );
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
	 * Current actived RibbonAppMenuItem.
	 * @return {string} - RibbonAppMenuItem id.
	 */
	get current() {
		return this[Current];
	}

	/**
	 * Current actived RibbonAppMenuItem.
	 * @param {string} id - RibbonAppMenuItem id.
	 */
	set current( id ) {
		const current = this.items.find( ( item ) => item.id === id && item.type !== 'ui-ribbon-app-menu-button' && item.enabled );
		if( !current ) throw '[RibbonAppTab] Input id not exists or disabled.'

		current.actived = true;
		this[Current] = id;

		if( !this.default )
			this.default = id;

		this.items.map( ( item ) => {
			if( item.id !== id ) item.actived = false;
		});
	}

	/**
	 * Default actived RibbonAppMenuItem.
	 * @return {string} - RibbonAppMenuItem id.
	 */
	get default() {
		return this[Default];
	}

	/**
	 * Default actived RibbonAppMenuItem.
	 * @param {string} - RibbonAppMenuItem id.
	 */
	set default( id ) {
		const item = this.items.find( ( item ) => item.id === id && item.type !== 'ui-ribbon-app-menu-button' && item.enabled );
		if( !item ) throw '[RibbonAppTab] Input id not exists or disabled.'

		this[Default] = id;

		if( !this.current )
			this.current = id;
	}

	/**
	 * Reset current item to the default.
	 */
	resetCurrent() {
		this.current = this.default;
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

		const item = this.items[ this.items.length -1 ];
		if( !(item instanceof RibbonAppMenuButton) && !this.default )
			this.default = item.id;

		return item;
	}

	/**
	 * Active target item by given id.
	 * @param {string} itemId - Item Id.
	 */
	activeItemById( itemId ) {
		if( typeof itemId !== 'string' ) return console.log( '%c[RibbonAppTab] ItemId should be a string.', 'color:red;' );

		const item = this.items.find( ( item ) => item.id === itemId );
		if( !item ) throw '[RibbonAppTab] Input item id not exists.';

		item.actived = true;
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

	/**
	 * Tab clicking event handler
	 */
	handleItemClick( itemId ) {
		this.activeItemById( itemId );
	}

	render() {
		const scope = this;
		const dynCSS = ClassNames({
			'ui-ribbon-active': this.actived,
			'ui-ribbon-disabled': ( this.enabled === false ),
			'ui-ribbon-invisible': this.hidden,
			'ui-ribbon-inline': ( this.hidden === false )
		});

		const updateCurrentItem = ( id ) => {
			if( typeof id !== 'string' ) return;

			scope[Current] = id;
		};

		const createItem = ( item ) => {
			if( item.type === 'ui-ribbon-app-menu-button' ) {
				return <RibbonAppMenuButton
								key={ item.id }
								id={ item.id }
								name={ item.name }
								displayName={ item.displayName }
								enabled={ item.enabled }
								hidden={ item.hidden }
								type={ item.type }
								actived={ item.actived }
								content={ item.content }
								seperator={ item.seperator }
								onStateChange={ updateItem }
								ref={ ( c ) => { if( c ) scope.items.push( c ) } } />
			} else {
				return <RibbonAppMenuItem
								key={ item.id }
								id={ item.id }
								name={ item.name }
								displayName={ item.displayName }
								enabled={ item.enabled }
								hidden={ item.hidden }
								type={ item.type }
								actived={ item.actived }
								content={ item.content }
								seperator={ item.seperator }
								onMenuClick={ scope.handleItemClick }
								onStateChange={ updateItem }
								ref={ ( c ) => { if( c ) scope.items.push( c ) } } />
			}
		};

		const nextOpt = ( id, data ) => {
			// For de/activating menu by changing menu's actived property.
			if( data.hasOwnProperty( 'actived' ) ) {
				if( data.actived === true ) {
					scope.items.map( ( item ) => {
						if( item.id !== id ) item.actived = false;
					});

					updateCurrentItem( id );
				} else {
					// For activing other menu while current menu is diabled.
					if( data.hasOwnProperty( 'enabled' ) && ( data.enabled === false ) ) {
						const item = scope.items.find( ( item ) => ( item.id !== id && item.enabled === true && item.type !== 'ui-ribbon-app-menu-button' ) );
						if( !item ) return;

						item.actived = true;
						updateCurrentItem( id );
					}
				}
			}
		};

		const updateItem = ( id, data ) => {
			let items = scope.state.items;
			const item = items.find( ( item ) => item.id === id );
			if( !item ) return;

			Object.assign( item, data );

			const prop = { items };
			const onStateChange = scope.props.onStateChange;
			onStateChange && onStateChange( scope.id, prop );

			scope.setState( prop );

			if( item.type === 'ui-ribbon-app-menu-button' ) return;

			nextOpt( id, data );
		};

		const renderItemContent = ( id ) => {
			if( !id ) return;

			let items = scope.state.items;
			const item = items.find( ( item ) => item.id === id );
			if( !item ) return;

			const content = item.content;
			if( !content ) return;

			return content();
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
							{ this.state.items.map( createItem ) }
						</ul>
					</div>
					<div role="ribbon-nav-application-menu-content">
						<div className="ribbon-content-area">
							{ renderItemContent( this.current ) }
						</div>
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