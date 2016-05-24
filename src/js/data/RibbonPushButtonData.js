import RibbonButtonData from './RibbonButtonData';

/**
 * RibbonPushButtonData
 * @extends RibbonButtonData
 * @class
 */
export default class RibbonPushButtonData extends RibbonButtonData {
	/**
	 * RibbonPushButtonData constructor
	 * @param {string} name - The name of this instance used by the internal mechanism.
	 * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
	 */
	constructor( name, displayName ) {
		super( name, displayName );
	}

	/**
	 * Button type.
	 * @return {string} -	Button type for identification.
	 */
	get type() {
		return 'ui-ribbon-button-big';
	}
}
