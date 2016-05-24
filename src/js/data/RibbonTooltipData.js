import RibbonBaseData from './RibbonBaseData';
import { newGUID } from '../utility';

const Content = Symbol( 'content' );

/**
 * RibbonTooltipData
 * @extends RibbonBaseData
 * @class
 */
export default class RibbonTooltipData extends RibbonBaseData {
	/**
	 * RibbonTooltipData constructor
	 * @param {string} name - The name of this instance used by the internal mechanism.
	 * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
	 */
	constructor( title, content ) {
		if( typeof title !== 'string' ) throw 'Tooltip title cannot be empty.';

		super( 'RibbonTooltip', title );

		this[Content] = ( typeof content !== 'string' ) ? undefined : content;
		this.hidden = true;
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

	/**
	 * Tooltip content.
	 * @return {string} - Tooltip content.
	 */
	get content() {
		return this[Content];
	}

	/**
	 * Tooltip content.
	 * @return {string} - Tooltip content.
	 */
	set content( content ) {
		if( typeof content !== 'string' ) throw 'Input content should be a type of string.';

		this[Content] = content;
	}
}
