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

		this[Seperator] = true;
		this[Actived] = false;
		this[Content] = undefined;
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
	 * Menu content shown on the app menu.
	 * @return {string} - Menu content.
	 */
	get content() {
		return this[Content];
	}

	/**
	 * Menu content shown on the app menu.
	 * @param {string} [content] - Menu content.
	 */
	set content( content ) {
		if( typeof content !== 'string' ) throw 'Input type should be a string.';

		this[Content] = content;
	}
}
