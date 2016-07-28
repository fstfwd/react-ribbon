/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import RibbonPushButtonData from './RibbonPushButtonData';

/**
 * RibbonToggleButtonData
 * @extends RibbonPushButtonData
 * @class
 */
export default class RibbonToggleButtonData extends RibbonPushButtonData {
  /**
   * RibbonToggleButtonData constructor
   * @param {string} name - The name of this instance used by the internal mechanism.
   * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
   */
  constructor( name, displayName ) {
    super( name, displayName );
  }

  /**
   * Button role.
   * @return {string}
   * @override
   */
  get role() {
    return 'ui-ribbon-button-toggle';
  }

  /**
   * Button toggleable state.
   * @return {bool} - If true, it repsents button is toggled currently.
   * @override
   */
  get toggleable() {
    return true;
  }
}
