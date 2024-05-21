/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./controller/fetch-notifications.js":
/*!*******************************************!*\
  !*** ./controller/fetch-notifications.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchNotifications: () => (/* binding */ fetchNotifications)
/* harmony export */ });
async function fetchNotifications() {
  try {
    const response = await fetch('/wp-json/unskippable-notif/v1/notifications/', {
      headers: {
        'X-WP-Nonce': notificationData.nonce
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}

/***/ }),

/***/ "./view/frontend_notification-list.js":
/*!********************************************!*\
  !*** ./view/frontend_notification-list.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildNotificationList: () => (/* binding */ buildNotificationList)
/* harmony export */ });
/* harmony import */ var _notification_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notification-element */ "./view/notification-element.js");
/* harmony import */ var _controller_fetch_notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/fetch-notifications */ "./controller/fetch-notifications.js");


function buildNotificationList(listID) {
  listID = document.getElementById(listID);
  (0,_controller_fetch_notifications__WEBPACK_IMPORTED_MODULE_1__.fetchNotifications)().then(data => {
    data.forEach(function (notification) {
      var notificationElement = (0,_notification_element__WEBPACK_IMPORTED_MODULE_0__.createNotificationElement)(notification);
      listID.appendChild(notificationElement.cloneNode(true));
    });
  });
}
;

/***/ }),

/***/ "./view/notification-element.js":
/*!**************************************!*\
  !*** ./view/notification-element.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNotificationElement: () => (/* binding */ createNotificationElement)
/* harmony export */ });
function createNotificationElement(notification) {
  let containerDiv = document.createElement('div');
  containerDiv.classList.add('unskippable-notif__notification');
  let title = document.createElement('h3');
  title.classList.add('unskippable-notif_notification__title');
  title.textContent = notification.title;
  let content = document.createElement('div');
  content.classList.add('unskippable-notif_notification__content');
  content.innerHTML = notification.content;
  containerDiv.appendChild(title);
  containerDiv.appendChild(content);
  return containerDiv;
}

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
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_frontend_notification_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/frontend_notification-list */ "./view/frontend_notification-list.js");

})();

/******/ })()
;
//# sourceMappingURL=frontend.js.map