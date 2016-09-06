(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["InfiniteScroll"] = factory(require("react"));
	else
		root["InfiniteScroll"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _utilsDebounce = __webpack_require__(1);

	var _utilsDebounce2 = _interopRequireDefault(_utilsDebounce);

	var InfiniteScroll = (function (_Component) {
	  _inherits(InfiniteScroll, _Component);

	  function InfiniteScroll(props) {
	    _classCallCheck(this, InfiniteScroll);

	    _get(Object.getPrototypeOf(InfiniteScroll.prototype), 'constructor', this).call(this);
	    this.state = {
	      showLoader: false,
	      lastScrollTop: 0,
	      actionTriggered: false
	    };
	    this.onScrollListener = this.onScrollListener.bind(this);
	    this.debouncedOnScrollListener = (0, _utilsDebounce2['default'])(this.onScrollListener, 150).bind(this);
	  }

	  _createClass(InfiniteScroll, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.el = this.props.height ? this.refs.infScroll : window;
	      this.el.addEventListener('scroll', this.debouncedOnScrollListener);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.el.removeEventListener('scroll', this.debouncedOnScrollListener);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(props) {
	      // new data was sent in
	      this.setState({
	        showLoader: false,
	        actionTriggered: false
	      });
	    }
	  }, {
	    key: 'isElementAtBottom',
	    value: function isElementAtBottom(target) {
	      var scrollThreshold = arguments.length <= 1 || arguments[1] === undefined ? 0.8 : arguments[1];

	      var clientHeight = target === document.body || target === document.documentElement ? window.screen.availHeight : target.clientHeight;

	      var scrolled = scrollThreshold * (target.scrollHeight - target.scrollTop);
	      return scrolled < clientHeight;
	    }
	  }, {
	    key: 'onScrollListener',
	    value: function onScrollListener(event) {
	      var target = this.props.height ? event.target : document.documentElement.scrollTop ? document.documentElement : document.body;

	      // if user scrolls up, remove action trigger lock
	      if (target.scrollTop < this.state.lastScrollTop) {
	        this.setState({
	          actionTriggered: false,
	          lastScrollTop: target.scrollTop
	        });
	        return; // user's going up, we don't care
	      }

	      // return immediately if the action has already been triggered,
	      // prevents multiple triggers.
	      if (this.state.actionTriggered) return;

	      var atBottom = this.isElementAtBottom(target, this.props.scrollThreshold);

	      // call the `next` function in the props to trigger the next data fetch
	      if (atBottom && this.props.hasMore) {
	        this.props.next();
	        this.setState({ actionTriggered: true, showLoader: true });
	      }
	      this.setState({ lastScrollTop: target.scrollTop });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var style = _extends({
	        height: this.props.height || 'auto',
	        overflow: 'auto',
	        WebkitOverflowScrolling: 'touch'
	      }, this.props.style);
	      var hasChildren = this.props.hasChildren || !!(this.props.children && this.props.children.length);
	      return _react2['default'].createElement(
	        'div',
	        { className: 'infinite-scroll-component', ref: 'infScroll',
	          style: style },
	        this.props.children,
	        !this.state.showLoader && !hasChildren && this.props.hasMore && this.props.loader,
	        this.state.showLoader && this.props.loader,
	        !this.props.hasMore && _react2['default'].createElement(
	          'p',
	          { style: { textAlign: 'center' } },
	          this.props.endMessage || _react2['default'].createElement(
	            'b',
	            null,
	            'Yay! You have seen it all'
	          )
	        )
	      );
	    }
	  }]);

	  return InfiniteScroll;
	})(_react.Component);

	exports['default'] = InfiniteScroll;

	InfiniteScroll.propTypes = {
	  next: _react.PropTypes.func,
	  hasMore: _react.PropTypes.bool,
	  children: _react.PropTypes.node,
	  loader: _react.PropTypes.node.isRequired,
	  scrollThreshold: _react.PropTypes.number,
	  endMessage: _react.PropTypes.node,
	  style: _react.PropTypes.object,
	  height: _react.PropTypes.number,
	  hasChildren: _react.PropTypes.bool
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = debounce;

	function debounce(func, wait) {
	  var timeout = undefined;
	  return function () {
	    var _this = this;
	    var args = arguments;

	    var later = function later() {
	      timeout = null;
	      func.apply(_this, args);
	    };
	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;