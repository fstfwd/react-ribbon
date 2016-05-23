import React from 'react';
import ClassNames from 'classnames';
import RibbonBase from './RibbonBase';

/**
 * RibbonTitlebar
 * @class
 */
export default class RibbonTitlebar extends RibbonBase {
	/**
	 * RibbonTitlebar constructor
	 * @param {object} props - React component properties
	 */
	constructor( props ) {
		super( props );
	}

	/**
	 * Ribbon main title
	 * @return {string} - Ribbon title
	 */
	get title() {
		return this.displayName;
	}

	/**
	 * Ribbon main title
	 * @param {string} title - Ribbon title
	 */
	set title( title ) {
		if( typeof title !== 'string' ) throw 'Input type should be a string.';

		const onStateChange = this.props.onStateChange;
		onStateChange && onStateChange( this.id, { title } );

		this.displayName = title;
	}

	/**
	 * Toggle titlebar be displayed or hiden.
	 */
	toggleDisplay() {
		const isHidden = !this.hidden;
		const isEnabled = !isHidden;

		const onStateChange = this.props.onStateChange;
		onStateChange && onStateChange( this.id, { hidden: isHidden } );

		this.hidden = isHidden;
	}

	render() {
		const dynCSS = ClassNames({
			'ui-ribbon-invisible': this.hidden
		});

		return (
			<div className={ "ui-ribbon-title " + dynCSS }>
				<span>{ this.title }</span>
			</div>
		);
	}
}

RibbonTitlebar.propTypes = {
	onStateChange: React.PropTypes.func
}
