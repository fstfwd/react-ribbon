(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('react'), require('classnames'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define('react-ribbon-test', ['jquery', 'react', 'classnames', 'react-dom'], factory) :
  (global.ReactRibbonTest = factory(global.jQuery,global.React,global.classNames,global.ReactDOM));
}(this, function ($,React,ClassNames,ReactDOM) { 'use strict';

  $ = 'default' in $ ? $['default'] : $;
  React = 'default' in React ? React['default'] : React;
  ClassNames = 'default' in ClassNames ? ClassNames['default'] : ClassNames;
  ReactDOM = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

  /**
   * Create new RFC4122 v4 GUID based on timeStamp.
   * @return {string}	- New guid
   */

  var newGUID = function newGUID() {
  	var d = new Date().getTime();

  	var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
  		var r = (d + Math.random() * 16) % 16 | 0;
  		d = Math.floor(d / 16);
  		return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  	});

  	return guid;
  };

  /**
   * Check input is GUID.
   * @param {string} - Target guid.
   * @return {bool} -	If the input is a GUID, then return true.
   */
  var isGUID = function isGUID(guid) {
  	//const pattern = /^[0-9a-f]{4}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{4}$/i;
  	var pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  	return pattern.test(guid);
  };

  /**
   * Find proper (first) item suited with input condition in an array.
   * @param {array} items -	Array of searching target.
   * @param {func} predicate - Predicate function for describe which item is goingo to return.
   * @return {object} - Target item.
   */
  var findItem = function findItem() {
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
  var namespace = function namespace(s) {
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
  	isGUID: isGUID,
  	findItem: findItem,
  	namespace: namespace
  };

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
  		classCallCheck(this, RibbonBaseData);

  		if (typeof name !== 'string') throw 'name is required.';

  		this[Id] = newGUID();
  		this[Name] = name;
  		this[DisplayName] = typeof name !== 'string' ? name : displayName;
  		this[Enabled] = true;
  		this[Hidden] = false;
  	}

  	/**
    * Instance uuid used by the internal mechanism.
    * @return {string} - The UUID.
    */


  	createClass(RibbonBaseData, [{
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

  var Actived = Symbol('actived');
  var Panels = Symbol('panels');

  /**
   * RibbonTabData
   * @extends RibbonBaseData
   * @class
   */

  var RibbonTabData = function (_RibbonBaseData) {
  	inherits(RibbonTabData, _RibbonBaseData);

  	/**
    * RibbonTabData constructor
    * @param {string} name - The name of this instance used by the internal mechanism.
    * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
    */

  	function RibbonTabData(name, displayName) {
  		classCallCheck(this, RibbonTabData);

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(RibbonTabData).call(this, name, displayName));

  		_this[Actived] = false;
  		_this[Panels] = [];
  		return _this;
  	}

  	/**
    * Tab type.
    * @return {string} - Tab type for identification.
    */


  	createClass(RibbonTabData, [{
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
  }(RibbonBaseData);

  /**
   * RibbonAppTabData
   * @class
   */

  var RibbonAppTabData = function (_RibbonTabData) {
  	inherits(RibbonAppTabData, _RibbonTabData);

  	/**
    * RibbonAppTabData constructor
    * @param {string} [displayName = 'File'] - The name of this instance shown on the user interface, might be a localized string.
    */

  	function RibbonAppTabData() {
  		var displayName = arguments.length <= 0 || arguments[0] === undefined ? 'File' : arguments[0];
  		classCallCheck(this, RibbonAppTabData);
  		return possibleConstructorReturn(this, Object.getPrototypeOf(RibbonAppTabData).call(this, 'AppTab', displayName));
  	}

  	/**
    * Tab type.
    * @return {string} - Tab type for identification.
    * @override
    */


  	createClass(RibbonAppTabData, [{
  		key: 'type',
  		get: function get() {
  			return 'ui-ribbon-tab-application';
  		}
  	}]);
  	return RibbonAppTabData;
  }(RibbonTabData);

  /**
   * RibbonTitlebarData
   * @class
   */

  var RibbonTitlebarData = function (_RibbonBaseData) {
  	inherits(RibbonTitlebarData, _RibbonBaseData);

  	/**
    * RibbonTitlebarData constructor
    * @param {string} title - The name of this instance shown on the user interface, might be a localized string.
    */

  	function RibbonTitlebarData(title) {
  		classCallCheck(this, RibbonTitlebarData);

  		if (typeof title !== 'string') title = 'Ribbon UI';

  		return possibleConstructorReturn(this, Object.getPrototypeOf(RibbonTitlebarData).call(this, 'AppTitlebar', title));
  	}

  	/**
    * App title.
    * @return {string}
    */


  	createClass(RibbonTitlebarData, [{
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
  }(RibbonBaseData);

  /**
   * RibbonBase
   * @extends React.Component
   * @class
   */

  var RibbonBase = function (_React$Component) {
  	inherits(RibbonBase, _React$Component);

  	/**
    * RibbonBase constructor
    * @param {object} props - React component properties
    */

  	function RibbonBase(props) {
  		classCallCheck(this, RibbonBase);

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(RibbonBase).call(this, props));

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


  	createClass(RibbonBase, [{
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

  			if (this.hidden) return;

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
  }(React.Component);

  RibbonBase.propTypes = {
  	id: React.PropTypes.string.isRequired,
  	name: React.PropTypes.string.isRequired,
  	displayName: React.PropTypes.string,
  	enabled: React.PropTypes.bool,
  	hidden: React.PropTypes.bool,
  	onStateChange: React.PropTypes.func
  };

  RibbonBase.defaultProps = {
  	id: newGUID(),
  	enabled: true,
  	hidden: false
  };

  /**
   * RibbonTitlebar
   * @class
   */

  var RibbonTitlebar = function (_RibbonBase) {
  	inherits(RibbonTitlebar, _RibbonBase);

  	/**
    * RibbonTitlebar constructor
    * @param {object} props - React component properties
    */

  	function RibbonTitlebar(props) {
  		classCallCheck(this, RibbonTitlebar);
  		return possibleConstructorReturn(this, Object.getPrototypeOf(RibbonTitlebar).call(this, props));
  	}

  	/**
    * Ribbon main title
    * @return {string} - Ribbon title
    */


  	createClass(RibbonTitlebar, [{
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
  			var dynCSS = ClassNames({
  				'ui-ribbon-invisible': this.hidden
  			});

  			return React.createElement(
  				'div',
  				{ className: "ui-ribbon-title " + dynCSS },
  				React.createElement(
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
  }(RibbonBase);

  RibbonTitlebar.propTypes = {
  	onStateChange: React.PropTypes.func
  };

  /**
   * RibbonItem
   * @extends RibbonBase
   * @class
   */

  var RibbonItem = function (_RibbonBase) {
  	inherits(RibbonItem, _RibbonBase);

  	/**
    * RibbonItem constructor
    * @param {object} props - React component properties
    */

  	function RibbonItem(props) {
  		classCallCheck(this, RibbonItem);

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(RibbonItem).call(this, props));

  		var actived = props.actived === true;

  		_this.state = Object.assign(_this.state, { actived: actived });
  		return _this;
  	}

  	/**
    * Item type.
    * @return {string} - Item type for identification.
    */


  	createClass(RibbonItem, [{
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
  }(RibbonBase);

  RibbonItem.propTypes = {
  	id: React.PropTypes.string.isRequired,
  	type: React.PropTypes.string.isRequired,
  	actived: React.PropTypes.bool,
  	onStateChange: React.PropTypes.func
  };

  RibbonItem.defaultProps = {
  	id: newGUID(),
  	type: 'ui-ribbon-panel-item',
  	actived: false
  };

  /**
   * RibbonTooltip
   * @class
   */

  var RibbonTooltip = function (_RibbonBase) {
  	inherits(RibbonTooltip, _RibbonBase);

  	/**
    * RibbonTooltip constructor
    * @param {object} props - React component properties
    */

  	function RibbonTooltip(props) {
  		classCallCheck(this, RibbonTooltip);

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(RibbonTooltip).call(this, props));

  		_this.state = Object.assign(_this.state, {
  			content: props.content
  		});
  		return _this;
  	}

  	/**
    * Tooltip title.
    * @return {string} - Ribbon tooltip title.
    */


  	createClass(RibbonTooltip, [{
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

  			var dynCSS = ClassNames({
  				'ui-ribbon-tooltip-visible': this.hidden === false
  			});

  			var createTitle = function createTitle() {
  				if (_this2.title) return React.createElement(
  					'strong',
  					null,
  					_this2.title
  				);
  			};

  			var createContent = function createContent() {
  				if (_this2.content) return React.createElement(
  					'p',
  					null,
  					_this2.content
  				);
  			};

  			return React.createElement(
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
  }(RibbonBase);

  RibbonTooltip.propTypes = {
  	content: React.PropTypes.string,
  	onStateChange: React.PropTypes.func
  };

  var Content = Symbol('content');

  /**
   * RibbonTooltipData
   * @extends RibbonBaseData
   * @class
   */

  var RibbonTooltipData = function (_RibbonBaseData) {
  	inherits(RibbonTooltipData, _RibbonBaseData);

  	/**
    * RibbonTooltipData constructor
    * @param {string} name - The name of this instance used by the internal mechanism.
    * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
    */

  	function RibbonTooltipData(title, content) {
  		classCallCheck(this, RibbonTooltipData);

  		if (typeof title !== 'string') throw 'Tooltip title cannot be empty.';

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(RibbonTooltipData).call(this, 'RibbonTooltip', title));

  		_this[Content] = typeof content !== 'string' ? undefined : content;
  		_this.hidden = true;
  		return _this;
  	}

  	/**
    * App title.
    * @return {string}
    */


  	createClass(RibbonTooltipData, [{
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
  }(RibbonBaseData);

  /**
   * RibbonButton
   * @extends RibbonItem
   * @class
   */

  var RibbonButton = function (_RibbonItem) {
  	inherits(RibbonButton, _RibbonItem);

  	/**
    * RibbonButton constructor
    * @param {object} props - React component properties
    */

  	function RibbonButton(props) {
  		classCallCheck(this, RibbonButton);

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(RibbonButton).call(this, props));

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


  	createClass(RibbonButton, [{
  		key: 'createTooltip',


  		/**
     * Create tooltip
     * @return {RibbonTooltip} - RibbonTooltip instance (not rendered).
     */
  		value: function createTooltip() {
  			var scope = this;
  			var data = this.state.tooltip;
  			if (!data) return;

  			if (!(data instanceof RibbonTooltipData) && data) return console.log('%c[RibbonButton] Input tooltip data is invalid.', 'color:red;');

  			var updateTooltip = function updateTooltip(id, data) {
  				var tooltip = scope.state.tooltip;

  				if (tooltip.id !== id) return;

  				Object.assign(tooltip, data);

  				var prop = { tooltip: tooltip };
  				var onStateChange = scope.props.onStateChange;
  				onStateChange && onStateChange(scope.id, prop);

  				scope.setState(prop);
  			};

  			return React.createElement(RibbonTooltip, {
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
  			var outerDynCSS = ClassNames({
  				'ui-ribbon-disabled': this.enabled === false,
  				'ui-ribbon-invisible': this.hidden
  			});

  			var innerDynCSS = ClassNames({
  				'ui-ribbon-active': this.actived
  			});

  			var formatLegend = function formatLegend(legend) {
  				var texts = legend.split('\\n');
  				var result = React.createElement(
  					'span',
  					null,
  					legend
  				);

  				if (texts.length > 1) {
  					result = texts.map(function (txt) {
  						return React.createElement(
  							'span',
  							null,
  							txt,
  							React.createElement('br', null)
  						);
  					});
  				}
  				return result;
  			};

  			return React.createElement(
  				'a',
  				{
  					key: this.id,
  					id: this.id,
  					className: outerDynCSS,
  					onClick: this.handleClick,
  					onMouseOver: this.handleMouseOver,
  					onMouseOut: this.handleMouseOut },
  				React.createElement(
  					'div',
  					{
  						role: this.role,
  						className: "ui-ribbon-button " + this.type + " ui-ribbon-relative ui-ribbon-inline ui-ribbon-center " + innerDynCSS },
  					React.createElement('img', { src: this.icon }),
  					React.createElement(
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
  			if (!(tooltip instanceof RibbonTooltipData)) throw '[RibbonButton] Input tooltip data is invalid.';

  			var prop = { tooltip: tooltip };
  			var onStateChange = this.props.onStateChange;
  			onStateChange && onStateChange(this.id, prop);

  			this.setState(prop);
  		}
  	}]);
  	return RibbonButton;
  }(RibbonItem);

  RibbonButton.propTypes = {
  	id: React.PropTypes.string.isRequired,
  	role: React.PropTypes.string.isRequired,
  	type: React.PropTypes.string.isRequired,
  	icon: React.PropTypes.string,
  	tooltip: React.PropTypes.instanceOf(RibbonTooltipData),
  	toggleable: React.PropTypes.bool,
  	clickHandler: React.PropTypes.func,
  	onStateChange: React.PropTypes.func
  };

  RibbonButton.defaultProps = {
  	id: newGUID(),
  	role: 'ui-ribbon-button',
  	type: 'ui-ribbon-button',
  	icon: '',
  	toggleable: false
  };

  /**
   * RibbonPushButton
   * @class
   */

  var RibbonPushButton = function (_RibbonButton) {
  	inherits(RibbonPushButton, _RibbonButton);

  	/**
    * RibbonPushButton constructor
    * @param {object} props - React component properties
    */

  	function RibbonPushButton(props) {
  		classCallCheck(this, RibbonPushButton);
  		return possibleConstructorReturn(this, Object.getPrototypeOf(RibbonPushButton).call(this, props));
  	}

  	createClass(RibbonPushButton, [{
  		key: 'render',
  		value: function render() {
  			var dynCSS = ClassNames({
  				'ui-ribbon-disabled': this.enabled === false,
  				'ui-ribbon-invisible': this.hidden
  			});

  			return React.createElement(
  				'div',
  				{ className: "ui-ribbon-button-group ui-ribbon-inline " + dynCSS },
  				get(Object.getPrototypeOf(RibbonPushButton.prototype), 'render', this).call(this)
  			);
  		}
  	}]);
  	return RibbonPushButton;
  }(RibbonButton);

  RibbonPushButton.propTypes = {
  	type: React.PropTypes.string.isRequired,
  	onStateChange: React.PropTypes.func
  };

  RibbonPushButton.defaultProps = {
  	type: 'ui-ribbon-button-big'
  };

  /**
   * RibbonToggleButton
   * @class
   */

  var RibbonToggleButton = function (_RibbonPushButton) {
  	inherits(RibbonToggleButton, _RibbonPushButton);

  	/**
    * RibbonToggleButton constructor
    * @param {object} props - React component properties
    */

  	function RibbonToggleButton(props) {
  		classCallCheck(this, RibbonToggleButton);

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(RibbonToggleButton).call(this, props));

  		_this.handleClick = _this.handleClick.bind(_this);
  		return _this;
  	}

  	/**
    * Button clicking event handler.
    * @override
    */


  	createClass(RibbonToggleButton, [{
  		key: 'handleClick',
  		value: function handleClick(event) {
  			if (!this.enabled) return;

  			if (this.toggleable) {
  				var isActived = !this.actived;

  				var prop = { actived: isActived };
  				var onStateChange = this.props.onStateChange;
  				onStateChange && onStateChange(this.id, prop);

  				this.setState(prop);

  				// For de/activating button by changing button's actived property.
  				var onGroupCurrentChange = this.props.onGroupCurrentChange;
  				onGroupCurrentChange && onGroupCurrentChange();
  			}

  			var clickHandler = this.props.clickHandler;
  			clickHandler && clickHandler(event);
  		}
  	}]);
  	return RibbonToggleButton;
  }(RibbonPushButton);

  RibbonToggleButton.propTypes = {
  	type: React.PropTypes.string.isRequired,
  	role: React.PropTypes.string.isRequired,
  	onGroupCurrentChange: React.PropTypes.func,
  	onStateChange: React.PropTypes.func
  };

  RibbonToggleButton.defaultProps = {
  	role: 'ui-ribbon-button-toggle',
  	type: 'ui-ribbon-button-big'
  };

  var Actived$1 = Symbol('actived');

  /**
   * RibbonItemData
   * @extends RibbonBaseData
   * @class
   */

  var RibbonItemData = function (_RibbonBaseData) {
  	inherits(RibbonItemData, _RibbonBaseData);

  	/**
    * RibbonItemData constructor
    * @param {string} name - The name of this instance used by the internal mechanism.
    * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
    */

  	function RibbonItemData(name, displayName) {
  		classCallCheck(this, RibbonItemData);

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(RibbonItemData).call(this, name, displayName));

  		_this[Actived$1] = false;
  		return _this;
  	}

  	/**
    * Item type.
    * @return {string} - Item type for identification.
    */


  	createClass(RibbonItemData, [{
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
  			return this[Actived$1];
  		}

  		/**
     * Item actived state.
     * @return {bool} [actived = false] - If true, it repsents item is actived currently.
     */
  		,
  		set: function set() {
  			var actived = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

  			this[Actived$1] = actived === true;
  		}
  	}]);
  	return RibbonItemData;
  }(RibbonBaseData);

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
  	inherits(RibbonButtonData, _RibbonItemData);

  	/**
    * RibbonButtonData constructor
    * @param {string} name - The name of this instance used by the internal mechanism.
    * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
    */

  	function RibbonButtonData(name, displayName) {
  		classCallCheck(this, RibbonButtonData);

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(RibbonButtonData).call(this, name, displayName));

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


  	createClass(RibbonButtonData, [{
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
  			if (!(tooltip instanceof RibbonTooltipData)) throw 'Input data is not a type of RibbonTooltipData.';

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
  }(RibbonItemData);

  /**
   * RibbonPushButtonData
   * @extends RibbonButtonData
   * @class
   */

  var RibbonPushButtonData = function (_RibbonButtonData) {
  	inherits(RibbonPushButtonData, _RibbonButtonData);

  	/**
    * RibbonPushButtonData constructor
    * @param {string} name - The name of this instance used by the internal mechanism.
    * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
    */

  	function RibbonPushButtonData(name, displayName) {
  		classCallCheck(this, RibbonPushButtonData);
  		return possibleConstructorReturn(this, Object.getPrototypeOf(RibbonPushButtonData).call(this, name, displayName));
  	}

  	/**
    * Button type.
    * @return {string} -	Button type for identification.
    * @override
    */


  	createClass(RibbonPushButtonData, [{
  		key: 'type',
  		get: function get() {
  			return 'ui-ribbon-button-big';
  		}
  	}]);
  	return RibbonPushButtonData;
  }(RibbonButtonData);

  /**
   * RibbonToggleButtonData
   * @extends RibbonPushButtonData
   * @class
   */

  var RibbonToggleButtonData = function (_RibbonPushButtonData) {
  	inherits(RibbonToggleButtonData, _RibbonPushButtonData);

  	/**
    * RibbonToggleButtonData constructor
    * @param {string} name - The name of this instance used by the internal mechanism.
    * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
    */

  	function RibbonToggleButtonData(name, displayName) {
  		classCallCheck(this, RibbonToggleButtonData);
  		return possibleConstructorReturn(this, Object.getPrototypeOf(RibbonToggleButtonData).call(this, name, displayName));
  	}

  	/**
    * Button role.
    * @return {string}
    * @override
    */


  	createClass(RibbonToggleButtonData, [{
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
  }(RibbonPushButtonData);

  var Items$1 = Symbol('items');

  /**
   * RibbonGroup
   * @extends RibbonItem
   * @class
   */

  var RibbonGroup = function (_RibbonItem) {
  	inherits(RibbonGroup, _RibbonItem);

  	/**
    * RibbonGroup constructor
    * @param {object} props - React component properties
    */

  	function RibbonGroup(props) {
  		classCallCheck(this, RibbonGroup);

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(RibbonGroup).call(this, props));

  		_this.state = Object.assign(_this.state, {
  			items: [].concat(props.items)
  		});

  		_this[Items$1] = [];
  		return _this;
  	}

  	/**
    * Panel's children items
    * @return {[RibbonButtonData]} - Ribbon item data.
    */


  	createClass(RibbonGroup, [{
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
  			if (!(itemData instanceof RibbonButtonData) || idx !== -1) return console.log('%c[RibbonGroup] Input itemData is invalid or duplicate.', 'color:red;');

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
  			this[Items$1].length = 0;
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
  						var RibbonPushButtonLike = item.role === 'ui-ribbon-button-toggle' ? RibbonToggleButton : RibbonPushButton;
  						result = React.createElement(RibbonPushButtonLike, {
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

  			var dynCSS = ClassNames({
  				'ui-ribbon-disabled': this.enabled === false,
  				'ui-ribbon-invisible': this.hidden
  			});

  			return React.createElement(
  				'div',
  				{
  					key: this.id,
  					id: this.id,
  					className: "ui-ribbon-group ui-ribbon-inline " + dynCSS },
  				items.map(createItem)
  			);
  		}
  	}, {
  		key: 'items',
  		get: function get$$() {
  			return this[Items$1];
  		}

  		/**
     * Instance edis/en-able status.
     * @return {bool} - If false, make instance be disabled.
     */

  	}, {
  		key: 'enabled',
  		get: function get$$() {
  			return get(Object.getPrototypeOf(RibbonGroup.prototype), 'enabled', this);
  		}

  		/**
     * Instance edis/en-able status.
     * @param {bool} [enabled = true] - If false, make instance be disabled.
     */
  		,
  		set: function set$$() {
  			var enabled = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

  			if (this.hidden) return;

  			var isEnabled = enabled === true;
  			set(Object.getPrototypeOf(RibbonGroup.prototype), 'enabled', isEnabled, this);

  			// Cascaded applying changes
  			this.items.map(function (item) {
  				item.enabled = isEnabled;
  			});
  		}

  		/**
     * Instance is hidden or not.
     * @return {bool} - If false, instance is going to disppear on the UI.
     */

  	}, {
  		key: 'hidden',
  		get: function get$$() {
  			return get(Object.getPrototypeOf(RibbonGroup.prototype), 'hidden', this);
  		}

  		/**
     * Instance is hidden or not.
     * @return {bool} [hidden = false]- If false, instance is going to disppear on the UI.
     */
  		,
  		set: function set$$() {
  			var hidden = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

  			var isHidden = hidden === true;
  			set(Object.getPrototypeOf(RibbonGroup.prototype), 'hidden', isHidden, this);

  			// Cascaded applying changes
  			this.items.map(function (item) {
  				item.hidden = isHidden;
  			});
  		}
  	}]);
  	return RibbonGroup;
  }(RibbonItem);

  RibbonGroup.propTypes = {
  	id: React.PropTypes.string.isRequired,
  	items: React.PropTypes.arrayOf(React.PropTypes.instanceOf(RibbonButtonData)),
  	onStateChange: React.PropTypes.func
  };

  RibbonGroup.defaultProps = {
  	id: newGUID(),
  	items: []
  };

  var Current = Symbol('current');
  var Default = Symbol('default');

  /**
   * RibbonRadioButtonGroup
   * @extends RibbonGroup
   * @class
   */

  var RibbonRadioButtonGroup = function (_RibbonGroup) {
  	inherits(RibbonRadioButtonGroup, _RibbonGroup);

  	/**
    * RibbonRadioButtonGroup constructor
    * @param {object} props - React component properties
    */

  	function RibbonRadioButtonGroup(props) {
  		classCallCheck(this, RibbonRadioButtonGroup);

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(RibbonRadioButtonGroup).call(this, props));

  		_this[Current] = undefined;
  		_this[Default] = undefined;
  		return _this;
  	}

  	/**
    * Current actived RibbonToggleButton.
    * @return {string} - RibbonToggleButton id.
    */


  	createClass(RibbonRadioButtonGroup, [{
  		key: 'resetCurrent',


  		/**
     * Reset current item to the default.
     */
  		value: function resetCurrent() {
  			this.current = this.default;
  		}

  		/**
     * Add new RibbonToggleButton by given data.
     * @param {RibbonToggleButtonData} itemData - Ribbon button data for creating new item in the RibbonRadioButtonGroup.
     * @return {RibbonToggleButton} - Rendered RibbonToggleButton component.
     * @override
     */

  	}, {
  		key: 'addItem',
  		value: function addItem(itemData) {
  			if (!(itemData instanceof RibbonToggleButtonData)) return console.log('%c[RibbonGroup] Input itemData is invalid or duplicate.', 'color:red;');

  			var item = get(Object.getPrototypeOf(RibbonRadioButtonGroup.prototype), 'addItem', this).call(this, itemData);

  			if (!this.default) this.default = item.id;

  			return item;
  		}
  	}, {
  		key: 'render',
  		value: function render() {
  			var scope = this;
  			var items = this.state.items;

  			var updateCurrentItem = function updateCurrentItem(id) {
  				if (typeof id !== 'string') return;

  				scope.current = id;
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
  				return React.createElement(RibbonToggleButton, {
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

  			var dynCSS = ClassNames({
  				'ui-ribbon-disabled': this.enabled === false,
  				'ui-ribbon-invisible': this.hidden
  			});

  			return React.createElement(
  				'div',
  				{
  					key: this.id,
  					id: this.id,
  					className: "ui-ribbon-group ui-ribbon-inline " + dynCSS },
  				items.map(createItem)
  			);
  		}
  	}, {
  		key: 'current',
  		get: function get() {
  			return this[Current];
  		}

  		/**
     * Current actived RibbonToggleButton.
     * @param {string} id - RibbonToggleButton id.
     */
  		,
  		set: function set(id) {
  			var current = this.items.find(function (item) {
  				return item.id === id && item.enabled;
  			});
  			if (!current) throw '[RibbonRadioButtonGroup] Input id not exists or disabled.';

  			current.actived = true;
  			this[Current] = id;

  			if (!this.default) this.default = id;

  			this.items.map(function (item) {
  				if (item.id !== id) item.actived = false;
  			});
  		}

  		/**
     * Default actived RibbonToggleButton.
     * @return {string} - RibbonToggleButton id.
     */

  	}, {
  		key: 'default',
  		get: function get() {
  			return this[Default];
  		}

  		/**
     * Default actived RibbonToggleButton.
     * @param {string} - RibbonToggleButton id.
     */
  		,
  		set: function set(id) {
  			var item = this.items.find(function (item) {
  				return item.id === id && item.enabled;
  			});
  			if (!item) throw '[RibbonRadioButtonGroup] Input id not exists or disabled.';

  			this[Default] = id;

  			if (!this.current) this.current = id;
  		}
  	}]);
  	return RibbonRadioButtonGroup;
  }(RibbonGroup);

  RibbonGroup.propTypes = {
  	id: React.PropTypes.string.isRequired,
  	items: React.PropTypes.arrayOf(React.PropTypes.instanceOf(RibbonToggleButtonData)),
  	onStateChange: React.PropTypes.func
  };

  RibbonGroup.defaultProps = {
  	id: newGUID(),
  	items: []
  };

  var Items$2 = Symbol('items');

  /**
   * RibbonGroupData
   * @extends RibbonItemData
   * @class
   */

  var RibbonGroupData = function (_RibbonItemData) {
  	inherits(RibbonGroupData, _RibbonItemData);

  	/**
    * RibbonGroupData constructor
    * @param {string} name - The name of this instance used by the internal mechanism.
    * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
    */

  	function RibbonGroupData(name, displayName) {
  		classCallCheck(this, RibbonGroupData);

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(RibbonGroupData).call(this, name, displayName));

  		_this[Items$2] = [];
  		return _this;
  	}

  	/**
    * Button type.
    * @return {string} -	Button type for identification.
    * @override
    */


  	createClass(RibbonGroupData, [{
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
  			return this[Items$2];
  		}

  		/**
     * Panel's children items.
     * @return {RibbonItemData[]} [items = []]- Ribbon item data.
     */
  		,
  		set: function set() {
  			var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  			this[Items$2] = items;
  		}
  	}]);
  	return RibbonGroupData;
  }(RibbonItemData);

  /**
   * RibbonRadioButtonGroupData
   * @extends RibbonGroupData
   * @class
   */

  var RibbonRadioButtonGroupData = function (_RibbonGroupData) {
  	inherits(RibbonRadioButtonGroupData, _RibbonGroupData);

  	/**
    * RibbonRadioButtonGroupData constructor
    * @param {string} name - The name of this instance used by the internal mechanism.
    * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
    */

  	function RibbonRadioButtonGroupData(name, displayName) {
  		classCallCheck(this, RibbonRadioButtonGroupData);
  		return possibleConstructorReturn(this, Object.getPrototypeOf(RibbonRadioButtonGroupData).call(this, name, displayName));
  	}

  	/**
    * Button type.
    * @return {string} -	Button type for identification.
    * @override
    */


  	createClass(RibbonRadioButtonGroupData, [{
  		key: 'type',
  		get: function get() {
  			return 'ui-ribbon-radio-group';
  		}
  	}]);
  	return RibbonRadioButtonGroupData;
  }(RibbonGroupData);

  var Items = Symbol('items');

  /**
   * RibbonPanel
   * @extends RibbonBase
   * @class
   */

  var RibbonPanel = function (_RibbonBase) {
  	inherits(RibbonPanel, _RibbonBase);

  	/**
    * RibbonPanel constructor
    * @param {object} props - React component properties
    */

  	function RibbonPanel(props) {
  		classCallCheck(this, RibbonPanel);

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(RibbonPanel).call(this, props));

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


  	createClass(RibbonPanel, [{
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
  			if (!(itemData instanceof RibbonItemData) || idx !== -1) return console.log('%c[RibbonPanel] Input itemData is invalid or duplicate.', 'color:red;');

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

  			var outerDynCSS = ClassNames({
  				'ui-ribbon-disabled': this.enabled === false,
  				'ui-ribbon-invisible': this.hidden,
  				'ui-ribbon-inline': this.hidden === false
  			});

  			var innerDynCSS = ClassNames({
  				'ui-ribbon-empty': items.length === 0,
  				'ui-riibon-panel-single-btn': items.length === 1
  			});

  			var legendDynCSS = ClassNames({
  				'ui-ribbon-disabled': this.enabled === false
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
  						var RibbonGroupLike = item.type === 'ui-ribbon-group' ? RibbonGroup : RibbonRadioButtonGroup;
  						result = React.createElement(RibbonGroupLike, {
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
  						var RibbonPushButtonLike = item.role === 'ui-ribbon-button-toggle' ? RibbonToggleButton : RibbonPushButton;
  						result = React.createElement(RibbonPushButtonLike, {
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

  				if (seperator) return React.createElement('div', { className: 'ui-ribbon-panel-seperator ui-ribbon-relative ui-ribbon-inline' });
  			};

  			return React.createElement(
  				'div',
  				{
  					key: this.id,
  					className: "ui-ribbon-panel-container ui-ribbon-relative " + outerDynCSS },
  				createSeperator(this.seperator),
  				React.createElement(
  					'div',
  					{ className: "ui-ribbon-panel ui-ribbon-relative ui-ribbon-inline " + innerDynCSS },
  					React.createElement(
  						'div',
  						{ className: 'ui-ribbon-panel-contents' },
  						items.map(createItem),
  						React.createElement(
  							'div',
  							{ className: "ui-ribbon-panel-legend ui-ribbon-absolute " + legendDynCSS },
  							this.displayName
  						)
  					)
  				)
  			);
  		}
  	}, {
  		key: 'seperator',
  		get: function get$$() {
  			return this.props.seperator;
  		}

  		/**
     * Panel's children items
     * @return {[RibbonItemData]} - Ribbon item data.
     */

  	}, {
  		key: 'items',
  		get: function get$$() {
  			return this[Items];
  		}

  		/**
     * Instance edis/en-able status.
     * @return {bool} - If false, make instance be disabled.
     */

  	}, {
  		key: 'enabled',
  		get: function get$$() {
  			return get(Object.getPrototypeOf(RibbonPanel.prototype), 'enabled', this);
  		}

  		/**
     * Instance edis/en-able status.
     * @param {bool} [enabled = true] - If false, make instance be disabled.
     */
  		,
  		set: function set$$() {
  			var enabled = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

  			if (this.hidden) return;

  			var isEnabled = enabled === true;
  			set(Object.getPrototypeOf(RibbonPanel.prototype), 'enabled', isEnabled, this);

  			// Cascaded applying changes
  			this.items.map(function (item) {
  				item.enabled = isEnabled;
  			});
  		}

  		/**
     * Instance is hidden or not.
     * @return {bool} - If false, instance is going to disppear on the UI.
     */

  	}, {
  		key: 'hidden',
  		get: function get$$() {
  			return get(Object.getPrototypeOf(RibbonPanel.prototype), 'hidden', this);
  		}

  		/**
     * Instance is hidden or not.
     * @return {bool} [hidden = false]- If false, instance is going to disppear on the UI.
     */
  		,
  		set: function set$$() {
  			var hidden = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

  			var isHidden = hidden === true;
  			set(Object.getPrototypeOf(RibbonPanel.prototype), 'hidden', isHidden, this);

  			// Cascaded applying changes
  			this.items.map(function (item) {
  				item.hidden = isHidden;
  			});
  		}
  	}]);
  	return RibbonPanel;
  }(RibbonBase);

  RibbonPanel.propTypes = {
  	id: React.PropTypes.string.isRequired,
  	seperator: React.PropTypes.bool,
  	items: React.PropTypes.arrayOf(React.PropTypes.instanceOf(RibbonItemData)),
  	onStateChange: React.PropTypes.func
  };

  RibbonPanel.defaultProps = {
  	id: newGUID(),
  	seperator: true,
  	items: []
  };

  var Seperator = Symbol('seperator');
  var Items$3 = Symbol('items');

  /**
   * RibbonPanelData
   * @extends RibbonBaseData
   * @class
   */

  var RibbonPanelData = function (_RibbonBaseData) {
  	inherits(RibbonPanelData, _RibbonBaseData);

  	/**
    * RibbonPanelData constructor
    * @param {string} name - The name of this instance used by the internal mechanism.
    * @param {string} displayName - The name of this instance shown on the user interface, might be a localized string.
    */

  	function RibbonPanelData(name, displayName) {
  		classCallCheck(this, RibbonPanelData);

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(RibbonPanelData).call(this, name, displayName));

  		_this[Seperator] = true;
  		_this[Items$3] = [];
  		return _this;
  	}

  	/**
    * Panel has seperator or not.
    * @return {bool} - If true, panel will be seperated with other panels by a panel seperator.
    */


  	createClass(RibbonPanelData, [{
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
  			return this[Items$3];
  		}

  		/**
     * Panel's children items.
     * @return {RibbonItemData[]} [items = []]- Ribbon item data.
     */
  		,
  		set: function set() {
  			var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  			this[Items$3] = items;
  		}
  	}]);
  	return RibbonPanelData;
  }(RibbonBaseData);

  var Panels$1 = Symbol('panels');

  /**
   * RibbonTab
   * @extends RibbonBase
   * @class
   */

  var RibbonTab = function (_RibbonBase) {
  	inherits(RibbonTab, _RibbonBase);

  	/**
    * RibbonTab constructor
    * @param {object} props - React component properties
    */

  	function RibbonTab(props) {
  		classCallCheck(this, RibbonTab);

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(RibbonTab).call(this, props));

  		var actived = props.actived === true;

  		_this.state = Object.assign(_this.state, {
  			actived: actived,
  			panels: [].concat(props.panels)
  		});

  		_this[Panels$1] = [];

  		_this.handleClick = _this.handleClick.bind(_this);
  		return _this;
  	}

  	/**
    * Tab type.
    * @return {string} - Tab type for identification.
    */


  	createClass(RibbonTab, [{
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
  			if (!(panelData instanceof RibbonPanelData) || idx !== -1) return console.log('%c[RibbonTab] Input panelData is invalid or duplicate.', 'color:red;');

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
  			this[Panels$1].length = 0;
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
  			var dynCSS = ClassNames({
  				'ui-ribbon-active': this.actived,
  				'ui-ribbon-disabled': this.enabled === false,
  				'ui-ribbon-invisible': this.hidden,
  				'ui-ribbon-inline': this.hidden === false
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
  				return React.createElement(RibbonPanel, {
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

  			return React.createElement(
  				'li',
  				{
  					key: this.id,
  					id: this.id,
  					className: this.type + " " + dynCSS,
  					role: 'ui-ribbon-tab',
  					onClick: this.handleClick },
  				React.createElement(
  					'span',
  					{ className: 'ui-ribbon-uppercase' },
  					this.displayName
  				),
  				React.createElement(
  					'div',
  					{ className: 'ui-ribbon-tab-contents ui-ribbon-absolute' },
  					panels.map(createPanel)
  				)
  			);
  		}
  	}, {
  		key: 'type',
  		get: function get$$() {
  			return this.props.type;
  		}

  		/**
     * Instance edis/en-able status.
     * @return {bool} - If false, make instance be disabled.
     */

  	}, {
  		key: 'enabled',
  		get: function get$$() {
  			return get(Object.getPrototypeOf(RibbonTab.prototype), 'enabled', this);
  		}

  		/**
     * Instance edis/en-able status.
     * @param {bool} [enabled = true] - If false, make instance be disabled.
     */
  		,
  		set: function set() {
  			var enabled = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

  			if (this.hidden) return;

  			var isEnabled = enabled === true;

  			var prop = { enabled: isEnabled, actived: false };
  			var onStateChange = this.props.onStateChange;
  			onStateChange && onStateChange(this.id, prop);

  			// Cascaded applying changes
  			this.panels.map(function (panel) {
  				panel.enabled = isEnabled;
  			});

  			this.setState(prop);
  		}

  		/**
     * Instance is hidden or not.
     * @return {bool} - If false, instance is going to disppear on the UI.
     */

  	}, {
  		key: 'hidden',
  		get: function get$$() {
  			return get(Object.getPrototypeOf(RibbonTab.prototype), 'hidden', this);
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

  			var prop = { hidden: isHidden, enabled: isEnabled, actived: false };
  			var onStateChange = this.props.onStateChange;
  			onStateChange && onStateChange(this.id, prop);

  			// Cascaded applying changes
  			this.panels.map(function (panel) {
  				panel.hidden = isHidden;
  			});

  			this.setState(prop);
  		}

  		/**
     * Tab actived state.
     * @return {bool} - If true, it repsents tab is selected currently.
     */

  	}, {
  		key: 'actived',
  		get: function get$$() {
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
  		get: function get$$() {
  			return this[Panels$1];
  		}
  	}]);
  	return RibbonTab;
  }(RibbonBase);

  RibbonTab.propTypes = {
  	id: React.PropTypes.string.isRequired,
  	type: React.PropTypes.string.isRequired,
  	actived: React.PropTypes.bool,
  	panels: React.PropTypes.arrayOf(React.PropTypes.instanceOf(RibbonPanelData)),
  	onStateChange: React.PropTypes.func
  };

  RibbonTab.defaultProps = {
  	id: newGUID(),
  	type: 'ui-ribbon-tab-normal',
  	actived: false,
  	panels: []
  };

  var Tabs = Symbol('tabs');

  /**
   * Ribbon
   * @extends React.Component
   * @class
   */

  var Ribbon = function (_React$Component) {
  	inherits(Ribbon, _React$Component);

  	/**
    * RibbonBase constructor
    * @param {object} props - React component properties
    */

  	function Ribbon(props) {
  		classCallCheck(this, Ribbon);

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(Ribbon).call(this, props));

  		var appTab = new RibbonAppTabData();
  		var tabs = [appTab].concat(props.tabs);
  		var titlebar = new RibbonTitlebarData();

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


  	createClass(Ribbon, [{
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
  			if (!(tabData instanceof RibbonTabData) || idx !== -1) return console.log('%c[Ribbon] Input tabData is invalid or duplicate.', 'color:red;');

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

  			var tab = this.tabs.find(function (tab) {
  				return tab.id === tabId;
  			});
  			if (!tab) throw '[Ribbon] Input tab id not exists.';

  			tab.actived = true;
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
  				return React.createElement(RibbonTitlebar, {
  					key: data.id,
  					id: data.id,
  					name: data.name,
  					displayName: data.title,
  					enabled: data.enabled,
  					hidden: data.hidden,
  					ref: 'titlebar',
  					onStateChange: updateTitlebar });
  			};

  			var nextOpt = function nextOpt(id, data) {
  				// For de/activating tab by changing tab's actived property.
  				if (data.hasOwnProperty('actived')) {
  					if (data.actived === true) {
  						scope.tabs.map(function (tab) {
  							if (tab.id !== id) tab.actived = false;
  						});
  					} else {
  						// For activing other tab while current tab is diabled.
  						if (data.hasOwnProperty('enabled') && data.enabled === false) {
  							var tab = scope.tabs.find(function (tab) {
  								return tab.id !== id && tab.enabled === true && tab.type !== 'ui-ribbon-tab-application';
  							});
  							if (!tab) return;

  							tab.actived = true;
  						}
  					}
  				}
  			};

  			var updateTab = function updateTab(id, data) {
  				var tabs = scope.state.tabs;
  				var tab = tabs.find(function (tab) {
  					return tab.id === id;
  				});
  				if (!tab) return;

  				Object.assign(tab, data);
  				scope.setState({ tabs: tabs });

  				nextOpt(id, data);
  			};

  			var createTab = function createTab(tab) {
  				return React.createElement(RibbonTab, {
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

  			return React.createElement(
  				'div',
  				{ id: 'RibbonUI' },
  				createTitleBar(),
  				React.createElement(
  					'div',
  					{ className: 'ui-ribbon-window' },
  					React.createElement(
  						'div',
  						{ id: 'ui-ribbon-main', className: 'ui-ribbon-main ui-ribbon-border-bottom' },
  						React.createElement(
  							'div',
  							{ className: 'ui-ribbon-tab-container ui-ribbon-border-bottom' },
  							React.createElement(
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
  }(React.Component);

  Ribbon.propTypes = {
  	id: React.PropTypes.string.isRequired,
  	tabs: React.PropTypes.arrayOf(React.PropTypes.instanceOf(RibbonTabData))
  };

  Ribbon.defaultProps = {
  	id: newGUID(),
  	tabs: []
  };

  var RibbonInst = Symbol('ribbon');
  var Options = Symbol('options');

  /**
   * RibbonTask
   * @class
   * @classdesc For bulk creating or modifying Ribbon contents.
   */

  var RibbonTask$1 = function () {
  	/**
    * RibbonTask constructor.
    * @param {Ribbon} ribbon - Rendered Ribbon component.
    * @param {object} options - Task options.
    */

  	function RibbonTask(ribbon, options) {
  		classCallCheck(this, RibbonTask);

  		if (!(ribbon instanceof Ribbon)) throw 'No Ribbon instance available.';

  		this[RibbonInst] = ribbon;
  		this[Options] = options;
  	}

  	/**
    * Rendered Ribbon component.
    * @return {Ribbon}
    */


  	createClass(RibbonTask, [{
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
  	if (task.prototype instanceof RibbonTask$1) return true;
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
  		classCallCheck(this, RibbonTaskManager);

  		this[Tasks] = {};

  		checkTaskType.bind(this);
  	}

  	/**
    * All registered RibbonTask.
    * @return {RibbonTask[]}
    */


  	createClass(RibbonTaskManager, [{
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

  var RibbonInst$1 = Symbol('ribbon');
  var Tasks$1 = Symbol('tasks');
  var TaskManager$1 = Symbol('taskManager');

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
  		classCallCheck(this, RibbonTaskExecuter);

  		if (!(ribbon instanceof Ribbon)) throw 'No Ribbon instance available.';
  		if (!(taskManager instanceof RibbonTaskManager)) throw 'No RibbonTaskManager instance available.';

  		this[RibbonInst$1] = ribbon;
  		this[TaskManager$1] = taskManager;
  		this[Tasks$1] = {};
  	}

  	/**
    * Rendered Ribbon component.
    * @return {Ribbon}
    */


  	createClass(RibbonTaskExecuter, [{
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
  						this[Tasks$1][taskId] = task;

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

  				delete this[Tasks$1][taskId];
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
  			return this[RibbonInst$1];
  		}

  		/**
     * Task	manager instance.
     * @return {RibbonTaskManager}
     */

  	}, {
  		key: 'manager',
  		get: function get() {
  			return this[TaskManager$1];
  		}

  		/**
     * All executed tasks.
     * @return {RibbonTask[]}
     */

  	}, {
  		key: 'tasks',
  		get: function get() {
  			return this[Tasks$1];
  		}
  	}]);
  	return RibbonTaskExecuter;
  }();

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
  		classCallCheck(this, RibbonCtrl);

  		this[TaskManager] = new RibbonTaskManager();
  		this[Container] = undefined;
  		this[MainRibbon] = undefined;
  		this[TaskExecuter] = undefined;
  	}

  	/**
    * Ribbon instance.
    * @return {Ribbon} - Rendered Ribbon component.
    */


  	createClass(RibbonCtrl, [{
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

  					scope[MainRibbon] = ReactDOM.render(React.createElement(Ribbon, null), container);
  					scope[TaskExecuter] = new RibbonTaskExecuter(scope.mainRibbon, taskManager);

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

  var Data$1 = {
  	RibbonBaseData: RibbonBaseData,
  	RibbonTitlebarData: RibbonTitlebarData,
  	RibbonTabData: RibbonTabData,
  	RibbonAppTabData: RibbonAppTabData,
  	RibbonPanelData: RibbonPanelData,
  	RibbonItemData: RibbonItemData,
  	RibbonButtonData: RibbonButtonData,
  	RibbonPushButtonData: RibbonPushButtonData,
  	RibbonToggleButtonData: RibbonToggleButtonData,
  	RibbonTooltipData: RibbonTooltipData,
  	RibbonGroupData: RibbonGroupData,
  	RibbonRadioButtonGroupData: RibbonRadioButtonGroupData
  };

  var ReactRibbon = {
  	Ribbon: Ribbon,
  	RibbonBase: RibbonBase,
  	RibbonTab: RibbonTab,
  	RibbonPanel: RibbonPanel,
  	RibbonTitlebar: RibbonTitlebar,
  	RibbonItem: RibbonItem,
  	RibbonButton: RibbonButton,
  	RibbonTooltip: RibbonTooltip,
  	RibbonPushButton: RibbonPushButton,
  	RibbonToggleButton: RibbonToggleButton,
  	RibbonGroup: RibbonGroup,
  	RibbonRadioButtonGroup: RibbonRadioButtonGroup,
  	RibbonCtrl: RibbonCtrl,
  	RibbonTask: RibbonTask$1,
  	RibbonTaskManager: RibbonTaskManager,
  	RibbonTaskExecuter: RibbonTaskExecuter,
  	Utility: utility,
  	Data: Data$1
  };

  var RibbonCtrl$1 = ReactRibbon.RibbonCtrl;

  /**
   * Singleton pattern approach for RibbonCtrl.
   * @return {RibbonCtrl} - RibbonCtrl instance.
   */

  var ribbonCtrl = new RibbonCtrl$1();

  var RibbonTask = ReactRibbon.RibbonTask;
  var Utility = ReactRibbon.Utility;
  var Data = ReactRibbon.Data;
  if (!ribbonCtrl) console.error('[RibbonTest] Failed to create ribbonCtrl instance.');

  var RibbonTabData$1 = Data.RibbonTabData;
  var RibbonPanelData$1 = Data.RibbonPanelData;
  var RibbonPushButtonData$1 = Data.RibbonPushButtonData;
  var RibbonToggleButtonData$1 = Data.RibbonToggleButtonData;
  var RibbonTooltipData$1 = Data.RibbonTooltipData;
  var RibbonRadioButtonGroupData$1 = Data.RibbonRadioButtonGroupData;

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
  					var tabData = new RibbonTabData$1('DemoBasicTab', 'Basic');
  					var tab = ribbon.addTab(tabData);

  					var testTabData = new RibbonTabData$1('DemoTestTab', 'Test');
  					var testTab = ribbon.addTab(testTabData);

  					// Create panel.
  					var spatialPanelData = new RibbonPanelData$1('DemoSpatialPanel', 'Spatial');
  					var spatialPanel = tab.addPanel(spatialPanelData);

  					// Create buttons.
  					var dwnBtnData = new RibbonPushButtonData$1('DemoSpatialDwnBtn', 'Download');
  					var dwnBtn = spatialPanel.addItem(dwnBtnData);
  					dwnBtn.icon = 'img/db_download.png';
  					dwnBtn.clickHandler = function () {
  						alert('DemoSpatialDwnBtn Clicked!');
  					};

  					var clsBtnData = new RibbonPushButtonData$1('DemoSpatialCleanBtn', 'Clean');
  					var clsBtn = spatialPanel.addItem(clsBtnData);
  					clsBtn.icon = 'img/db_remove.png';
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
  					panBtn.icon = 'img/pan.png';
  					panBtn.clickHandler = function () {
  						alert('DemoPanBtn Clicked!');
  					};

  					var orbitBtnData = new RibbonToggleButtonData$1('DemoOrbitBtn', 'Orbit');
  					var orbitBtn = radioBtnGroup.addItem(orbitBtnData);
  					orbitBtn.icon = 'img/orbit.png';
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

  					$('#demo-active-tab-test').click(function () {
  						testTab.actived = true;
  						console.log('Set tab actived status to true: ', testTab.actived === true);
  					});

  					$('#demo-deactive-tab-test').click(function () {
  						testTab.actived = false;
  						console.log('Set tab actived status to false: ', testTab.actived === false);
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
  	return RibbonDemoTask;
  }(RibbonTask);

  ribbonCtrl.registerTask('React.Windows.RibbonDemoTask', RibbonDemoTask);

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
