import React from 'react';
import ClassNames from 'classnames';
import RibbonBase from './RibbonBase';
import RibbonItem from './RibbonItem';
import RibbonButton from './RibbonButton';
import RibbonPushButton from './RibbonPushButton';
import RibbonItemData from './data/RibbonItemData';
import RibbonButtonData from './data/RibbonButtonData';
import RibbonPushButtonData from './data/RibbonPushButtonData';
import { newGUID } from './utility';

const Items = Symbol( 'items' );

/**
 * RibbonPanel
 * @extends RibbonBase
 * @class
 */
export default class RibbonPanel extends RibbonBase {
	/**
	 * RibbonPanel constructor
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
	 * Panel has seperator or not.
	 * @return {bool} - If true, panel will be seperated with other panels by a panel seperator.
	 */
	get seperator() {
		return this.props.seperator;
	}

	/**
	 * Panel's children items
	 * @return {[RibbonItemData]} - Ribbon item data.
	 */
	get items() {
		return this[Items];
	}

	/**
	 * Add new RibbonItem by given data.
	 * @param {RibbonItemData} itemData - Ribbon item data for creating new item on the panel.
	 * @return {RibbonItem} - Rendered RibbonItem component.
	 */
	addItem( itemData ) {
		const idx = this.items.findIndex( ( item ) => ( item.id == itemData.id || item.name === itemData.name ) );
		if( !(itemData instanceof RibbonItemData) || idx !== -1 )
			return console.log( '%c[RibbonPanel] Input itemData is invalid or duplicate.', 'color:red;' );

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
		const dynCSS = ClassNames({
			'ui-ribbon-empty': ( this.items.length === 0 ),
			'ui-riibon-panel-single-btn': ( this.items.length === 1 ),
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

		const createItem = ( item ) => {
			let result;
			switch( item.type ) {
				case 'ui-ribbon-button-big':
					result = (
						<RibbonPushButton
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
							ref={ ( c ) => { if( c ) scope.items.push( c ) } } />
					);
					break;
				default:
					break;
				}

			return result;
		};

		const createSeperator = ( seperator = true ) => {
			if( seperator )
				return(
					<div className="ui-ribbon-panel-seperator ui-ribbon-relative ui-ribbon-inline"></div>
				);
		};

		return (
			<div
				key={ this.id }
				className="ui-ribbon-panel-container ui-ribbon-relative ui-ribbon-inline">
				{ createSeperator( this.seperator ) }

				<div className={ "ui-ribbon-panel ui-ribbon-relative ui-ribbon-inline " + dynCSS }>
					<div className="ui-ribbon-panel-contents">
						{ items.map( createItem ) }

						<div className="ui-ribbon-panel-legend ui-ribbon-absolute">
							{ this.displayName }
						</div>
					</div>
				</div>
			</div>
		);
	}
}

RibbonPanel.propTypes = {
	id: React.PropTypes.string.isRequired,
	seperator: React.PropTypes.bool,
	items: React.PropTypes.arrayOf( React.PropTypes.instanceOf( RibbonItemData ) ),
	onStateChange: React.PropTypes.func
};

RibbonPanel.defaultProps = {
	id: newGUID(),
	seperator: true,
	items: []
};
