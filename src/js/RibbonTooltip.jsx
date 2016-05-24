import React from 'react';
import ClassNames from 'classnames';
import RibbonBase from './RibbonBase';

/**
 * RibbonTooltip
 * @class
 */
export default class RibbonTooltip extends RibbonBase {
	/**
	 * RibbonTooltip constructor
	 * @param {object} props - React component properties
	 */
	constructor( props ) {
		super( props );

		this.state = Object.assign( this.state,
			{
				content: props.content
			});
	}

	/**
	 * Tooltip title.
	 * @return {string} - Ribbon tooltip title.
	 */
	get title() {
		return this.displayName;
	}

	/**
	 * Tooltip title.
	 * @return {string} title - Ribbon tooltip title.
	 */
	set title( title ) {
		if( typeof title !== 'string' ) throw 'Input type should be a string.';

		this.displayName = title;
	}

	/**
	 * Tooltip content.
	 * @return {string} - Tooltip content.
	 */
	get content() {
		return this.state.content;
	}

	/**
	 * Tooltip content.
	 * @return {string} - Tooltip content.
	 */
	set content( content = '' ) {
		if( typeof content !== 'string' ) throw 'Input content should be a string.';

		const prop = { content };
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

		const prop = { hidden: isHidden };
		const onStateChange = this.props.onStateChange;
		onStateChange && onStateChange( this.id, prop );

		this.setState( prop );
	}

	render() {
		const dynCSS = ClassNames({
			'ui-ribbon-button-tooltip-visible': ( this.hidden === false )
		});

		const createTitle = () => {
			if( this.title )
				return ( <strong>{ this.title }</strong> );
		};

		const createContent = () => {
			if( this.content )
				return ( <p>{ this.content }</p> );
		};

		return (
			<div id={ this.id } className={ "ui-ribbon-button-tooltip-visible " + dynCSS }>
				{ createTitle() }
				{ createContent() }
			</div>
		);
	}
}

RibbonTooltip.propTypes = {
	content: React.PropTypes.string,
	onStateChange: React.PropTypes.func
};
