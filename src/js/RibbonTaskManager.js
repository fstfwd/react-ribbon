/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import RibbonTask from './RibbonTask';

/**
 * Registered RibbonTask.
 * @private {RibbonTask[]}
 */
const Tasks = Symbol( 'tasks' );

/**
 * Check wether input class is instance of RibbonTask or not.
 * @param {RibbonTask} task
 * @return {bool} - If true, it reprents task is a instance of the RibbonTask.
 */
const checkTaskType = ( task ) => {
	if( task.prototype instanceof RibbonTask ) return true;
	return false;
};

/**
 * RibbonTaskManager
 * @class
 * @classdesc Task manager class for Ribbon UI.
 */
export default class RibbonTaskManager {
	/**
	 * RibbonTaskManager constructor
	 */
	constructor() {
		this[Tasks] = {};

		checkTaskType.bind( this );
	}

	/**
	 * All registered RibbonTask.
	 * @return {RibbonTask[]}
	 */
	get tasks() {
		return this[Tasks];
	}

	/**
	 * Register RibbonTask.
	 * @param {string} taskId - Task Identification.
	 * @param {RibbonTask} task - Content instance of RibbonTask.
	 * @return {bool} - If task is not type of RibbonTask or registered, it will return false.
	 */
	register( taskId, task ) {
		if( !checkTaskType( task ) || this.getTask( taskId ) ) return false;

		this[Tasks][taskId] = task;

		return true;
	}

	/**
	 * Unregister RibbonTask.
	 * @param {string} taskId - Task Identification.
	 * @return {bool} - If task is not registered, it will return false.
	 */
	unregister( taskId ) {
		if( !this.getTask( taskId ) ) return false;

		delete this[Tasks][taskId];

		return true;
	}

	/**
	 * Get registered task by given id.
	 * @param {string} taskId - Task Identification.
	 * @return {null | RibbonTask} - Return task definition if task is existed.
	 */
	getTask( taskId ) {
		if( this.tasks.hasOwnProperty( taskId ) ) {
			return this.tasks[ taskId ];
		}
		return null;
	}
}
