import RibbonGroupData from './RibbonGroupData';

/**
 * RibbonRadioButtonGroupData
 * @extends RibbonGroupData
 * @class
 */
export default class RibbonRadioButtonGroupData extends RibbonGroupData {
	/**
	 * RibbonRadioButtonGroupData constructor
	 * @param {string} name - The name of this instance used by the internal mechanism.
	 * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
	 */
	constructor( name, displayName ) {
		super( name, displayName );
	}
	
	/**
	 * Button type.
	 * @return {string} -	Button type for identification.
	 * @override
	 */
	get type() {
		return 'ui-ribbon-radio-group';
	}
}
