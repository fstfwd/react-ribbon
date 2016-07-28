/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import RibbonTabData from './RibbonTabData';

const Items = Symbol( 'items' );

/**
 * RibbonAppTabData
 * @class
 */
export default class RibbonAppTabData extends RibbonTabData {
  /**
   * RibbonAppTabData constructor
   * @param {string} [displayName = 'File'] - The name of this instance shown on the user interface, might be a localized string.
   */
  constructor( displayName = 'File' ) {
    super( 'AppTab', displayName );

    this[Items] = [];
  }

  /**
   * Tab type.
   * @return {string} - Tab type for identification.
   * @override
   */
  get type() {
    return 'ui-ribbon-tab-application';
  }

  /**
   * Panel's children items.
   * @return {RibbonItemData[]} - Ribbon item data.
   */
  get items() {
    return this[Items];
  }

  /**
   * Panel's children items.
   * @return {RibbonItemData[]} [items = []]- Ribbon item data.
   */
  set items( items = [] ) {
    this[Items] = items;
  }
}
