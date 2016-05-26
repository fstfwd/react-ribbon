(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _RibbonTabData = require('./data/RibbonTabData');

var _RibbonTabData2 = _interopRequireDefault(_RibbonTabData);

var _RibbonAppTabData = require('./data/RibbonAppTabData');

var _RibbonAppTabData2 = _interopRequireDefault(_RibbonAppTabData);

var _RibbonTitlebarData = require('./data/RibbonTitlebarData');

var _RibbonTitlebarData2 = _interopRequireDefault(_RibbonTitlebarData);

var _RibbonTitlebar = require('./RibbonTitlebar');

var _RibbonTitlebar2 = _interopRequireDefault(_RibbonTitlebar);

var _RibbonTab = require('./RibbonTab');

var _RibbonTab2 = _interopRequireDefault(_RibbonTab);

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = Symbol('tabs');

/**
 * Ribbon
 * @extends React.Component
 * @class
 */

var Ribbon = function (_React$Component) {
	_inherits(Ribbon, _React$Component);

	/**
  * RibbonBase constructor
  * @param {object} props - React component properties
  */

	function Ribbon(props) {
		_classCallCheck(this, Ribbon);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ribbon).call(this, props));

		var appTab = new _RibbonAppTabData2.default();
		var tabs = [appTab].concat(props.tabs);
		var titlebar = new _RibbonTitlebarData2.default();

		_this.state = {
			tabs: tabs,
			titlebar: titlebar
		};

		_this[Tabs] = [];

		_this.handleTabClick = _this.handleTabClick.bind(_this);
		return _this;
	}

	/**
  * Content tabs
  * @return {RibbonTab[]} - Array of RibbonTabs.
  */


	_createClass(Ribbon, [{
		key: 'toggleAppTitle',


		/**
   * Toggle to show or hide app titlebar.
   */
		value: function toggleAppTitle() {
			this.refs.titlebar.toggleDisplay();
		}

		/**
   * Add new tab by given data.
   * @param {RibbonTabData} tabData - Ribbon tab data for creating new tab.
   * @return {RibbonTab} - Rendered RibbonTab component.
   */

	}, {
		key: 'addTab',
		value: function addTab(tabData) {
			var idx = this.tabs.findIndex(function (tab) {
				return tab.id == tabData.id || tab.name === tabData.name;
			});
			if (!(tabData instanceof _RibbonTabData2.default) || idx !== -1) return console.log('%c[Ribbon] Input tabData is invalid or duplicate.', 'color:red;');

			tabData.actived = this.tabs.length === 1;
			var tabs = this.state.tabs.concat(tabData);
			this.setState({ tabs: tabs });

			return this.tabs[this.tabs.length - 1];
		}

		/**
   * Active target tab by given id.
   * @param {string} tabId - Tab Id.
   */

	}, {
		key: 'activeTabById',
		value: function activeTabById(tabId) {
			if (typeof tabId !== 'string') return console.log('%c[Ribbon] TabId should be a string.', 'color:red;');

			var updateTab = function updateTab(tab) {
				tab.actived = tab.id === tabId ? true : false;
			};

			this.state.tabs.forEach(updateTab);
			this.tabs.forEach(updateTab);
		}

		/**
   * Tab clicking event handler
   */

	}, {
		key: 'handleTabClick',
		value: function handleTabClick(tabId) {
			this.activeTabById(tabId);
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps, nextState) {
			this[Tabs].length = 0;
		}
	}, {
		key: 'render',
		value: function render() {
			var scope = this;
			var otherTabs = this.state.tabs; //.slice( 1 );

			var updateTitlebar = function updateTitlebar(id, data) {
				var titlebar = scope.state.titlebar;

				if (titlebar.id !== id) return;

				Object.assign(titlebar, data);
				scope.setState({ titlebar: titlebar });
			};

			var createTitleBar = function createTitleBar() {
				var data = scope.state.titlebar;
				return _react2.default.createElement(_RibbonTitlebar2.default, {
					key: data.id,
					id: data.id,
					name: data.name,
					displayName: data.title,
					enabled: data.enabled,
					hidden: data.hidden,
					ref: 'titlebar',
					onStateChange: updateTitlebar });
			};

			var updateTab = function updateTab(id, data) {
				var tabs = scope.state.tabs;
				var tab = tabs.find(function (tab) {
					return tab.id === id;
				});
				if (!tab) return;

				Object.assign(tab, data);
				scope.setState({ tabs: tabs });
			};

			var createTab = function createTab(tab) {
				return _react2.default.createElement(_RibbonTab2.default, {
					key: tab.id,
					id: tab.id,
					name: tab.name,
					displayName: tab.displayName,
					type: tab.type,
					enabled: tab.enabled,
					hidden: tab.hidden,
					actived: tab.actived,
					panels: tab.panels,
					onClick: scope.handleTabClick,
					onStateChange: updateTab,
					ref: function ref(c) {
						if (c) scope.tabs.push(c);
					} });
			};

			return _react2.default.createElement(
				'div',
				{ id: 'RibbonUI' },
				createTitleBar(),
				_react2.default.createElement(
					'div',
					{ className: 'ui-ribbon-window' },
					_react2.default.createElement(
						'div',
						{ id: 'ui-ribbon-main', className: 'ui-ribbon-main ui-ribbon-border-bottom' },
						_react2.default.createElement(
							'div',
							{ className: 'ui-ribbon-tab-container ui-ribbon-border-bottom' },
							_react2.default.createElement(
								'ul',
								{ role: 'ui-ribbon-tabs', className: 'ui-ribbon-nowrap ui-ribbon-nopadding ui-ribbon-nomargin' },
								otherTabs.map(createTab)
							)
						)
					)
				)
			);
		}
	}, {
		key: 'tabs',
		get: function get() {
			return this[Tabs];
		}
	}]);

	return Ribbon;
}(_react2.default.Component);

exports.default = Ribbon;


Ribbon.propTypes = {
	id: _react2.default.PropTypes.string.isRequired,
	tabs: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.instanceOf(_RibbonTabData2.default))
};

Ribbon.defaultProps = {
	id: (0, _utility.newGUID)(),
	tabs: []
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./RibbonTab":10,"./RibbonTitlebar":14,"./data/RibbonAppTabData":17,"./data/RibbonTabData":25,"./data/RibbonTitlebarData":26,"./utility":35}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RibbonBase
 * @extends React.Component
 * @class
 */

var RibbonBase = function (_React$Component) {
	_inherits(RibbonBase, _React$Component);

	/**
  * RibbonBase constructor
  * @param {object} props - React component properties
  */

	function RibbonBase(props) {
		_classCallCheck(this, RibbonBase);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonBase).call(this, props));

		var displayName = typeof props.displayName === 'string' ? props.displayName : name;
		var enabled = props.enabled == false ? false : true;
		var hidden = props.hidden === true;

		_this.state = {
			displayName: displayName,
			enabled: enabled,
			hidden: hidden
		};
		return _this;
	}

	/**
  * Instance id for internal identification and HTML id attribute.
  * @return {string} - The UUID.
  */


	_createClass(RibbonBase, [{
		key: 'id',
		get: function get() {
			return this.props.id;
		}

		/**
   * Instance name for internal identification.
   * @return {string} - Instance name.
   */

	}, {
		key: 'name',
		get: function get() {
			return this.props.name;
		}

		/**
   * Instance name shown on the user interface, might be a localized string.
   * @return {string} - Instance name.
   */

	}, {
		key: 'displayName',
		get: function get() {
			return this.state.displayName;
		}

		/**
   * Instance name shown on the user interface, might be a localized string.
   * @param {string} - Instance name.
   */
		,
		set: function set(name) {
			if (typeof name !== 'string') throw 'Input type should be a string.';

			var prop = { displayName: name };
			var onStateChange = this.props.onStateChange;
			onStateChange && onStateChange(this.id, prop);

			this.setState(prop);
		}

		/**
   * Instance edis/en-able status.
   * @return {bool} - If false, make instance be disabled.
   */

	}, {
		key: 'enabled',
		get: function get() {
			return this.state.enabled;
		}

		/**
   * Instance edis/en-able status.
   * @param {bool} [enabled = true] - If false, make instance be disabled.
   */
		,
		set: function set() {
			var enabled = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

			var isEnabled = enabled === true;

			var prop = { enabled: isEnabled };
			var onStateChange = this.props.onStateChange;
			onStateChange && onStateChange(this.id, prop);

			this.setState(prop);
		}

		/**
   * Instance is hidden or not.
   * @return {bool} - If false, instance is going to disppear on the UI.
   */

	}, {
		key: 'hidden',
		get: function get() {
			return this.state.hidden;
		}

		/**
   * Instance is hidden or not.
   * @return {bool} [hidden = false]- If false, instance is going to disppear on the UI.
   */
		,
		set: function set() {
			var hidden = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			var isHidden = hidden === true;
			var isEnabled = !isHidden;

			var prop = { hidden: isHidden, enabled: isEnabled };
			var onStateChange = this.props.onStateChange;
			onStateChange && onStateChange(this.id, prop);

			this.setState(prop);
		}
	}]);

	return RibbonBase;
}(_react2.default.Component);

exports.default = RibbonBase;


RibbonBase.propTypes = {
	id: _react2.default.PropTypes.string.isRequired,
	name: _react2.default.PropTypes.string.isRequired,
	displayName: _react2.default.PropTypes.string,
	enabled: _react2.default.PropTypes.boolean,
	hidden: _react2.default.PropTypes.boolean,
	onStateChange: _react2.default.PropTypes.func
};

RibbonBase.defaultProps = {
	id: (0, _utility.newGUID)(),
	enabled: true,
	hidden: false
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./utility":35}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = (typeof window !== "undefined" ? window['classNames'] : typeof global !== "undefined" ? global['classNames'] : null);

var _classnames2 = _interopRequireDefault(_classnames);

var _RibbonItem2 = require('./RibbonItem');

var _RibbonItem3 = _interopRequireDefault(_RibbonItem2);

var _RibbonTooltip = require('./RibbonTooltip');

var _RibbonTooltip2 = _interopRequireDefault(_RibbonTooltip);

var _RibbonTooltipData = require('./data/RibbonTooltipData');

var _RibbonTooltipData2 = _interopRequireDefault(_RibbonTooltipData);

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RibbonButton
 * @extends RibbonItem
 * @class
 */

var RibbonButton = function (_RibbonItem) {
	_inherits(RibbonButton, _RibbonItem);

	/**
  * RibbonButton constructor
  * @param {object} props - React component properties
  */

	function RibbonButton(props) {
		_classCallCheck(this, RibbonButton);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonButton).call(this, props));

		var icon = props.icon;
		var tooltip = props.tooltip;
		var toggleable = props.toggleable === true;
		var clickHandler = props.clickHandler;

		_this.state = Object.assign(_this.state, {
			icon: icon,
			tooltip: tooltip,
			toggleable: toggleable,
			clickHandler: clickHandler
		});

		_this.handleClick = _this.handleClick.bind(_this);
		_this.handleMouseOver = _this.handleMouseOver.bind(_this);
		_this.handleMouseOut = _this.handleMouseOut.bind(_this);
		return _this;
	}

	/**
  * Button role.
  * @return {string}
  */


	_createClass(RibbonButton, [{
		key: 'createTooltip',


		/**
   * Create tooltip
   * @return {RibbonTooltip} - RibbonTooltip instance (not rendered).
   */
		value: function createTooltip() {
			var scope = this;
			var data = this.state.tooltip;
			if (!data) return;

			if (!(data instanceof _RibbonTooltipData2.default) && data) return console.log('%c[RibbonButton] Input tooltip data is invalid.', 'color:red;');

			var updateTooltip = function updateTooltip(id, data) {
				var tooltip = scope.state.tooltip;

				if (tooltip.id !== id) return;

				Object.assign(tooltip, data);

				var prop = { tooltip: tooltip };
				var onStateChange = scope.props.onStateChange;
				onStateChange && onStateChange(scope.id, prop);

				scope.setState(prop);
			};

			return _react2.default.createElement(_RibbonTooltip2.default, {
				key: data.id,
				id: data.id,
				name: data.name,
				displayName: data.title,
				content: data.content,
				enabled: data.enabled,
				hidden: data.hidden,
				onStateChange: updateTooltip,
				ref: 'tooltip' });
		}

		/**
   * Button clicking event handler.
   */

	}, {
		key: 'handleClick',
		value: function handleClick(event) {
			if (!this.enabled) return;

			var clickHandler = this.props.clickHandler;
			clickHandler && clickHandler(event);
		}

		/**
   * Button hovering over event handler.
   */

	}, {
		key: 'handleMouseOver',
		value: function handleMouseOver() {
			var tooltip = this.tooltip;
			tooltip && tooltip.show();
		}

		/**
   * Button hovering out event handler.
   */

	}, {
		key: 'handleMouseOut',
		value: function handleMouseOut() {
			var tooltip = this.tooltip;
			tooltip && tooltip.hide();
		}
	}, {
		key: 'render',
		value: function render() {
			var outerDynCSS = (0, _classnames2.default)({
				'ui-ribbon-disabled': this.enabled === false
			});

			var innerDynCSS = (0, _classnames2.default)({
				'ui-ribbon-active': this.actived
			});

			var formatLegend = function formatLegend(legend) {
				var texts = legend.split('\\n');
				var result = _react2.default.createElement(
					'span',
					null,
					legend
				);

				if (texts.length > 1) {
					result = texts.map(function (txt) {
						return _react2.default.createElement(
							'span',
							null,
							txt,
							_react2.default.createElement('br', null)
						);
					});
				}
				return result;
			};

			return _react2.default.createElement(
				'a',
				{
					key: this.id,
					id: this.id,
					className: outerDynCSS,
					onClick: this.handleClick,
					onMouseOver: this.handleMouseOver,
					onMouseOut: this.handleMouseOut },
				_react2.default.createElement(
					'div',
					{
						role: this.role,
						className: "ui-ribbon-button " + this.type + " ui-ribbon-relative ui-ribbon-inline ui-ribbon-center " + innerDynCSS },
					_react2.default.createElement('img', { src: this.icon }),
					_react2.default.createElement(
						'div',
						{ className: 'ui-ribbon-button-legend' },
						formatLegend(this.displayName)
					),
					this.createTooltip()
				)
			);
		}
	}, {
		key: 'role',
		get: function get() {
			return this.props.role;
		}

		/**
   * Button icon.
   * @return {string} - Button icon path.
   */

	}, {
		key: 'icon',
		get: function get() {
			return this.state.icon;
		}

		/**
   * Button icon.
   * @return {string} icon - Button icon path.
   */
		,
		set: function set(icon) {
			if (typeof icon !== 'string') throw 'Input type should be a string.';

			var prop = { icon: icon };
			var onStateChange = this.props.onStateChange;
			onStateChange && onStateChange(this.id, prop);

			this.setState(prop);
		}

		/**
   * Button toggleable state.
   * @return {bool} - If true, it repsents button is toggled currently.
   */

	}, {
		key: 'toggleable',
		get: function get() {
			return this.state.toggleable;
		}

		/**
   * Button toggleable state.
   * @return {bool} [toggleable = false] - If true, it repsents button is toggled currently.
   */
		,
		set: function set() {
			var toggleable = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			var isToggleable = toggleable === true;

			var prop = { toggleable: isToggleable };
			var onStateChange = this.props.onStateChange;
			onStateChange && onStateChange(this.id, prop);

			this.setState(prop);
		}

		/**
   * Button click eveent handler.
   * @return {Function} - Click eveent handler.
   */

	}, {
		key: 'clickHandler',
		get: function get() {
			return this.state.clickHandler;
		}

		/**
   * Button click eveent handler.
   * @param {Function} handler - Click eveent handler.
   */
		,
		set: function set(handler) {
			if (!(handler instanceof Function)) throw 'Input clicking handler is invalid.';

			var prop = { clickHandler: handler };
			var onStateChange = this.props.onStateChange;
			onStateChange && onStateChange(this.id, prop);

			this.setState(prop);
		}

		/**
   * Button tooltip comopent.
   * @return {RibbonTooltip} - Rendered RibbonTooltip component.
   */

	}, {
		key: 'tooltip',
		get: function get() {
			return this.refs.tooltip;
		},
		set: function set(tooltip) {
			if (!(tooltip instanceof _RibbonTooltipData2.default)) throw '[RibbonButton] Input tooltip data is invalid.';

			var prop = { tooltip: tooltip };
			var onStateChange = this.props.onStateChange;
			onStateChange && onStateChange(this.id, prop);

			this.setState(prop);
		}
	}]);

	return RibbonButton;
}(_RibbonItem3.default);

exports.default = RibbonButton;


RibbonButton.propTypes = {
	id: _react2.default.PropTypes.string.isRequired,
	role: _react2.default.PropTypes.string.isRequired,
	type: _react2.default.PropTypes.string.isRequired,
	icon: _react2.default.PropTypes.string,
	tooltip: _react2.default.PropTypes.instanceOf(_RibbonTooltipData2.default),
	toggleable: _react2.default.PropTypes.bool,
	clickHandler: _react2.default.PropTypes.func,
	onStateChange: _react2.default.PropTypes.func
};

RibbonButton.defaultProps = {
	id: (0, _utility.newGUID)(),
	role: 'ui-ribbon-button',
	type: 'ui-ribbon-button',
	icon: '',
	toggleable: false
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./RibbonItem":6,"./RibbonTooltip":16,"./data/RibbonTooltipData":28,"./utility":35}],4:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Ribbon = require('./Ribbon');

var _Ribbon2 = _interopRequireDefault(_Ribbon);

var _RibbonTaskManager = require('./RibbonTaskManager');

var _RibbonTaskManager2 = _interopRequireDefault(_RibbonTaskManager);

var _RibbonTaskExecuter = require('./RibbonTaskExecuter');

var _RibbonTaskExecuter2 = _interopRequireDefault(_RibbonTaskExecuter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Container = Symbol('container');
var MainRibbon = Symbol('mainRibbon');
var TaskManager = Symbol('taskManager');
var TaskExecuter = Symbol('taskExecuter');

/**
 * RibbonCtrl
 * @class
 */

var RibbonCtrl = function () {
	/**
  * RibbonCtrl constructor
  */

	function RibbonCtrl() {
		_classCallCheck(this, RibbonCtrl);

		this[TaskManager] = new _RibbonTaskManager2.default();
		this[Container] = undefined;
		this[MainRibbon] = undefined;
		this[TaskExecuter] = undefined;
	}

	/**
  * Ribbon instance.
  * @return {Ribbon} - Rendered Ribbon component.
  */


	_createClass(RibbonCtrl, [{
		key: 'registerTask',


		/**
   * Register RibbonTask.
   * @param {string} taskId - Task Identification.
   * @param {RibbonTask} task - Content instance of RibbonTask.
   * @return {bool} - If task is not type of RibbonTask or registered, it will return false.
   */
		value: function registerTask(taskId, task) {
			if (!this.taskManager) return false;

			return this.taskManager.register(taskId, task);
		}

		/**
   * Unregister RibbonTask.
   * @param {string} taskId - Task Identification.
   * @return {bool} - If task is not registered, it will return false.
   */

	}, {
		key: 'unregisterTask',
		value: function unregisterTask(taskId) {
			if (!this.taskManager) return false;

			return this.taskManager.unregister(taskId);
		}

		/**
   * Execute registered RibbonTask.
   * @param {string} taskId - Task Identification.
   * @return {bool} - If task is not registered or failed to execute, it will return false.
   */

	}, {
		key: 'executeTask',
		value: function executeTask(taskId, options) {
			if (!this.taskExecuter) return false;

			return this.taskExecuter.execute(taskId, options);
		}

		/**
   * Discard executed RibbonTask.
   * @param {string} taskId - Task Identification.
   * @return {bool} - If task is not registered or failed to discard changes, it will return false.
   */

	}, {
		key: 'discardTask',
		value: function discardTask(taskId) {
			if (!this.taskExecuter) return false;

			return this.taskExecuter.discard(taskId);
		}

		/**
   * Start UI rendering.
   * @return {Promise} - Result.
   * @resolve {RibbonCtrl} - Self RibbonCtrl instance.
   * @reject {object} - Errors.
   */

	}, {
		key: 'run',
		value: function run() {
			var scope = this;

			return new Promise(function (resolve, reject) {
				try {
					var container = scope.container;
					var taskManager = scope.taskManager;

					scope[MainRibbon] = _reactDom2.default.render(_react2.default.createElement(_Ribbon2.default, null), container);
					scope[TaskExecuter] = new _RibbonTaskExecuter2.default(scope.mainRibbon, taskManager);

					resolve(scope);
				} catch (error) {
					reject(error);
				}
			});
		}
	}, {
		key: 'mainRibbon',
		get: function get() {
			return this[MainRibbon];
		}

		/**
   * Ribbon container
   * @return {HTMLElement} - React render target DOM element.
   */

	}, {
		key: 'container',
		get: function get() {
			return this[Container];
		}

		/**
   * Ribbon container
   * @param {HTMLElement} container - React render target DOM element.
   */
		,
		set: function set(container) {
			if (!(container instanceof HTMLElement)) throw '[RibbonCtrl] Input container must be a HTML DOM element.';

			this[Container] = container;
		}

		/**
   * RibbonTaskManager instance.
   * @return {RibbonTaskManager}
   */

	}, {
		key: 'taskManager',
		get: function get() {
			return this[TaskManager];
		}

		/**
   * RibbonTaskExecuter instance.
   * @return {RibbonTaskExecuter}
   */

	}, {
		key: 'taskExecuter',
		get: function get() {
			return this[TaskExecuter];
		}
	}]);

	return RibbonCtrl;
}();

exports.default = RibbonCtrl;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./Ribbon":1,"./RibbonTaskExecuter":12,"./RibbonTaskManager":13}],5:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = (typeof window !== "undefined" ? window['classNames'] : typeof global !== "undefined" ? global['classNames'] : null);

var _classnames2 = _interopRequireDefault(_classnames);

var _RibbonItem2 = require('./RibbonItem');

var _RibbonItem3 = _interopRequireDefault(_RibbonItem2);

var _RibbonButton = require('./RibbonButton');

var _RibbonButton2 = _interopRequireDefault(_RibbonButton);

var _RibbonPushButton = require('./RibbonPushButton');

var _RibbonPushButton2 = _interopRequireDefault(_RibbonPushButton);

var _RibbonToggleButton = require('./RibbonToggleButton');

var _RibbonToggleButton2 = _interopRequireDefault(_RibbonToggleButton);

var _RibbonItemData = require('./data/RibbonItemData');

var _RibbonItemData2 = _interopRequireDefault(_RibbonItemData);

var _RibbonButtonData = require('./data/RibbonButtonData');

var _RibbonButtonData2 = _interopRequireDefault(_RibbonButtonData);

var _RibbonPushButtonData = require('./data/RibbonPushButtonData');

var _RibbonPushButtonData2 = _interopRequireDefault(_RibbonPushButtonData);

var _RibbonToggleButtonData = require('./data/RibbonToggleButtonData');

var _RibbonToggleButtonData2 = _interopRequireDefault(_RibbonToggleButtonData);

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Items = Symbol('items');

/**
 * RibbonGroup
 * @extends RibbonItem
 * @class
 */

var RibbonGroup = function (_RibbonItem) {
	_inherits(RibbonGroup, _RibbonItem);

	/**
  * RibbonGroup constructor
  * @param {object} props - React component properties
  */

	function RibbonGroup(props) {
		_classCallCheck(this, RibbonGroup);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonGroup).call(this, props));

		_this.state = Object.assign(_this.state, {
			items: [].concat(props.items)
		});

		_this[Items] = [];
		return _this;
	}

	/**
  * Panel's children items
  * @return {[RibbonButtonData]} - Ribbon item data.
  */


	_createClass(RibbonGroup, [{
		key: 'addItem',


		/**
   * Add new RibbonButton by given data.
   * @param {RibbonButtonData} itemData - Ribbon button data for creating new item in the RibbonGroup.
   * @return {RibbonButton} - Rendered RibbonButton component.
   */
		value: function addItem(itemData) {
			var idx = this.items.findIndex(function (item) {
				return item.id == itemData.id || item.name === itemData.name;
			});
			if (!(itemData instanceof _RibbonButtonData2.default) || idx !== -1) return console.log('%c[RibbonGroup] Input itemData is invalid or duplicate.', 'color:red;');

			var items = this.state.items.concat(itemData);

			var prop = { items: items };
			var onStateChange = this.props.onStateChange;
			onStateChange && onStateChange(this.id, prop);

			this.setState(prop);

			return this.items[this.items.length - 1];
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps, nextState) {
			this[Items].length = 0;
		}
	}, {
		key: 'render',
		value: function render() {
			var scope = this;
			var items = this.state.items;

			var updateItem = function updateItem(id, data) {
				var items = scope.state.items;
				var item = items.find(function (item) {
					return item.id === id;
				});
				if (!item) return;

				Object.assign(item, data);

				var prop = { items: items };
				var onStateChange = scope.props.onStateChange;
				onStateChange && onStateChange(scope.id, prop);

				scope.setState(prop);
			};

			var createItem = function createItem(item) {
				var result = void 0;
				switch (item.type) {
					case 'ui-ribbon-button-big':
						var RibbonPushButtonLike = item.role === 'ui-ribbon-button-toggle' ? _RibbonToggleButton2.default : _RibbonPushButton2.default;
						result = _react2.default.createElement(RibbonPushButtonLike, {
							key: item.id,
							id: item.id,
							name: item.name,
							displayName: item.displayName,
							enabled: item.enabled,
							hidden: item.hidden,
							type: item.type,
							actived: item.actived,
							icon: item.icon,
							tooltip: item.tooltip,
							toggleable: item.toggleable,
							clickHandler: item.clickHandler,
							onStateChange: updateItem,
							ref: function ref(c) {
								if (c) scope.items.push(c);
							} });
						break;
					default:
						break;
				}

				return result;
			};

			return _react2.default.createElement(
				'div',
				{
					key: this.id,
					id: this.id,
					className: 'ui-ribbon-group ui-ribbon-inline' },
				items.map(createItem)
			);
		}
	}, {
		key: 'items',
		get: function get() {
			return this[Items];
		}
	}]);

	return RibbonGroup;
}(_RibbonItem3.default);

exports.default = RibbonGroup;


RibbonGroup.propTypes = {
	id: _react2.default.PropTypes.string.isRequired,
	items: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.instanceOf(_RibbonButtonData2.default)),
	onStateChange: _react2.default.PropTypes.func
};

RibbonGroup.defaultProps = {
	id: (0, _utility.newGUID)(),
	items: []
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./RibbonButton":3,"./RibbonItem":6,"./RibbonPushButton":8,"./RibbonToggleButton":15,"./data/RibbonButtonData":19,"./data/RibbonItemData":21,"./data/RibbonPushButtonData":23,"./data/RibbonToggleButtonData":27,"./utility":35}],6:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = (typeof window !== "undefined" ? window['classNames'] : typeof global !== "undefined" ? global['classNames'] : null);

var _classnames2 = _interopRequireDefault(_classnames);

var _RibbonBase2 = require('./RibbonBase');

var _RibbonBase3 = _interopRequireDefault(_RibbonBase2);

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RibbonItem
 * @extends RibbonBase
 * @class
 */

var RibbonItem = function (_RibbonBase) {
	_inherits(RibbonItem, _RibbonBase);

	/**
  * RibbonItem constructor
  * @param {object} props - React component properties
  */

	function RibbonItem(props) {
		_classCallCheck(this, RibbonItem);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonItem).call(this, props));

		var actived = props.actived === true;

		_this.state = Object.assign(_this.state, { actived: actived });
		return _this;
	}

	/**
  * Item type.
  * @return {string} - Item type for identification.
  */


	_createClass(RibbonItem, [{
		key: 'type',
		get: function get() {
			return this.props.type;
		}

		/**
   * Item actived state.
   * @return {bool} - If true, it repsents item is actived currently.
   */

	}, {
		key: 'actived',
		get: function get() {
			return this.state.actived;
		}

		/**
   * Item actived state.
   * @return {bool} [actived = false] - If true, it repsents item is actived currently.
   */
		,
		set: function set() {
			var actived = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			var isActived = actived === true;
			var prop = { actived: isActived };

			var onStateChange = this.props.onStateChange;
			onStateChange && onStateChange(this.id, prop);

			this.setState(prop);
		}
	}]);

	return RibbonItem;
}(_RibbonBase3.default);

exports.default = RibbonItem;


RibbonItem.propTypes = {
	id: _react2.default.PropTypes.string.isRequired,
	type: _react2.default.PropTypes.string.isRequired,
	actived: _react2.default.PropTypes.bool,
	onStateChange: _react2.default.PropTypes.func
};

RibbonItem.defaultProps = {
	id: (0, _utility.newGUID)(),
	type: 'ui-ribbon-panel-item',
	actived: false
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./RibbonBase":2,"./utility":35}],7:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = (typeof window !== "undefined" ? window['classNames'] : typeof global !== "undefined" ? global['classNames'] : null);

var _classnames2 = _interopRequireDefault(_classnames);

var _RibbonBase2 = require('./RibbonBase');

var _RibbonBase3 = _interopRequireDefault(_RibbonBase2);

var _RibbonItem = require('./RibbonItem');

var _RibbonItem2 = _interopRequireDefault(_RibbonItem);

var _RibbonButton = require('./RibbonButton');

var _RibbonButton2 = _interopRequireDefault(_RibbonButton);

var _RibbonPushButton = require('./RibbonPushButton');

var _RibbonPushButton2 = _interopRequireDefault(_RibbonPushButton);

var _RibbonToggleButton = require('./RibbonToggleButton');

var _RibbonToggleButton2 = _interopRequireDefault(_RibbonToggleButton);

var _RibbonGroup = require('./RibbonGroup');

var _RibbonGroup2 = _interopRequireDefault(_RibbonGroup);

var _RibbonRadioButtonGroup = require('./RibbonRadioButtonGroup');

var _RibbonRadioButtonGroup2 = _interopRequireDefault(_RibbonRadioButtonGroup);

var _RibbonItemData = require('./data/RibbonItemData');

var _RibbonItemData2 = _interopRequireDefault(_RibbonItemData);

var _RibbonButtonData = require('./data/RibbonButtonData');

var _RibbonButtonData2 = _interopRequireDefault(_RibbonButtonData);

var _RibbonPushButtonData = require('./data/RibbonPushButtonData');

var _RibbonPushButtonData2 = _interopRequireDefault(_RibbonPushButtonData);

var _RibbonToggleButtonData = require('./data/RibbonToggleButtonData');

var _RibbonToggleButtonData2 = _interopRequireDefault(_RibbonToggleButtonData);

var _RibbonGroupData = require('./data/RibbonGroupData');

var _RibbonGroupData2 = _interopRequireDefault(_RibbonGroupData);

var _RibbonRadioButtonGroupData = require('./data/RibbonRadioButtonGroupData');

var _RibbonRadioButtonGroupData2 = _interopRequireDefault(_RibbonRadioButtonGroupData);

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Items = Symbol('items');

/**
 * RibbonPanel
 * @extends RibbonBase
 * @class
 */

var RibbonPanel = function (_RibbonBase) {
	_inherits(RibbonPanel, _RibbonBase);

	/**
  * RibbonPanel constructor
  * @param {object} props - React component properties
  */

	function RibbonPanel(props) {
		_classCallCheck(this, RibbonPanel);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonPanel).call(this, props));

		_this.state = Object.assign(_this.state, {
			items: [].concat(props.items)
		});

		_this[Items] = [];
		return _this;
	}

	/**
  * Panel has seperator or not.
  * @return {bool} - If true, panel will be seperated with other panels by a panel seperator.
  */


	_createClass(RibbonPanel, [{
		key: 'addItem',


		/**
   * Add new RibbonItem by given data.
   * @param {RibbonItemData} itemData - Ribbon item data for creating new item on the panel.
   * @return {RibbonItem} - Rendered RibbonItem component.
   */
		value: function addItem(itemData) {
			var idx = this.items.findIndex(function (item) {
				return item.id == itemData.id || item.name === itemData.name;
			});
			if (!(itemData instanceof _RibbonItemData2.default) || idx !== -1) return console.log('%c[RibbonPanel] Input itemData is invalid or duplicate.', 'color:red;');

			var items = this.state.items.concat(itemData);

			var prop = { items: items };
			var onStateChange = this.props.onStateChange;
			onStateChange && onStateChange(this.id, prop);

			this.setState(prop);

			return this.items[this.items.length - 1];
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps, nextState) {
			this[Items].length = 0;
		}
	}, {
		key: 'render',
		value: function render() {
			var scope = this;
			var items = this.state.items;
			var dynCSS = (0, _classnames2.default)({
				'ui-ribbon-empty': items.length === 0,
				'ui-riibon-panel-single-btn': items.length === 1
			});

			var updateItem = function updateItem(id, data) {
				var items = scope.state.items;
				var item = items.find(function (item) {
					return item.id === id;
				});
				if (!item) return;

				Object.assign(item, data);

				var prop = { items: items };
				var onStateChange = scope.props.onStateChange;
				onStateChange && onStateChange(scope.id, prop);

				scope.setState(prop);
			};

			var createItem = function createItem(item) {
				var result = void 0;
				switch (item.type) {
					case 'ui-ribbon-radio-group':
					case 'ui-ribbon-group':
						var RibbonGroupLike = item.type === 'ui-ribbon-group' ? _RibbonGroup2.default : _RibbonRadioButtonGroup2.default;
						result = _react2.default.createElement(RibbonGroupLike, {
							key: item.id,
							id: item.id,
							name: item.name,
							displayName: item.displayName,
							enabled: item.enabled,
							hidden: item.hidden,
							type: item.type,
							items: item.items,
							actived: item.actived,
							onStateChange: updateItem,
							ref: function ref(c) {
								if (c) scope.items.push(c);
							} });
						break;
					case 'ui-ribbon-button-big':
						var RibbonPushButtonLike = item.role === 'ui-ribbon-button-toggle' ? _RibbonToggleButton2.default : _RibbonPushButton2.default;
						result = _react2.default.createElement(RibbonPushButtonLike, {
							key: item.id,
							id: item.id,
							name: item.name,
							displayName: item.displayName,
							enabled: item.enabled,
							hidden: item.hidden,
							type: item.type,
							actived: item.actived,
							icon: item.icon,
							tooltip: item.tooltip,
							toggleable: item.toggleable,
							clickHandler: item.clickHandler,
							onStateChange: updateItem,
							ref: function ref(c) {
								if (c) scope.items.push(c);
							} });
						break;
					default:
						break;
				}

				return result;
			};

			var createSeperator = function createSeperator() {
				var seperator = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

				if (seperator) return _react2.default.createElement('div', { className: 'ui-ribbon-panel-seperator ui-ribbon-relative ui-ribbon-inline' });
			};

			return _react2.default.createElement(
				'div',
				{
					key: this.id,
					className: 'ui-ribbon-panel-container ui-ribbon-relative ui-ribbon-inline' },
				createSeperator(this.seperator),
				_react2.default.createElement(
					'div',
					{ className: "ui-ribbon-panel ui-ribbon-relative ui-ribbon-inline " + dynCSS },
					_react2.default.createElement(
						'div',
						{ className: 'ui-ribbon-panel-contents' },
						items.map(createItem),
						_react2.default.createElement(
							'div',
							{ className: 'ui-ribbon-panel-legend ui-ribbon-absolute' },
							this.displayName
						)
					)
				)
			);
		}
	}, {
		key: 'seperator',
		get: function get() {
			return this.props.seperator;
		}

		/**
   * Panel's children items
   * @return {[RibbonItemData]} - Ribbon item data.
   */

	}, {
		key: 'items',
		get: function get() {
			return this[Items];
		}
	}]);

	return RibbonPanel;
}(_RibbonBase3.default);

exports.default = RibbonPanel;


RibbonPanel.propTypes = {
	id: _react2.default.PropTypes.string.isRequired,
	seperator: _react2.default.PropTypes.bool,
	items: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.instanceOf(_RibbonItemData2.default)),
	onStateChange: _react2.default.PropTypes.func
};

RibbonPanel.defaultProps = {
	id: (0, _utility.newGUID)(),
	seperator: true,
	items: []
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./RibbonBase":2,"./RibbonButton":3,"./RibbonGroup":5,"./RibbonItem":6,"./RibbonPushButton":8,"./RibbonRadioButtonGroup":9,"./RibbonToggleButton":15,"./data/RibbonButtonData":19,"./data/RibbonGroupData":20,"./data/RibbonItemData":21,"./data/RibbonPushButtonData":23,"./data/RibbonRadioButtonGroupData":24,"./data/RibbonToggleButtonData":27,"./utility":35}],8:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = (typeof window !== "undefined" ? window['classNames'] : typeof global !== "undefined" ? global['classNames'] : null);

var _classnames2 = _interopRequireDefault(_classnames);

var _RibbonButton2 = require('./RibbonButton');

var _RibbonButton3 = _interopRequireDefault(_RibbonButton2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RibbonPushButton
 * @class
 */

var RibbonPushButton = function (_RibbonButton) {
	_inherits(RibbonPushButton, _RibbonButton);

	/**
  * RibbonPushButton constructor
  * @param {object} props - React component properties
  */

	function RibbonPushButton(props) {
		_classCallCheck(this, RibbonPushButton);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonPushButton).call(this, props));
	}

	_createClass(RibbonPushButton, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'ui-ribbon-button-group ui-ribbon-inline' },
				_get(Object.getPrototypeOf(RibbonPushButton.prototype), 'render', this).call(this)
			);
		}
	}]);

	return RibbonPushButton;
}(_RibbonButton3.default);

exports.default = RibbonPushButton;


RibbonPushButton.propTypes = {
	type: _react2.default.PropTypes.string.isRequired,
	onStateChange: _react2.default.PropTypes.func
};

RibbonPushButton.defaultProps = {
	type: 'ui-ribbon-button-big'
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./RibbonButton":3}],9:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = (typeof window !== "undefined" ? window['classNames'] : typeof global !== "undefined" ? global['classNames'] : null);

var _classnames2 = _interopRequireDefault(_classnames);

var _RibbonGroup2 = require('./RibbonGroup');

var _RibbonGroup3 = _interopRequireDefault(_RibbonGroup2);

var _RibbonToggleButton = require('./RibbonToggleButton');

var _RibbonToggleButton2 = _interopRequireDefault(_RibbonToggleButton);

var _RibbonToggleButtonData = require('./data/RibbonToggleButtonData');

var _RibbonToggleButtonData2 = _interopRequireDefault(_RibbonToggleButtonData);

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Current = Symbol('current');

/**
 * RibbonRadioButtonGroup
 * @extends RibbonGroup
 * @class
 */

var RibbonRadioButtonGroup = function (_RibbonGroup) {
	_inherits(RibbonRadioButtonGroup, _RibbonGroup);

	/**
  * RibbonRadioButtonGroup constructor
  * @param {object} props - React component properties
  */

	function RibbonRadioButtonGroup(props) {
		_classCallCheck(this, RibbonRadioButtonGroup);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonRadioButtonGroup).call(this, props));

		_this[Current] = undefined;
		return _this;
	}

	/**
  * Current actived RibbonToggleButton;
  * @return {string} - RibbonToggleButton id.
  */


	_createClass(RibbonRadioButtonGroup, [{
		key: 'addItem',


		/**
   * Add new RibbonToggleButton by given data.
   * @param {RibbonToggleButtonData} itemData - Ribbon button data for creating new item in the RibbonRadioButtonGroup.
   * @return {RibbonToggleButton} - Rendered RibbonToggleButton component.
   * @override
   */
		value: function addItem(itemData) {
			if (!(itemData instanceof _RibbonToggleButtonData2.default)) return console.log('%c[RibbonGroup] Input itemData is invalid or duplicate.', 'color:red;');

			var item = _get(Object.getPrototypeOf(RibbonRadioButtonGroup.prototype), 'addItem', this).call(this, itemData);

			if (!this.current) this.current = item.id;

			return item;
		}
	}, {
		key: 'render',
		value: function render() {
			var scope = this;
			var items = this.state.items;

			var updateCurrentItem = function updateCurrentItem(id) {
				if (typeof id !== 'string' || scope.current === id) return;

				scope.current = id;
				scope.items.map(function (item) {
					if (item.id !== id) item.actived = false;
				});
			};

			var updateItem = function updateItem(id, data) {
				var items = scope.state.items;
				var item = items.find(function (item) {
					return item.id === id;
				});
				if (!item) return;

				Object.assign(item, data);

				var prop = { items: items };
				var onStateChange = scope.props.onStateChange;
				onStateChange && onStateChange(scope.id, prop);

				scope.setState(prop);
			};

			var createItem = function createItem(item) {
				return _react2.default.createElement(_RibbonToggleButton2.default, {
					key: item.id,
					id: item.id,
					name: item.name,
					displayName: item.displayName,
					enabled: item.enabled,
					hidden: item.hidden,
					type: item.type,
					actived: item.actived,
					icon: item.icon,
					tooltip: item.tooltip,
					toggleable: item.toggleable,
					clickHandler: item.clickHandler,
					onGroupCurrentChange: function onGroupCurrentChange() {
						updateCurrentItem(item.id);
					},
					onStateChange: updateItem,
					ref: function ref(c) {
						if (c) scope.items.push(c);
					} });
			};

			return _react2.default.createElement(
				'div',
				{
					key: this.id,
					id: this.id,
					className: 'ui-ribbon-group ui-ribbon-inline' },
				items.map(createItem)
			);
		}
	}, {
		key: 'current',
		get: function get() {
			return this[Current];
		}

		/**
   * Current actived RibbonToggleButton;
   * @param {string} id - RibbonToggleButton id.
   */
		,
		set: function set(id) {
			var item = this.items.find(function (item) {
				return item.id === id;
			});
			if (!item) throw '[RibbonRadioButtonGroup] Input id not exists.';

			item.actived = true;
			this[Current] = item.id;
		}
	}]);

	return RibbonRadioButtonGroup;
}(_RibbonGroup3.default);

exports.default = RibbonRadioButtonGroup;


_RibbonGroup3.default.propTypes = {
	id: _react2.default.PropTypes.string.isRequired,
	items: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.instanceOf(_RibbonToggleButtonData2.default)),
	onStateChange: _react2.default.PropTypes.func
};

_RibbonGroup3.default.defaultProps = {
	id: (0, _utility.newGUID)(),
	items: []
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./RibbonGroup":5,"./RibbonToggleButton":15,"./data/RibbonToggleButtonData":27,"./utility":35}],10:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = (typeof window !== "undefined" ? window['classNames'] : typeof global !== "undefined" ? global['classNames'] : null);

var _classnames2 = _interopRequireDefault(_classnames);

var _RibbonBase2 = require('./RibbonBase');

var _RibbonBase3 = _interopRequireDefault(_RibbonBase2);

var _RibbonPanel = require('./RibbonPanel');

var _RibbonPanel2 = _interopRequireDefault(_RibbonPanel);

var _RibbonPanelData = require('./data/RibbonPanelData');

var _RibbonPanelData2 = _interopRequireDefault(_RibbonPanelData);

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panels = Symbol('panels');

/**
 * RibbonTab
 * @extends RibbonBase
 * @class
 */

var RibbonTab = function (_RibbonBase) {
	_inherits(RibbonTab, _RibbonBase);

	/**
  * RibbonTab constructor
  * @param {object} props - React component properties
  */

	function RibbonTab(props) {
		_classCallCheck(this, RibbonTab);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonTab).call(this, props));

		var actived = props.actived === true;

		_this.state = Object.assign(_this.state, {
			actived: actived,
			panels: [].concat(props.panels)
		});

		_this[Panels] = [];

		_this.handleClick = _this.handleClick.bind(_this);
		return _this;
	}

	/**
  * Tab type.
  * @return {string} - Tab type for identification.
  */


	_createClass(RibbonTab, [{
		key: 'addPanel',


		/**
   * Add new panel by given data.
   * @param {RibbonPanelData} panelData - Ribbon panel data for creating new panel.
   * @return {RibbonPanel} - Rendered RibbonPanel component.
   */
		value: function addPanel(panelData) {
			var idx = this.panels.findIndex(function (panel) {
				return panel.id == panelData.id || panel.name === panelData.name;
			});
			if (!(panelData instanceof _RibbonPanelData2.default) || idx !== -1) return console.log('%c[RibbonTab] Input panelData is invalid or duplicate.', 'color:red;');

			panelData.seperator = this.panels.length !== 0;
			var panels = this.state.panels.concat(panelData);

			var prop = { panels: panels };
			var onStateChange = this.props.onStateChange;
			onStateChange && onStateChange(this.id, prop);

			this.setState(prop);

			return this.panels[this.panels.length - 1];
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps, nextState) {
			this[Panels].length = 0;
		}

		/**
   * Tab clicking event handler
   */

	}, {
		key: 'handleClick',
		value: function handleClick() {
			if (this.type === 'ui-ribbon-tab-application') return;

			var onClick = this.props.onClick;
			onClick && onClick(this.id);
		}
	}, {
		key: 'render',
		value: function render() {
			var scope = this;
			var panels = this.state.panels;
			var dynCSS = (0, _classnames2.default)({
				'ui-ribbon-active': this.actived
			});

			var updatePanel = function updatePanel(id, data) {
				var panels = scope.state.panels;
				var panel = panels.find(function (panel) {
					return panel.id === id;
				});
				if (!panel) return;

				Object.assign(panel, data);

				var prop = { panels: panels };
				var onStateChange = scope.props.onStateChange;
				onStateChange && onStateChange(scope.id, prop);

				scope.setState(prop);
			};

			var createPanel = function createPanel(panel) {
				return _react2.default.createElement(_RibbonPanel2.default, {
					key: panel.id,
					id: panel.id,
					name: panel.name,
					displayName: panel.displayName,
					enabled: panel.enabled,
					hidden: panel.hidden,
					seperator: panel.seperator,
					items: panel.items,
					onStateChange: updatePanel,
					ref: function ref(c) {
						if (c) scope.panels.push(c);
					} });
			};

			return _react2.default.createElement(
				'li',
				{
					key: this.id,
					id: this.id,
					className: this.type + " ui-ribbon-inline " + dynCSS,
					role: 'ui-ribbon-tab',
					onClick: this.handleClick },
				_react2.default.createElement(
					'span',
					{ className: 'ui-ribbon-uppercase' },
					this.displayName
				),
				_react2.default.createElement(
					'div',
					{ className: 'ui-ribbon-tab-contents ui-ribbon-absolute' },
					panels.map(createPanel)
				)
			);
		}
	}, {
		key: 'type',
		get: function get() {
			return this.props.type;
		}

		/**
   * Tab actived state.
   * @return {bool} - If true, it repsents tab is selected currently.
   */

	}, {
		key: 'actived',
		get: function get() {
			return this.state.actived;
		}

		/**
   * Tab actived state.
   * @return {bool} [actived = false] - If true, it repsents tab is selected currently.
   */
		,
		set: function set() {
			var actived = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			var isActived = actived === true;
			var prop = { actived: isActived };

			var onStateChange = this.props.onStateChange;
			onStateChange && onStateChange(this.id, prop);

			this.setState(prop);
		}

		/**
   * Tab's children panels
   * @return {[RibbonPanelData]} - Ribbon panel data.
   */

	}, {
		key: 'panels',
		get: function get() {
			return this[Panels];
		}
	}]);

	return RibbonTab;
}(_RibbonBase3.default);

exports.default = RibbonTab;


RibbonTab.propTypes = {
	id: _react2.default.PropTypes.string.isRequired,
	type: _react2.default.PropTypes.string.isRequired,
	actived: _react2.default.PropTypes.bool,
	panels: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.instanceOf(_RibbonPanelData2.default)),
	onStateChange: _react2.default.PropTypes.func
};

RibbonTab.defaultProps = {
	id: (0, _utility.newGUID)(),
	type: 'ui-ribbon-tab-normal',
	actived: false,
	panels: []
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./RibbonBase":2,"./RibbonPanel":7,"./data/RibbonPanelData":22,"./utility":35}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Ribbon = require('./Ribbon');

var _Ribbon2 = _interopRequireDefault(_Ribbon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RibbonInst = Symbol('ribbon');
var Options = Symbol('options');

/**
 * RibbonTask
 * @class
 * @classdesc For bulk creating or modifying Ribbon contents.
 */

var RibbonTask = function () {
	/**
  * RibbonTask constructor.
  * @param {Ribbon} ribbon - Rendered Ribbon component.
  * @param {object} options - Task options.
  */

	function RibbonTask(ribbon, options) {
		_classCallCheck(this, RibbonTask);

		if (!(ribbon instanceof _Ribbon2.default)) throw 'No Ribbon instance available.';

		this[RibbonInst] = ribbon;
		this[Options] = options;
	}

	/**
  * Rendered Ribbon component.
  * @return {Ribbon}
  */


	_createClass(RibbonTask, [{
		key: 'execute',


		/**
   * Execute task content.
   * @return {bool} If true, it represents this task was executed by the Ribbon.
   */
		value: function execute() {
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
	}, {
		key: 'ribbon',
		get: function get() {
			return this[RibbonInst];
		}

		/**
   * Task options.
   * @return {object}
   */

	}, {
		key: 'options',
		get: function get() {
			return this[Options];
		}
	}]);

	return RibbonTask;
}();

exports.default = RibbonTask;

},{"./Ribbon":1}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Ribbon = require('./Ribbon');

var _Ribbon2 = _interopRequireDefault(_Ribbon);

var _RibbonTaskManager = require('./RibbonTaskManager');

var _RibbonTaskManager2 = _interopRequireDefault(_RibbonTaskManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RibbonInst = Symbol('ribbon');
var Tasks = Symbol('tasks');
var TaskManager = Symbol('taskManager');

/**
 * RibbonTaskExecuter
 * @class
 * @classdesc	Class for executing tasks to create or modify Ribbon contents.
 */

var RibbonTaskExecuter = function () {
	/**
  * RibbonTaskExecuter constructor.
  * @param {Ribbon} ribbon - Rendered Ribbon component.
  * @param {RibbonTaskManager} taskManager -	RibbonTaskManager instance.
  */

	function RibbonTaskExecuter(ribbon, taskManager) {
		_classCallCheck(this, RibbonTaskExecuter);

		if (!(ribbon instanceof _Ribbon2.default)) throw 'No Ribbon instance available.';
		if (!(taskManager instanceof _RibbonTaskManager2.default)) throw 'No RibbonTaskManager instance available.';

		this[RibbonInst] = ribbon;
		this[TaskManager] = taskManager;
		this[Tasks] = {};
	}

	/**
  * Rendered Ribbon component.
  * @return {Ribbon}
  */


	_createClass(RibbonTaskExecuter, [{
		key: 'execute',


		/**
   * Execute registered task.
   * @param {string} taskId - Task Identification.
   * @return {bool} - If task is not registered or failed to execute, it will return false.
   */
		value: function execute(taskId, options) {
			var result = false;

			if (!this.getTask(taskId)) {
				var taskClass = this.manager.getTask(taskId);

				if (taskClass) {
					var task = new taskClass(this.ribbon, options);
					result = task.execute();

					if (result === true) {
						this[Tasks][taskId] = task;

						console.log('[RibbonTaskExecuter] Task executed: `%s`.', taskId);
					}
				} else {
					console.log('[RibbonTaskExecuter] Task not found: `%s`.', taskId);
				}
			} else {
				console.log('[RibbonTaskExecuter] Task already executed: `%s`.', taskId);
			}

			return result;
		}

		/**
   * Discard executed task.
   * @param {string} taskId - Task Identification.
   * @return {bool} - If task is not registered or failed to discard changes, it will return false.
   */

	}, {
		key: 'discard',
		value: function discard(taskId) {
			var result = false;
			var task = this.getTask(taskId);

			if (!task) {
				console.log('[RibbonTaskExecuter] Task not found: `%s`.', taskId);
			} else {
				result = task.discard();
				if (!result) throw 'Failed to discard chnages in task: `' + taskId + '`.';

				delete this[Tasks][taskId];
				console.log('[RibbonTaskExecuter] Task content discarded: `%s`.', taskId);
			}

			return result;
		}

		/**
   * Get executed task by given id.
   * @param {string} taskId - Task Identification.
   * @return {null | RibbonTask} - Return task definition if task is existed.
   */

	}, {
		key: 'getTask',
		value: function getTask(taskId) {
			if (this.tasks.hasOwnProperty(taskId)) {
				return this.tasks[taskId];
			}

			return null;
		}
	}, {
		key: 'ribbon',
		get: function get() {
			return this[RibbonInst];
		}

		/**
   * Task	manager instance.
   * @return {RibbonTaskManager}
   */

	}, {
		key: 'manager',
		get: function get() {
			return this[TaskManager];
		}

		/**
   * All executed tasks.
   * @return {RibbonTask[]}
   */

	}, {
		key: 'tasks',
		get: function get() {
			return this[Tasks];
		}
	}]);

	return RibbonTaskExecuter;
}();

exports.default = RibbonTaskExecuter;

},{"./Ribbon":1,"./RibbonTaskManager":13}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RibbonTask = require('./RibbonTask');

var _RibbonTask2 = _interopRequireDefault(_RibbonTask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Registered RibbonTask.
 * @private {RibbonTask[]}
 */
var Tasks = Symbol('tasks');

/**
 * Check wether input class is instance of RibbonTask or not.
 * @param {RibbonTask} task
 * @return {bool} - If true, it reprents task is a instance of the RibbonTask.
 */
var checkTaskType = function checkTaskType(task) {
	if (task.prototype instanceof _RibbonTask2.default) return true;
	return false;
};

/**
 * RibbonTaskManager
 * @class
 * @classdesc Task manager class for Ribbon UI.
 */

var RibbonTaskManager = function () {
	/**
  * RibbonTaskManager constructor
  */

	function RibbonTaskManager() {
		_classCallCheck(this, RibbonTaskManager);

		this[Tasks] = {};

		checkTaskType.bind(this);
	}

	/**
  * All registered RibbonTask.
  * @return {RibbonTask[]}
  */


	_createClass(RibbonTaskManager, [{
		key: 'register',


		/**
   * Register RibbonTask.
   * @param {string} taskId - Task Identification.
   * @param {RibbonTask} task - Content instance of RibbonTask.
   * @return {bool} - If task is not type of RibbonTask or registered, it will return false.
   */
		value: function register(taskId, task) {
			if (!checkTaskType(task) || this.getTask(taskId)) return false;

			this[Tasks][taskId] = task;

			return true;
		}

		/**
   * Unregister RibbonTask.
   * @param {string} taskId - Task Identification.
   * @return {bool} - If task is not registered, it will return false.
   */

	}, {
		key: 'unregister',
		value: function unregister(taskId) {
			if (!this.getTask(taskId)) return false;

			delete this[Tasks][taskId];

			return true;
		}

		/**
   * Get registered task by given id.
   * @param {string} taskId - Task Identification.
   * @return {null | RibbonTask} - Return task definition if task is existed.
   */

	}, {
		key: 'getTask',
		value: function getTask(taskId) {
			if (this.tasks.hasOwnProperty(taskId)) {
				return this.tasks[taskId];
			}
			return null;
		}
	}, {
		key: 'tasks',
		get: function get() {
			return this[Tasks];
		}
	}]);

	return RibbonTaskManager;
}();

exports.default = RibbonTaskManager;

},{"./RibbonTask":11}],14:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = (typeof window !== "undefined" ? window['classNames'] : typeof global !== "undefined" ? global['classNames'] : null);

var _classnames2 = _interopRequireDefault(_classnames);

var _RibbonBase2 = require('./RibbonBase');

var _RibbonBase3 = _interopRequireDefault(_RibbonBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RibbonTitlebar
 * @class
 */

var RibbonTitlebar = function (_RibbonBase) {
	_inherits(RibbonTitlebar, _RibbonBase);

	/**
  * RibbonTitlebar constructor
  * @param {object} props - React component properties
  */

	function RibbonTitlebar(props) {
		_classCallCheck(this, RibbonTitlebar);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonTitlebar).call(this, props));
	}

	/**
  * Ribbon main title
  * @return {string} - Ribbon title
  */


	_createClass(RibbonTitlebar, [{
		key: 'toggleDisplay',


		/**
   * Toggle titlebar be displayed or hiden.
   */
		value: function toggleDisplay() {
			this.hidden = !this.hidden;
		}
	}, {
		key: 'render',
		value: function render() {
			var dynCSS = (0, _classnames2.default)({
				'ui-ribbon-invisible': this.hidden
			});

			return _react2.default.createElement(
				'div',
				{ className: "ui-ribbon-title " + dynCSS },
				_react2.default.createElement(
					'span',
					null,
					this.title
				)
			);
		}
	}, {
		key: 'title',
		get: function get() {
			return this.displayName;
		}

		/**
   * Ribbon main title
   * @param {string} title - Ribbon title
   */
		,
		set: function set(title) {
			if (typeof title !== 'string') throw 'Input type should be a string.';

			this.displayName = title;
		}
	}]);

	return RibbonTitlebar;
}(_RibbonBase3.default);

exports.default = RibbonTitlebar;


RibbonTitlebar.propTypes = {
	onStateChange: _react2.default.PropTypes.func
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./RibbonBase":2}],15:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = (typeof window !== "undefined" ? window['classNames'] : typeof global !== "undefined" ? global['classNames'] : null);

var _classnames2 = _interopRequireDefault(_classnames);

var _RibbonPushButton2 = require('./RibbonPushButton');

var _RibbonPushButton3 = _interopRequireDefault(_RibbonPushButton2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RibbonToggleButton
 * @class
 */

var RibbonToggleButton = function (_RibbonPushButton) {
	_inherits(RibbonToggleButton, _RibbonPushButton);

	/**
  * RibbonToggleButton constructor
  * @param {object} props - React component properties
  */

	function RibbonToggleButton(props) {
		_classCallCheck(this, RibbonToggleButton);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonToggleButton).call(this, props));

		_this.handleClick = _this.handleClick.bind(_this);
		return _this;
	}

	/**
  * Button clicking event handler.
  * @override
  */


	_createClass(RibbonToggleButton, [{
		key: 'handleClick',
		value: function handleClick(event) {
			if (!this.enabled) return;

			if (this.toggleable) {
				var isActived = !this.actived;

				var prop = { actived: isActived };
				var onStateChange = this.props.onStateChange;
				onStateChange && onStateChange(this.id, prop);

				var onGroupCurrentChange = this.props.onGroupCurrentChange;
				onGroupCurrentChange && onGroupCurrentChange();

				this.setState(prop);
			}

			var clickHandler = this.props.clickHandler;
			clickHandler && clickHandler(event);
		}
	}]);

	return RibbonToggleButton;
}(_RibbonPushButton3.default);

exports.default = RibbonToggleButton;


RibbonToggleButton.propTypes = {
	type: _react2.default.PropTypes.string.isRequired,
	role: _react2.default.PropTypes.string.isRequired,
	onGroupCurrentChange: _react2.default.PropTypes.func,
	onStateChange: _react2.default.PropTypes.func
};

RibbonToggleButton.defaultProps = {
	role: 'ui-ribbon-button-toggle',
	type: 'ui-ribbon-button-big'
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./RibbonPushButton":8}],16:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = (typeof window !== "undefined" ? window['classNames'] : typeof global !== "undefined" ? global['classNames'] : null);

var _classnames2 = _interopRequireDefault(_classnames);

var _RibbonBase2 = require('./RibbonBase');

var _RibbonBase3 = _interopRequireDefault(_RibbonBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RibbonTooltip
 * @class
 */

var RibbonTooltip = function (_RibbonBase) {
	_inherits(RibbonTooltip, _RibbonBase);

	/**
  * RibbonTooltip constructor
  * @param {object} props - React component properties
  */

	function RibbonTooltip(props) {
		_classCallCheck(this, RibbonTooltip);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonTooltip).call(this, props));

		_this.state = Object.assign(_this.state, {
			content: props.content
		});
		return _this;
	}

	/**
  * Tooltip title.
  * @return {string} - Ribbon tooltip title.
  */


	_createClass(RibbonTooltip, [{
		key: 'show',


		/**
   * Make this tooltip appear.
   */
		value: function show() {
			this.hidden = false;
		}

		/**
   * Make this tooltip disappear.
   */

	}, {
		key: 'hide',
		value: function hide() {
			this.hidden = true;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var dynCSS = (0, _classnames2.default)({
				'ui-ribbon-tooltip-visible': this.hidden === false
			});

			var createTitle = function createTitle() {
				if (_this2.title) return _react2.default.createElement(
					'strong',
					null,
					_this2.title
				);
			};

			var createContent = function createContent() {
				if (_this2.content) return _react2.default.createElement(
					'p',
					null,
					_this2.content
				);
			};

			return _react2.default.createElement(
				'div',
				{ id: this.id, className: "ui-ribbon-tooltip " + dynCSS },
				createTitle(),
				createContent()
			);
		}
	}, {
		key: 'title',
		get: function get() {
			return this.displayName;
		}

		/**
   * Tooltip title.
   * @return {string} title - Ribbon tooltip title.
   */
		,
		set: function set(title) {
			if (typeof title !== 'string') throw 'Input type should be a string.';

			this.displayName = title;
		}

		/**
   * Tooltip content.
   * @return {string} - Tooltip content.
   */

	}, {
		key: 'content',
		get: function get() {
			return this.state.content;
		}

		/**
   * Tooltip content.
   * @return {string} - Tooltip content.
   */
		,
		set: function set() {
			var content = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

			if (typeof content !== 'string') throw 'Input content should be a string.';

			var prop = { content: content };
			var onStateChange = this.props.onStateChange;
			onStateChange && onStateChange(this.id, prop);

			this.setState(prop);
		}

		/**
   * Instance is hidden or not.
   * @return {bool} - If false, instance is going to disppear on the UI.
   * @override
   */

	}, {
		key: 'hidden',
		get: function get() {
			return this.state.hidden;
		}

		/**
   * Instance is hidden or not.
   * @return {bool} [hidden = false]- If false, instance is going to disppear on the UI.
   * @override
   */
		,
		set: function set() {
			var hidden = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			var isHidden = hidden === true;

			var prop = { hidden: isHidden };
			var onStateChange = this.props.onStateChange;
			onStateChange && onStateChange(this.id, prop);

			this.setState(prop);
		}
	}]);

	return RibbonTooltip;
}(_RibbonBase3.default);

exports.default = RibbonTooltip;


RibbonTooltip.propTypes = {
	content: _react2.default.PropTypes.string,
	onStateChange: _react2.default.PropTypes.func
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./RibbonBase":2}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RibbonTabData2 = require('./RibbonTabData');

var _RibbonTabData3 = _interopRequireDefault(_RibbonTabData2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RibbonAppTabData
 * @class
 */

var RibbonAppTabData = function (_RibbonTabData) {
	_inherits(RibbonAppTabData, _RibbonTabData);

	/**
  * RibbonAppTabData constructor
  * @param {string} [displayName = 'File'] - The name of this instance shown on the user interface, might be a localized string.
  */

	function RibbonAppTabData() {
		var displayName = arguments.length <= 0 || arguments[0] === undefined ? 'File' : arguments[0];

		_classCallCheck(this, RibbonAppTabData);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonAppTabData).call(this, 'AppTab', displayName));
	}

	/**
  * Tab type.
  * @return {string} - Tab type for identification.
  * @override
  */


	_createClass(RibbonAppTabData, [{
		key: 'type',
		get: function get() {
			return 'ui-ribbon-tab-application';
		}
	}]);

	return RibbonAppTabData;
}(_RibbonTabData3.default);

exports.default = RibbonAppTabData;

},{"./RibbonTabData":25}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utility = require('../utility');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Id = Symbol('id');
var Name = Symbol('name');
var DisplayName = Symbol('displayName');
var Enabled = Symbol('enabled');
var Hidden = Symbol('hidden');

/**
 * RibbonBaseData
 * @class
 */

var RibbonBaseData = function () {
	/**
  * RibbonBaseData constructor
  * @param {string} name - The name of this instance used by the internal mechanism.
  * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
  */

	function RibbonBaseData(name, displayName) {
		_classCallCheck(this, RibbonBaseData);

		if (typeof name !== 'string') throw 'name is required.';

		this[Id] = (0, _utility.newGUID)();
		this[Name] = name;
		this[DisplayName] = typeof name !== 'string' ? name : displayName;
		this[Enabled] = true;
		this[Hidden] = false;
	}

	/**
  * Instance uuid used by the internal mechanism.
  * @return {string} - The UUID.
  */


	_createClass(RibbonBaseData, [{
		key: 'id',
		get: function get() {
			return this[Id];
		}

		/**
   * Instance name used by the internal mechanism.
   * @return {string} - Instance name.
   */

	}, {
		key: 'name',
		get: function get() {
			return this[Name];
		}

		/**
   * Instance name shown on the user interface, might be a localized string.
   * @return {string} - Instance name.
   */

	}, {
		key: 'displayName',
		get: function get() {
			return this[DisplayName];
		}

		/**
   * Instance name shown on the user interface, might be a localized string.
   * @param {string} [name] - Instance name.
   */
		,
		set: function set(name) {
			if (typeof name !== 'string') throw 'Input type should be a string.';

			this[DisplayName] = name;
		}

		/**
   * Instance edis/en-able status.
   * @return {bool} - If false, make instance be disabled.
   */

	}, {
		key: 'enabled',
		get: function get() {
			return this[Enabled];
		}

		/**
   * Instance edis/en-able status.
   * @return {bool} [enabled = true] - If false, make instance be disabled.
   */
		,
		set: function set() {
			var enabled = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

			this[Enabled] = enabled === true;
		}

		/**
   * Instance is hidden or not.
   * @return {bool} - If false, instance is going to disppear on the UI.
   */

	}, {
		key: 'hidden',
		get: function get() {
			return this[Hidden];
		}

		/**
   * Instance edis/en-able status.
   * @return {bool} [hidden = false] - If false, instance is going to disppear on the UI.
   */
		,
		set: function set() {
			var hidden = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			this[Hidden] = hidden === true;
		}
	}]);

	return RibbonBaseData;
}();

exports.default = RibbonBaseData;

},{"../utility":35}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RibbonItemData2 = require('./RibbonItemData');

var _RibbonItemData3 = _interopRequireDefault(_RibbonItemData2);

var _RibbonTooltipData = require('./RibbonTooltipData');

var _RibbonTooltipData2 = _interopRequireDefault(_RibbonTooltipData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Icon = Symbol('icon');
var Tooltip = Symbol('tooltip');
var Toggleable = Symbol('toggleable');
var ClickHandler = Symbol('clickHandler');

/**
 * RibbonButtonData
 * @extends RibbonItemData
 * @class
 */

var RibbonButtonData = function (_RibbonItemData) {
	_inherits(RibbonButtonData, _RibbonItemData);

	/**
  * RibbonButtonData constructor
  * @param {string} name - The name of this instance used by the internal mechanism.
  * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
  */

	function RibbonButtonData(name, displayName) {
		_classCallCheck(this, RibbonButtonData);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonButtonData).call(this, name, displayName));

		_this[Icon] = '';
		_this[Tooltip] = undefined;
		_this[Toggleable] = false;
		_this[ClickHandler] = undefined;
		return _this;
	}

	/**
  * Button role.
  * @return {string}
  * @override
  */


	_createClass(RibbonButtonData, [{
		key: 'role',
		get: function get() {
			return 'ui-ribbon-button';
		}

		/**
   * Button icon path.
   * @return {string} - Button icon full path or relative path.
   */

	}, {
		key: 'icon',
		get: function get() {
			return this[Icon];
		}

		/**
   * Button icon path.
   * @param {string} icon - Button icon full path or relative path.
   */
		,
		set: function set(icon) {
			if (typeof icon !== 'string') throw 'Input type should be a string.';

			this[Icon] = icon;
		}

		/**
   * Button tooltip data.
   * @return {RibbonTooltipData} - Ribbon button tooltip data.
   */

	}, {
		key: 'tooltip',
		get: function get() {
			return this[Tooltip];
		}

		/**
   * Button tooltip data.
   * @param {RibbonTooltipData} tooltip - Ribbon button tooltip data.
   */
		,
		set: function set(tooltip) {
			if (!(tooltip instanceof _RibbonTooltipData2.default)) throw 'Input data is not a type of RibbonTooltipData.';

			this[Tooltip] = tooltip;
		}

		/**
   * Button toggleable state.
   * @return {bool} - If true, it repsents button is toggled currently.
   */

	}, {
		key: 'toggleable',
		get: function get() {
			return this[Toggleable];
		}

		/**
   * Button toggleable state.
   * @return {bool} [toggleable = false] - If true, it repsents button is toggled currently.
   */
		,
		set: function set() {
			var toggleable = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			this[Toggleable] = toggleable === true;
		}

		/**
   * Button	click eveent handler.
   * @return {Function} - Click eveent handler.
   */

	}, {
		key: 'clickHandler',
		get: function get() {
			return this[ClickHandler];
		}

		/**
   * Button	click eveent handler.
   * @param {Function} handler - Click eveent handler.
   */
		,
		set: function set(handler) {
			if (!(handler instanceof Function)) throw 'Input clicking handler is invalid.';

			this[ClickHandler] = handler;
		}
	}]);

	return RibbonButtonData;
}(_RibbonItemData3.default);

exports.default = RibbonButtonData;

},{"./RibbonItemData":21,"./RibbonTooltipData":28}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RibbonItemData2 = require('./RibbonItemData');

var _RibbonItemData3 = _interopRequireDefault(_RibbonItemData2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Items = Symbol('items');

/**
 * RibbonGroupData
 * @extends RibbonItemData
 * @class
 */

var RibbonGroupData = function (_RibbonItemData) {
	_inherits(RibbonGroupData, _RibbonItemData);

	/**
  * RibbonGroupData constructor
  * @param {string} name - The name of this instance used by the internal mechanism.
  * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
  */

	function RibbonGroupData(name, displayName) {
		_classCallCheck(this, RibbonGroupData);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonGroupData).call(this, name, displayName));

		_this[Items] = [];
		return _this;
	}

	/**
  * Button type.
  * @return {string} -	Button type for identification.
  * @override
  */


	_createClass(RibbonGroupData, [{
		key: 'type',
		get: function get() {
			return 'ui-ribbon-group';
		}

		/**
   * Panel's children items.
   * @return {RibbonItemData[]} - Ribbon item data.
   */

	}, {
		key: 'items',
		get: function get() {
			return this[Items];
		}

		/**
   * Panel's children items.
   * @return {RibbonItemData[]} [items = []]- Ribbon item data.
   */
		,
		set: function set() {
			var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

			this[Items] = items;
		}
	}]);

	return RibbonGroupData;
}(_RibbonItemData3.default);

exports.default = RibbonGroupData;

},{"./RibbonItemData":21}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RibbonBaseData2 = require('./RibbonBaseData');

var _RibbonBaseData3 = _interopRequireDefault(_RibbonBaseData2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Actived = Symbol('actived');

/**
 * RibbonItemData
 * @extends RibbonBaseData
 * @class
 */

var RibbonItemData = function (_RibbonBaseData) {
	_inherits(RibbonItemData, _RibbonBaseData);

	/**
  * RibbonItemData constructor
  * @param {string} name - The name of this instance used by the internal mechanism.
  * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
  */

	function RibbonItemData(name, displayName) {
		_classCallCheck(this, RibbonItemData);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonItemData).call(this, name, displayName));

		_this[Actived] = false;
		return _this;
	}

	/**
  * Item type.
  * @return {string} - Item type for identification.
  */


	_createClass(RibbonItemData, [{
		key: 'type',
		get: function get() {
			return 'ui-ribbon-panel-item';
		}

		/**
   * Item actived state.
   * @return {bool} - If true, it repsents item is actived currently.
   */

	}, {
		key: 'actived',
		get: function get() {
			return this[Actived];
		}

		/**
   * Item actived state.
   * @return {bool} [actived = false] - If true, it repsents item is actived currently.
   */
		,
		set: function set() {
			var actived = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			this[Actived] = actived === true;
		}
	}]);

	return RibbonItemData;
}(_RibbonBaseData3.default);

exports.default = RibbonItemData;

},{"./RibbonBaseData":18}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RibbonBaseData2 = require('./RibbonBaseData');

var _RibbonBaseData3 = _interopRequireDefault(_RibbonBaseData2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Seperator = Symbol('seperator');
var Items = Symbol('items');

/**
 * RibbonPanelData
 * @extends RibbonBaseData
 * @class
 */

var RibbonPanelData = function (_RibbonBaseData) {
	_inherits(RibbonPanelData, _RibbonBaseData);

	/**
  * RibbonPanelData constructor
  * @param {string} name - The name of this instance used by the internal mechanism.
  * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
  */

	function RibbonPanelData(name, displayName) {
		_classCallCheck(this, RibbonPanelData);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonPanelData).call(this, name, displayName));

		_this[Seperator] = true;
		_this[Items] = [];
		return _this;
	}

	/**
  * Panel has seperator or not.
  * @return {bool} - If true, panel will be seperated with other panels by a panel seperator.
  */


	_createClass(RibbonPanelData, [{
		key: 'seperator',
		get: function get() {
			return this[Seperator];
		}

		/**
   * Panel has seperator or not.
   * @param {bool} [seperator = true] - If true, panel will be seperated with other panels by a panel seperator.
   */
		,
		set: function set() {
			var seperator = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

			this[Seperator] = seperator === true;
		}

		/**
   * Panel's children items.
   * @return {RibbonItemData[]} - Ribbon item data.
   */

	}, {
		key: 'items',
		get: function get() {
			return this[Items];
		}

		/**
   * Panel's children items.
   * @return {RibbonItemData[]} [items = []]- Ribbon item data.
   */
		,
		set: function set() {
			var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

			this[Items] = items;
		}
	}]);

	return RibbonPanelData;
}(_RibbonBaseData3.default);

exports.default = RibbonPanelData;

},{"./RibbonBaseData":18}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RibbonButtonData2 = require('./RibbonButtonData');

var _RibbonButtonData3 = _interopRequireDefault(_RibbonButtonData2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RibbonPushButtonData
 * @extends RibbonButtonData
 * @class
 */

var RibbonPushButtonData = function (_RibbonButtonData) {
	_inherits(RibbonPushButtonData, _RibbonButtonData);

	/**
  * RibbonPushButtonData constructor
  * @param {string} name - The name of this instance used by the internal mechanism.
  * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
  */

	function RibbonPushButtonData(name, displayName) {
		_classCallCheck(this, RibbonPushButtonData);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonPushButtonData).call(this, name, displayName));
	}

	/**
  * Button type.
  * @return {string} -	Button type for identification.
  * @override
  */


	_createClass(RibbonPushButtonData, [{
		key: 'type',
		get: function get() {
			return 'ui-ribbon-button-big';
		}
	}]);

	return RibbonPushButtonData;
}(_RibbonButtonData3.default);

exports.default = RibbonPushButtonData;

},{"./RibbonButtonData":19}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RibbonGroupData2 = require('./RibbonGroupData');

var _RibbonGroupData3 = _interopRequireDefault(_RibbonGroupData2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RibbonRadioButtonGroupData
 * @extends RibbonGroupData
 * @class
 */

var RibbonRadioButtonGroupData = function (_RibbonGroupData) {
	_inherits(RibbonRadioButtonGroupData, _RibbonGroupData);

	/**
  * RibbonRadioButtonGroupData constructor
  * @param {string} name - The name of this instance used by the internal mechanism.
  * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
  */

	function RibbonRadioButtonGroupData(name, displayName) {
		_classCallCheck(this, RibbonRadioButtonGroupData);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonRadioButtonGroupData).call(this, name, displayName));
	}

	/**
  * Button type.
  * @return {string} -	Button type for identification.
  * @override
  */


	_createClass(RibbonRadioButtonGroupData, [{
		key: 'type',
		get: function get() {
			return 'ui-ribbon-radio-group';
		}
	}]);

	return RibbonRadioButtonGroupData;
}(_RibbonGroupData3.default);

exports.default = RibbonRadioButtonGroupData;

},{"./RibbonGroupData":20}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RibbonBaseData2 = require('./RibbonBaseData');

var _RibbonBaseData3 = _interopRequireDefault(_RibbonBaseData2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Actived = Symbol('actived');
var Panels = Symbol('panels');

/**
 * RibbonTabData
 * @extends RibbonBaseData
 * @class
 */

var RibbonTabData = function (_RibbonBaseData) {
	_inherits(RibbonTabData, _RibbonBaseData);

	/**
  * RibbonTabData constructor
  * @param {string} name - The name of this instance used by the internal mechanism.
  * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
  */

	function RibbonTabData(name, displayName) {
		_classCallCheck(this, RibbonTabData);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonTabData).call(this, name, displayName));

		_this[Actived] = false;
		_this[Panels] = [];
		return _this;
	}

	/**
  * Tab type.
  * @return {string} - Tab type for identification.
  */


	_createClass(RibbonTabData, [{
		key: 'type',
		get: function get() {
			return 'ui-ribbon-tab-normal';
		}

		/**
   * Tab actived state.
   * @return {bool} - If true, it repsents tab is selected currently.
   */

	}, {
		key: 'actived',
		get: function get() {
			return this[Actived];
		}

		/**
   * Tab actived state.
   * @return {bool} [actived = false] - If true, it repsents tab is selected currently.
   */
		,
		set: function set() {
			var actived = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			this[Actived] = actived === true;
		}

		/**
   * Tab's children panels
   * @return {RibbonPanelData[]} - Ribbon panel data.
   */

	}, {
		key: 'panels',
		get: function get() {
			return this[Panels];
		}

		/**
   * Tab's children panels
   * @param {RibbonPanelData[]} [panels = []] - Ribbon panel data.
   */
		,
		set: function set() {
			var panels = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

			this[Panels] = panels;
		}
	}]);

	return RibbonTabData;
}(_RibbonBaseData3.default);

exports.default = RibbonTabData;

},{"./RibbonBaseData":18}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RibbonBaseData2 = require('./RibbonBaseData');

var _RibbonBaseData3 = _interopRequireDefault(_RibbonBaseData2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RibbonTitlebarData
 * @class
 */

var RibbonTitlebarData = function (_RibbonBaseData) {
	_inherits(RibbonTitlebarData, _RibbonBaseData);

	/**
  * RibbonTitlebarData constructor
  * @param {string} title - The name of this instance shown on the user interface, might be a localized string.
  */

	function RibbonTitlebarData(title) {
		_classCallCheck(this, RibbonTitlebarData);

		if (typeof title !== 'string') title = 'Ribbon UI';

		return _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonTitlebarData).call(this, 'AppTitlebar', title));
	}

	/**
  * App title.
  * @return {string}
  */


	_createClass(RibbonTitlebarData, [{
		key: 'title',
		get: function get() {
			return this.displayName;
		}

		/**
   * App title
   * @param {string} title
   */
		,
		set: function set(title) {
			this.displayName = title;
		}
	}]);

	return RibbonTitlebarData;
}(_RibbonBaseData3.default);

exports.default = RibbonTitlebarData;

},{"./RibbonBaseData":18}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RibbonPushButtonData2 = require('./RibbonPushButtonData');

var _RibbonPushButtonData3 = _interopRequireDefault(_RibbonPushButtonData2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RibbonToggleButtonData
 * @extends RibbonPushButtonData
 * @class
 */

var RibbonToggleButtonData = function (_RibbonPushButtonData) {
	_inherits(RibbonToggleButtonData, _RibbonPushButtonData);

	/**
  * RibbonToggleButtonData constructor
  * @param {string} name - The name of this instance used by the internal mechanism.
  * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
  */

	function RibbonToggleButtonData(name, displayName) {
		_classCallCheck(this, RibbonToggleButtonData);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonToggleButtonData).call(this, name, displayName));
	}

	/**
  * Button role.
  * @return {string}
  * @override
  */


	_createClass(RibbonToggleButtonData, [{
		key: 'role',
		get: function get() {
			return 'ui-ribbon-button-toggle';
		}

		/**
   * Button toggleable state.
   * @return {bool} - If true, it repsents button is toggled currently.
   * @override
   */

	}, {
		key: 'toggleable',
		get: function get() {
			return true;
		}
	}]);

	return RibbonToggleButtonData;
}(_RibbonPushButtonData3.default);

exports.default = RibbonToggleButtonData;

},{"./RibbonPushButtonData":23}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RibbonBaseData2 = require('./RibbonBaseData');

var _RibbonBaseData3 = _interopRequireDefault(_RibbonBaseData2);

var _utility = require('../utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Content = Symbol('content');

/**
 * RibbonTooltipData
 * @extends RibbonBaseData
 * @class
 */

var RibbonTooltipData = function (_RibbonBaseData) {
	_inherits(RibbonTooltipData, _RibbonBaseData);

	/**
  * RibbonTooltipData constructor
  * @param {string} name - The name of this instance used by the internal mechanism.
  * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
  */

	function RibbonTooltipData(title, content) {
		_classCallCheck(this, RibbonTooltipData);

		if (typeof title !== 'string') throw 'Tooltip title cannot be empty.';

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonTooltipData).call(this, 'RibbonTooltip', title));

		_this[Content] = typeof content !== 'string' ? undefined : content;
		_this.hidden = true;
		return _this;
	}

	/**
  * App title.
  * @return {string}
  */


	_createClass(RibbonTooltipData, [{
		key: 'title',
		get: function get() {
			return this.displayName;
		}

		/**
   * App title
   * @param {string} title
   */
		,
		set: function set(title) {
			this.displayName = title;
		}

		/**
   * Tooltip content.
   * @return {string} - Tooltip content.
   */

	}, {
		key: 'content',
		get: function get() {
			return this[Content];
		}

		/**
   * Tooltip content.
   * @return {string} - Tooltip content.
   */
		,
		set: function set(content) {
			if (typeof content !== 'string') throw 'Input content should be a type of string.';

			this[Content] = content;
		}
	}]);

	return RibbonTooltipData;
}(_RibbonBaseData3.default);

exports.default = RibbonTooltipData;

},{"../utility":35,"./RibbonBaseData":18}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _RibbonBaseData = require('./RibbonBaseData');

var _RibbonBaseData2 = _interopRequireDefault(_RibbonBaseData);

var _RibbonTitlebarData = require('./RibbonTitlebarData');

var _RibbonTitlebarData2 = _interopRequireDefault(_RibbonTitlebarData);

var _RibbonTabData = require('./RibbonTabData');

var _RibbonTabData2 = _interopRequireDefault(_RibbonTabData);

var _RibbonAppTabData = require('./RibbonAppTabData');

var _RibbonAppTabData2 = _interopRequireDefault(_RibbonAppTabData);

var _RibbonPanelData = require('./RibbonPanelData');

var _RibbonPanelData2 = _interopRequireDefault(_RibbonPanelData);

var _RibbonItemData = require('./RibbonItemData');

var _RibbonItemData2 = _interopRequireDefault(_RibbonItemData);

var _RibbonButtonData = require('./RibbonButtonData');

var _RibbonButtonData2 = _interopRequireDefault(_RibbonButtonData);

var _RibbonPushButtonData = require('./RibbonPushButtonData');

var _RibbonPushButtonData2 = _interopRequireDefault(_RibbonPushButtonData);

var _RibbonToggleButtonData = require('./RibbonToggleButtonData');

var _RibbonToggleButtonData2 = _interopRequireDefault(_RibbonToggleButtonData);

var _RibbonTooltipData = require('./RibbonTooltipData');

var _RibbonTooltipData2 = _interopRequireDefault(_RibbonTooltipData);

var _RibbonGroupData = require('./RibbonGroupData');

var _RibbonGroupData2 = _interopRequireDefault(_RibbonGroupData);

var _RibbonRadioButtonGroupData = require('./RibbonRadioButtonGroupData');

var _RibbonRadioButtonGroupData2 = _interopRequireDefault(_RibbonRadioButtonGroupData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Data = {
	RibbonBaseData: _RibbonBaseData2.default,
	RibbonTitlebarData: _RibbonTitlebarData2.default,
	RibbonTabData: _RibbonTabData2.default,
	RibbonAppTabData: _RibbonAppTabData2.default,
	RibbonPanelData: _RibbonPanelData2.default,
	RibbonItemData: _RibbonItemData2.default,
	RibbonButtonData: _RibbonButtonData2.default,
	RibbonPushButtonData: _RibbonPushButtonData2.default,
	RibbonToggleButtonData: _RibbonToggleButtonData2.default,
	RibbonTooltipData: _RibbonTooltipData2.default,
	RibbonGroupData: _RibbonGroupData2.default,
	RibbonRadioButtonGroupData: _RibbonRadioButtonGroupData2.default
};

exports.default = Data;

},{"./RibbonAppTabData":17,"./RibbonBaseData":18,"./RibbonButtonData":19,"./RibbonGroupData":20,"./RibbonItemData":21,"./RibbonPanelData":22,"./RibbonPushButtonData":23,"./RibbonRadioButtonGroupData":24,"./RibbonTabData":25,"./RibbonTitlebarData":26,"./RibbonToggleButtonData":27,"./RibbonTooltipData":28}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Data = exports.Utility = exports.RibbonTask = exports.RibbonCtrl = undefined;

var _Ribbon = require('./Ribbon');

var _Ribbon2 = _interopRequireDefault(_Ribbon);

var _RibbonBase = require('./RibbonBase');

var _RibbonBase2 = _interopRequireDefault(_RibbonBase);

var _RibbonTab = require('./RibbonTab');

var _RibbonTab2 = _interopRequireDefault(_RibbonTab);

var _RibbonPanel = require('./RibbonPanel');

var _RibbonPanel2 = _interopRequireDefault(_RibbonPanel);

var _RibbonTitlebar = require('./RibbonTitlebar');

var _RibbonTitlebar2 = _interopRequireDefault(_RibbonTitlebar);

var _RibbonItem = require('./RibbonItem');

var _RibbonItem2 = _interopRequireDefault(_RibbonItem);

var _RibbonButton = require('./RibbonButton');

var _RibbonButton2 = _interopRequireDefault(_RibbonButton);

var _RibbonTooltip = require('./RibbonTooltip');

var _RibbonTooltip2 = _interopRequireDefault(_RibbonTooltip);

var _RibbonPushButton = require('./RibbonPushButton');

var _RibbonPushButton2 = _interopRequireDefault(_RibbonPushButton);

var _RibbonToggleButton = require('./RibbonToggleButton');

var _RibbonToggleButton2 = _interopRequireDefault(_RibbonToggleButton);

var _RibbonGroup = require('./RibbonGroup');

var _RibbonGroup2 = _interopRequireDefault(_RibbonGroup);

var _RibbonRadioButtonGroup = require('./RibbonRadioButtonGroup');

var _RibbonRadioButtonGroup2 = _interopRequireDefault(_RibbonRadioButtonGroup);

var _RibbonCtrl = require('./RibbonCtrl');

var _RibbonCtrl2 = _interopRequireDefault(_RibbonCtrl);

var _RibbonTask = require('./RibbonTask');

var _RibbonTask2 = _interopRequireDefault(_RibbonTask);

var _RibbonTaskManager = require('./RibbonTaskManager');

var _RibbonTaskManager2 = _interopRequireDefault(_RibbonTaskManager);

var _RibbonTaskExecuter = require('./RibbonTaskExecuter');

var _RibbonTaskExecuter2 = _interopRequireDefault(_RibbonTaskExecuter);

var _utility = require('./utility');

var _utility2 = _interopRequireDefault(_utility);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RibbonUI = {
	Ribbon: _Ribbon2.default,
	RibbonBase: _RibbonBase2.default,
	RibbonTab: _RibbonTab2.default,
	RibbonPanel: _RibbonPanel2.default,
	RibbonTitlebar: _RibbonTitlebar2.default,
	RibbonItem: _RibbonItem2.default,
	RibbonButton: _RibbonButton2.default,
	RibbonTooltip: _RibbonTooltip2.default,
	RibbonPushButton: _RibbonPushButton2.default,
	RibbonToggleButton: _RibbonToggleButton2.default,
	RibbonGroup: _RibbonGroup2.default,
	RibbonRadioButtonGroup: _RibbonRadioButtonGroup2.default,
	RibbonCtrl: _RibbonCtrl2.default,
	RibbonTask: _RibbonTask2.default,
	RibbonTaskManager: _RibbonTaskManager2.default,
	RibbonTaskExecuter: _RibbonTaskExecuter2.default,
	Utility: _utility2.default,
	Data: _data2.default
};

/**
 * Expose to global.
 */
_utility2.default.namespace('React.Windows');
React.Windows = RibbonUI;

/**
 * Module exposure.
 */
exports.default = RibbonUI;
exports.RibbonCtrl = _RibbonCtrl2.default;
exports.RibbonTask = _RibbonTask2.default;
exports.Utility = _utility2.default;
exports.Data = _data2.default;

},{"./Ribbon":1,"./RibbonBase":2,"./RibbonButton":3,"./RibbonCtrl":4,"./RibbonGroup":5,"./RibbonItem":6,"./RibbonPanel":7,"./RibbonPushButton":8,"./RibbonRadioButtonGroup":9,"./RibbonTab":10,"./RibbonTask":11,"./RibbonTaskExecuter":12,"./RibbonTaskManager":13,"./RibbonTitlebar":14,"./RibbonToggleButton":15,"./RibbonTooltip":16,"./data":29,"./utility":35}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ = require('../');

var ns = _.Utility.namespace('React.Windows');

if (!ns.ribbonCtrlInst) ns.ribbonCtrlInst = new _.RibbonCtrl();

exports.default = ns.ribbonCtrlInst;

},{"../":30}],32:[function(require,module,exports){
'use strict';

var _modules = require('./modules');

var _modules2 = _interopRequireDefault(_modules);

var _DemoTask = require('./tasks/DemoTask');

var _DemoTask2 = _interopRequireDefault(_DemoTask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init() {
	_modules2.default.container = document.getElementById('ribbon-root');
	_modules2.default.run().then(function (self) {
		// Execute demo task.
		self.executeTask('React.Windows.RibbonDemoTask', null);
	}).catch(function (error) {
		console.warn(error);
	});
};

window.onload = function () {
	init();
};

},{"./modules":33,"./tasks/DemoTask":34}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Data = exports.Utility = exports.RibbonTask = undefined;

var _ = require('../');

Object.defineProperty(exports, 'RibbonTask', {
  enumerable: true,
  get: function get() {
    return _.RibbonTask;
  }
});
Object.defineProperty(exports, 'Utility', {
  enumerable: true,
  get: function get() {
    return _.Utility;
  }
});
Object.defineProperty(exports, 'Data', {
  enumerable: true,
  get: function get() {
    return _.Data;
  }
});

var _RibbonCtrl = require('./RibbonCtrl');

var _RibbonCtrl2 = _interopRequireDefault(_RibbonCtrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!_RibbonCtrl2.default) console.error('[RibbonTest] Failed to create ribbonCtrl instance.');

exports.default = _RibbonCtrl2.default;

},{"../":30,"./RibbonCtrl":31}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _modules = require('../modules');

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RibbonTabData = _modules.Data.RibbonTabData;
var RibbonPanelData = _modules.Data.RibbonPanelData;
var RibbonPushButtonData = _modules.Data.RibbonPushButtonData;
var RibbonToggleButtonData = _modules.Data.RibbonToggleButtonData;
var RibbonTooltipData = _modules.Data.RibbonTooltipData;
var RibbonRadioButtonGroupData = _modules.Data.RibbonRadioButtonGroupData;

/**
 * RibbonDemoTask
 * @extends RibbonTask
 * @class
 */

var RibbonDemoTask = function (_RibbonTask) {
	_inherits(RibbonDemoTask, _RibbonTask);

	/**
  * RibbonDemoTask constructor.
  * @param {Ribbon} ribbon - Rendered Ribbon component.
  * @param {object} options - Task options.
  */

	function RibbonDemoTask(ribbon, options) {
		_classCallCheck(this, RibbonDemoTask);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(RibbonDemoTask).call(this, ribbon, options));
	}

	/**
  * Execute task content.
  * @return {bool} If true, it represents this task was executed by the Ribbon.
  */


	_createClass(RibbonDemoTask, [{
		key: 'execute',
		value: function execute() {
			try {
				// Create tab.
				var ribbon = this.ribbon;
				var tabData = new RibbonTabData('DemoBasicTab', 'Basic');
				var tab = ribbon.addTab(tabData);

				// Create panel.
				var spatialPanelData = new RibbonPanelData('DemoSpatialPanel', 'Spatial');
				var spatialPanel = tab.addPanel(spatialPanelData);

				// Create buttons.
				var dwnBtnData = new RibbonPushButtonData('DemoSpatialDwnBtn', 'Download');
				var dwnBtn = spatialPanel.addItem(dwnBtnData);
				dwnBtn.icon = 'img/db_download.png';
				dwnBtn.clickHandler = function () {
					alert('DemoSpatialDwnBtn Clicked!');
				};

				var clsBtnData = new RibbonPushButtonData('DemoSpatialCleanBtn', 'Clean');
				var clsBtn = spatialPanel.addItem(clsBtnData);
				clsBtn.icon = 'img/db_remove.png';
				clsBtn.clickHandler = function () {
					alert('DemoSpatialCleanBtn Clicked!');
				};

				// Create panel.
				var navPanelData = new RibbonPanelData('DemoNavPanel', 'Navigation');
				var navPanel = tab.addPanel(navPanelData);

				// Create button gruop.
				var radioBtnGroupData = new RibbonRadioButtonGroupData('DemoNavBtnGroup', 'NavBtnGroup');
				var radioBtnGroup = navPanel.addItem(radioBtnGroupData);

				// Add buttons to gruop.
				var panBtnData = new RibbonToggleButtonData('DemoPanBtn', 'Pan');
				var panBtn = radioBtnGroup.addItem(panBtnData);
				panBtn.icon = 'img/pan.png';
				panBtn.clickHandler = function () {
					alert('DemoPanBtn Clicked!');
				};

				var orbitBtnData = new RibbonToggleButtonData('DemoOrbitBtn', 'Orbit');
				var orbitBtn = radioBtnGroup.addItem(orbitBtnData);
				orbitBtn.icon = 'img/orbit.png';
				orbitBtn.clickHandler = function () {
					alert('DemoOrbitBtn Clicked!');
				};
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
}(_modules.RibbonTask);

exports.default = RibbonDemoTask;
;

_modules2.default.registerTask('React.Windows.RibbonDemoTask', RibbonDemoTask);

},{"../modules":33}],35:[function(require,module,exports){
'use strict';

/**
 * Create new GUID based on timeStamp.
 * @return {string}	- New guid
 */

Object.defineProperty(exports, "__esModule", {
	value: true
});
var newGUID = exports.newGUID = function newGUID() {
	var d = new Date().getTime();

	var guid = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : r & 0x7 | 0x8).toString(16);
	});

	return guid;
};

/**
 * Find proper (first) item suited with input condition in an array.
 * @param {array} items -	Array of searching target.
 * @param {func} predicate - Predicate function for describe which item is goingo to return.
 * @return {object} - Target item.
 */
var findItem = exports.findItem = function findItem() {
	var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	var predicate = arguments[1];

	predicate = predicate instanceof Function ? predicate : function (item) {
		return true;
	};

	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		if (predicate(item)) return item;
	}
};

/**
 * Create namespace.
 * @param {string} s - namespace (e.g. 'RiibonUI.Ribbon').
 * @return {Object} - Namespace,
 */
var namespace = exports.namespace = function namespace(s) {
	var ns = typeof window !== 'undefined' && window !== null ? window : self;

	var parts = s.split('.');
	for (var i = 0; i < parts.length; i++) {
		ns[parts[i]] = ns[parts[i]] || {};
		ns = ns[parts[i]];
	}

	return ns;
};

var utility = {
	newGUID: newGUID,
	findItem: findItem,
	namespace: namespace
};

exports.default = utility;

},{}]},{},[32])


//# sourceMappingURL=test.js.map
