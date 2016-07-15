/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import ReactRibbon from '../';
export const { RibbonTask, Utility, Data } = ReactRibbon;
import ribbonCtrl from './RibbonCtrl';

if( !ribbonCtrl ) console.error( '[RibbonTest] Failed to create ribbonCtrl instance.' );

export default ribbonCtrl;

