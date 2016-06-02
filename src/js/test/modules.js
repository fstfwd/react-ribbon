/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

export { RibbonTask, Utility, Data } from '../';
import ribbonCtrl from './RibbonCtrl';

if( !ribbonCtrl ) console.error( '[RibbonTest] Failed to create ribbonCtrl instance.' );

export default ribbonCtrl;

