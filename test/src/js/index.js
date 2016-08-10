/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import $ from 'jquery';
import debug from 'visionmedia-debug';
import ribbonCtrl from './modules';
import './tasks';

export default {
  ribbonCtrl
};

$(() => {
  // Enable debug message
  debug.enable( '*' );

  // Ribbon init
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
