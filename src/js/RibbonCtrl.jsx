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
	 * @param {HTMLElement} container - React render target DOM element.
	 */
	constructor( container ) {
		if( !container ) throw '[RibbonCtrl] Input continer must be a	HTML DOM element.';

		this[Container] = container;
		this[TaskManager] = new RibbonTaskManager();
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
	 * RibbonTaskManager instance.
	 * @return {RibbonTaskManager}
	 */
	get taskManager() {
		return this[TaskManager];
	}

	/**
	 * Start UI rendering.
	 * @return {Promise} - Result.
	 * @resolve {Ribbon} - Rendered Ribbon component.
	 * @reject {object} - Errors.
	 */
	run() {
		const scope = this;

		return new Promise( ( resolve, reject ) => {
			try {

				this[MainRibbon] = ReactDOM.render(
					<Ribbon />,
					scope.container
				);

				this[TaskExecuter] = new RibbonTaskExecuter( scope.mainRibbon, scope.taskManager );

				resolve( scope.TaskExecuter );

			} catch( error ) {
				reject( error );
			}
		});
	}
}
