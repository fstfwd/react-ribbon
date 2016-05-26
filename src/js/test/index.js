import ribbonCtrl, { Utility } from './modules';
import DemoTask from './tasks/DemoTask';

const init = () => {
	ribbonCtrl.container = document.getElementById( 'ribbon-root' );
	ribbonCtrl.run()
						.then( ( self ) => {
							// Execute demo task.
							self.executeTask( 'React.Windows.RibbonDemoTask', null );
						})
						.catch( ( error ) => {
							console.warn( error );
						});
};

window.onload = () => {
	init();
};
