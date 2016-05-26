import { Utility } from '../';
import { RibbonCtrl } from '../';

let ns = Utility.namespace( 'React.Windows' );

if( !ns.ribbonCtrlInst )
	ns.ribbonCtrlInst = new RibbonCtrl();

export default ns.ribbonCtrlInst;
