/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import React from 'react';
import ClassNames from 'classnames';
import RibbonGroup from './RibbonGroup';
import RibbonToggleButton from './RibbonToggleButton';
import RibbonToggleButtonData from './data/RibbonToggleButtonData';
import { newGUID } from './utility';

const Current = Symbol( 'current' );
const Default = Symbol( 'default' );

/**
 * RibbonRadioButtonGroup
 * @extends RibbonGroup
 * @class
 */
export default class RibbonRadioButtonGroup extends RibbonGroup {
	/**
	 * RibbonRadioButtonGroup constructor
	 * @param {object} props - React component properties
	 */
	constructor( props ) {
		super( props );

		this[Current] = undefined;
		this[Default] = undefined;
	}

	/**
	 * Current actived RibbonToggleButton.
	 * @return {string} - RibbonToggleButton id.
	 */
	get current() {
		return this[Current];
	}

	/**
	 * Current actived RibbonToggleButton.
	 * @param {string} id - RibbonToggleButton id.
	 */
	set current( id ) {
		const current = this.items.find( ( item ) => item.id === id && item.enabled );
		if( !current ) throw '[RibbonRadioButtonGroup] Input id not exists or disabled.'

		current.actived = true;
		this[Current] = id;

		if( !this.default )
			this.default = id;

		this.items.map( ( item ) => {
			if( item.id !== id ) item.actived = false;
		});
	}

	/**
	 * Default actived RibbonToggleButton.
	 * @return {string} - RibbonToggleButton id.
	 */
	get default() {
		return this[Default];
	}

	/**
	 * Default actived RibbonToggleButton.
	 * @param {string} - RibbonToggleButton id.
	 */
	set default( id ) {
		const item = this.items.find( ( item ) => item.id === id && item.enabled );
		if( !item ) throw '[RibbonRadioButtonGroup] Input id not exists or disabled.'

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
	 * Add new RibbonToggleButton by given data.
	 * @param {RibbonToggleButtonData} itemData - Ribbon button data for creating new item in the RibbonRadioButtonGroup.
	 * @return {RibbonToggleButton} - Rendered RibbonToggleButton component.
	 * @override
	 */
	addItem( itemData ) {
		if( !(itemData instanceof RibbonToggleButtonData) )
			return console.log( '%c[RibbonGroup] Input itemData is invalid or duplicate.', 'color:red;' );

		const item = super.addItem( itemData );

		if( !this.default )
			this.default = item.id;

		return item;
	}
	
	render() {
		const scope = this;
		const items = this.state.items;

		const updateCurrentItem = ( id ) => {
			if( typeof id !== 'string' ) return;

			scope.current = id;
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
		};

		const createItem = ( item ) => {
			return (
				<RibbonToggleButton
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
					onGroupCurrentChange={ () => { updateCurrentItem( item.id ) } }
					onStateChange={ updateItem }
					ref={ ( c ) => { if( c ) scope.items.push( c ) } } />
			);
		};

		const dynCSS = ClassNames({
			'ui-ribbon-disabled': ( this.enabled === false ),
			'ui-ribbon-invisible': this.hidden
		});

		return (
			<div
				key={ this.id }
				id={ this.id }
				className={ "ui-ribbon-group ui-ribbon-inline " + dynCSS }>

				{ items.map( createItem ) }
			</div>
		);
	}
}

RibbonGroup.propTypes = {
	id: React.PropTypes.string.isRequired,
	items: React.PropTypes.arrayOf( React.PropTypes.instanceOf( RibbonToggleButtonData ) ),
	onStateChange: React.PropTypes.func
};

RibbonGroup.defaultProps = {
	id: newGUID(),
	items: []
};
