'use strict';

/**
 * Create new GUID based on timeStamp.
 * @return {string}	- New guid
 */
export const newGUID = () => {
	var d = new Date().getTime();

	var guid = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(
		/[xy]/g,
		( c ) => {
			var r = ( d + Math.random() * 16 ) % 16 | 0;
			d = Math.floor( d / 16 );
			return ( c == 'x' ? r : ( r & 0x7 | 0x8 ) ).toString( 16 );
		});

	return guid;
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
