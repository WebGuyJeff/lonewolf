/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/admin/_input-dashicons.js":
/*!******************************************!*\
  !*** ./src/js/admin/_input-dashicons.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dashiconsInput: () => (/* binding */ dashiconsInput)
/* harmony export */ });
/**
 * Dashicons Input Functionality.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

const dashiconsInput = () => {
  const initialiseInput = () => {
    const cssClass = '.dashiconsDropdown',
      button = document.querySelector(cssClass + ' a'),
      radios = document.querySelectorAll(cssClass + ' input'),
      removeBtn = document.querySelector(cssClass + ' button'),
      toggle = el => el.querySelector('a').classList.toggle('open');
    if (!button) return;
    button.addEventListener('click', e => toggle(e.target.closest(cssClass)));
    radios.forEach(radio => {
      radio.addEventListener('change', e => {
        const label = e.target.closest(cssClass).querySelector('a span:first-child');
        label.innerHTML = '';
        label.className = 'dashicons dashicons-' + e.target.value;
        e.target.checked = true;
        toggle(e.target.closest(cssClass));
        // Stop event firing for more than one radio control.
        e.stopImmediatePropagation();
      });
    });
    removeBtn.addEventListener('click', e => {
      radios.forEach(radio => radio.checked = false);
      const label = e.target.closest(cssClass).querySelector('a span:first-child');
      label.innerHTML = '--select icon--';
      label.className = '';
      toggle(e.target.closest(cssClass));
    });
  };
  const docLoaded = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(docLoaded);
      initialiseInput();
    }
  }, 100);
};


/***/ }),

/***/ "./src/js/admin/_input-image-select.js":
/*!*********************************************!*\
  !*** ./src/js/admin/_input-image-select.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   inputImageSelect: () => (/* binding */ inputImageSelect)
/* harmony export */ });
/**
 * Image Select Input Functionality.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

const inputImageSelect = () => {
  const initialiseInput = () => {
    const button = document.querySelector('.image-upload');
    if (!button) return;
    let mediaFrame;
    button.addEventListener('click', async e => {
      e.preventDefault();
      const imagePreview = button.parentElement.parentElement.querySelector('.image-preview');
      const textInput = button.parentElement.querySelector('.meta-image');

      // If the frame already exists, re-open it.
      if (mediaFrame) {
        mediaFrame.open();
        return;
      }

      // Create a new media frame.
      mediaFrame = wp.media({
        title: 'Select media to use as the profile image',
        button: {
          text: 'Use this image'
        },
        multiple: false
      });
      mediaFrame.on('select', () => {
        // Get attachment selection and create a JSON representation of the model.
        const attachment = mediaFrame.state().get('selection').first().toJSON();
        const domain = window.location.origin;
        const relativePath = attachment.url.replace(domain, '');
        textInput.value = relativePath;
        imagePreview.querySelector('img').setAttribute('src', relativePath);
      });

      // Opens the media library frame.
      mediaFrame.open();
    });
  };
  const docLoaded = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(docLoaded);
      initialiseInput();
    }
  }, 100);
};


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
/*!**********************************!*\
  !*** ./src/js/lonewolf-admin.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _admin_input_image_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin/_input-image-select */ "./src/js/admin/_input-image-select.js");
/* harmony import */ var _admin_input_dashicons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin/_input-dashicons */ "./src/js/admin/_input-dashicons.js");
/**
 * Webpack entry point.
 */



(0,_admin_input_image_select__WEBPACK_IMPORTED_MODULE_0__.inputImageSelect)();
(0,_admin_input_dashicons__WEBPACK_IMPORTED_MODULE_1__.dashiconsInput)();
})();

/******/ })()
;
//# sourceMappingURL=lonewolf-admin.js.map