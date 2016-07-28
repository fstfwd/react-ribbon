/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import RibbonItemData from './RibbonItemData';

const Items = Symbol( 'items' );

/**
 * RibbonGroupData
 * @extends RibbonItemData
 * @class
 */
export default class RibbonGroupData extends RibbonItemData {
  /**
   * RibbonGroupData constructor
   * @param {string} name - The name of this instance used by the internal mechanism.
   * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
   */
  constructor( name, displayName ) {
    super( name, displayName );

    this[Items] = [];
  }

  /**
   * Button type.
   * @return {string} -	Button type for identification.
   * @override
   */
  get type() {
    return 'ui-ribbon-group';
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
