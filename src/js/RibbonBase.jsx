/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import React from 'react';
import { newGUID } from './utility';

/**
 * RibbonBase
 * @extends React.Component
 * @class
 */
export default class RibbonBase extends React.Component {
	/**
	 * RibbonBase constructor
	 * @param {object} props - React component properties
	 */
	constructor( props ) {
		super( props );

		let displayName = ( typeof props.displayName === 'string' ) ? props.displayName : name;
		let enabled = ( props.enabled == false ) ? false : true;
		let hidden = ( props.hidden === true )

		this.state = {
			displayName,
			enabled,
			hidden
		};
	}

	/**
	 * Instance id for internal identification and HTML id attribute.
	 * @return {string} - The UUID.
	 */
	get id() {
		return this.props.id;
	}

	/**
	 * Instance name for internal identification.
	 * @return {string} - Instance name.
	 */
	get name() {
		return this.props.name;
	}

	/**
	 * Instance name shown on the user interface, might be a localized string.
	 * @return {string} - Instance name.
	 */
	get displayName() {
		return this.state.displayName;
	}

	/**
	 * Instance name shown on the user interface, might be a localized string.
	 * @param {string} - Instance name.
	 */
	set displayName( name ) {
		if( typeof name !== 'string' ) throw 'Input type should be a string.';

		const prop = { displayName: name };
		const onStateChange = this.props.onStateChange;
		onStateChange && onStateChange( this.id, prop );

		this.setState( prop );
	}

	/**
	 * Instance edis/en-able status.
	 * @return {bool} - If false, make instance be disabled.
	 */
	get enabled() {
		return this.state.enabled;
	}
	
	/**
	 * Instance edis/en-able status.
	 * @param {bool} [enabled = true] - If false, make instance be disabled.
	 */
	set enabled( enabled = true ) {
		if( this.hidden ) return;

		const isEnabled = ( enabled === true );

		const prop = { enabled: isEnabled };
		const onStateChange = this.props.onStateChange;
		onStateChange && onStateChange( this.id, prop );

		this.setState( prop );
	}

	/**
	 * Instance is hidden or not.
	 * @return {bool} - If false, instance is going to disppear on the UI.
	 */
	get hidden() {
		return this.state.hidden;
	}
	
	/**
	 * Instance is hidden or not.
	 * @return {bool} [hidden = false]- If false, instance is going to disppear on the UI.
	 */
	set hidden( hidden = false ) {
		const isHidden = ( hidden === true );
		const isEnabled = !isHidden;

		const prop = { hidden: isHidden, enabled: isEnabled };
		const onStateChange = this.props.onStateChange;
		onStateChange && onStateChange( this.id, prop );

		this.setState( prop );
	}
}

RibbonBase.propTypes = {
	id: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	displayName: React.PropTypes.string,
	enabled: React.PropTypes.bool,
	hidden: React.PropTypes.bool,
	onStateChange: React.PropTypes.func
};

RibbonBase.defaultProps = {
	id: newGUID(),
	enabled: true,
	hidden: false
};
