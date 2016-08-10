/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import ReactRibbon from 'react-ribbon';
import ribbonCtrl from './RibbonCtrl';

export const { RibbonTask, Utility, Data } = ReactRibbon;

const {
  stderr
} = Utility;

if( !ribbonCtrl ) stderr( '%c[RibbonTest] Failed to create ribbonCtrl instance.', 'color:red;' );

export default ribbonCtrl;

