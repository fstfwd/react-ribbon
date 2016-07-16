/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import RibbonBaseData from './RibbonBaseData';

/**
 * RibbonTitlebarData
 * @class
 */
export default class RibbonTitlebarData extends RibbonBaseData {
	/**
	 * RibbonTitlebarData constructor
	 * @param {string} title - The name of this instance shown on the user interface, might be a localized string.
	 */
	constructor( title ) {
		if( typeof title !== 'string' ) title = 'React Ribbon';

		super( 'AppTitlebar', title );
	}

	/**
	 * App title.
	 * @return {string}
	 */
	get title() {
		return this.displayName;
	}

	/**
	 * App title
	 * @param {string} title
	 */
	set title( title ) {
		this.displayName = title;
	}
}
