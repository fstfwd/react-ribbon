import RibbonBaseData from './RibbonBaseData';
import { newGUID } from '../utility';

const Seperator = Symbol( 'seperator' );
const Items = Symbol( 'items' );

/**
 * RibbonPanelData
 * @extends RibbonBaseData
 * @class
 */
export default class RibbonPanelData extends RibbonBaseData {
	/**
	 * RibbonPanelData constructor
	 * @param {string} name - The name of this instance used by the internal mechanism.
	 * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
	 */
	constructor( name, displayName ) {
		super( name, displayName );

		this[Seperator] = true;
		this[Items] = [];
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
	 * Panel's children items.
	 * @return {RibbonItemData[]} - Ribbon item data.
	 */
	get items() {
		return this[Items];
	}

	/**
	 * Panel's children items.
	 * @return {RibbonItemData[]} [items = []]- Ribbon item data.
	 */
	set items( items = [] ) {
		this[Items] = items;
	}
}
