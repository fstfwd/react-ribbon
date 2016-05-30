import React from 'react';
import ClassNames from 'classnames';
import RibbonButton from './RibbonButton';

/**
 * RibbonPushButton
 * @class
 */
export default class RibbonPushButton extends RibbonButton {
	/**
	 * RibbonPushButton constructor
	 * @param {object} props - React component properties
	 */
	constructor( props ) {
		super( props );
	}

	render() {
		const dynCSS = ClassNames({
			'ui-ribbon-disabled': ( this.enabled === false ),
			'ui-ribbon-invisible': this.hidden
		});

		return (
			<div className={ "ui-ribbon-button-group ui-ribbon-inline " + dynCSS }>
				{ super.render() }
			</div>
		);
	}
}

RibbonPushButton.propTypes = {
	type: React.PropTypes.string.isRequired,
	onStateChange: React.PropTypes.func
};

RibbonPushButton.defaultProps = {
	type: 'ui-ribbon-button-big'
};
