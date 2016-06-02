/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import Ribbon from './Ribbon';

const RibbonInst = Symbol( 'ribbon' );
const Options = Symbol( 'options' );

/**
 * RibbonTask
 * @class
 * @classdesc For bulk creating or modifying Ribbon contents.
 */
export default class RibbonTask {
	/**
	 * RibbonTask constructor.
	 * @param {Ribbon} ribbon - Rendered Ribbon component.
	 * @param {object} options - Task options.
	 */
	constructor( ribbon, options ) {
		if( !(ribbon instanceof Ribbon ) ) throw 'No Ribbon instance available.';

		this[RibbonInst] = ribbon;
		this[Options] = options;
	}

	/**
	 * Rendered Ribbon component.
	 * @return {Ribbon}
	 */
	get ribbon() {
		return this[RibbonInst];
	}

	/**
	 * Task options.
	 * @return {object}
	 */
	get options() {
		return this[Options];
	}

	/**
	 * Execute task content.
	 * @return {bool} If true, it represents this task was executed by the Ribbon.
	 */
	execute() {
		return true;
	}

	/**
	 * Discard all changes.
	 * @return {bool} If true, it represents changes made by this task was removed from the Ribbon.
	 */
	discard() {
		return true;
	}
}
