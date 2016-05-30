'use strict';

/**
 * Create new RFC4122 v4 GUID based on timeStamp.
 * @return {string}	- New guid
 */
export const newGUID = () => {
	var d = new Date().getTime();

	var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
		/[xy]/g,
		( c ) => {
			var r = ( d + Math.random() * 16 ) % 16 | 0;
			d = Math.floor( d / 16 );
			return ( c == 'x' ? r : ( r & 0x3 | 0x8 ) ).toString( 16 );
		});

	return guid;
};

/**
 * Check input is GUID.
 * @param {string} - Target guid.
 * @return {bool} -	If the input is a GUID, then return true.
 */
export const isGUID = ( guid ) => {
	//const pattern = /^[0-9a-f]{4}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{4}$/i;
	const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return pattern.test( guid );
};

/**
 * Find proper (first) item suited with input condition in an array.
 * @param {array} items -	Array of searching target.
 * @param {func} predicate - Predicate function for describe which item is goingo to return.
 * @return {object} - Target item.
 */
export const findItem = ( items = [], predicate ) => {
	predicate = ( predicate instanceof Function ) ? predicate : ( item ) => { return true };

	for( let i = 0; i < items.length; i++ ) {
		let item = items[i];
		if( predicate( item ) ) return item;
	}
};

/**
 * Create namespace.
 * @param {string} s - namespace (e.g. 'RiibonUI.Ribbon').
 * @return {Object} - Namespace,
 */	
export const namespace = ( s ) => {
	var ns = typeof window !== 'undefined' && window !== null ? window : self;

	var parts = s.split( '.' );
	for( var i = 0; i < parts.length; i++ ) {
		ns[ parts[i] ] = ns[ parts[i] ] || {};
		ns = ns[ parts[i] ];
	}

	return ns;
};

const utility = {
	newGUID,
	isGUID,
	findItem,
	namespace
};

export default utility;
