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
