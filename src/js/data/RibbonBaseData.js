/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import { newGUID } from '../utility';

const Id = Symbol( 'id' );
const Name = Symbol( 'name' );
const DisplayName = Symbol( 'displayName' );
const Enabled = Symbol( 'enabled' );
const Hidden = Symbol( 'hidden' );

/**
 * RibbonBaseData
 * @class
 */
export default class RibbonBaseData {
	/**
	 * RibbonBaseData constructor
	 * @param {string} name - The name of this instance used by the internal mechanism.
	 * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
	 */
	constructor( name, displayName ) {
		if( typeof name !== 'string' ) throw 'name is required.';

		this[Id] = newGUID();
		this[Name] = name;
		this[DisplayName] = ( typeof name !== 'string' ) ? name : displayName;
		this[Enabled] = true;
		this[Hidden] = false;
	}

	/**
	 * Instance uuid used by the internal mechanism.
	 * @return {string} - The UUID.
	 */
	get id() {
		return this[Id];
	}

	/**
	 * Instance name used by the internal mechanism.
	 * @return {string} - Instance name.
	 */
	get name() {
		return this[Name];
	}

	/**
	 * Instance name shown on the user interface, might be a localized string.
	 * @return {string} - Instance name.
	 */
	get displayName() {
		return this[DisplayName];
	}

	/**
	 * Instance name shown on the user interface, might be a localized string.
	 * @param {string} [name] - Instance name.
	 */
	set displayName( name ) {
		if( typeof name !== 'string' ) throw 'Input type should be a string.';

		this[DisplayName] = name;
	}

	/**
	 * Instance edis/en-able status.
	 * @return {bool} - If false, make instance be disabled.
	 */
	get enabled() {
		return this[Enabled];
	}

	/**
	 * Instance edis/en-able status.
	 * @return {bool} [enabled = true] - If false, make instance be disabled.
	 */
	set enabled( enabled = true ) {
		this[Enabled] = ( enabled === true );
	}

	/**
	 * Instance is hidden or not.
	 * @return {bool} - If false, instance is going to disppear on the UI.
	 */
	get hidden() {
		return this[Hidden];
	}

	/**
	 * Instance edis/en-able status.
	 * @return {bool} [hidden = false] - If false, instance is going to disppear on the UI.
	 */
	set hidden( hidden = false ) {
		this[Hidden] = ( hidden === true );
	}
}
