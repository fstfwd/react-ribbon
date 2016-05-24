import React from 'react';
import ClassNames from 'classnames';
import RibbonBase from './RibbonBase';
import RibbonPanel from './RibbonPanel';
import RibbonPanelData from './data/RibbonPanelData';
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

	/**
	 * Add new panel by given data.
	 * @param {RibbonPanelData} panelData - Ribbon panel data for creating new panel.
	 * @return {RibbonPanel} - Rendered RibbonPanel component.
	 */
	addPanel( panelData ) {
		const idx = this.panels.findIndex( ( panel ) => ( panel.id == panelData.id || panel.name === panelData.name ) );
		if( !(panelData instanceof RibbonPanelData) || idx !== -1 )
			return console.log( '%c[RibbonPanel] Input panelData is invalid or duplicate.', 'color:red;' );

		panelData.seperator = ( this.panels.length !== 0 );
		const panels = this.state.panels.concat( panelData );

		const prop = { panels };
		const onStateChange = this.props.onStateChange;
		onStateChange && onStateChange( this.id, prop );

		this.setState( prop );

		return this.panels[ this.panels.length -1 ];
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
		const scope = this;
		const panels = this.state.panels;
		const dynCSS = ClassNames({
			'ui-ribbon-active': this.actived
		});

		const updatePanel = ( id, data ) => {
			let panels = scope.state.panels;
			const panel = panels.find( ( panel ) => panel.id === id );
			if( !panel ) return;

			Object.assign( panel, data );
			scope.setState({ panels });
		};

		const createPanel = ( panel ) => {
			return (
				<RibbonPanel
					key={ panel.id }
					id={ panel.id }
					name={ panel.name }
					displayName={ panel.displayName }
					enabled={ panel.enabled }
					hidden={ panel.hidden }
					seperator={ panel.seperator }
					items={ panel.items }
					onStateChange={ updatePanel }
					ref={ ( c ) => { if( c ) scope.panels.push( c ) } } />
			);
		};

		return (
			<li
				key={ this.id }
				id={ this.id }
				className={ this.type + " ui-ribbon-inline " + dynCSS }
				role="ui-ribbon-tab"
				onClick={ this.handleClick } >

				<span className="ui-ribbon-uppercase">{ this.displayName }</span>
				<div className="ui-ribbon-tab-contents ui-ribbon-absolute">
					{ panels.map( createPanel ) }
				</div>
			</li>
		);
	}
}

RibbonTab.propTypes = {
	id: React.PropTypes.string.isRequired,
	type: React.PropTypes.string.isRequired,
	actived: React.PropTypes.bool,
	panels: React.PropTypes.arrayOf( React.PropTypes.instanceOf( RibbonPanelData ) ),
	onStateChange: React.PropTypes.func
};

RibbonTab.defaultProps = {
	id: newGUID(),
	type: 'ui-ribbon-tab-normal',
	actived: false,
	panels: []
};
