import React from 'react';
import ClassNames from 'classnames';
import RibbonBase from './RibbonBase';
import RibbonItem from './RibbonItem';
import RibbonButton from './RibbonButton';
import RibbonPushButton from './RibbonPushButton';
import RibbonToggleButton from './RibbonToggleButton';
import RibbonGroup from './RibbonGroup';
import RibbonRadioButtonGroup from './RibbonRadioButtonGroup';
import RibbonItemData from './data/RibbonItemData';
import RibbonButtonData from './data/RibbonButtonData';
import RibbonPushButtonData from './data/RibbonPushButtonData';
import RibbonToggleButtonData from './data/RibbonToggleButtonData';
import RibbonGroupData from './data/RibbonGroupData';
import RibbonRadioButtonGroupData from './data/RibbonRadioButtonGroupData';
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

		const outerDynCSS = ClassNames({
			'ui-ribbon-disabled': ( this.enabled === false ),
			'ui-ribbon-invisible': this.hidden,
			'ui-ribbon-inline': ( this.hidden === false )
		});

		const innerDynCSS = ClassNames({
			'ui-ribbon-empty': ( items.length === 0 ),
			'ui-riibon-panel-single-btn': ( items.length === 1 ),
		});

		const legendDynCSS = ClassNames({
			'ui-ribbon-disabled': ( this.enabled === false )
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
				case 'ui-ribbon-radio-group':
				case 'ui-ribbon-group':
					const RibbonGroupLike = ( item.type === 'ui-ribbon-group' ) ? RibbonGroup : RibbonRadioButtonGroup;
					result = (
						<RibbonGroupLike
							key={ item.id }
							id={ item.id }
							name={ item.name }
							displayName={ item.displayName }
							enabled={ item.enabled }
							hidden={ item.hidden }
							type={ item.type }
							items={ item.items }
							actived={ item.actived }
							onStateChange={ updateItem }
							ref={ ( c ) => { if( c ) scope.items.push( c ) } } />
					);
					break;
				case 'ui-ribbon-button-big':
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
				className={ "ui-ribbon-panel-container ui-ribbon-relative " + outerDynCSS }>
				{ createSeperator( this.seperator ) }

				<div className={ "ui-ribbon-panel ui-ribbon-relative ui-ribbon-inline " + innerDynCSS }>
					<div className="ui-ribbon-panel-contents">
						{ items.map( createItem ) }

						<div className={ "ui-ribbon-panel-legend ui-ribbon-absolute " + legendDynCSS }>
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
