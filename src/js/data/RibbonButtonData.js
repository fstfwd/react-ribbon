/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import RibbonItemData from './RibbonItemData';
import RibbonTooltipData from './RibbonTooltipData';

const	Icon = Symbol( 'icon' );
const Tooltip = Symbol( 'tooltip' );
const Toggleable = Symbol( 'toggleable' );
const ClickHandler = Symbol( 'clickHandler' );

/**
 * RibbonButtonData
 * @extends RibbonItemData
 * @class
 */
export default class RibbonButtonData extends RibbonItemData {
	/**
	 * RibbonButtonData constructor
	 * @param {string} name - The name of this instance used by the internal mechanism.
	 * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
	 */
	constructor( name, displayName ) {
		super( name, displayName );

		this[Icon] = '';
		this[Tooltip] = undefined;
		this[Toggleable] = false;
		this[ClickHandler] = undefined;
	}

	/**
	 * Button role.
	 * @return {string}
	 * @override
	 */
	get role() {
		return 'ui-ribbon-button';
	}

	/**
	 * Button icon path.
	 * @return {string} - Button icon full path or relative path.
	 */
	get icon() {
		return this[Icon];
	}

	/**
	 * Button icon path.
	 * @param {string} icon - Button icon full path or relative path.
	 */
	set icon( icon ) {
		if( typeof icon !== 'string' ) throw 'Input type should be a string.';

		this[Icon] = icon;
	}

	/**
	 * Button tooltip data.
	 * @return {RibbonTooltipData} - Ribbon button tooltip data.
	 */
	get tooltip() {
		return this[Tooltip];
	}

	/**
	 * Button tooltip data.
	 * @param {RibbonTooltipData} tooltip - Ribbon button tooltip data.
	 */
	set tooltip( tooltip ) {
		if( !(tooltip instanceof RibbonTooltipData) )
			throw 'Input data is not a type of RibbonTooltipData.';

		this[Tooltip] = tooltip;
	}

	/**
	 * Button toggleable state.
	 * @return {bool} - If true, it repsents button is toggled currently.
	 */
	get toggleable() {
		return this[Toggleable];
	}

	/**
	 * Button toggleable state.
	 * @return {bool} [toggleable = false] - If true, it repsents button is toggled currently.
	 */
	set toggleable( toggleable = false ) {
		this[Toggleable] = ( toggleable === true );
	}

	/**
	 * Button	click eveent handler.
	 * @return {Function} - Click eveent handler.
	 */
	get clickHandler() {
		return this[ClickHandler];
	}

	/**
	 * Button	click eveent handler.
	 * @param {Function} handler - Click eveent handler.
	 */
	set clickHandler( handler ) {
		if( !(handler instanceof Function) )
			throw 'Input clicking handler is invalid.';

		this[ClickHandler] = handler;
	}
}
