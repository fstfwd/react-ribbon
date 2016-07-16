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
			const tabData = new RibbonTabData( 'DemoHomeTab', 'Home' );
			const tab = ribbon.addTab( tabData );

			const testTabData = new RibbonTabData( 'DemoTestTab', 'Test' );
			const testTab = ribbon.addTab( testTabData );

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
				console.log( 'Set tab actived status to true: ', tab.actived === true );
			});

			$('#demo-deactive-tab-home').click( () => {
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

			$('#demo-active-button-new-mail').click( () => {
				newMailBtn.actived = true;
				console.log( 'Set button actived status to true: ', newMailBtn.actived === true );
			});

			$('#demo-deactive-button-new-mail').click( () => {
				newMailBtn.actived = false;
				console.log( 'Set button actived status to false: ', newMailBtn.actived === false );
			});

			$('#demo-enable-button-new-mail').click( () => {
				newMailBtn.enabled = true;
				console.log( 'Set button enabled status to true: ', newMailBtn.enabled === true );
			});

			$('#demo-disable-button-new-mail').click( () => {
				newMailBtn.enabled = false;
				console.log( 'Set button enabled status to false: ', newMailBtn.enabled === false );
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
