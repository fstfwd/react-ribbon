/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import React from 'react';
import { newGUID } from './utility';

/**
 * RibbonAppMenuSeperator
 * @extends RibbonBase
 * @class
 */
export default class RibbonAppMenuSeperator extends React.Component {
	/**
	 * RibbonAppMenuSeperator constructor
	 * @param {object} props - React component properties
	 */
	constructor( props ) {
		super( props );
	}

	/**
	 * Item type.
	 * @return {string} - Item type for identification.
	 */
	get type() {
		return 'ui-ribbon-seperator';
	}

	render() {
		return (
			<li key={ this.id } id={ this.id} className="ui-ribbon-seperator">
					<div className="ui-ribbon-seperator"></div>
			</li>
		);
	}
}

RibbonAppMenuSeperator.propTypes = {
	id: React.PropTypes.string.isRequired
};

RibbonAppMenuSeperator.defaultProps = {
	id: newGUID()
};