!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("react"),require("classnames"),require("react-dom")):"function"==typeof define&&define.amd?define("react-ribbon",["react","classnames","react-dom"],e):t.ReactRibbon=e(t.React,t.classNames,t.ReactDOM)}(this,function(t,e,n){"use strict";t="default"in t?t.default:t,e="default"in e?e.default:e,n="default"in n?n.default:n;var i=function(){var t=(new Date).getTime(),e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"==e?n:3&n|8).toString(16)});return e},o=function(t){var e=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;return e.test(t)},r=function(){var t=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],e=arguments[1];e=e instanceof Function?e:function(t){return!0};for(var n=0;n<t.length;n++){var i=t[n];if(e(i))return i}},a=function(t){for(var e="undefined"!=typeof window&&null!==window?window:self,n=t.split("."),i=0;i<n.length;i++)e[n[i]]=e[n[i]]||{},e=e[n[i]];return e},s={newGUID:i,isGUID:o,findItem:r,namespace:a},u=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},l=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),c=function t(e,n,i){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var r=Object.getPrototypeOf(e);return null===r?void 0:t(r,n,i)}if("value"in o)return o.value;var a=o.get;if(void 0!==a)return a.call(i)},d=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},h=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},b=function t(e,n,i,o){var r=Object.getOwnPropertyDescriptor(e,n);if(void 0===r){var a=Object.getPrototypeOf(e);null!==a&&t(a,n,i,o)}else if("value"in r&&r.writable)r.value=i;else{var s=r.set;void 0!==s&&s.call(o,i)}return i},p=Symbol("id"),f=Symbol("name"),y=Symbol("displayName"),g=Symbol("enabled"),v=Symbol("hidden"),m=function(){function t(e,n){if(u(this,t),"string"!=typeof e)throw"name is required.";this[p]=i(),this[f]=e,this[y]="string"!=typeof e?e:n,this[g]=!0,this[v]=!1}return l(t,[{key:"id",get:function(){return this[p]}},{key:"name",get:function(){return this[f]}},{key:"displayName",get:function(){return this[y]},set:function(t){if("string"!=typeof t)throw"Input type should be a string.";this[y]=t}},{key:"enabled",get:function(){return this[g]},set:function(){var t=arguments.length<=0||void 0===arguments[0]||arguments[0];this[g]=t===!0}},{key:"hidden",get:function(){return this[v]},set:function(){var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0];this[v]=t===!0}}]),t}(),k=Symbol("actived"),O=Symbol("panels"),T=function(t){function e(t,n){u(this,e);var i=h(this,Object.getPrototypeOf(e).call(this,t,n));return i[k]=!1,i[O]=[],i}return d(e,t),l(e,[{key:"type",get:function(){return"ui-ribbon-tab-normal"}},{key:"actived",get:function(){return this[k]},set:function(){var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0];this[k]=t===!0}},{key:"panels",get:function(){return this[O]},set:function(){var t=arguments.length<=0||void 0===arguments[0]?[]:arguments[0];this[O]=t}}]),e}(m),P=function(t){function e(){var t=arguments.length<=0||void 0===arguments[0]?"File":arguments[0];return u(this,e),h(this,Object.getPrototypeOf(e).call(this,"AppTab",t))}return d(e,t),l(e,[{key:"type",get:function(){return"ui-ribbon-tab-application"}}]),e}(T),S=function(t){function e(t){return u(this,e),"string"!=typeof t&&(t="React Ribbon"),h(this,Object.getPrototypeOf(e).call(this,"AppTitlebar",t))}return d(e,t),l(e,[{key:"title",get:function(){return this.displayName},set:function(t){this.displayName=t}}]),e}(m),R=function(t){function e(t){u(this,e);var n=h(this,Object.getPrototypeOf(e).call(this,t)),i="string"==typeof t.displayName?t.displayName:name,o=0!=t.enabled,r=t.hidden===!0;return n.state={displayName:i,enabled:o,hidden:r},n}return d(e,t),l(e,[{key:"id",get:function(){return this.props.id}},{key:"name",get:function(){return this.props.name}},{key:"displayName",get:function(){return this.state.displayName},set:function(t){if("string"!=typeof t)throw"Input type should be a string.";var e={displayName:t},n=this.props.onStateChange;n&&n(this.id,e),this.setState(e)}},{key:"enabled",get:function(){return this.state.enabled},set:function(){var t=arguments.length<=0||void 0===arguments[0]||arguments[0];if(!this.hidden){var e=t===!0,n={enabled:e},i=this.props.onStateChange;i&&i(this.id,n),this.setState(n)}}},{key:"hidden",get:function(){return this.state.hidden},set:function(){var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0],e=t===!0,n=!e,i={hidden:e,enabled:n},o=this.props.onStateChange;o&&o(this.id,i),this.setState(i)}}]),e}(t.Component);R.propTypes={id:t.PropTypes.string.isRequired,name:t.PropTypes.string.isRequired,displayName:t.PropTypes.string,enabled:t.PropTypes.bool,hidden:t.PropTypes.bool,onStateChange:t.PropTypes.func},R.defaultProps={id:i(),enabled:!0,hidden:!1};var C=function(n){function i(t){return u(this,i),h(this,Object.getPrototypeOf(i).call(this,t))}return d(i,n),l(i,[{key:"toggleDisplay",value:function(){this.hidden=!this.hidden}},{key:"render",value:function(){var n=e({"ui-ribbon-invisible":this.hidden});return t.createElement("div",{className:"ui-ribbon-title "+n},t.createElement("span",null,this.title))}},{key:"title",get:function(){return this.displayName},set:function(t){if("string"!=typeof t)throw"Input type should be a string.";this.displayName=t}}]),i}(R);C.propTypes={onStateChange:t.PropTypes.func};var x=function(t){function e(t){u(this,e);var n=h(this,Object.getPrototypeOf(e).call(this,t)),i=t.actived===!0;return n.state=Object.assign(n.state,{actived:i}),n}return d(e,t),l(e,[{key:"type",get:function(){return this.props.type}},{key:"actived",get:function(){return this.state.actived},set:function(){var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0],e=t===!0,n={actived:e},i=this.props.onStateChange;i&&i(this.id,n),this.setState(n)}}]),e}(R);x.propTypes={id:t.PropTypes.string.isRequired,type:t.PropTypes.string.isRequired,actived:t.PropTypes.bool,onStateChange:t.PropTypes.func},x.defaultProps={id:i(),type:"ui-ribbon-panel-item",actived:!1};var j=function(n){function i(t){u(this,i);var e=h(this,Object.getPrototypeOf(i).call(this,t));return e.state=Object.assign(e.state,{content:t.content}),e}return d(i,n),l(i,[{key:"show",value:function(){this.hidden=!1}},{key:"hide",value:function(){this.hidden=!0}},{key:"render",value:function(){var n=this,i=e({"ui-ribbon-tooltip-visible":this.hidden===!1}),o=function(){if(n.title)return t.createElement("strong",null,n.title)},r=function(){if(n.content)return t.createElement("p",null,n.content)};return t.createElement("div",{id:this.id,className:"ui-ribbon-tooltip "+i},o(),r())}},{key:"title",get:function(){return this.displayName},set:function(t){if("string"!=typeof t)throw"Input type should be a string.";this.displayName=t}},{key:"content",get:function(){return this.state.content},set:function(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0];if("string"!=typeof t)throw"Input content should be a string.";var e={content:t},n=this.props.onStateChange;n&&n(this.id,e),this.setState(e)}},{key:"hidden",get:function(){return this.state.hidden},set:function(){var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0],e=t===!0,n={hidden:e},i=this.props.onStateChange;i&&i(this.id,n),this.setState(n)}}]),i}(R);j.propTypes={content:t.PropTypes.string,onStateChange:t.PropTypes.func};var w=Symbol("content"),N=function(t){function e(t,n){if(u(this,e),"string"!=typeof t)throw"Tooltip title cannot be empty.";var i=h(this,Object.getPrototypeOf(e).call(this,"RibbonTooltip",t));return i[w]="string"!=typeof n?void 0:n,i.hidden=!0,i}return d(e,t),l(e,[{key:"title",get:function(){return this.displayName},set:function(t){this.displayName=t}},{key:"content",get:function(){return this[w]},set:function(t){if("string"!=typeof t)throw"Input content should be a type of string.";this[w]=t}}]),e}(m),E=function(n){function o(t){u(this,o);var e=h(this,Object.getPrototypeOf(o).call(this,t)),n=t.icon,i=t.tooltip,r=t.toggleable===!0,a=t.clickHandler;return e.state=Object.assign(e.state,{icon:n,tooltip:i,toggleable:r,clickHandler:a}),e.handleClick=e.handleClick.bind(e),e.handleMouseOver=e.handleMouseOver.bind(e),e.handleMouseOut=e.handleMouseOut.bind(e),e}return d(o,n),l(o,[{key:"createTooltip",value:function(){var e=this,n=this.state.tooltip;if(n){if(!(n instanceof N)&&n)return console.log("%c[RibbonButton] Input tooltip data is invalid.","color:red;");var i=function(t,n){var i=e.state.tooltip;if(i.id===t){Object.assign(i,n);var o={tooltip:i},r=e.props.onStateChange;r&&r(e.id,o),e.setState(o)}};return t.createElement(j,{key:n.id,id:n.id,name:n.name,displayName:n.title,content:n.content,enabled:n.enabled,hidden:n.hidden,onStateChange:i,ref:"tooltip"})}}},{key:"handleClick",value:function(t){if(this.enabled){var e=this.props.clickHandler;e&&e(t)}}},{key:"handleMouseOver",value:function(){var t=this.tooltip;t&&t.show()}},{key:"handleMouseOut",value:function(){var t=this.tooltip;t&&t.hide()}},{key:"render",value:function(){var n=e({"ui-ribbon-disabled":this.enabled===!1,"ui-ribbon-invisible":this.hidden}),o=e({"ui-ribbon-active":this.actived}),r=function(e){var n=e.split("\\n"),o=i(),r=t.createElement("span",{key:o,id:o},e);return n.length>1&&(r=n.map(function(e){var n=i();return t.createElement("span",{key:n,id:n},e,t.createElement("br",null))})),r};return t.createElement("a",{key:this.id,id:this.id,className:n,onClick:this.handleClick,onMouseOver:this.handleMouseOver,onMouseOut:this.handleMouseOut},t.createElement("div",{role:this.role,className:"ui-ribbon-button "+this.type+" ui-ribbon-relative ui-ribbon-inline ui-ribbon-center "+o},t.createElement("img",{src:this.icon}),t.createElement("div",{className:"ui-ribbon-button-legend"},r(this.displayName)),this.createTooltip()))}},{key:"role",get:function(){return this.props.role}},{key:"icon",get:function(){return this.state.icon},set:function(t){if("string"!=typeof t)throw"Input type should be a string.";var e={icon:t},n=this.props.onStateChange;n&&n(this.id,e),this.setState(e)}},{key:"toggleable",get:function(){return this.state.toggleable},set:function(){var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0],e=t===!0,n={toggleable:e},i=this.props.onStateChange;i&&i(this.id,n),this.setState(n)}},{key:"clickHandler",get:function(){return this.state.clickHandler},set:function(t){if(!(t instanceof Function))throw"Input clicking handler is invalid.";var e={clickHandler:t},n=this.props.onStateChange;n&&n(this.id,e),this.setState(e)}},{key:"tooltip",get:function(){return this.refs.tooltip},set:function(t){if(!(t instanceof N))throw"[RibbonButton] Input tooltip data is invalid.";var e={tooltip:t},n=this.props.onStateChange;n&&n(this.id,e),this.setState(e)}}]),o}(x);E.propTypes={id:t.PropTypes.string.isRequired,role:t.PropTypes.string.isRequired,type:t.PropTypes.string.isRequired,icon:t.PropTypes.string,tooltip:t.PropTypes.instanceOf(N),toggleable:t.PropTypes.bool,clickHandler:t.PropTypes.func,onStateChange:t.PropTypes.func},E.defaultProps={id:i(),role:"ui-ribbon-button",type:"ui-ribbon-button",icon:"",toggleable:!1};var I=function(n){function i(t){return u(this,i),h(this,Object.getPrototypeOf(i).call(this,t))}return d(i,n),l(i,[{key:"render",value:function(){var n=e({"ui-ribbon-disabled":this.enabled===!1,"ui-ribbon-invisible":this.hidden});return t.createElement("div",{className:"ui-ribbon-button-group ui-ribbon-inline "+n},c(Object.getPrototypeOf(i.prototype),"render",this).call(this))}}]),i}(E);I.propTypes={type:t.PropTypes.string.isRequired,onStateChange:t.PropTypes.func},I.defaultProps={type:"ui-ribbon-button-big"};var D=function(t){function e(t){u(this,e);var n=h(this,Object.getPrototypeOf(e).call(this,t));return n.handleClick=n.handleClick.bind(n),n}return d(e,t),l(e,[{key:"handleClick",value:function(t){if(this.enabled){if(this.toggleable){var e=!this.actived,n={actived:e},i=this.props.onStateChange;i&&i(this.id,n),this.setState(n);var o=this.props.onGroupCurrentChange;o&&o()}var r=this.props.clickHandler;r&&r(t)}}}]),e}(I);D.propTypes={type:t.PropTypes.string.isRequired,role:t.PropTypes.string.isRequired,onGroupCurrentChange:t.PropTypes.func,onStateChange:t.PropTypes.func},D.defaultProps={role:"ui-ribbon-button-toggle",type:"ui-ribbon-button-big"};var M=Symbol("actived"),q=function(t){function e(t,n){u(this,e);var i=h(this,Object.getPrototypeOf(e).call(this,t,n));return i[M]=!1,i}return d(e,t),l(e,[{key:"type",get:function(){return"ui-ribbon-panel-item"}},{key:"actived",get:function(){return this[M]},set:function(){var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0];this[M]=t===!0}}]),e}(m),H=Symbol("icon"),B=Symbol("tooltip"),G=Symbol("toggleable"),U=Symbol("clickHandler"),F=function(t){function e(t,n){u(this,e);var i=h(this,Object.getPrototypeOf(e).call(this,t,n));return i[H]="",i[B]=void 0,i[G]=!1,i[U]=void 0,i}return d(e,t),l(e,[{key:"role",get:function(){return"ui-ribbon-button"}},{key:"icon",get:function(){return this[H]},set:function(t){if("string"!=typeof t)throw"Input type should be a string.";this[H]=t}},{key:"tooltip",get:function(){return this[B]},set:function(t){if(!(t instanceof N))throw"Input data is not a type of RibbonTooltipData.";this[B]=t}},{key:"toggleable",get:function(){return this[G]},set:function(){var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0];this[G]=t===!0}},{key:"clickHandler",get:function(){return this[U]},set:function(t){if(!(t instanceof Function))throw"Input clicking handler is invalid.";this[U]=t}}]),e}(q),A=function(t){function e(t,n){return u(this,e),h(this,Object.getPrototypeOf(e).call(this,t,n))}return d(e,t),l(e,[{key:"type",get:function(){return"ui-ribbon-button-big"}}]),e}(F),W=function(t){function e(t,n){return u(this,e),h(this,Object.getPrototypeOf(e).call(this,t,n))}return d(e,t),l(e,[{key:"role",get:function(){return"ui-ribbon-button-toggle"}},{key:"toggleable",get:function(){return!0}}]),e}(A),_=Symbol("items"),L=function(n){function i(t){u(this,i);var e=h(this,Object.getPrototypeOf(i).call(this,t));return e.state=Object.assign(e.state,{items:[].concat(t.items)}),e[_]=[],e}return d(i,n),l(i,[{key:"addItem",value:function(t){var e=this.items.findIndex(function(e){return e.id==t.id||e.name===t.name});if(!(t instanceof F)||e!==-1)return console.log("%c[RibbonGroup] Input itemData is invalid or duplicate.","color:red;");var n=this.state.items.concat(t),i={items:n},o=this.props.onStateChange;return o&&o(this.id,i),this.setState(i),this.items[this.items.length-1]}},{key:"componentWillUpdate",value:function(t,e){this[_].length=0}},{key:"render",value:function(){var n=this,i=this.state.items,o=function(t,e){var i=n.state.items,o=i.find(function(e){return e.id===t});if(o){Object.assign(o,e);var r={items:i},a=n.props.onStateChange;a&&a(n.id,r),n.setState(r)}},r=function(e){var i=void 0;switch(e.type){case"ui-ribbon-button-big":var r="ui-ribbon-button-toggle"===e.role?D:I;i=t.createElement(r,{key:e.id,id:e.id,name:e.name,displayName:e.displayName,enabled:e.enabled,hidden:e.hidden,type:e.type,actived:e.actived,icon:e.icon,tooltip:e.tooltip,toggleable:e.toggleable,clickHandler:e.clickHandler,onStateChange:o,ref:function(t){t&&n.items.push(t)}})}return i},a=e({"ui-ribbon-disabled":this.enabled===!1,"ui-ribbon-invisible":this.hidden});return t.createElement("div",{key:this.id,id:this.id,className:"ui-ribbon-group ui-ribbon-inline "+a},i.map(r))}},{key:"items",get:function(){return this[_]}},{key:"enabled",get:function(){return c(Object.getPrototypeOf(i.prototype),"enabled",this)},set:function(){var t=arguments.length<=0||void 0===arguments[0]||arguments[0];if(!this.hidden){var e=t===!0;b(Object.getPrototypeOf(i.prototype),"enabled",e,this),this.items.map(function(t){t.enabled=e})}}},{key:"hidden",get:function(){return c(Object.getPrototypeOf(i.prototype),"hidden",this)},set:function(){var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0],e=t===!0;b(Object.getPrototypeOf(i.prototype),"hidden",e,this),this.items.map(function(t){t.hidden=e})}}]),i}(x);L.propTypes={id:t.PropTypes.string.isRequired,items:t.PropTypes.arrayOf(t.PropTypes.instanceOf(F)),onStateChange:t.PropTypes.func},L.defaultProps={id:i(),items:[]};var $=Symbol("current"),z=Symbol("default"),J=function(n){function i(t){u(this,i);var e=h(this,Object.getPrototypeOf(i).call(this,t));return e[$]=void 0,e[z]=void 0,e}return d(i,n),l(i,[{key:"resetCurrent",value:function(){this.current=this.default}},{key:"addItem",value:function(t){if(!(t instanceof W))return console.log("%c[RibbonGroup] Input itemData is invalid or duplicate.","color:red;");var e=c(Object.getPrototypeOf(i.prototype),"addItem",this).call(this,t);return this.default||(this.default=e.id),e}},{key:"render",value:function(){var n=this,i=this.state.items,o=function(t){"string"==typeof t&&(n.current=t)},r=function(t,e){var i=n.state.items,o=i.find(function(e){return e.id===t});if(o){Object.assign(o,e);var r={items:i},a=n.props.onStateChange;a&&a(n.id,r),n.setState(r)}},a=function(e){return t.createElement(D,{key:e.id,id:e.id,name:e.name,displayName:e.displayName,enabled:e.enabled,hidden:e.hidden,type:e.type,actived:e.actived,icon:e.icon,tooltip:e.tooltip,toggleable:e.toggleable,clickHandler:e.clickHandler,onGroupCurrentChange:function(){o(e.id)},onStateChange:r,ref:function(t){t&&n.items.push(t)}})},s=e({"ui-ribbon-disabled":this.enabled===!1,"ui-ribbon-invisible":this.hidden});return t.createElement("div",{key:this.id,id:this.id,className:"ui-ribbon-group ui-ribbon-inline "+s},i.map(a))}},{key:"current",get:function(){return this[$]},set:function(t){var e=this.items.find(function(e){return e.id===t&&e.enabled});if(!e)throw"[RibbonRadioButtonGroup] Input id not exists or disabled.";e.actived=!0,this[$]=t,this.default||(this.default=t),this.items.map(function(e){e.id!==t&&(e.actived=!1)})}},{key:"default",get:function(){return this[z]},set:function(t){var e=this.items.find(function(e){return e.id===t&&e.enabled});if(!e)throw"[RibbonRadioButtonGroup] Input id not exists or disabled.";this[z]=t,this.current||(this.current=t)}}]),i}(L);L.propTypes={id:t.PropTypes.string.isRequired,items:t.PropTypes.arrayOf(t.PropTypes.instanceOf(W)),onStateChange:t.PropTypes.func},L.defaultProps={id:i(),items:[]};var K=Symbol("items"),Q=function(t){function e(t,n){u(this,e);var i=h(this,Object.getPrototypeOf(e).call(this,t,n));return i[K]=[],i}return d(e,t),l(e,[{key:"type",get:function(){return"ui-ribbon-group"}},{key:"items",get:function(){return this[K]},set:function(){var t=arguments.length<=0||void 0===arguments[0]?[]:arguments[0];this[K]=t}}]),e}(q),V=function(t){function e(t,n){return u(this,e),h(this,Object.getPrototypeOf(e).call(this,t,n))}return d(e,t),l(e,[{key:"type",get:function(){return"ui-ribbon-radio-group"}}]),e}(Q),X=Symbol("items"),Y=function(n){function i(t){u(this,i);var e=h(this,Object.getPrototypeOf(i).call(this,t));return e.state=Object.assign(e.state,{items:[].concat(t.items)}),e[X]=[],e}return d(i,n),l(i,[{key:"addItem",value:function(t){var e=this.items.findIndex(function(e){return e.id==t.id||e.name===t.name});if(!(t instanceof q)||e!==-1)return console.log("%c[RibbonPanel] Input itemData is invalid or duplicate.","color:red;");var n=this.state.items.concat(t),i={items:n},o=this.props.onStateChange;return o&&o(this.id,i),this.setState(i),this.items[this.items.length-1]}},{key:"componentWillUpdate",value:function(t,e){this[X].length=0}},{key:"render",value:function(){var n=this,i=this.state.items,o=e({"ui-ribbon-disabled":this.enabled===!1,"ui-ribbon-invisible":this.hidden,"ui-ribbon-inline":this.hidden===!1}),r=e({"ui-ribbon-empty":0===i.length,"ui-riibon-panel-single-btn":1===i.length}),a=e({"ui-ribbon-disabled":this.enabled===!1}),s=function(t,e){var i=n.state.items,o=i.find(function(e){return e.id===t});if(o){Object.assign(o,e);var r={items:i},a=n.props.onStateChange;a&&a(n.id,r),n.setState(r)}},u=function(e){var i=void 0;switch(e.type){case"ui-ribbon-radio-group":case"ui-ribbon-group":var o="ui-ribbon-group"===e.type?L:J;i=t.createElement(o,{key:e.id,id:e.id,name:e.name,displayName:e.displayName,enabled:e.enabled,hidden:e.hidden,type:e.type,items:e.items,actived:e.actived,onStateChange:s,ref:function(t){t&&n.items.push(t)}});break;case"ui-ribbon-button-big":var r="ui-ribbon-button-toggle"===e.role?D:I;i=t.createElement(r,{key:e.id,id:e.id,name:e.name,displayName:e.displayName,enabled:e.enabled,hidden:e.hidden,type:e.type,actived:e.actived,icon:e.icon,tooltip:e.tooltip,toggleable:e.toggleable,clickHandler:e.clickHandler,onStateChange:s,ref:function(t){t&&n.items.push(t)}})}return i},l=function(){var e=arguments.length<=0||void 0===arguments[0]||arguments[0];if(e)return t.createElement("div",{className:"ui-ribbon-panel-seperator ui-ribbon-relative ui-ribbon-inline"})};return t.createElement("div",{key:this.id,className:"ui-ribbon-panel-container ui-ribbon-relative "+o},l(this.seperator),t.createElement("div",{className:"ui-ribbon-panel ui-ribbon-relative ui-ribbon-inline "+r},t.createElement("div",{className:"ui-ribbon-panel-contents"},i.map(u),t.createElement("div",{className:"ui-ribbon-panel-legend ui-ribbon-absolute "+a},this.displayName))))}},{key:"seperator",get:function(){return this.props.seperator}},{key:"items",get:function(){return this[X]}},{key:"enabled",get:function(){return c(Object.getPrototypeOf(i.prototype),"enabled",this)},set:function(){var t=arguments.length<=0||void 0===arguments[0]||arguments[0];if(!this.hidden){var e=t===!0;b(Object.getPrototypeOf(i.prototype),"enabled",e,this),this.items.map(function(t){t.enabled=e})}}},{key:"hidden",get:function(){return c(Object.getPrototypeOf(i.prototype),"hidden",this)},set:function(){var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0],e=t===!0;b(Object.getPrototypeOf(i.prototype),"hidden",e,this),this.items.map(function(t){t.hidden=e})}}]),i}(R);Y.propTypes={id:t.PropTypes.string.isRequired,seperator:t.PropTypes.bool,items:t.PropTypes.arrayOf(t.PropTypes.instanceOf(q)),onStateChange:t.PropTypes.func},Y.defaultProps={id:i(),seperator:!0,items:[]};var Z=Symbol("seperator"),tt=Symbol("items"),et=function(t){function e(t,n){u(this,e);var i=h(this,Object.getPrototypeOf(e).call(this,t,n));return i[Z]=!0,i[tt]=[],i}return d(e,t),l(e,[{key:"seperator",get:function(){return this[Z]},set:function(){var t=arguments.length<=0||void 0===arguments[0]||arguments[0];this[Z]=t===!0}},{key:"items",get:function(){return this[tt]},set:function(){var t=arguments.length<=0||void 0===arguments[0]?[]:arguments[0];this[tt]=t}}]),e}(m),nt=Symbol("panels"),it=function(n){function i(t){u(this,i);var e=h(this,Object.getPrototypeOf(i).call(this,t)),n=t.actived===!0;return e.state=Object.assign(e.state,{actived:n,panels:[].concat(t.panels)}),e[nt]=[],e.handleClick=e.handleClick.bind(e),e}return d(i,n),l(i,[{key:"addPanel",value:function(t){var e=this.panels.findIndex(function(e){return e.id==t.id||e.name===t.name});if(!(t instanceof et)||e!==-1)return console.log("%c[RibbonTab] Input panelData is invalid or duplicate.","color:red;");t.seperator=0!==this.panels.length;var n=this.state.panels.concat(t),i={panels:n},o=this.props.onStateChange;return o&&o(this.id,i),this.setState(i),this.panels[this.panels.length-1]}},{key:"componentWillUpdate",value:function(t,e){this[nt].length=0}},{key:"handleClick",value:function(){if("ui-ribbon-tab-application"!==this.type){var t=this.props.onClick;t&&t(this.id)}}},{key:"render",value:function(){var n=this,i=this.state.panels,o=e({"ui-ribbon-active":this.actived,"ui-ribbon-disabled":this.enabled===!1,"ui-ribbon-invisible":this.hidden,"ui-ribbon-inline":this.hidden===!1}),r=function(t,e){var i=n.state.panels,o=i.find(function(e){return e.id===t});if(o){Object.assign(o,e);var r={panels:i},a=n.props.onStateChange;a&&a(n.id,r),n.setState(r)}},a=function(e){return t.createElement(Y,{key:e.id,id:e.id,name:e.name,displayName:e.displayName,enabled:e.enabled,hidden:e.hidden,seperator:e.seperator,items:e.items,onStateChange:r,ref:function(t){t&&n.panels.push(t)}})};return t.createElement("li",{key:this.id,id:this.id,className:this.type+" "+o,role:"ui-ribbon-tab",onClick:this.handleClick},t.createElement("span",{className:"ui-ribbon-uppercase"},this.displayName),t.createElement("div",{className:"ui-ribbon-tab-contents ui-ribbon-absolute"},i.map(a)))}},{key:"type",get:function(){return this.props.type}},{key:"enabled",get:function(){return c(Object.getPrototypeOf(i.prototype),"enabled",this)},set:function(){var t=arguments.length<=0||void 0===arguments[0]||arguments[0];if(!this.hidden){var e=t===!0,n={enabled:e,actived:!1},i=this.props.onStateChange;i&&i(this.id,n),this.panels.map(function(t){t.enabled=e}),this.setState(n)}}},{key:"hidden",get:function(){return c(Object.getPrototypeOf(i.prototype),"hidden",this)},set:function(){var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0],e=t===!0,n=!e,i={hidden:e,enabled:n,actived:!1},o=this.props.onStateChange;o&&o(this.id,i),this.panels.map(function(t){t.hidden=e}),this.setState(i)}},{key:"actived",get:function(){return this.state.actived},set:function(){var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0],e=t===!0,n={actived:e},i=this.props.onStateChange;i&&i(this.id,n),this.setState(n)}},{key:"panels",get:function(){return this[nt]}}]),i}(R);it.propTypes={id:t.PropTypes.string.isRequired,type:t.PropTypes.string.isRequired,actived:t.PropTypes.bool,panels:t.PropTypes.arrayOf(t.PropTypes.instanceOf(et)),onStateChange:t.PropTypes.func},it.defaultProps={id:i(),type:"ui-ribbon-tab-normal",actived:!1,panels:[]};var ot=Symbol("tabs"),rt=function(e){function n(t){u(this,n);var e=h(this,Object.getPrototypeOf(n).call(this,t)),i=new P,o=[i].concat(t.tabs),r=new S;return e.state={tabs:o,titlebar:r},e[ot]=[],e.handleTabClick=e.handleTabClick.bind(e),e}return d(n,e),l(n,[{key:"toggleAppTitle",value:function(){this.refs.titlebar.toggleDisplay()}},{key:"addTab",value:function(t){var e=this.tabs.findIndex(function(e){return e.id==t.id||e.name===t.name});if(!(t instanceof T)||e!==-1)return console.log("%c[Ribbon] Input tabData is invalid or duplicate.","color:red;");t.actived=1===this.tabs.length;var n=this.state.tabs.concat(t);return this.setState({tabs:n}),this.tabs[this.tabs.length-1]}},{key:"activeTabById",value:function(t){if("string"!=typeof t)return console.log("%c[Ribbon] TabId should be a string.","color:red;");var e=this.tabs.find(function(e){return e.id===t});if(!e)throw"[Ribbon] Input tab id not exists.";e.actived=!0}},{key:"handleTabClick",value:function(t){this.activeTabById(t)}},{key:"componentWillUpdate",value:function(t,e){this[ot].length=0}},{key:"render",value:function(){var e=this,n=this.state.tabs,i=function(t,n){var i=e.state.titlebar;i.id===t&&(Object.assign(i,n),e.setState({titlebar:i}))},o=function(){var n=e.state.titlebar;return t.createElement(C,{key:n.id,id:n.id,name:n.name,displayName:n.title,enabled:n.enabled,hidden:n.hidden,ref:"titlebar",onStateChange:i})},r=function(t,n){if(n.hasOwnProperty("actived"))if(n.actived===!0)e.tabs.map(function(e){e.id!==t&&(e.actived=!1)});else if(n.hasOwnProperty("enabled")&&n.enabled===!1){var i=e.tabs.find(function(e){return e.id!==t&&e.enabled===!0&&"ui-ribbon-tab-application"!==e.type});if(!i)return;i.actived=!0}},a=function(t,n){var i=e.state.tabs,o=i.find(function(e){return e.id===t});o&&(Object.assign(o,n),e.setState({tabs:i}),r(t,n))},s=function(n){return t.createElement(it,{key:n.id,id:n.id,name:n.name,displayName:n.displayName,type:n.type,enabled:n.enabled,hidden:n.hidden,actived:n.actived,panels:n.panels,onClick:e.handleTabClick,onStateChange:a,ref:function(t){t&&e.tabs.push(t)}})};return t.createElement("div",{id:"RibbonUI"},o(),t.createElement("div",{className:"ui-ribbon-window"},t.createElement("div",{id:"ui-ribbon-main",className:"ui-ribbon-main ui-ribbon-border-bottom"},t.createElement("div",{className:"ui-ribbon-tab-container ui-ribbon-border-bottom"},t.createElement("ul",{role:"ui-ribbon-tabs",className:"ui-ribbon-nowrap ui-ribbon-nopadding ui-ribbon-nomargin"},n.map(s))))))}},{key:"tabs",get:function(){return this[ot]}}]),n}(t.Component);rt.propTypes={id:t.PropTypes.string.isRequired,tabs:t.PropTypes.arrayOf(t.PropTypes.instanceOf(T))},rt.defaultProps={id:i(),tabs:[]};var at=Symbol("ribbon"),st=Symbol("options"),ut=function(){function t(e,n){if(u(this,t),!(e instanceof rt))throw"No Ribbon instance available.";this[at]=e,this[st]=n}return l(t,[{key:"execute",value:function(){return!0}},{key:"discard",value:function(){return!0}},{key:"ribbon",get:function(){return this[at]}},{key:"options",get:function(){return this[st]}}]),t}(),lt=Symbol("tasks"),ct=function(t){return t.prototype instanceof ut},dt=function(){function t(){u(this,t),this[lt]={},ct.bind(this)}return l(t,[{key:"register",value:function(t,e){return!(!ct(e)||this.getTask(t))&&(this[lt][t]=e,!0)}},{key:"unregister",value:function(t){return!!this.getTask(t)&&(delete this[lt][t],!0)}},{key:"getTask",value:function(t){return this.tasks.hasOwnProperty(t)?this.tasks[t]:null}},{key:"tasks",get:function(){return this[lt]}}]),t}(),ht=Symbol("ribbon"),bt=Symbol("tasks"),pt=Symbol("taskManager"),ft=function(){function t(e,n){if(u(this,t),!(e instanceof rt))throw"No Ribbon instance available.";if(!(n instanceof dt))throw"No RibbonTaskManager instance available.";this[ht]=e,this[pt]=n,this[bt]={}}return l(t,[{key:"execute",value:function(t,e){var n=!1;if(this.getTask(t))console.log("[RibbonTaskExecuter] Task already executed: `%s`.",t);else{var i=this.manager.getTask(t);if(i){var o=new i(this.ribbon,e);n=o.execute(),n===!0&&(this[bt][t]=o,console.log("[RibbonTaskExecuter] Task executed: `%s`.",t))}else console.log("[RibbonTaskExecuter] Task not found: `%s`.",t)}return n}},{key:"discard",value:function(t){var e=!1,n=this.getTask(t);if(n){if(e=n.discard(),!e)throw"Failed to discard chnages in task: `"+t+"`.";delete this[bt][t],console.log("[RibbonTaskExecuter] Task content discarded: `%s`.",t)}else console.log("[RibbonTaskExecuter] Task not found: `%s`.",t);return e}},{key:"getTask",value:function(t){return this.tasks.hasOwnProperty(t)?this.tasks[t]:null}},{key:"ribbon",get:function(){return this[ht]}},{key:"manager",get:function(){return this[pt]}},{key:"tasks",get:function(){return this[bt]}}]),t}(),yt=Symbol("container"),gt=Symbol("mainRibbon"),vt=Symbol("taskManager"),mt=Symbol("taskExecuter"),kt=function(){function e(){u(this,e),this[vt]=new dt,this[yt]=void 0,this[gt]=void 0,this[mt]=void 0}return l(e,[{key:"registerTask",value:function(t,e){return!!this.taskManager&&this.taskManager.register(t,e)}},{key:"unregisterTask",value:function(t){return!!this.taskManager&&this.taskManager.unregister(t)}},{key:"executeTask",value:function(t,e){return!!this.taskExecuter&&this.taskExecuter.execute(t,e)}},{key:"discardTask",value:function(t){return!!this.taskExecuter&&this.taskExecuter.discard(t)}},{key:"run",value:function(){var e=this;return new Promise(function(i,o){try{var r=e.container,a=e.taskManager;e[gt]=n.render(t.createElement(rt,null),r),e[mt]=new ft(e.mainRibbon,a),i(e)}catch(t){o(t)}})}},{key:"mainRibbon",get:function(){return this[gt]}},{key:"container",get:function(){return this[yt]},set:function(t){if(!(t instanceof HTMLElement))throw"[RibbonCtrl] Input container must be a HTML DOM element.";this[yt]=t}},{key:"taskManager",
get:function(){return this[vt]}},{key:"taskExecuter",get:function(){return this[mt]}}]),e}(),Ot={RibbonBaseData:m,RibbonTitlebarData:S,RibbonTabData:T,RibbonAppTabData:P,RibbonPanelData:et,RibbonItemData:q,RibbonButtonData:F,RibbonPushButtonData:A,RibbonToggleButtonData:W,RibbonTooltipData:N,RibbonGroupData:Q,RibbonRadioButtonGroupData:V},Tt={Ribbon:rt,RibbonBase:R,RibbonTab:it,RibbonPanel:Y,RibbonTitlebar:C,RibbonItem:x,RibbonButton:E,RibbonTooltip:j,RibbonPushButton:I,RibbonToggleButton:D,RibbonGroup:L,RibbonRadioButtonGroup:J,RibbonCtrl:kt,RibbonTask:ut,RibbonTaskManager:dt,RibbonTaskExecuter:ft,Utility:s,Data:Ot};return Tt});
//# sourceMappingURL=bundle.mim.js.map
