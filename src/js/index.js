import Ribbon from './Ribbon';
import RibbonBase from './RibbonBase';
import RibbonTab from './RibbonTab';
import RibbonPanel from './RibbonPanel';
import RibbonTitlebar from './RibbonTitlebar';
import RibbonItem from './RibbonItem';
import RibbonButton from './RibbonButton';
import RibbonTooltip from './RibbonTooltip';
import RibbonPushButton from './RibbonPushButton';
import RibbonToggleButton from './RibbonToggleButton';
import RibbonGroup from './RibbonGroup';
import RibbonRadioButtonGroup from './RibbonRadioButtonGroup';
import RibbonCtrl from './RibbonCtrl';
import RibbonTask from './RibbonTask';
import RibbonTaskManager from './RibbonTaskManager';
import RibbonTaskExecuter from './RibbonTaskExecuter';
import Utility from './utility';
import Data from './data';

const RibbonUI = {
	Ribbon,
	RibbonBase,
	RibbonTab,
	RibbonPanel,
	RibbonTitlebar,
	RibbonItem,
	RibbonButton,
	RibbonTooltip,
	RibbonPushButton,
	RibbonToggleButton,
	RibbonGroup,
	RibbonRadioButtonGroup,
	RibbonCtrl,
	RibbonTask,
	RibbonTaskManager,
	RibbonTaskExecuter,
	Utility,
	Data
};

/**
 * Expose to global.
 */
Utility.namespace( 'React.Windows' );
React.Windows = RibbonUI;

/**
 * Module exposure.
 */
export default RibbonUI;
export {
	RibbonCtrl,
	RibbonTask,
	Utility,
	Data
};