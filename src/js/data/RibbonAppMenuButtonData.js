/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import RibbonAppMenuItemData from './RibbonAppMenuItemData';

/**
 * RibbonAppMenuButtonData
 * @extends RibbonAppMenuItemData
 * @class
 */
export default class RibbonAppMenuButtonData extends RibbonAppMenuItemData {
	/**
	 * RibbonAppMenuButtonData constructor
	 * @param {string} name - The name of this instance used by the internal mechanism.
	 * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
	 */
	constructor( name, displayName ) {
		super( name, displayName );
	}

	/**
	 * Menu type.
	 * @return {string} -	Button type for identification.
	 * @override
	 */
	get type() {
		return 'ui-ribbon-app-menu-button';
	}
}
