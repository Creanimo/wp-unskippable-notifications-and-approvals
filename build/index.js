/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./model/settings.js":
/*!***************************!*\
  !*** ./model/settings.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSettings: () => (/* binding */ useSettings)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Define settings, set their defaults and create the setter functions
 * @returns {Object} all settings for this plugin
 */
const useSettings = () => {
  const [frontendDisplay, setFrontendDisplay] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [defaultDuration, setDefaultDuration] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(60);
  return {
    frontendDisplay,
    setFrontendDisplay,
    defaultDuration,
    setDefaultDuration
  };
};

/***/ }),

/***/ "./view/settings-page.js":
/*!*******************************!*\
  !*** ./view/settings-page.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _model_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../model/settings */ "./model/settings.js");








/**
 * Save Button
 * @param {Event} onClick
 * @returns {Button}
 */
const SaveButton = ({
  onClick
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "primary",
    onClick: onClick,
    __next40pxDefaultSize: true
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save', 'unskippable-notifications'));
};

/**
 * Setting - toggle messages in frontend
 * @param {Boolean}
 * @param {Event}
 * @returns 
 */
const FrontendDisplayControl = ({
  value,
  onChange
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('show messages in frontend', 'unskippable-notifications'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Temporarily disable forced notifications on frontend site.', 'unskippable-notifications'),
    checked: value,
    onChange: onChange,
    __nextHasNoMarginBottom: true
  });
};

/**
 * Building the settings page html
 * @returns {string} html DOM of settings page
 */
const SettingsPage = () => {
  const {
    frontendDisplay,
    setFrontendDisplay,
    defaultDuration,
    setDefaultDuration
  } = (0,_model_settings__WEBPACK_IMPORTED_MODULE_5__.useSettings)();
  const onTabSelect = tabName => {
    console.log('Selecting tab', tabName);
  };
  // only one component can be reurned in react, so everything needs to be wrapped in <>...</>
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalSpacer, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Unskippable Notifications & Approvals', 'unskippable-notifications'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalSpacer, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TabPanel, {
    className: "my-tab-panel",
    activeClass: "is-active",
    onSelect: onTabSelect,
    tabs: [{
      name: 'general',
      title: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('General', 'unskippable-notifications')),
      className: 'unskippable-notifications-settings__tab--general',
      content: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.BaseControl, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.BaseControl.VisualLabel, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Frontend', 'unskippable-notifications')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(FrontendDisplayControl, {
        value: frontendDisplay,
        onChange: value => setFrontendDisplay(value)
      })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalSpacer, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalNumberControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Default Duration', 'unskippable-notifications'),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('For how many days after publication should a new notification be shown by default? Can be changed for every notification during creation.', 'unskippable-notifications'),
        value: defaultDuration,
        onChange: value => setDefaultDuration(value)
      })))
    }, {
      name: 'about',
      title: 'About',
      className: 'unskippable-notifications-settings__tab--about',
      content: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("This plugin is open source. You can join development and find other ways to support this project on", 'unskippable-notificatons'), " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        href: "https://github.com/Creanimo/wp-unskippable-notifications-and-approvals"
      }, "GitHub"))
    }]
  }, ({
    title,
    content,
    className
  }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Panel, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: className
  }, content))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalSpacer, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SaveButton, {
    onClick: () => {}
  })));
};

/**
 * Renders the html onto the settings page
 */
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(() => {
  const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createRoot)(document.getElementById('unskippable-notifications-settings'));
  root.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SettingsPage, null));
});

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_settings_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/settings-page */ "./view/settings-page.js");

})();

/******/ })()
;
//# sourceMappingURL=index.js.map