/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import RibbonTabData from './RibbonTabData';

/**
 * RibbonAppTabData
 * @class
 */
export default class RibbonAppTabData extends RibbonTabData {
	/**
	 * RibbonAppTabData constructor
	 * @param {string} [displayName = 'File'] - The name of this instance shown on the user interface, might be a localized string.
	 */
	constructor( displayName = 'File' ) {
		super( 'AppTab', displayName );
	}

	/**
	 * Tab type.
	 * @return {string} - Tab type for identification.
	 * @override
	 */
	get type() {
		return 'ui-ribbon-tab-application';
	}
}
