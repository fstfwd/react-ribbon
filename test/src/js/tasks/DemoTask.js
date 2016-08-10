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
  RibbonRadioButtonGroupData,
  RibbonAppMenuItemData,
  RibbonAppMenuButtonData
} = Data;

const {
  stderr
} = Utility;

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
      const tabData = new RibbonTabData( 'DemoHomeTab', 'Home' );
      const tab = ribbon.addTab( tabData );

      const testTabData = new RibbonTabData( 'DemoTestTab', 'Test' );
      const testTab = ribbon.addTab( testTabData );

      // Create app menu item.
      const appTab = ribbon.tabs[0];
      const demoMenuItemData = new RibbonAppMenuItemData( 'DemoMenuItem', 'Demo' );
      demoMenuItemData.content = () => {
        return (
          <div>
            <h1>Hello Demo</h1>
            <span>This is demo app menu content</span>
          </div>
        );
      };
      const demoMenuItem = appTab.addItem( demoMenuItemData );

      const testMenuItemData = new RibbonAppMenuItemData( 'DemoTestMenuItem', 'Test' );
      const testMenuItem = appTab.addItem( testMenuItemData );
      testMenuItem.content = () => {
        return (
          <div>
            <h1>Hello Test</h1>
            <span>This is test app menu content</span>
          </div>
        );
      };

      const fooMenuBtnData = new RibbonAppMenuButtonData( 'DemoFooMenuButton', 'Foo' );
      fooMenuBtnData.seperator = true;

      const fooMenuBtn = appTab.addItem( fooMenuBtnData );
      fooMenuBtn.clickHandler = () => {
        alert( 'DemoFooMenuButton clicked!' );
      };

      // Create panel.
      const newMailPanelData = new RibbonPanelData( 'DemoNewMailPanel', 'New' );
      const newMailPanel = tab.addPanel( newMailPanelData );

      const delMailPanelData = new RibbonPanelData( 'DemoDeleteMailPanel', 'Delete' );
      const delMailPanel = tab.addPanel( delMailPanelData );

      const resMailPanelData = new RibbonPanelData( 'DemoRespondMailPanel', 'Respond' );
      const resMailPanel = tab.addPanel( resMailPanelData );

      // Create buttons.
      const newMailBtnData = new RibbonPushButtonData( 'DemoNewMailBtn', 'New\\nMail' );
      const newMailBtn = newMailPanel.addItem( newMailBtnData );
      newMailBtn.icon = 'img/demo/NewMailMessage.png';
      newMailBtn.clickHandler = () => { alert( 'DemoNewMailBtn Clicked!' ); };

      const newMailItemBtnData = new RibbonPushButtonData( 'DemoNewMailItemBtn', 'New\\nItems' );
      const newMailItemBtn = newMailPanel.addItem( newMailItemBtnData );
      newMailItemBtn.icon = 'img/demo/MailNewItemMenu.png';
      newMailItemBtn.clickHandler = () => { alert( 'DemoNewMailItemBtn Clicked!' ); };

      const delMailBtnData = new RibbonPushButtonData( 'DemoDeleteMailBtn', 'Delete' );
      const delMailBtn = delMailPanel.addItem( delMailBtnData );
      delMailBtn.icon = 'img/demo/Delete.png';
      delMailBtn.clickHandler = () => { alert( 'DemoDeleteMailBtn Clicked!' ); };

      const replyMailBtnData = new RibbonPushButtonData( 'DemoReplyMailBtn', 'Reply' );
      const replyMailBtn = resMailPanel.addItem( replyMailBtnData );
      replyMailBtn.icon = 'img/demo/Reply.png';
      replyMailBtn.clickHandler = () => { alert( 'DemoReplyMailBtn Clicked!' ); };

      const replyAllMailBtnData = new RibbonPushButtonData( 'DemoReplyAllMailBtn', 'Reply All' );
      const replyAllMailBtn = resMailPanel.addItem( replyAllMailBtnData );
      replyAllMailBtn.icon = 'img/demo/ReplyAll.png';
      replyAllMailBtn.clickHandler = () => { alert( 'DemoReplyAllMailBtn Clicked!' ); };

      const forwardMailBtnData = new RibbonPushButtonData( 'DemoForwardMailBtn', 'Forward' );
      const forwardMailBtn = resMailPanel.addItem( forwardMailBtnData );
      forwardMailBtn.icon = 'img/demo/Forward.png';
      forwardMailBtn.clickHandler = () => { alert( 'DemoForwardMailBtn Clicked!' ); };

      $('#demo-active-tab-home').click( () => {
        tab.actived = true;
        stderr( '[RibbonDemoTask] Set tab actived status to true: %c%s', 'color:blue;', tab.actived === true );
      });

      $('#demo-deactive-tab-home').click( () => {
        tab.actived = false;
        stderr( '[RibbonDemoTask] Set tab actived status to false: %c%s', 'color:blue;', tab.actived === false );
      });

      $('#demo-active-tab-test').click( () => {
        testTab.actived = true;
        stderr( '[RibbonDemoTask] Set tab actived status to true: %c%s', 'color:blue;', testTab.actived === true );
      });

      $('#demo-deactive-tab-test').click( () => {
        testTab.actived = false;
        stderr( '[RibbonDemoTask] Set tab actived status to false: %c%s', 'color:blue;', testTab.actived === false );
      });

      $('#demo-active-button-new-mail').click( () => {
        newMailBtn.actived = true;
        stderr( '[RibbonDemoTask] Set button actived status to true: %c%s', 'color:blue;', newMailBtn.actived === true );
      });

      $('#demo-deactive-button-new-mail').click( () => {
        newMailBtn.actived = false;
        stderr( '[RibbonDemoTask] Set button actived status to false: %c%s', 'color:blue;', newMailBtn.actived === false );
      });

      $('#demo-enable-button-new-mail').click( () => {
        newMailBtn.enabled = true;
        stderr( '[RibbonDemoTask] Set button enabled status to true: %c%s', 'color:blue;', newMailBtn.enabled === true );
      });

      $('#demo-disable-button-new-mail').click( () => {
        newMailBtn.enabled = false;
        stderr( '[RibbonDemoTask] Set button enabled status to false: %c%s', 'color:blue;', newMailBtn.enabled === false );
      });
    } catch( error ) {
      stderr( '%c[RibbonDemoTask] %s', 'color:red;', error );
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

ribbonCtrl.registerTask( 'React.Windows.RibbonDemoTask', RibbonDemoTask );
