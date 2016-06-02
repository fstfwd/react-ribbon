/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Ribbon from './Ribbon';
import RibbonTaskManager from './RibbonTaskManager';
import RibbonTaskExecuter from './RibbonTaskExecuter';

const Container = Symbol( 'container' );
const MainRibbon = Symbol( 'mainRibbon' );
const TaskManager = Symbol( 'taskManager' );
const TaskExecuter = Symbol( 'taskExecuter' );

/**
 * RibbonCtrl
 * @class
 */
export default class RibbonCtrl {
	/**
	 * RibbonCtrl constructor
	 */
	constructor() {
		this[TaskManager] = new RibbonTaskManager();
		this[Container] = undefined;
		this[MainRibbon] = undefined;
		this[TaskExecuter] = undefined;
	}

	/**
	 * Ribbon instance.
	 * @return {Ribbon} - Rendered Ribbon component.
	 */
	get mainRibbon() {
		return this[MainRibbon];
	}

	/**
	 * Ribbon container
	 * @return {HTMLElement} - React render target DOM element.
	 */
	get container() {
		return this[Container];
	}

	/**
	 * Ribbon container
	 * @param {HTMLElement} container - React render target DOM element.
	 */
	set container( container ) {
		if( !(container instanceof HTMLElement) ) throw '[RibbonCtrl] Input container must be a HTML DOM element.';

		this[Container] = container;
	}

	/**
	 * RibbonTaskManager instance.
	 * @return {RibbonTaskManager}
	 */
	get taskManager() {
		return this[TaskManager];
	}

	/**
	 * RibbonTaskExecuter instance.
	 * @return {RibbonTaskExecuter}
	 */
	get taskExecuter() {
		return this[TaskExecuter];
	}

	/**
	 * Register RibbonTask.
	 * @param {string} taskId - Task Identification.
	 * @param {RibbonTask} task - Content instance of RibbonTask.
	 * @return {bool} - If task is not type of RibbonTask or registered, it will return false.
	 */
	registerTask( taskId, task ) {
		if( !this.taskManager ) return false;

		return this.taskManager.register( taskId, task );
	}

	/**
	 * Unregister RibbonTask.
	 * @param {string} taskId - Task Identification.
	 * @return {bool} - If task is not registered, it will return false.
	 */
	unregisterTask( taskId ) {
		if( !this.taskManager ) return false;

		return this.taskManager.unregister( taskId );
	}

	/**
	 * Execute registered RibbonTask.
	 * @param {string} taskId - Task Identification.
	 * @return {bool} - If task is not registered or failed to execute, it will return false.
	 */
	executeTask( taskId, options ) {
		if( !this.taskExecuter ) return false;

		return this.taskExecuter.execute( taskId, options );
	}

	/**
	 * Discard executed RibbonTask.
	 * @param {string} taskId - Task Identification.
	 * @return {bool} - If task is not registered or failed to discard changes, it will return false.
	 */
	discardTask( taskId ) {
		if( !this.taskExecuter ) return false;

		return this.taskExecuter.discard( taskId );
	}

	/**
	 * Start UI rendering.
	 * @return {Promise} - Result.
	 * @resolve {RibbonCtrl} - Self RibbonCtrl instance.
	 * @reject {object} - Errors.
	 */
	run() {
		const scope = this;

		return new Promise( ( resolve, reject ) => {
			try {
				const container = scope.container;
				const taskManager = scope.taskManager;

				scope[MainRibbon] = ReactDOM.render( <Ribbon />, container );
				scope[TaskExecuter] = new RibbonTaskExecuter( scope.mainRibbon, taskManager );

				resolve( scope );
			} catch( error ) {
				reject( error );
			}
		});
	}
}
