/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import RibbonBaseData from './RibbonBaseData';

const Seperator = Symbol( 'seperator' );
const	Actived = Symbol( 'actived' );
const Content = Symbol( 'contnet' );

/**
 * RibbonAppMenuItemData
 * @extends RibbonBaseData
 * @class
 */
export default class RibbonAppMenuItemData extends RibbonBaseData {
	/**
	 * RibbonAppMenuItemData constructor
	 * @param {string} name - The name of this instance used by the internal mechanism.
	 * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
	 */
	constructor( name, displayName ) {
		super( name, displayName );

		this[Seperator] = false;
		this[Actived] = false;
		this[Content] = undefined;
	}

	/**
	 * Menu type.
	 * @return {string} -	Button type for identification.
	 * @override
	 */
	get type() {
		return 'ui-ribbon-app-menu-normal';
	}

	/**
	 * Panel has seperator or not.
	 * @return {bool} - If true, panel will be seperated with other panels by a panel seperator.
	 */
	get seperator() {
		return this[Seperator];
	}

	/**
	 * Panel has seperator or not.
	 * @param {bool} [seperator = true] - If true, panel will be seperated with other panels by a panel seperator.
	 */
	set seperator( seperator = true ) {
		this[Seperator] = ( seperator === true );
	}

	/**
	 * Tab actived state.
	 * @return {bool} - If true, it repsents tab is selected currently.
	 */
	get actived() {
		return this[Actived]
	}

	/**
	 * Tab actived state.
	 * @return {bool} [actived = false] - If true, it repsents tab is selected currently.
	 */
	set actived( actived = false ) {
		this[Actived] = ( actived === true );
	}

	/**
	 * Menu content handler for rendering app menu content.
	 * @return {Function} - Menu content handler.
	 */
	get content() {
		return this[Content];
	}

	/**
	 * Menu content handler for rendering app menu content.
	 * @param {Function} [content] - Menu content handler.
	 */
	set content( content ) {
		if( !(content instanceof Function) ) throw 'Input content handler is invalid.';

		this[Content] = content;
	}
}
