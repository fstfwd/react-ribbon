import React from 'react';

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

		this.setState({ displayName: name });
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
		this.setState({ enabled: ( enabled === true ) });
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

		this.setState({ hidden: isHidden, enabled: isEnabled });
	}
}

RibbonBase.propTypes = {
	id: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	displayName: React.PropTypes.string,
	enabled: React.PropTypes.boolean,
	hidden: React.PropTypes.boolean
};

RibbonBase.defaultProps = {
	enabled: true,
	hidden: false
};
