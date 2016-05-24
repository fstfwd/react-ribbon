import React from 'react';
import ClassNames from 'classnames';
import RibbonBase from './RibbonBase';
import RibbonItemData from './data/RibbonItemData'
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
			scope.setState({ items });
		};

		const createItem = ( item ) => {

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
