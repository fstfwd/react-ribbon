import React from 'react';
import RibbonTabData from './data/RibbonTabData';
import RibbonAppTabData from './data/RibbonAppTabData';
import RibbonTitlebarData from './data/RibbonTitlebarData';
import RibbonTitlebar from './RibbonTitlebar';
import RibbonTab from './RibbonTab';
import { newGUID } from './utility';

const Tabs = Symbol( 'tabs' );

/**
 * Ribbon
 * @extends React.Component
 * @class
 */
export default class Ribbon extends React.Component {
	/**
	 * RibbonBase constructor
	 * @param {object} props - React component properties
	 */
	constructor( props ) {
		super( props );

		let appTab = new RibbonAppTabData();
		let tabs = [ appTab ].concat( props.tabs );
		let titlebar = new RibbonTitlebarData();

		this.state = {
			tabs: tabs,
			titlebar: titlebar
		};

		this[Tabs] = [];

		this.handleTabClick = this.handleTabClick.bind( this );
	}

	/**
	 * Content tabs
	 * @return {RibbonTab[]} - Array of RibbonTabs.
	 */
	get tabs() {
		return this[Tabs];
	}

	/**
	 * Toggle to show or hide app titlebar.
	 */
	toggleAppTitle() {
		this.refs.titlebar.toggleDisplay();
	}

	/**
	 * Add new tab by given data.
	 * @param {RibbonTabData} tabData - Ribbon tab data for creating new tab.
	 * @return {RibbonTab} - Rendered RibbonTab component.
	 */
	addTab( tabData ) {
		const idx = this.tabs.findIndex( ( tab ) => ( tab.id == tabData.id || tab.name === tabData.name ) );
		if( !(tabData instanceof RibbonTabData) || idx !== -1 )
			return console.log( '%c[Ribbon] Input tabData is invalid or duplicate.', 'color:red;' );

		tabData.actived = ( this.tabs.length === 1 );
		const tabs = this.state.tabs.concat( tabData );
		this.setState({ tabs });

		return this.tabs[ this.tabs.length - 1 ];
	}

	/**
	 * Active target tab by given id.
	 * @param {string} tabId - Tab Id.
	 */
	activeTabById( tabId ) {
		if( typeof tabId !== 'string' ) return console.log( '%c[Ribbon] TabId should be a string.', 'color:red;' );

		const tab = this.tabs.find( ( tab ) => tab.id === tabId );
		if( !tab ) throw '[Ribbon] Input tab id not exists.';

		tab.actived = true;
	}

	/**
	 * Tab clicking event handler
	 */
	handleTabClick( tabId ) {
		this.activeTabById( tabId );
	}

	componentWillUpdate( nextProps, nextState ) {
		this[Tabs].length = 0;
	}

	render() {
		const scope = this;
		const otherTabs = this.state.tabs;//.slice( 1 );

		const updateTitlebar = ( id, data ) => {
			let titlebar = scope.state.titlebar;

			if( titlebar.id !== id ) return;

			Object.assign( titlebar, data );
			scope.setState({ titlebar });
		};
		
		const createTitleBar = () => {
			const data = scope.state.titlebar;
			return (
				<RibbonTitlebar
					key={ data.id }
					id={ data.id }
					name={ data.name }
					displayName={ data.title }
					enabled={ data.enabled }
					hidden={ data.hidden }
					ref="titlebar"
					onStateChange={ updateTitlebar } />
			);
		};

		const nextOpt = ( id, data ) => {
			// For de/activating tab by changing tab's actived property.
			if( data.hasOwnProperty( 'actived' ) ) {
				if( data.actived === true ) {
					scope.tabs.map( ( tab ) => {
						if( tab.id !== id ) tab.actived = false;
					});
				} else {
					// For activing other tab while current tab is diabled.
					if( data.hasOwnProperty( 'enabled' ) && ( data.enabled === false ) ) {
						const tab = scope.tabs.find( ( tab ) => ( tab.id !== id && tab.enabled === true && tab.type !== 'ui-ribbon-tab-application' ) );
						if( !tab ) return;

						tab.actived = true;
					}
				}
			}
		};

		const updateTab = ( id, data ) => {
			let tabs = scope.state.tabs;
			const tab = tabs.find( ( tab ) => tab.id === id );
			if( !tab ) return;

			Object.assign( tab, data );
			scope.setState({ tabs });

			nextOpt( id, data );
		};

		const createTab = ( tab ) => {
			return (
				<RibbonTab
					key={ tab.id }
					id={ tab.id }
					name={ tab.name }
					displayName={ tab.displayName }
					type={ tab.type }
					enabled={ tab.enabled }
					hidden={ tab.hidden }
					actived={ tab.actived }
					panels={ tab.panels }
					onClick={ scope.handleTabClick }
					onStateChange={ updateTab }
					ref={ ( c ) => { if( c ) scope.tabs.push( c ) } } />
			);
		};

		return (
			<div id="RibbonUI">
				{ createTitleBar() }
				<div className="ui-ribbon-window">
					<div id="ui-ribbon-main" className="ui-ribbon-main ui-ribbon-border-bottom">
						<div className="ui-ribbon-tab-container ui-ribbon-border-bottom">
							<ul role="ui-ribbon-tabs" className="ui-ribbon-nowrap ui-ribbon-nopadding ui-ribbon-nomargin">
								{ otherTabs.map( createTab ) }
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Ribbon.propTypes = {
	id: React.PropTypes.string.isRequired,
	tabs: React.PropTypes.arrayOf( React.PropTypes.instanceOf( RibbonTabData ) )
};

Ribbon.defaultProps = {
	id: newGUID(),
	tabs: []
};
