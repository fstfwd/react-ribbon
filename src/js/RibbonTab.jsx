import React from 'react';
import ClassNames from 'classnames';
import RibbonBase from './RibbonBase';
import { newGUID } from './utility';

const Panels = Symbol( 'panels' );

/**
 * RibbonTab
 * @extends RibbonBase
 * @class
 */
export default class RibbonTab extends RibbonBase {
	/**
	 * RibbonTab constructor
	 * @param {object} props - React component properties
	 */
	constructor( props ) {
		super( props );

		let actived = ( props.actived === true );

		this.state = Object.assign( this.state,
			{
				actived: actived,
				panels: [].concat( props.panels )
			});

		this[Panels] = [];

		this.handleClick = this.handleClick.bind( this );
	}

	/**
	 * Instance name shown on the user interface, might be a localized string.
	 * @param {string} - Instance name.
	 * @override
	 */
	get displayName() {
		return super.displayName;
	}

	/**
	 * Instance name shown on the user interface, might be a localized string.
	 * @param {string} name - Instance name.
	 * @override
	 */
	set displayName( name ) {
		if( typeof name !== 'string' ) throw 'Input type should be a string.';

		const onStateChange = this.props.onStateChange;
		onStateChange && onStateChange( this.id, { displayName: name } );

		super.displayName = name;
	}

	/**
	 * Tab type.
	 * @return {string} - Tab type for identification.
	 */
	get type() {
		return this.props.type;
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
		onStateChange && onStateChange( this.id, prop );

		this.setState( prop );
	}

	/**
	 * Tab's children panels
	 * @return {[RibbonPanelData]} - Ribbon panel data.
	 */
	get panels() {
		return this[Panels];
	}

	componentWillUpdate( nextProps, nextState ) {
		this[Panels].length = 0;
	}

	/**
	 * Tab clicking event handler
	 */
	handleClick() {
		if( this.type === 'ui-ribbon-tab-application' ) return;

		const onClick = this.props.onClick;
		onClick && onClick( this.id );
	}

	render() {
		const dynCSS = ClassNames({
			'ui-ribbon-active': this.actived
		});

		return (
			<li
				key={ this.id }
				id={ this.id }
				className={ this.type + " ui-ribbon-inline " + dynCSS }
				role="ui-ribbon-tab"
				onClick={ this.handleClick } >

				<span className="ui-ribbon-uppercase">{ this.displayName }</span>
				<div className="ui-ribbon-tab-contents ui-ribbon-absolute">

				</div>
			</li>
		);
	}
}

RibbonTab.propTypes = {
	id: React.PropTypes.string.isRequired,
	type: React.PropTypes.string.isRequired,
	actived: React.PropTypes.bool,
	//panels: React.PropTypes.arrayOf( React.PropTypes.instanceOf(  ) ),
	onStateChange: React.PropTypes.func
};

RibbonTab.defaultProps = {
	id: newGUID(),
	type: 'ui-ribbon-tab-normal',
	actived: false,
	panels: []
};
