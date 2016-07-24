(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('react-ribbon')) :
  typeof define === 'function' && define.amd ? define('react-ribbon-test', ['jquery', 'react-ribbon'], factory) :
  (global.ReactRibbonTest = factory(global.jQuery,global.ReactRibbon));
}(this, function ($,ReactRibbon) { 'use strict';

  $ = 'default' in $ ? $['default'] : $;
  ReactRibbon = 'default' in ReactRibbon ? ReactRibbon['default'] : ReactRibbon;

  var RibbonCtrl = ReactRibbon.RibbonCtrl;

  /**
   * Singleton pattern approach for RibbonCtrl.
   * @return {RibbonCtrl} - RibbonCtrl instance.
   */

  var ribbonCtrl = new RibbonCtrl();

  var RibbonTask = ReactRibbon.RibbonTask;
  var Data = ReactRibbon.Data;
  if (!ribbonCtrl) console.error('[RibbonTest] Failed to create ribbonCtrl instance.');

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var RibbonTabData = Data.RibbonTabData;
  var RibbonPanelData = Data.RibbonPanelData;
  var RibbonPushButtonData = Data.RibbonPushButtonData;
  var RibbonToggleButtonData = Data.RibbonToggleButtonData;
  var RibbonTooltipData = Data.RibbonTooltipData;
  var RibbonRadioButtonGroupData = Data.RibbonRadioButtonGroupData;
  var RibbonAppMenuItemData = Data.RibbonAppMenuItemData;
  var RibbonAppMenuButtonData = Data.RibbonAppMenuButtonData;

  /**
   * RibbonDemoTask
   * @extends RibbonTask
   * @class
   */

  var RibbonDemoTask = function (_RibbonTask) {
  	inherits(RibbonDemoTask, _RibbonTask);

  	/**
    * RibbonDemoTask constructor.
    * @param {Ribbon} ribbon - Rendered Ribbon component.
    * @param {object} options - Task options.
    */

  	function RibbonDemoTask(ribbon, options) {
  		classCallCheck(this, RibbonDemoTask);
  		return possibleConstructorReturn(this, Object.getPrototypeOf(RibbonDemoTask).call(this, ribbon, options));
  	}

  	/**
    * Execute task content.
    * @return {bool} If true, it represents this task was executed by the Ribbon.
    */


  	createClass(RibbonDemoTask, [{
  		key: 'execute',
  		value: function execute() {
  			var _this2 = this;

  			try {
  				(function () {
  					// Create tab.
  					var ribbon = _this2.ribbon;
  					var tabData = new RibbonTabData('DemoHomeTab', 'Home');
  					var tab = ribbon.addTab(tabData);

  					var testTabData = new RibbonTabData('DemoTestTab', 'Test');
  					var testTab = ribbon.addTab(testTabData);

  					// Create app menu item.
  					var appTab = ribbon.tabs[0];
  					var demoMenuItemData = new RibbonAppMenuItemData('DemoMenuItem', 'Demo');
  					demoMenuItemData.content = function () {
  						return React.createElement(
  							'div',
  							null,
  							React.createElement(
  								'h1',
  								null,
  								'Hello Demo'
  							),
  							React.createElement(
  								'span',
  								null,
  								'This is demo app menu content'
  							)
  						);
  					};
  					var demoMenuItem = appTab.addItem(demoMenuItemData);

  					var testMenuItemData = new RibbonAppMenuItemData('DemoTestMenuItem', 'Test');
  					var testMenuItem = appTab.addItem(testMenuItemData);
  					testMenuItem.content = function () {
  						return React.createElement(
  							'div',
  							null,
  							React.createElement(
  								'h1',
  								null,
  								'Hello Test'
  							),
  							React.createElement(
  								'span',
  								null,
  								'This is test app menu content'
  							)
  						);
  					};

  					var fooMenuBtnData = new RibbonAppMenuButtonData('DemoFooMenuButton', 'Foo');
  					fooMenuBtnData.seperator = true;

  					var fooMenuBtn = appTab.addItem(fooMenuBtnData);
  					fooMenuBtn.clickHandler = function () {
  						alert('DemoFooMenuButton clicked!');
  					};

  					// Create panel.
  					var newMailPanelData = new RibbonPanelData('DemoNewMailPanel', 'New');
  					var newMailPanel = tab.addPanel(newMailPanelData);

  					var delMailPanelData = new RibbonPanelData('DemoDeleteMailPanel', 'Delete');
  					var delMailPanel = tab.addPanel(delMailPanelData);

  					var resMailPanelData = new RibbonPanelData('DemoRespondMailPanel', 'Respond');
  					var resMailPanel = tab.addPanel(resMailPanelData);

  					// Create buttons.
  					var newMailBtnData = new RibbonPushButtonData('DemoNewMailBtn', 'New\\nMail');
  					var newMailBtn = newMailPanel.addItem(newMailBtnData);
  					newMailBtn.icon = 'img/demo/NewMailMessage.png';
  					newMailBtn.clickHandler = function () {
  						alert('DemoNewMailBtn Clicked!');
  					};

  					var newMailItemBtnData = new RibbonPushButtonData('DemoNewMailItemBtn', 'New\\nItems');
  					var newMailItemBtn = newMailPanel.addItem(newMailItemBtnData);
  					newMailItemBtn.icon = 'img/demo/MailNewItemMenu.png';
  					newMailItemBtn.clickHandler = function () {
  						alert('DemoNewMailItemBtn Clicked!');
  					};

  					var delMailBtnData = new RibbonPushButtonData('DemoDeleteMailBtn', 'Delete');
  					var delMailBtn = delMailPanel.addItem(delMailBtnData);
  					delMailBtn.icon = 'img/demo/Delete.png';
  					delMailBtn.clickHandler = function () {
  						alert('DemoDeleteMailBtn Clicked!');
  					};

  					var replyMailBtnData = new RibbonPushButtonData('DemoReplyMailBtn', 'Reply');
  					var replyMailBtn = resMailPanel.addItem(replyMailBtnData);
  					replyMailBtn.icon = 'img/demo/Reply.png';
  					replyMailBtn.clickHandler = function () {
  						alert('DemoReplyMailBtn Clicked!');
  					};

  					var replyAllMailBtnData = new RibbonPushButtonData('DemoReplyAllMailBtn', 'Reply All');
  					var replyAllMailBtn = resMailPanel.addItem(replyAllMailBtnData);
  					replyAllMailBtn.icon = 'img/demo/ReplyAll.png';
  					replyAllMailBtn.clickHandler = function () {
  						alert('DemoReplyAllMailBtn Clicked!');
  					};

  					var forwardMailBtnData = new RibbonPushButtonData('DemoForwardMailBtn', 'Forward');
  					var forwardMailBtn = resMailPanel.addItem(forwardMailBtnData);
  					forwardMailBtn.icon = 'img/demo/Forward.png';
  					forwardMailBtn.clickHandler = function () {
  						alert('DemoForwardMailBtn Clicked!');
  					};

  					$('#demo-active-tab-home').click(function () {
  						tab.actived = true;
  						console.log('Set tab actived status to true: ', tab.actived === true);
  					});

  					$('#demo-deactive-tab-home').click(function () {
  						tab.actived = false;
  						console.log('Set tab actived status to false: ', tab.actived === false);
  					});

  					$('#demo-active-tab-test').click(function () {
  						testTab.actived = true;
  						console.log('Set tab actived status to true: ', testTab.actived === true);
  					});

  					$('#demo-deactive-tab-test').click(function () {
  						testTab.actived = false;
  						console.log('Set tab actived status to false: ', testTab.actived === false);
  					});

  					$('#demo-active-button-new-mail').click(function () {
  						newMailBtn.actived = true;
  						console.log('Set button actived status to true: ', newMailBtn.actived === true);
  					});

  					$('#demo-deactive-button-new-mail').click(function () {
  						newMailBtn.actived = false;
  						console.log('Set button actived status to false: ', newMailBtn.actived === false);
  					});

  					$('#demo-enable-button-new-mail').click(function () {
  						newMailBtn.enabled = true;
  						console.log('Set button enabled status to true: ', newMailBtn.enabled === true);
  					});

  					$('#demo-disable-button-new-mail').click(function () {
  						newMailBtn.enabled = false;
  						console.log('Set button enabled status to false: ', newMailBtn.enabled === false);
  					});
  				})();
  			} catch (error) {
  				console.warn(error);
  				return false;
  			}

  			return true;
  		}

  		/**
     * Discard all changes.
     * @return {bool} If true, it represents changes made by this task was removed from the Ribbon.
     */

  	}, {
  		key: 'discard',
  		value: function discard() {
  			return true;
  		}
  	}]);
  	return RibbonDemoTask;
  }(RibbonTask);

  ribbonCtrl.registerTask('React.Windows.RibbonDemoTask', RibbonDemoTask);

  var RibbonTabData$1 = Data.RibbonTabData;
  var RibbonPanelData$1 = Data.RibbonPanelData;
  var RibbonPushButtonData$1 = Data.RibbonPushButtonData;
  var RibbonToggleButtonData$1 = Data.RibbonToggleButtonData;
  var RibbonTooltipData$1 = Data.RibbonTooltipData;
  var RibbonRadioButtonGroupData$1 = Data.RibbonRadioButtonGroupData;

  /**
   * RibbonViewerDemoTask
   * @extends RibbonTask
   * @class
   */

  var RibbonViewerDemoTask = function (_RibbonTask) {
  	inherits(RibbonViewerDemoTask, _RibbonTask);

  	/**
    * RibbonViewerDemoTask constructor.
    * @param {Ribbon} ribbon - Rendered Ribbon component.
    * @param {object} options - Task options.
    */

  	function RibbonViewerDemoTask(ribbon, options) {
  		classCallCheck(this, RibbonViewerDemoTask);
  		return possibleConstructorReturn(this, Object.getPrototypeOf(RibbonViewerDemoTask).call(this, ribbon, options));
  	}

  	/**
    * Execute task content.
    * @return {bool} If true, it represents this task was executed by the Ribbon.
    */


  	createClass(RibbonViewerDemoTask, [{
  		key: 'execute',
  		value: function execute() {
  			var _this2 = this;

  			try {
  				(function () {
  					// Create tab.
  					var ribbon = _this2.ribbon;
  					var tabData = new RibbonTabData$1('DemoBIMTab', 'BIM');
  					var tab = ribbon.addTab(tabData);

  					// Create panel.
  					var spatialPanelData = new RibbonPanelData$1('DemoSpatialPanel', 'Spatial');
  					var spatialPanel = tab.addPanel(spatialPanelData);

  					// Create buttons.
  					var dwnBtnData = new RibbonPushButtonData$1('DemoSpatialDwnBtn', 'Download');
  					var dwnBtn = spatialPanel.addItem(dwnBtnData);
  					dwnBtn.icon = 'img/viewer/db_download.png';
  					dwnBtn.clickHandler = function () {
  						alert('DemoSpatialDwnBtn Clicked!');
  					};

  					var clsBtnData = new RibbonPushButtonData$1('DemoSpatialCleanBtn', 'Clean');
  					var clsBtn = spatialPanel.addItem(clsBtnData);
  					clsBtn.icon = 'img/viewer/db_remove.png';
  					clsBtn.clickHandler = function () {
  						alert('DemoSpatialCleanBtn Clicked!');
  					};

  					// Create panel.
  					var navPanelData = new RibbonPanelData$1('DemoNavPanel', 'Navigation');
  					var navPanel = tab.addPanel(navPanelData);

  					// Create button gruop.
  					var radioBtnGroupData = new RibbonRadioButtonGroupData$1('DemoNavBtnGroup', 'NavBtnGroup');
  					var radioBtnGroup = navPanel.addItem(radioBtnGroupData);

  					// Add buttons to gruop.
  					var panBtnData = new RibbonToggleButtonData$1('DemoPanBtn', 'Pan');
  					var panBtn = radioBtnGroup.addItem(panBtnData);
  					panBtn.icon = 'img/viewer/pan.png';
  					panBtn.clickHandler = function () {
  						alert('DemoPanBtn Clicked!');
  					};

  					var orbitBtnData = new RibbonToggleButtonData$1('DemoOrbitBtn', 'Orbit');
  					var orbitBtn = radioBtnGroup.addItem(orbitBtnData);
  					orbitBtn.icon = 'img/viewer/orbit.png';
  					orbitBtn.clickHandler = function () {
  						alert('DemoOrbitBtn Clicked!');
  					};

  					$('#demo-active-tab-basic').click(function () {
  						tab.actived = true;
  						console.log('Set tab actived status to true: ', tab.actived === true);
  					});

  					$('#demo-deactive-tab-basic').click(function () {
  						tab.actived = false;
  						console.log('Set tab actived status to false: ', tab.actived === false);
  					});

  					$('#demo-active-button-download').click(function () {
  						dwnBtn.actived = true;
  						console.log('Set button actived status to true: ', dwnBtn.actived === true);
  					});

  					$('#demo-deactive-button-download').click(function () {
  						dwnBtn.actived = false;
  						console.log('Set button actived status to false: ', dwnBtn.actived === false);
  					});

  					$('#demo-enable-button-download').click(function () {
  						dwnBtn.enabled = true;
  						console.log('Set button enabled status to true: ', dwnBtn.enabled === true);
  					});

  					$('#demo-disable-button-download').click(function () {
  						dwnBtn.enabled = false;
  						console.log('Set button enabled status to false: ', dwnBtn.enabled === false);
  					});
  				})();
  			} catch (error) {
  				console.warn(error);
  				return false;
  			}

  			return true;
  		}

  		/**
     * Discard all changes.
     * @return {bool} If true, it represents changes made by this task was removed from the Ribbon.
     */

  	}, {
  		key: 'discard',
  		value: function discard() {
  			return true;
  		}
  	}]);
  	return RibbonViewerDemoTask;
  }(RibbonTask);

  ribbonCtrl.registerTask('React.Windows.RibbonViewerDemoTask', RibbonViewerDemoTask);

  var index = {
  	ribbonCtrl: ribbonCtrl
  };

  $(function () {
  	ribbonCtrl.container = document.getElementById('ribbon-root');
  	ribbonCtrl.run().then(function (self) {
  		// Execute demo task.
  		self.executeTask('React.Windows.RibbonDemoTask', null);
  	}).catch(function (error) {
  		console.warn(error);
  	});
  });

  return index;

}));
//# sourceMappingURL=test.js.map
