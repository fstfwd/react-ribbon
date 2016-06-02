/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import Ribbon from './Ribbon';
import RibbonTaskManager from './RibbonTaskManager';

const RibbonInst = Symbol( 'ribbon' );
const Tasks = Symbol( 'tasks' );
const TaskManager = Symbol( 'taskManager' );

/**
 * RibbonTaskExecuter
 * @class
 * @classdesc	Class for executing tasks to create or modify Ribbon contents.
 */
export default class RibbonTaskExecuter {
	/**
	 * RibbonTaskExecuter constructor.
	 * @param {Ribbon} ribbon - Rendered Ribbon component.
	 * @param {RibbonTaskManager} taskManager -	RibbonTaskManager instance.
	 */
	constructor( ribbon, taskManager ) {
		if( !(ribbon instanceof Ribbon ) ) throw 'No Ribbon instance available.';
		if( !(taskManager instanceof RibbonTaskManager ) ) throw 'No RibbonTaskManager instance available.';

		this[RibbonInst] = ribbon;
		this[TaskManager] = taskManager;
		this[Tasks] = {};
	}

	/**
	 * Rendered Ribbon component.
	 * @return {Ribbon}
	 */
	get ribbon() {
		return this[RibbonInst];
	}

	/**
	 * Task	manager instance.
	 * @return {RibbonTaskManager}
	 */
	get manager() {
		return this[TaskManager];
	}

	/**
	 * All executed tasks.
	 * @return {RibbonTask[]}
	 */
	get tasks() {
		return this[Tasks];
	}

	/**
	 * Execute registered task.
	 * @param {string} taskId - Task Identification.
	 * @return {bool} - If task is not registered or failed to execute, it will return false.
	 */
	execute( taskId, options ) {
		let result = false;

		if( !this.getTask( taskId ) ) {
			const taskClass = this.manager.getTask( taskId );

			if( taskClass ) {
				const task = new taskClass( this.ribbon, options );
				result = task.execute();

				if( result === true ) {
					this[Tasks][taskId] = task;

					console.log( '[RibbonTaskExecuter] Task executed: `%s`.', taskId );
				}
			} else {
				console.log( '[RibbonTaskExecuter] Task not found: `%s`.', taskId );
			}
		} else {
			console.log( '[RibbonTaskExecuter] Task already executed: `%s`.', taskId );
		}

		return result;
	}

	/**
	 * Discard executed task.
	 * @param {string} taskId - Task Identification.
	 * @return {bool} - If task is not registered or failed to discard changes, it will return false.
	 */
	discard( taskId ) {
		let result = false;
		const task = this.getTask( taskId );

		if( !task ) {
			console.log( '[RibbonTaskExecuter] Task not found: `%s`.', taskId );
		} else {
			result = task.discard();
			if( !result ) throw 'Failed to discard chnages in task: `' + taskId + '`.';

			delete this[Tasks][taskId];
			console.log( '[RibbonTaskExecuter] Task content discarded: `%s`.', taskId );
		}

		return result;
	}

	/**
	 * Get executed task by given id.
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
