/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import $ from 'jquery';
import ribbonCtrl, { Utility } from './modules';
import DemoTask from './tasks/DemoTask';

export default {
	ribbonCtrl
};

$(() => {
	ribbonCtrl.container = document.getElementById( 'ribbon-root' );
	ribbonCtrl.run()
						.then( ( self ) => {
							// Execute demo task.
							self.executeTask( 'React.Windows.RibbonDemoTask', null );
						})
						.catch( ( error ) => {
							console.warn( error );
						});
});
