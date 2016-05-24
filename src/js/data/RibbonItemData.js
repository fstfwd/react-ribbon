import RibbonBaseData from './RibbonBaseData';
import { newGUID } from '../utility';

const	Actived = Symbol( 'actived' );

/**
 * RibbonItemData
 * @extends RibbonBaseData
 * @class
 */
export default class RibbonItemData extends RibbonBaseData {
	/**
	 * RibbonItemData constructor
	 * @param {string} name - The name of this instance used by the internal mechanism.
	 * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
	 */
	constructor( name, displayName ) {
		super( name, displayName );

		this[Actived] = false;
	}

	/**
	 * Item type.
	 * @return {string} - Item type for identification.
	 */
	get type() {
		return 'ui-ribbon-button';
	}

	/**
	 * Item actived state.
	 * @return {bool} - If true, it repsents tab is selected currently.
	 */
	get actived() {
		return this[Actived]
	}

	/**
	 * Item actived state.
	 * @return {bool} [actived = false] - If true, it repsents tab is selected currently.
	 */
	set actived( actived = false ) {
		this[Actived] = ( actived === true );
	}
}
