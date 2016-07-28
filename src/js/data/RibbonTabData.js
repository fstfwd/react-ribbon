/**
 * @author yiskang / http://github.com/yiskang
 */

'use strict';

import RibbonBaseData from './RibbonBaseData';

const	Actived = Symbol( 'actived' );
const Panels = Symbol( 'panels' );

/**
 * RibbonTabData
 * @extends RibbonBaseData
 * @class
 */
export default class RibbonTabData extends RibbonBaseData {
  /**
   * RibbonTabData constructor
   * @param {string} name - The name of this instance used by the internal mechanism.
   * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
   */
  constructor( name, displayName ) {
    super( name, displayName );

    this[Actived] = false;
    this[Panels] = [];
  }

  /**
   * Tab type.
   * @return {string} - Tab type for identification.
   */
  get type() {
    return 'ui-ribbon-tab-normal';
  }

  /**
   * Tab actived state.
   * @return {bool} - If true, it repsents tab is selected currently.
   */
  get actived() {
    return this[Actived];
  }

  /**
   * Tab actived state.
   * @return {bool} [actived = false] - If true, it repsents tab is selected currently.
   */
  set actived( actived = false ) {
    this[Actived] = ( actived === true );
  }

  /**
   * Tab's children panels
   * @return {RibbonPanelData[]} - Ribbon panel data.
   */
  get panels() {
    return this[Panels];
  }

  /**
   * Tab's children panels
   * @param {RibbonPanelData[]} [panels = []] - Ribbon panel data.
   */
  set panels( panels = [] ) {
    this[Panels] = panels;
  }
}
