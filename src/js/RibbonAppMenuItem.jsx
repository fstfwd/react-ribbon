/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import React from 'react';
import ClassNames from 'classnames';
import RibbonBase from './RibbonBase';
import { newGUID } from './utility';

const Seperator = Symbol( 'seperator' );

/**
 * RibbonAppMenuItem
 * @extends RibbonBase
 * @class
 */
export default class RibbonAppMenuItem extends RibbonBase {
	/**
	 * RibbonAppMenuItem constructor
	 * @param {object} props - React component properties
	 */
	constructor( props ) {
		super( props );

		let actived = ( props.actived === true );
		let content = ( typeof props.content === 'string' ) ? props.content : '';

		this.state = Object.assign( this.state,
			{
				actived: actived,
				content: content
			});

		this.handleClick = this.handleClick.bind( this );
	}

	/**
	 * Panel has seperator or not.
	 * @return {bool} - If true, panel will be seperated with other panels by a panel seperator.
	 */
	get seperator() {
		return this.props.seperator;
	}

	/**
	 * Instance edis/en-able status.
	 * @return {bool} - If false, make instance be disabled.
	 */
	get enabled() {
		return super.enabled;
	}

	/**
	 * Instance edis/en-able status.
	 * @param {bool} [enabled = true] - If false, make instance be disabled.
	 */
	set enabled( enabled = true ) {
		if( this.hidden ) return;

		const isEnabled = ( enabled === true );
		super.enabled = isEnabled;
	}

	/**
	 * Instance is hidden or not.
	 * @return {bool} - If false, instance is going to disppear on the UI.
	 */
	get hidden() {
		return super.hidden;
	}

	/**
	 * Instance is hidden or not.
	 * @return {bool} [hidden = false]- If false, instance is going to disppear on the UI.
	 */
	set hidden( hidden = false ) {
		const isHidden = ( hidden === true );
		super.hidden = isHidden;
	}

	/**
	 * Tab actived state.
	 * @return {bool} - If true, it repsents tab is selected currently.
	 */
	get actived() {
		return this.state.actived;
	}

	/**
	 * Tab actived state.
	 * @return {bool} [actived = false] - If true, it repsents tab is selected currently.
	 */
	set actived( actived = false ) {
		const isActived = ( actived === true );
		const prop = { actived: isActived };

		const onStateChange = this.props.onStateChange;
		onStateChange && onStateChange( this.id, prop, true );

		this.setState( prop );
	}

	/**
	 * Menu content shown on the app menu.
	 * @return {string} - Menu content.
	 */
	get content() {
		return this.state.content;
	}

	/**
	 * Menu content shown on the app menu.
	 * @param {string} [content] - Menu content.
	 */
	set content( content ) {
		if( typeof content !== 'string' ) throw 'Input type should be a string.';

		const prop = { content };
		const onStateChange = this.props.onStateChange;
		onStateChange && onStateChange( this.id, prop );

		this.setState( prop );
	}

	/**
	 * Tab clicking event handler
	 */
	handleClick( event ) {
		this.actived = true;
	}

	render() {
		const scope = this;
		const dynCSS = ClassNames({
			'ui-ribbon-active': this.actived,
			'ui-ribbon-disabled': ( this.enabled === false ),
			'ui-ribbon-invisible': this.hidden
		});

		return (
			<li key={ this.id } className={ dynCSS } onClick={ this.handleClick }>
					<div> { this.displayName } </div>
			</li>
		);
	}
}

RibbonAppMenuItem.propTypes = {
	id: React.PropTypes.string.isRequired,
	seperator: React.PropTypes.bool,
	actived: React.PropTypes.bool,
	content: React.PropTypes.string,
	onStateChange: React.PropTypes.func
};

RibbonAppMenuItem.defaultProps = {
	id: newGUID(),
	seperator: true,
	actived: false
};