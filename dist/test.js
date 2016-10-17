(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('visionmedia-debug'), require('react-ribbon')) :
  typeof define === 'function' && define.amd ? define('react-ribbon-test', ['jquery', 'visionmedia-debug', 'react-ribbon'], factory) :
  (global.ReactRibbonTest = factory(global.jQuery,global.debug,global.ReactRibbon));
}(this, (function ($,debug,ReactRibbon) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
debug = 'default' in debug ? debug['default'] : debug;
ReactRibbon = 'default' in ReactRibbon ? ReactRibbon['default'] : ReactRibbon;

/**
 * @author yiskang / http://github.com/yiskang
 */

var RibbonCtrl = ReactRibbon.RibbonCtrl;

/**
 * Singleton pattern approach for RibbonCtrl.
 * @return {RibbonCtrl} - RibbonCtrl instance.
 */

var ribbonCtrl$1 = new RibbonCtrl();

/**
 * @author yiskang / http://github.com/yiskang
 */

var RibbonTask = ReactRibbon.RibbonTask;
var Utility = ReactRibbon.Utility;
var Data = ReactRibbon.Data;
var stderr = Utility.stderr;


if (!ribbonCtrl$1) stderr('%c[RibbonTest] Failed to create ribbonCtrl instance.', 'color:red;');

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





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







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

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



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/**
 * @author yiskang / http://github.com/yiskang
 */

var RibbonTabData = Data.RibbonTabData;
var RibbonPanelData = Data.RibbonPanelData;
var RibbonPushButtonData = Data.RibbonPushButtonData;
var RibbonAppMenuItemData = Data.RibbonAppMenuItemData;
var RibbonAppMenuButtonData = Data.RibbonAppMenuButtonData;
var stderr$1 = Utility.stderr;

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
    return possibleConstructorReturn(this, (RibbonDemoTask.__proto__ || Object.getPrototypeOf(RibbonDemoTask)).call(this, ribbon, options));
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
            stderr$1('[RibbonDemoTask] Set tab actived status to true: %c%s', 'color:blue;', tab.actived === true);
          });

          $('#demo-deactive-tab-home').click(function () {
            tab.actived = false;
            stderr$1('[RibbonDemoTask] Set tab actived status to false: %c%s', 'color:blue;', tab.actived === false);
          });

          $('#demo-active-tab-test').click(function () {
            testTab.actived = true;
            stderr$1('[RibbonDemoTask] Set tab actived status to true: %c%s', 'color:blue;', testTab.actived === true);
          });

          $('#demo-deactive-tab-test').click(function () {
            testTab.actived = false;
            stderr$1('[RibbonDemoTask] Set tab actived status to false: %c%s', 'color:blue;', testTab.actived === false);
          });

          $('#demo-active-button-new-mail').click(function () {
            newMailBtn.actived = true;
            stderr$1('[RibbonDemoTask] Set button actived status to true: %c%s', 'color:blue;', newMailBtn.actived === true);
          });

          $('#demo-deactive-button-new-mail').click(function () {
            newMailBtn.actived = false;
            stderr$1('[RibbonDemoTask] Set button actived status to false: %c%s', 'color:blue;', newMailBtn.actived === false);
          });

          $('#demo-enable-button-new-mail').click(function () {
            newMailBtn.enabled = true;
            stderr$1('[RibbonDemoTask] Set button enabled status to true: %c%s', 'color:blue;', newMailBtn.enabled === true);
          });

          $('#demo-disable-button-new-mail').click(function () {
            newMailBtn.enabled = false;
            stderr$1('[RibbonDemoTask] Set button enabled status to false: %c%s', 'color:blue;', newMailBtn.enabled === false);
          });
        })();
      } catch (error) {
        stderr$1('%c[RibbonDemoTask] %s', 'color:red;', error);
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

ribbonCtrl$1.registerTask('React.Windows.RibbonDemoTask', RibbonDemoTask);

/**
 * @author yiskang / http://github.com/yiskang
 */

var RibbonTabData$1 = Data.RibbonTabData;
var RibbonPanelData$1 = Data.RibbonPanelData;
var RibbonPushButtonData$1 = Data.RibbonPushButtonData;
var RibbonToggleButtonData$1 = Data.RibbonToggleButtonData;
var RibbonRadioButtonGroupData$1 = Data.RibbonRadioButtonGroupData;
var stderr$2 = Utility.stderr;

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
    return possibleConstructorReturn(this, (RibbonViewerDemoTask.__proto__ || Object.getPrototypeOf(RibbonViewerDemoTask)).call(this, ribbon, options));
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
            stderr$2('[RibbonViewerDemoTask] Set tab actived status to true: %c%s', 'color:blue;', tab.actived === true);
          });

          $('#demo-deactive-tab-basic').click(function () {
            tab.actived = false;
            stderr$2('[RibbonViewerDemoTask] Set tab actived status to false: %c%s', 'color:blue;', tab.actived === false);
          });

          $('#demo-active-button-download').click(function () {
            dwnBtn.actived = true;
            stderr$2('[RibbonViewerDemoTask] Set button actived status to true: %c%s', 'color:blue;', dwnBtn.actived === true);
          });

          $('#demo-deactive-button-download').click(function () {
            dwnBtn.actived = false;
            stderr$2('[RibbonViewerDemoTask] Set button actived status to false: %c%s', 'color:blue;', dwnBtn.actived === false);
          });

          $('#demo-enable-button-download').click(function () {
            dwnBtn.enabled = true;
            stderr$2('[RibbonViewerDemoTask] Set button enabled status to true: %c%s', 'color:blue;', dwnBtn.enabled === true);
          });

          $('#demo-disable-button-download').click(function () {
            dwnBtn.enabled = false;
            stderr$2('[RibbonViewerDemoTask] Set button enabled status to false: %c%s', 'color:blue;', dwnBtn.enabled === false);
          });
        })();
      } catch (error) {
        stderr$2('%c[RibbonViewerDemoTask] %s', 'color:red;', error);
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

ribbonCtrl$1.registerTask('React.Windows.RibbonViewerDemoTask', RibbonViewerDemoTask);

/**
 * @author yiskang / http://github.com/yiskang
 */

/**
 * @author yiskang / http://github.com/yiskang
 */

var index = {
  ribbonCtrl: ribbonCtrl$1
};

$(function () {
  // Enable debug message
  debug.enable('*');

  // Ribbon init
  ribbonCtrl$1.container = document.getElementById('ribbon-root');
  ribbonCtrl$1.run().then(function (self) {
    // Execute demo task.
    self.executeTask('React.Windows.RibbonDemoTask', null);
  }).catch(function (error) {
    console.warn(error);
  });
});

return index;

})));

//# sourceMappingURL=test.js.map
