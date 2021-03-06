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

const {
  stderr
} = Utility;

/**
 * RibbonViewerDemoTask
 * @extends RibbonTask
 * @class
 */
export default class RibbonViewerDemoTask extends RibbonTask {
  /**
   * RibbonViewerDemoTask constructor.
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
      const tabData = new RibbonTabData( 'DemoBIMTab', 'BIM' );
      const tab = ribbon.addTab( tabData );

      // Create panel.
      const spatialPanelData = new RibbonPanelData( 'DemoSpatialPanel', 'Spatial' );
      const spatialPanel = tab.addPanel( spatialPanelData );

      // Create buttons.
      const dwnBtnData = new RibbonPushButtonData( 'DemoSpatialDwnBtn', 'Download' );
      const dwnBtn = spatialPanel.addItem( dwnBtnData );
      dwnBtn.icon = 'img/viewer/db_download.png';
      dwnBtn.clickHandler = () => { alert( 'DemoSpatialDwnBtn Clicked!' ); };

      const clsBtnData = new RibbonPushButtonData( 'DemoSpatialCleanBtn', 'Clean' );
      const clsBtn = spatialPanel.addItem( clsBtnData );
      clsBtn.icon = 'img/viewer/db_remove.png';
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
      panBtn.icon = 'img/viewer/pan.png';
      panBtn.clickHandler = () => { alert( 'DemoPanBtn Clicked!' ); };

      const orbitBtnData = new RibbonToggleButtonData( 'DemoOrbitBtn', 'Orbit' );
      const orbitBtn = radioBtnGroup.addItem( orbitBtnData );
      orbitBtn.icon = 'img/viewer/orbit.png';
      orbitBtn.clickHandler = () => { alert( 'DemoOrbitBtn Clicked!' ); };

      $('#demo-active-tab-basic').click( () => {
        tab.actived = true;
        stderr( '[RibbonViewerDemoTask] Set tab actived status to true: %c%s', 'color:blue;', tab.actived === true );
      });

      $('#demo-deactive-tab-basic').click( () => {
        tab.actived = false;
        stderr( '[RibbonViewerDemoTask] Set tab actived status to false: %c%s', 'color:blue;', tab.actived === false );
      });

      $('#demo-active-button-download').click( () => {
        dwnBtn.actived = true;
        stderr( '[RibbonViewerDemoTask] Set button actived status to true: %c%s', 'color:blue;', dwnBtn.actived === true );
      });

      $('#demo-deactive-button-download').click( () => {
        dwnBtn.actived = false;
        stderr( '[RibbonViewerDemoTask] Set button actived status to false: %c%s', 'color:blue;', dwnBtn.actived === false );
      });

      $('#demo-enable-button-download').click( () => {
        dwnBtn.enabled = true;
        stderr( '[RibbonViewerDemoTask] Set button enabled status to true: %c%s', 'color:blue;', dwnBtn.enabled === true );
      });

      $('#demo-disable-button-download').click( () => {
        dwnBtn.enabled = false;
        stderr( '[RibbonViewerDemoTask] Set button enabled status to false: %c%s', 'color:blue;', dwnBtn.enabled === false );
      });
    } catch( error ) {
      stderr( '%c[RibbonViewerDemoTask] %s', 'color:red;', error );
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
}

ribbonCtrl.registerTask( 'React.Windows.RibbonViewerDemoTask', RibbonViewerDemoTask );
