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


function buildNotificationList(listElement, buttonCase = 'none') {
  (0,_controller_fetch_notifications__WEBPACK_IMPORTED_MODULE_1__.fetchNotifications)().then(data => {
    listElement.innerHTML = '';
    data.forEach(function (notification) {
      let notificationElement = (0,_notification_element__WEBPACK_IMPORTED_MODULE_0__.createNotificationElement)(notification, buttonCase);
      listElement.appendChild(notificationElement.cloneNode(true));
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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

function createNotificationElement(notification, buttonCase = 'none') {
  let containerDiv = document.createElement('div');
  containerDiv.classList.add('unskippable-notif__notification');
  let title = document.createElement('h3');
  title.classList.add('unskippable-notif_notification__title');
  title.textContent = notification.title;
  let content = document.createElement('div');
  content.classList.add('unskippable-notif_notification__content');
  content.innerHTML = notification.content;

  // Append title and content to the container
  containerDiv.appendChild(title);
  containerDiv.appendChild(content);

  // Check if buttonCase is not 'none'
  if (buttonCase !== 'none') {
    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('unskippable-notif__actions');
    switch (buttonCase) {
      case 'none':
        // No buttons to render
        break;
      case 'mark-as-read':
        let markAsReadButton = document.createElement('button');
        markAsReadButton.textContent = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Mark as Read', 'unskippable-notifications');
        markAsReadButton.classList.add('unskippable-notif__mark-as-read');
        // TODO: Add event listener for markAsReadButton
        buttonsContainer.appendChild(markAsReadButton);
        break;
      case 'approval':
        let acceptButton = document.createElement('button');
        acceptButton.textContent = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Accept', 'unskippable-notifications');
        acceptButton.classList.add('unskippable-notif__accept');
        // TODO: Add event listener for acceptButton

        let declineButton = document.createElement('button');
        declineButton.textContent = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Decline', 'unskippable-notifications');
        declineButton.classList.add('unskippable-notif__decline');
        // TODO: Add event listener for declineButton

        buttonsContainer.appendChild(acceptButton);
        buttonsContainer.appendChild(declineButton);
        break;
    }
    containerDiv.appendChild(buttonsContainer);
  }
  return containerDiv;
}

/***/ }),

/***/ "./view/stack_notification-list.js":
/*!*****************************************!*\
  !*** ./view/stack_notification-list.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _frontend_notification_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./frontend_notification-list */ "./view/frontend_notification-list.js");

document.addEventListener('DOMContentLoaded', async () => {
  // Create the hidden container for notifications
  let hiddenNotificationStack = document.createElement('div');
  hiddenNotificationStack.id = 'unskippable-notif__hidden-stack';
  hiddenNotificationStack.style.display = 'none';
  (0,_frontend_notification_list__WEBPACK_IMPORTED_MODULE_0__.buildNotificationList)(hiddenNotificationStack, 'mark-as-read');
  document.body.appendChild(hiddenNotificationStack);
});

// Function to create and show the modal with the top notification
function showModalWithNotification() {
  let hiddenStack = document.getElementById('unskippable-notif__hidden-stack');
  let modal = document.createElement('div');
  modal.id = 'unskippable-notif__alert-modal';
  let modalContent = document.createElement('div');
  modalContent.id = 'unskippable-notif__alert-modal__content';

  // Get the top notification from the stack
  let topNotification = hiddenStack.firstChild;
  if (topNotification) {
    // Show the notification in the modal
    modalContent.innerHTML = '';
    modalContent.appendChild(topNotification.cloneNode(true));
    modal.style.display = 'block';

    // Event listener for the "Mark as Read" button
    markAsReadButton.onclick = function () {
      // Remove the notification from the stack and the modal
      hiddenStack.removeChild(topNotification);
      modalContent.innerHTML = '';

      // Check if there are more notifications
      if (hiddenStack.firstChild) {
        showModalWithNotification(); // Show the next notification
      } else {
        modal.style.display = 'none'; // Hide the modal if no notifications are left
      }
    };
  } else {
    // No notifications to show
    modal.style.display = 'none';
  }
}

// Call this function when you want to start showing notifications
showModalWithNotification();

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
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_stack_notification_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/stack_notification-list */ "./view/stack_notification-list.js");

})();

/******/ })()
;
//# sourceMappingURL=frontend.js.map