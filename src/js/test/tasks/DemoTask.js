/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import $ from 'jquery';
import ribbonCtrl, { RibbonTask, Data, Utility } from '../modules';

const {
	RibbonTabData,
	RibbonPanelData,
	RibbonPushButtonData,
	RibbonToggleButtonData,
	RibbonTooltipData,
	RibbonRadioButtonGroupData
} = Data;

/**
 * RibbonDemoTask
 * @extends RibbonTask
 * @class
 */
export default class RibbonDemoTask extends RibbonTask {
	/**
	 * RibbonDemoTask constructor.
	 * @param {Ribbon} ribbon - Rendered Ribbon component.
	 * @param {object} options - Task options.
	 */
	constructor( ribbon, options ) {
		super( ribbon, options );
	}

	/**
	 * Execute task content.
	 * @return {bool} If true, it represents this task was executed by the Ribbon.
	 */
	execute() {
		try {
			// Create tab.
			const ribbon = this.ribbon;
			const tabData = new RibbonTabData( 'DemoBasicTab', 'Basic' );
			const tab = ribbon.addTab( tabData );

			const testTabData = new RibbonTabData( 'DemoTestTab', 'Test' );
			const testTab = ribbon.addTab( testTabData );

			// Create panel.
			const spatialPanelData = new RibbonPanelData( 'DemoSpatialPanel', 'Spatial' );
			const spatialPanel = tab.addPanel( spatialPanelData );

			// Create buttons.
			const dwnBtnData = new RibbonPushButtonData( 'DemoSpatialDwnBtn', 'Download' );
			const dwnBtn = spatialPanel.addItem( dwnBtnData );
			dwnBtn.icon = 'img/db_download.png';
			dwnBtn.clickHandler = () => { alert( 'DemoSpatialDwnBtn Clicked!' ); };

			const clsBtnData = new RibbonPushButtonData( 'DemoSpatialCleanBtn', 'Clean' );
			const clsBtn = spatialPanel.addItem( clsBtnData );
			clsBtn.icon = 'img/db_remove.png';
			clsBtn.clickHandler = () => { alert( 'DemoSpatialCleanBtn Clicked!' ); };

			// Create panel.
			const navPanelData = new RibbonPanelData( 'DemoNavPanel', 'Navigation' );
			const navPanel = tab.addPanel( navPanelData );

			// Create button gruop.
			const radioBtnGroupData = new RibbonRadioButtonGroupData( 'DemoNavBtnGroup', 'NavBtnGroup' );
			const radioBtnGroup = navPanel.addItem( radioBtnGroupData );

			// Add buttons to gruop.
			const panBtnData = new RibbonToggleButtonData( 'DemoPanBtn', 'Pan' );
			const panBtn = radioBtnGroup.addItem( panBtnData );
			panBtn.icon = 'img/pan.png';
			panBtn.clickHandler = () => { alert( 'DemoPanBtn Clicked!' ); };

			const orbitBtnData = new RibbonToggleButtonData( 'DemoOrbitBtn', 'Orbit' );
			const orbitBtn = radioBtnGroup.addItem( orbitBtnData );
			orbitBtn.icon = 'img/orbit.png';
			orbitBtn.clickHandler = () => { alert( 'DemoOrbitBtn Clicked!' ); };

			$('#demo-active-tab-basic').click( () => {
				tab.actived = true;
				console.log( 'Set tab actived status to true: ', tab.actived === true );
			});

			$('#demo-deactive-tab-basic').click( () => {
				tab.actived = false;
				console.log( 'Set tab actived status to false: ', tab.actived === false );
			});

			$('#demo-active-tab-test').click( () => {
				testTab.actived = true;
				console.log( 'Set tab actived status to true: ', testTab.actived === true );
			});

			$('#demo-deactive-tab-test').click( () => {
				testTab.actived = false;
				console.log( 'Set tab actived status to false: ', testTab.actived === false );
			});

			$('#demo-active-button-download').click( () => {
				dwnBtn.actived = true;
				console.log( 'Set button actived status to true: ', dwnBtn.actived === true );
			});

			$('#demo-deactive-button-download').click( () => {
				dwnBtn.actived = false;
				console.log( 'Set button actived status to false: ', dwnBtn.actived === false );
			});

			$('#demo-enable-button-download').click( () => {
				dwnBtn.enabled = true;
				console.log( 'Set button enabled status to true: ', dwnBtn.enabled === true );
			});

			$('#demo-disable-button-download').click( () => {
				dwnBtn.enabled = false;
				console.log( 'Set button enabled status to false: ', dwnBtn.enabled === false );
			});
		} catch( error ) {
			console.warn( error );
			return false;
		}

		return true;
	}

	/**
	 * Discard all changes.
	 * @return {bool} If true, it represents changes made by this task was removed from the Ribbon.
	 */
	discard() {
		return true;
	}
};

ribbonCtrl.registerTask( 'React.Windows.RibbonDemoTask', RibbonDemoTask );
