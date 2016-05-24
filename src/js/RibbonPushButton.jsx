import React from 'react';
import ClassNames from 'classnames';
import RibbonButton from './RibbonButton';

/**
 * PushButton
 * @class
 */
export default class PushButton extends RibbonButton {
	/**
	 * PushButton constructor
	 * @param {object} props - React component properties
	 */
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<div className="ui-ribbon-button-group ui-ribbon-inline">
				{ super.render() }
			</div>
		);
	}
}

PushButton.propTypes = {
	type: React.PropTypes.string.isRequired,
	onStateChange: React.PropTypes.func
};

PushButton.defaultProps = {
	type: 'ui-ribbon-button-big'
};
