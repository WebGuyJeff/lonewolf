/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/frontend/dropdown-control.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Lonewolf Dropdown Menu Javascript
 *
 * Enables all dropdown menu functionality.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

// Get the an array of unique menu elements which contain dropdowns.
var dropdowns = document.querySelectorAll('.dropdown-hover');
var dropdownParents = [];
dropdowns.forEach(function (dropdown) {
  dropdownParents.push(dropdown.parentElement);
});
var menuContainers = _toConsumableArray(new Set(dropdownParents));

// True when mousedown on element, false after mouseup.
var mouseDown = false;
var dropdownControl = {
  /**
   * Initialise the dropdowns.
   *
   * Fired on doc ready to attach event listeners to all dropdowns in the DOM.
   */
  initDropdowns: function initDropdowns() {
    // Attach 'click' event handler to page.
    document.addEventListener('click', dropdownControl.pageClickHandler);

    // Attach 'mouseenter' and 'mouseleave' event handlers to dropdown(s).
    var hoverDropdowns = document.querySelectorAll('.dropdown-hover');
    _toConsumableArray(hoverDropdowns).forEach(function (dropdown) {
      dropdownControl.registerHover(dropdown);
    });

    // Attach 'click' event handler to the menu container(s).
    menuContainers.forEach(function (menu) {
      menu.addEventListener('click', dropdownControl.menuClickHandler);
      menu.addEventListener('mousedown', function () {
        mouseDown = true;
      });
      menu.addEventListener('mouseup', function () {
        mouseDown = false;
      });
    });
  },
  /**
   * Call init function on document ready.
   *
   * Polls for document ready state.
   */
  initialise: function initialise() {
    var docLoaded = setInterval(function () {
      if (document.readyState === 'complete') {
        clearInterval(docLoaded);
        dropdownControl.initDropdowns();
      }
    }, 100);
  },
  /**
   * Check if passed elem is in left half of viewport.
   *
   * @param {HTMLElement} element - Element to check.
   */
  isInLeftHalf: function isInLeftHalf(element) {
    var dims = element.getBoundingClientRect();
    var viewportWidth = window.innerWidth;
    return dims.left <= viewportWidth / 2;
  },
  /**
   * Check if passed elem is overflowing viewport bottom and scroll window if needed.
   *
   * @param {HTMLElement} menu - The dropdown contents (menu) element.
   */
  scrollIntoView: function scrollIntoView(menu) {
    var menuStyles = menu.getBoundingClientRect();
    var bodyStyles = document.body.getBoundingClientRect();
    var viewportHeight = window.innerHeight;
    if (menuStyles.bottom > viewportHeight) {
      var scrollDistance = menuStyles.bottom - viewportHeight;
      window.scrollBy(0, scrollDistance); // x,y

      if (menuStyles.bottom > bodyStyles.bottom) {
        document.body.style.height = document.documentElement.scrollHeight + scrollDistance + 'px';
      }
    } else {
      return false;
    }
  },
  /**
   * Page Click Handler.
   *
   * A callback to be passed with event listeners.
   *
   * @param {Event} event - The event object.
   */
  pageClickHandler: function pageClickHandler(event) {
    // Bail if the click is on a menu.
    var isAMenu = false;
    menuContainers.forEach(function (menu) {
      if (!!menu.contains(event.target) === true) {
        isAMenu = true;
      }
    });
    if (isAMenu) return;

    // Get all active top-level dropdowns.
    var activeDropdowns = [];
    document.querySelectorAll('.dropdown-hover').forEach(function (dropdown) {
      if (dropdown.contains(dropdown.querySelector('.dropdown_toggle-active'))) {
        activeDropdowns.push(dropdown);
      }
    });

    // Close all active top-level dropdowns.
    [].concat(activeDropdowns).forEach(function (dropdown) {
      if (!!dropdown.closest('[data-hover-lock="true"]') === true) {
        dropdown.closest('.dropdown-hover').setAttribute('data-hover-lock', 'false');
      }
      dropdownControl.close(dropdown.querySelector('.dropdown_toggle'));
    });
  },
  /**
   * Hover Event Handler.
   *
   * A callback to be passed with event listeners.
   *
   * @param {Event} event - The event object.
   */
  hoverHandler: function hoverHandler(event) {
    var button = event.target.closest('.dropdown-hover').getElementsByClassName('dropdown_toggle')[0];
    if (event.type === 'mouseenter') {
      // Open it.
      dropdownControl.open(button);
    } else if (event.type === 'mouseleave') {
      // In case a mousedown event is dragged off the element, this resets the var to false.
      mouseDown = false;

      // If this menu branch isn't hover-locked.
      if (!!button.closest('[data-hover-lock="true"]') === false && button.classList.contains('dropdown_toggle-active')) {
        /**
         * Chrome Bug Patch:
         *
         * When the dropdown menu class is updated on click -> open(), the dropdown
         * appears to be removed from the viewport for a split second causing a
         * mouseleave event to fire. This means, when you click on a sub-dropdown menu
         * after hovering over the parent, it closes the menu.
         *
         * More weirdly, this only happens if the browser itself doesn't have OS window
         * focus before performing the hover > click. If you click anywhere on the
         * browser UI, including on the viewport area, this bug will not occur. Super
         * edge-case bug!
         *
         * Tested in KDE Debian, and only occurs in Chrome. Firefox/Opera tested OK.
         *
         * To patch this issue, a timeout delay is added to the mouseleave event, so
         * that before the close() is fired, a sanity check can be performed to ensure
         * the mouse is still not over the dropdown. If the mouse is still hovering the
         * dropdown, the close() is not fired and this bug is avoided.
         */
        var hoverTarget;
        var mouseOverElem = function mouseOverElem(event) {
          hoverTarget = event.target;
        };
        document.addEventListener('mouseover', mouseOverElem, false);
        setTimeout(function () {
          if (!button.parentElement.contains(hoverTarget)) {
            dropdownControl.close(button);
          }
          document.removeEventListener('mouseover', mouseOverElem, false);
        }, 10);
        // Bug Patch End.
      }
    }
  },
  /**
   * Focus Event Handler.
   *
   * A callback to be passed with event listeners.
   *
   * @param {Event} event - The event object.
   */
  focusHandler: function focusHandler(event) {
    // Bail if a click is being triggered to avoid duplicate calls to open().
    if (mouseDown) return;
    var button = event.target.closest('.dropdown').getElementsByClassName('dropdown_toggle')[0];
    if (event.type === 'focusin') {
      // Open it.
      dropdownControl.open(button);
    } else if (event.type === 'focusout') {
      // If this menu branch isn't hover-locked.
      if (!!button.closest('[data-hover-lock="true"]') === false && button.classList.contains('dropdown_toggle-active')) {
        // If focus has moved outside the dropdown branch, close the whole thing.
        if (!!event.target.closest('.dropdown-hover').contains(event.relatedTarget) === false) {
          // Close dropdown branch.
          dropdownControl.close(event.target.closest('.dropdown-hover').querySelector('.dropdown_toggle'));
        } else {
          // Close dropdown.
          dropdownControl.close(button);
        }
      }
    }
  },
  /**
   * Register hover and focus event listeners.
   *
   * Attach hover and focus listeners to a dropdown element. This can be used to register new
   * dropdowns by external scripts. In the Toecaps theme, this function is used by
   * menu-more.js to register the auto-generated 'more' dropdown.
   *
   * @param {HTMLElement} dropdown - The dropdown element to attach event listeners to.
   */
  registerHover: function registerHover(dropdown) {
    // Only attach hover listeners to non-mobile menu.
    if (!!dropdown.closest('.fullscreenMenu') === false) {
      dropdown.addEventListener('mouseenter', dropdownControl.hoverHandler);
      dropdown.addEventListener('mouseleave', dropdownControl.hoverHandler);
      dropdown.setAttribute('data-hover-listener', 'true');
    }
    // Attach focus listeners to all menus.
    dropdown.addEventListener('focusin', dropdownControl.focusHandler);
    dropdown.addEventListener('focusout', dropdownControl.focusHandler);
  },
  /**
   * Deregister hover event listeners.
   *
   * Useful for when the hover functionality is no longer desireable. This is also used by
   * more.js to disable hover functionality when items are moved into the 'more' dropdown.
   *
   * @param {HTMLElement} dropdown The dropdown element to deregister hover listeners from.
   */
  deregisterHover: function deregisterHover(dropdown) {
    dropdown.removeEventListener('mouseenter', dropdownControl.hoverHandler);
    dropdown.removeEventListener('mouseleave', dropdownControl.hoverHandler);
    dropdown.setAttribute('data-hover-listener', 'false');
  },
  /**
   * Menu Click Event Handler.
   *
   * Menu branches are locked open as soon as they are clicked anywhere inside. This means
   * they won't close when the user accidentally hovers-off the menu, but they will close as
   * soon as a click is detected outside of the menu branch.
   *
   * @param {Event} event The click event.
   */
  menuClickHandler: function menuClickHandler(event) {
    // If click is on a dropdown toggle button or dropdown primary element.
    if (!!event.target.closest('.dropdown_toggle') === true || !!event.target.closest('.dropdown_primary') === true) {
      // Find the toggle button inside the parent dropdown element.
      var button = event.target.closest('.dropdown').querySelector('.dropdown_toggle');

      // If active and unlocked.
      if (button.classList.contains('dropdown_toggle-active') && !!button.closest('[data-hover-lock="true"]') === false) {
        // Lock it.
        button.closest('.dropdown-hover').setAttribute('data-hover-lock', 'true');

        // If active and locked.
      } else if (button.classList.contains('dropdown_toggle-active') && !!button.closest('[data-hover-lock="true"]') === true) {
        // If it's the top level dropdown, unlock it.
        if (button.parentElement.classList.contains('dropdown-hover')) {
          button.closest('.dropdown-hover').setAttribute('data-hover-lock', 'false');
        }
        // Close it.
        dropdownControl.close(button);

        // Else, is not active.
      } else {
        // Lock it.
        button.closest('.dropdown-hover').setAttribute('data-hover-lock', 'true');

        // Open it.
        dropdownControl.open(button);
      }

      // Click is NOT on a dropdown button, but IS in an UNLOCKED dropdown branch.
    } else if (!!event.target.closest('[data-hover-lock="true"]') === false && !!event.target.closest('.dropdown-hover') === true) {
      // Lock this menu branch.
      event.target.closest('.dropdown-hover').setAttribute('data-hover-lock', 'true');
    }
  },
  /**
   * Open the menu.
   *
   * Takes a dropdown button element and opens the menu branch. It should not need to be aware
   * of the caller or trigger, only requiring the passing of the button toggle element.
   *
   * It performs these tasks:
   *  - Closes other open branches in the same dropdown.
   *  - Close other top level dropdowns no longer in focus.
   *  - Open inactive ancestor dropdowns when a child is focused directly by reverse tabbing.
   *
   * @param {HTMLElement} button The dropdown button toggle element.
   */
  open: function open(button) {
    var dropdown = button.parentElement;

    // Set dropdown swing direction on smaller screens.
    if (dropdown.classList.contains('dropdown-hover')) {
      if (dropdownControl.isInLeftHalf(dropdown)) {
        dropdown.classList.add('dropdown-swingRight');
        dropdown.classList.remove('dropdown-swingLeft');
      } else {
        dropdown.classList.add('dropdown-swingLeft');
        dropdown.classList.remove('dropdown-swingRight');
      }
    }

    // Close other open branches in the ancestor dropdown.
    var activeButtons = document.querySelectorAll('.dropdown_toggle-active');
    _toConsumableArray(activeButtons).forEach(function (activeButton) {
      // Check this isn't an ancestor of the newly opened dropdown.
      if (!activeButton.parentElement.contains(button)) {
        // Close.
        dropdownControl.close(activeButton);
      }
    });

    // Get and close all top-level dropdowns that do not contain this dropdown.
    var activeTopLevelDropdowns = [];
    var allTopLevelDropdowns = document.querySelectorAll('.dropdown-hover:not( .fullscreenMenu .dropdown )');
    _toConsumableArray(allTopLevelDropdowns).forEach(function (topLevelDropdown) {
      if (topLevelDropdown.contains(topLevelDropdown.querySelector('.dropdown_toggle-active'))) {
        activeTopLevelDropdowns.push(topLevelDropdown);
      }
    });
    [].concat(activeTopLevelDropdowns).forEach(function (activeDropdown) {
      // If dropdown isn't the target, but is active, close it.
      if (!activeDropdown.contains(dropdown)) {
        // Remove lock and close.
        activeDropdown.setAttribute('data-hover-lock', 'false');
        dropdownControl.close(activeDropdown.querySelector('.dropdown_toggle'));
      }
    });

    // Open the ancestors when reverse-tabbing focuses on a last-child dropdown item first.
    if (!!button.parentElement.classList.contains('dropdown-hover') === false && !!button.classList.contains('dropdown_toggle-active') === false) {
      // This is a child dropdown with no active ancestor.

      var inactiveAncestorDropdowns = [];
      var allBranchDropowns = _toConsumableArray(dropdown.closest('.dropdown-hover').querySelectorAll('.dropdown'));
      // Push the top level dropdown to beginning of array.
      allBranchDropowns.unshift(dropdown.closest('.dropdown-hover'));
      // Remove the target dropdown as this will be handled by outer scope.
      allBranchDropowns.pop();
      allBranchDropowns.forEach(function (branchDropdown) {
        if (branchDropdown.contains(dropdown)) {
          inactiveAncestorDropdowns.push(branchDropdown);
          // Set attributes.
          var inactiveButton = branchDropdown.querySelector('.dropdown_toggle');
          inactiveButton.classList.add('dropdown_toggle-active');
          inactiveButton.setAttribute('aria-expanded', true);
          inactiveButton.setAttribute('aria-pressed', true);
        }
      });
    }

    // Set attributes.
    button.classList.add('dropdown_toggle-active');
    button.setAttribute('aria-expanded', true);
    button.setAttribute('aria-pressed', true);

    // Now browser has calculcated layout, adjust y-scroll if required,
    var menu = dropdown.lastElementChild;
    dropdownControl.scrollIntoView(menu);
  },
  /**
   * Close the menu.
   *
   * Takes a dropdown button element and closes the menu branch. It should not need to be
   * aware of the caller or trigger, only requiring the passing of the button toggle element.
   *
   * @param {HTMLElement} button The dropdown button toggle element.
   */
  close: function close(button) {
    // If the button's dropdown also has active children.
    var activeBranch = button.parentElement.querySelectorAll('.dropdown_toggle-active');
    if (activeBranch.length > 1) {
      // Iterate through innermost to outer closing all open in branch.
      for (var i = activeBranch.length - 1; i >= 0; i--) {
        activeBranch[i].classList.remove('dropdown_toggle-active');
        activeBranch[i].setAttribute('aria-expanded', false);
        activeBranch[i].setAttribute('aria-pressed', false);
      }
    } else {
      button.classList.remove('dropdown_toggle-active');
      button.setAttribute('aria-expanded', false);
      button.setAttribute('aria-pressed', false);
    }
  }
};

;// CONCATENATED MODULE: ./src/js/frontend/hideheader.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * Lonewolf Hide-Header
 *
 * Handle header hide and reveal animation on button click and scroll events.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

var hideHeader = function hideHeader() {
  var body,
    header,
    button,
    isAnimating = false;
  var init = function init() {
    body = document.querySelector('body');
    header = document.querySelector('.jsHideHeader');
    button = document.querySelector('.menuToggle');
    isAnimating = false;
    if (button === null) return;
    button.addEventListener('click', toggleState);
  };
  var toggleState = function toggleState() {
    if (!isAnimating) {
      isAnimating = true;
      body.classList.contains('menu_active') ? hide() : show();
    }
  };
  var show = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            header.setAttribute('hidden', false);
            body.classList.add('menu_active');
            _context.next = 4;
            return transitionToPromise(header, 'transform', 'translate( 0, 0 )');
          case 4:
            window.addEventListener('scroll', hide, {
              once: true
            });
            isAnimating = false;
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function show() {
      return _ref.apply(this, arguments);
    };
  }();
  var hide = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            header.setAttribute('hidden', true);
            body.classList.remove('menu_active');
            _context2.next = 4;
            return transitionToPromise(header, 'transform', 'translate( 0, -100% )');
          case 4:
            isAnimating = false;
          case 5:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function hide() {
      return _ref2.apply(this, arguments);
    };
  }();
  var transitionToPromise = function transitionToPromise(element, property, value) {
    new Promise(function (resolve) {
      try {
        element.style[property] = value;
        var transitionEnded = function transitionEnded(event) {
          if (event.target !== element) return;
          header.removeEventListener('transitionend', transitionEnded);
          resolve('Transition complete.');
        };
        header.addEventListener('transitionend', transitionEnded);
      } catch (error) {
        console.error(error.name + ': ' + error.message);
        reject(error);
      }
    });
  };
  var docLoaded = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(docLoaded);
      init();
    }
  }, 100);
};

;// CONCATENATED MODULE: ./src/js/frontend/mobile-popup-menu.js
/**
 * Lonewolf Mobile Popup Menu Functionality
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

var mobilePopupMenu = function mobilePopupMenu() {
  if (!document.querySelector('.thumbNav')) return;
  var timerElapsed = true;
  var thumbNavDisplayed = true;
  var prevScrollpos = window.pageYOffset;
  var currentScrollPos;
  window.onscroll = function () {
    currentScrollPos = window.pageYOffset;
    if (timerElapsed) {
      timerElapsed = false;
      setTimeout(function () {
        if (prevScrollpos > currentScrollPos && thumbNavDisplayed === false) {
          document.querySelector('.thumbNav-jshide').style.transform = 'translateY(0rem)';
          thumbNavDisplayed = true;
        } else if (prevScrollpos < currentScrollPos && thumbNavDisplayed === true) {
          document.querySelector('.thumbNav-jshide').style.transform = 'translateY(5rem)';
          document.querySelector('.thumbNav_checkbox').checked = false;
          thumbNavDisplayed = false;
        }
        prevScrollpos = currentScrollPos;
        timerElapsed = true;
      }, 500);
    }
  };
};

;// CONCATENATED MODULE: ./src/js/frontend/css-animator.js
function css_animator_typeof(o) { "@babel/helpers - typeof"; return css_animator_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, css_animator_typeof(o); }
function css_animator_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ css_animator_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == css_animator_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(css_animator_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function css_animator_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function css_animator_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { css_animator_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { css_animator_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * CSS Animation Module.
 *
 * Animate CSS properties using preset eases.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

/**
 * True when modal is displayed.
 */
var active;

/**
 * Iterate through the IN animation passed by sequence()
 * @param element
 * @param property
 * @param ease
 * @param startValue
 * @param endValue
 * @param duration
 */
function doAnimation(element, property, ease, startValue, endValue, duration) {
  var fps = 60;
  var iterations = fps * (duration / 1000);
  var range = endValue - startValue;
  var timeIncrement = duration / iterations;
  var currentValue = 0;
  var time = 0;
  var isIncreasing = endValue >= startValue; // boolen to test for positive increment

  return new Promise(function (resolve) {
    var timer = setInterval(function () {
      time += timeIncrement;
      currentValue = nextValue(ease, startValue, time, range, duration).toFixed(2);
      if (isIncreasing && currentValue >= endValue || !isIncreasing && currentValue <= endValue) {
        clearInterval(timer);
        set(element, property, endValue);
        return resolve(property + ' done');
      }
      set(element, property, currentValue);
    }, 1000 / fps);
  });
}

/**
 * Future expansion: Call the animations in sequence.
 *
 * Handle passed arrays to perform multiple animations.
 */
function sequence() {
  return _sequence.apply(this, arguments);
}
/*
 * Animation ease.
 *
 * Eases are adapted from git repo bameyrick/js-easing-functions.
 *
 */
function _sequence() {
  _sequence = css_animator_asyncToGenerator( /*#__PURE__*/css_animator_regeneratorRuntime().mark(function _callee2() {
    return css_animator_regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!active) {
            active = true;
          } else {
            active = false;
            fadeOut(overlay);
          }
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _sequence.apply(this, arguments);
}
function nextValue(ease, startValue, time, range, duration) {
  var t = time; // Time elapsed
  var s = startValue; // Initial property value before animation
  var r = range; // The difference between start and end values
  var d = duration; // Total duration of animation

  // The following eases are from git repo bameyrick/js-easing-functions
  switch (ease) {
    case 'linear':
      return r * (t / d) + s;
    case 'easeInQuad':
      return r * (t /= d) * t + s;
    case 'easeOutQuad':
      return -r * (t /= d) * (t - 2) + s;
    case 'easeInOutQuad':
      if ((t /= d / 2) < 1) {
        return r / 2 * t * t + s;
      }
      return -r / 2 * (--t * (t - 2) - 1) + s;
    case 'easeInCubic':
      return r * (t /= d) * t * t + s;
    case 'easeOutCubic':
      return r * ((t = t / d - 1) * t * t + 1) + s;
    case 'easeInOutCubic':
      if ((t /= d / 2) < 1) {
        return r / 2 * t * t * t + s;
      }
      return r / 2 * ((t -= 2) * t * t + 2) + s;
    case 'easeInQuart':
      return r * (t /= d) * t * t * t + s;
    case 'easeOutQuart':
      return -r * ((t = t / d - 1) * t * t * t - 1) + s;
    case 'easeInOutQuart':
      if ((t /= d / 2) < 1) {
        return r / 2 * t * t * t * t + s;
      }
      return -r / 2 * ((t -= 2) * t * t * t - 2) + s;
    case 'easeInQuint':
      return r * (t /= d) * t * t * t * t + s;
    case 'easeOutQuint':
      return r * ((t = t / d - 1) * t * t * t * t + 1) + s;
    case 'easeInOutQuint':
      if ((t /= d / 2) < 1) {
        return r / 2 * t * t * t * t * t + s;
      }
      return r / 2 * ((t -= 2) * t * t * t * t + 2) + s;
    case 'easeInSine':
      return -r * Math.cos(t / d * (Math.PI / 2)) + r + s;
    case 'easeOutSine':
      return r * Math.sin(t / d * (Math.PI / 2)) + s;
    case 'easeInOutSine':
      return -r / 2 * (Math.cos(Math.PI * t / d) - 1) + s;
    case 'easeInExpo':
      return t === 0 ? s : r * Math.pow(2, 10 * (t / d - 1)) + s;
    case 'easeOutExpo':
      return t === d ? s + r : r * (-Math.pow(2, -10 * t / d) + 1) + s;
    case 'easeInOutExpo':
      if (t === 0) {
        return s;
      }
      if (t === d) {
        return s + r;
      }
      if ((t /= d / 2) < 1) {
        return r / 2 * Math.pow(2, 10 * (t - 1)) + s;
      }
      return r / 2 * (-Math.pow(2, -10 * --t) + 2) + s;
    case 'easeInCirc':
      return -r * (Math.sqrt(1 - (t /= d) * t) - 1) + s;
    case 'easeOutCirc':
      return r * Math.sqrt(1 - (t = t / d - 1) * t) + s;
    case 'easeInOutCirc':
      if ((t /= d / 2) < 1) {
        return -r / 2 * (Math.sqrt(1 - t * t) - 1) + s;
      }
      return r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + s;
    case 'easeInBack':
      s = 1.70158;
      return r * (t /= d) * t * ((s + 1) * t - s) + s;
    case 'easeOutBack':
      s = 1.70158;
      return r * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + s;
    case 'easeInOutBack':
      s = 1.70158;
      if ((t /= d / 2) < 1) {
        return r / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + s;
      }
      return r / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + s;

    /* fixable*/
    case 'easeInBounce':
      return r - easeOutBounce(d - t, 0, r, d) + s;
    case 'easeOutBounce':
      if ((t /= d) < 1 / 2.75) {
        return r * (7.5625 * t * t) + s;
      } else if (t < 2 / 2.75) {
        return r * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + s;
      } else if (t < 2.5 / 2.75) {
        return r * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + s;
      }
      return r * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + s;

    /* fixable*/
    case 'easeInOutBounce':
      if (t < d / 2) {
        return easeInBounce(t * 2, 0, r, d) * 0.5 + s;
      }
      return easeOutBounce(t * 2 - d, 0, r, d) * 0.5 + r * 0.5 + s;
  }
}

/*
 * Update the CSS property passed by animate()
 */
function set(element, property, value) {
  switch (property) {
    case 'scale':
      element.style.transform = 'scale(' + value + ')';
      element.style.opacity = value;
      return;
    case 'left':
      element.style.left = value + 'px';
  }
}
var animate = /*#__PURE__*/function () {
  var _ref = css_animator_asyncToGenerator( /*#__PURE__*/css_animator_regeneratorRuntime().mark(function _callee(element, property, ease, startValue, endValue, duration) {
    return css_animator_regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return doAnimation(element, property, ease, startValue, endValue, duration);
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function animate(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();
;// CONCATENATED MODULE: ./src/js/frontend/modal.js
function modal_typeof(o) { "@babel/helpers - typeof"; return modal_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, modal_typeof(o); }
function modal_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ modal_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == modal_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(modal_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function modal_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function modal_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { modal_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { modal_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * Lonewolf Modal Javascript
 *
 * Handle modal animation and mechanics.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */


var modal = function modal() {
  function init() {
    document.querySelectorAll('.modal_control-open').forEach(function (buttonOpen) {
      buttonOpen.addEventListener('click', modalLaunch);
    });
  }
  var animating = false; // true when animation is in progress.
  var active = false; // true when modal is displayed.
  var mobile = true; // true when screen width is less than 768px (48em).

  // Plugin-wide vars.
  var overlay;
  var dialog;
  var buttonClose;

  /**
   * Open the model popup.
   *
   * @param event
   */
  function modalLaunch(_x) {
    return _modalLaunch.apply(this, arguments);
  }
  function _modalLaunch() {
    _modalLaunch = modal_asyncToGenerator( /*#__PURE__*/modal_regeneratorRuntime().mark(function _callee(event) {
      var modalClass;
      return modal_regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            // Get the modal elements
            modalClass = event.currentTarget.id;
            overlay = document.querySelector('.' + modalClass);
            dialog = overlay.querySelector('.modal_dialog');
            buttonClose = overlay.querySelector('.modal_control-close');
            buttonClose.onclick = function () {
              closeModal();
            };

            // If a click event is not on dialog
            window.onclick = function (event) {
              if (dialog !== !event.target && !dialog.contains(event.target)) {
                closeModal();
              }
            };
            _context.next = 8;
            return Promise.all([setDeviceSize(), getScrollbarWidth()]);
          case 8:
            openModal();
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _modalLaunch.apply(this, arguments);
  }
  function setDeviceSize() {
    return _setDeviceSize.apply(this, arguments);
  }
  /**
   * Restyle the modal on window resize.
   *
   * This prepares the modal by switching between different device
   * layouts as required. Without this check, there is an inconsistancy in
   * transitions if for example, the modal is launched as 'desktop' then
   * closed as 'mobile'.
   *
   */
  function _setDeviceSize() {
    _setDeviceSize = modal_asyncToGenerator( /*#__PURE__*/modal_regeneratorRuntime().mark(function _callee2() {
      var pageWidth;
      return modal_regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            pageWidth = parseInt(document.querySelector('html').getBoundingClientRect().width, 10);
            if (pageWidth <= 768) {
              mobile = true;
            } else {
              mobile = false;
            }
            if (mobile && active && !animating) {
              dialog.style.left = '0';
              dialog.style.transform = 'scale(1)';
              dialog.style.opacity = '1';
              overlay.style.display = 'contents';
              overlay.style.opacity = '1';
            } else if (mobile && !active && !animating) {
              dialog.style.left = '-768px';
              dialog.style.transform = 'scale(1)';
              dialog.style.opacity = '1';
              overlay.style.display = 'contents';
              overlay.style.opacity = '1';
            } else if (!mobile && active && !animating) {
              dialog.style.left = '0';
              dialog.style.transform = 'scale(1)';
              dialog.style.opacity = '1';
              overlay.style.display = 'flex';
              overlay.style.opacity = '1';
            } else if (!mobile && !active && !animating) {
              dialog.style.left = '0';
              dialog.style.transform = 'scale(0)';
              dialog.style.opacity = '0';
              overlay.style.display = 'none';
              overlay.style.opacity = '0';
            }
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return _setDeviceSize.apply(this, arguments);
  }
  function setResizeListener() {
    var resizeTimer;
    var resizeListener = function resizeListener(event) {
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        if (!active) {
          window.removeEventListener('resize', resizeListener);
          return;
        }
        setDeviceSize();
      }, 20);
    };
    window.addEventListener('resize', resizeListener);
  }

  // Open the modal
  function openModal() {
    return _openModal.apply(this, arguments);
  } // Close the modal
  function _openModal() {
    _openModal = modal_asyncToGenerator( /*#__PURE__*/modal_regeneratorRuntime().mark(function _callee3() {
      return modal_regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (!(!active && !animating)) {
              _context3.next = 25;
              break;
            }
            active = true;
            animating = true;
            disableScroll();
            setResizeListener();
            if (!mobile) {
              _context3.next = 16;
              break;
            }
            dialog.style.left = '-768px';
            dialog.style.transform = 'scale(1)';
            dialog.style.opacity = '1';
            overlay.style.display = 'contents';
            overlay.style.opacity = '1';
            _context3.next = 13;
            return animate(dialog, 'left', 'easeInOutCirc', -768, 0, 800);
          case 13:
            animating = false;
            _context3.next = 25;
            break;
          case 16:
            dialog.style.left = '0';
            dialog.style.transform = 'scale(0)';
            dialog.style.opacity = '0';
            overlay.style.display = 'flex';
            overlay.style.opacity = '0';
            fadeIn(overlay);
            _context3.next = 24;
            return animate(dialog, 'scale', 'easeInOutCirc', 0, 1, 800);
          case 24:
            animating = false;
          case 25:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return _openModal.apply(this, arguments);
  }
  function closeModal() {
    return _closeModal.apply(this, arguments);
  } // Moody overlay - fadeout
  function _closeModal() {
    _closeModal = modal_asyncToGenerator( /*#__PURE__*/modal_regeneratorRuntime().mark(function _callee4() {
      return modal_regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            if (!(active && !animating)) {
              _context4.next = 25;
              break;
            }
            active = false;
            animating = true;
            enableScroll();
            if (!mobile) {
              _context4.next = 15;
              break;
            }
            dialog.style.left = '0';
            dialog.style.transform = 'scale(1)';
            dialog.style.opacity = '1';
            overlay.style.display = 'contents';
            overlay.style.opacity = '1';
            _context4.next = 12;
            return animate(dialog, 'left', 'easeInOutCirc', 0, -768, 800);
          case 12:
            animating = false;
            _context4.next = 25;
            break;
          case 15:
            dialog.style.left = '0';
            dialog.style.transform = 'scale(1)';
            dialog.style.opacity = '1';
            overlay.style.display = 'flex';
            overlay.style.opacity = '1';
            fadeOut(overlay);
            _context4.next = 23;
            return animate(dialog, 'scale', 'easeInOutCirc', 1, 0, 800);
          case 23:
            overlay.style.display = 'none';
            animating = false;
          case 25:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return _closeModal.apply(this, arguments);
  }
  function fadeOut(overlay) {
    var p = 100; // 0.5 x 100 to escape floating point problem
    var animateFilterOut = setInterval(function () {
      if (p <= 0) {
        clearInterval(animateFilterOut);
      }
      overlay.style.opacity = p / 100;
      p -= 2; // 1 represents 0.01 in css output
    }, 16); // 10ms x 25 for 0.25sec animation
  }

  // Moody overlay - fadein
  function fadeIn(overlay) {
    var p = 4; // 0.01 x 100 to escape floating point problem
    var animateFilterIn = setInterval(function () {
      if (p >= 100) {
        // 100 (/100) represents 0.5 in css output
        clearInterval(animateFilterIn);
      }
      overlay.style.opacity = p / 100;
      p += 2; // 1 represents 0.01 in css output
    }, 16); // 10ms x 25 for 0.25sec animation
  }

  var scrollbarWidth;
  function getScrollbarWidth() {
    return _getScrollbarWidth.apply(this, arguments);
  }
  function _getScrollbarWidth() {
    _getScrollbarWidth = modal_asyncToGenerator( /*#__PURE__*/modal_regeneratorRuntime().mark(function _callee5() {
      var widthWithScrollBar, widthWithoutScrollBar;
      return modal_regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            // Get window width inc scrollbar
            widthWithScrollBar = window.innerWidth; // Get window width exc scrollbar
            widthWithoutScrollBar = document.querySelector('html').getBoundingClientRect().width; // Calc the scrollbar width
            scrollbarWidth = parseInt(widthWithScrollBar - widthWithoutScrollBar, 10) + 'px';
            return _context5.abrupt("return", scrollbarWidth);
          case 4:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return _getScrollbarWidth.apply(this, arguments);
  }
  function disableScroll() {
    // Cover the missing scrollbar gap with a black div
    var elemExists = document.getElementById('js_psuedoScrollBar');
    if (elemExists !== null) {
      document.getElementById('js_psuedoScrollBar').style.display = 'block';
    } else {
      var psuedoScrollBar = document.createElement('div');
      psuedoScrollBar.setAttribute('id', 'js_psuedoScrollBar');
      psuedoScrollBar.style.position = 'fixed';
      psuedoScrollBar.style.right = '0';
      psuedoScrollBar.style.top = '0';
      psuedoScrollBar.style.width = scrollbarWidth;
      psuedoScrollBar.style.height = '100vh';
      psuedoScrollBar.style.background = '#333';
      psuedoScrollBar.style.zIndex = '9';
      document.body.appendChild(psuedoScrollBar);
    }
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('html').style.paddingRight = scrollbarWidth;
  }
  function enableScroll() {
    var elemExists = document.getElementById('js_psuedoScrollBar');
    if (elemExists !== null) {
      document.getElementById('js_psuedoScrollBar').style.display = 'none';
      document.querySelector('body').style.overflow = 'visible';
      document.querySelector('html').style.paddingRight = '0';
    }
  }

  // Poll for doc ready state
  var docLoaded = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(docLoaded);
      init();
    }
  }, 100);
};

;// CONCATENATED MODULE: ./src/js/frontend/screenclass.js
/**
 * Lonewolf Dynamic Classes Javascript
 *
 * Applies classes to the body element to indicate screen size and orientation.
 * These can be accessed using CSS as a global alternative to media queries.
 *
 * @package lonewolf
 */

var screenClass = function screenClass() {
  var winPxWidth, winPxHeight;
  var oldOrient, newOrient;
  var oldDevice, newDevice;
  var element = document.querySelector('body');
  function getScreen() {
    // Get the browser dims
    winPxWidth = window.innerWidth;
    winPxHeight = window.innerHeight;

    // Compare width and height, then update orientation var
    if (winPxWidth >= winPxHeight) {
      newOrient = 'landscape';
    } else {
      newOrient = 'portrait';
    }

    // If new orientation is different to old, update the classes
    if (newOrient !== oldOrient) {
      element.classList.remove(oldOrient);
      element.classList.add(newOrient);
      oldOrient = newOrient;
    }

    // Check screen width and update device var
    if (winPxWidth <= '768') {
      newDevice = 'mobile';
    } else if (winPxWidth <= '1120') {
      newDevice = 'tablet';
    } else if (winPxWidth <= '1440') {
      newDevice = 'laptop';
    } else if (winPxWidth <= '1920') {
      newDevice = 'desktop';
    } else {
      newDevice = 'xl';
    }

    // If new device is different to old, update the classes
    if (newDevice !== oldDevice) {
      element.classList.remove(oldDevice);
      element.classList.add(newDevice);
      oldDevice = newDevice;
    }
  }

  // Set a CSS custom property with the window scrollbar width.
  function setCssCustomProperty() {
    var withScrollBar = window.innerWidth;
    var noScrollBar = document.querySelector('html').getBoundingClientRect().width;
    var scrollbarWidth = parseInt(withScrollBar - noScrollBar, 10) + 'px';
    var root = document.documentElement;
    root.style.setProperty('--scrollbar', scrollbarWidth);
  }

  // Detect body resize changes and update the scrollbar width property.
  var resizeObserver = new ResizeObserver(function (entries) {
    return setCssCustomProperty();
  });
  resizeObserver.observe(document.body);
  var docLoaded = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(docLoaded);
      getScreen();
    }
  }, 10);

  // Poll for resize settle to throttle updates
  var resizeTimeout;
  window.onresize = function () {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(function () {
      getScreen();
      setCssCustomProperty();
    }, 10);
  };
};

;// CONCATENATED MODULE: ./src/js/frontend/welcome-animation.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || welcome_animation_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function welcome_animation_toConsumableArray(arr) { return welcome_animation_arrayWithoutHoles(arr) || welcome_animation_iterableToArray(arr) || welcome_animation_unsupportedIterableToArray(arr) || welcome_animation_nonIterableSpread(); }
function welcome_animation_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function welcome_animation_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return welcome_animation_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return welcome_animation_arrayLikeToArray(o, minLen); }
function welcome_animation_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function welcome_animation_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return welcome_animation_arrayLikeToArray(arr); }
function welcome_animation_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Lonewolf Welcome Animation Javascript
 *
 * @package lonewolf
 */

gsap.registerPlugin(ScrollTrigger);
var welcomeAnimation = function welcomeAnimation() {
  var scrollParent = '.welcome .scrollTriggerParent',
    content = '.welcome .landing_content',
    fist = '.welcome .fist_container',
    hands = '.welcome .sign_pinSignTop',
    sign = '.welcome .sign',
    me = '.welcome .svgMe_container',
    star1 = '.welcome .star-1',
    star2 = '.welcome .star-2',
    shadows = '.welcome .desert_shadow',
    sun = '.welcome .desert_sun',
    sky = '.welcome .landing_backdrop',
    anim = [];
  if (!document.querySelector(shadows)) return;
  var skyGradAm = 'radial-gradient( at 9% 9%, #fffb 0%, #fff0 30% ), linear-gradient( hsl(207, 53%, 60%) 0%, hsl(207, 53%, 88%) 20%, hsl(61, 75%, 60%) 55%, hsl(30, 75%, 60%) 60%, #fff 61% )',
    skyGradPm = 'radial-gradient( at 91% 9%, #fffb 0%, #fff0 30% ), linear-gradient( hsl(207, 53%, 50%) 0%, hsl(0, 76%, 88%) 25%, hsl(61, 75%, 60%) 55%, hsl(30, 76%, 50%) 70%, #fff 71% )';
  var toVw = function toVw(px) {
    return px / window.innerWidth * 100 + 'vw';
  };
  var mirrorX = function mirrorX(selector) {
    var el = document.querySelector(selector),
      box = el.getBoundingClientRect(),
      boxWidth = box.right - box.left,
      leftOffset = 2 * box.left,
      x = document.body.clientWidth - boxWidth - leftOffset;
    return x;
  };
  var tlPunch = function tlPunch() {
    var punch = gsap.timeline().addLabel('fadeIn').set(content, {
      y: '-100vh',
      opacity: 0
    }).to(content, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power4.out'
    }, '>').addLabel('punch').set(fist, {
      visibility: 'visible'
    }).to(fist, {
      top: 0,
      duration: 0.3,
      ease: 'elastic.out(1,0.8)'
    }).to(fist, {
      top: '110vh',
      duration: 1.8,
      ease: 'power3.out'
    }).set(fist, {
      visibility: 'hidden'
    })
    // Fly up.
    .set(hands, {
      visibility: 'hidden'
    }, '<-2.02').set(sign, {
      position: 'absolute',
      margin: 0
    }, '<').to(sign, {
      xPercent: -13,
      yPercent: -20,
      scale: 0.1,
      duration: 1.5,
      ease: 'power3.out'
    }, '<').to(sign, {
      rotateX: 1080,
      rotateY: 720,
      rotateZ: 360,
      duration: 1.5,
      ease: 'none'
    }, '<').to(me, {
      xPercent: 10,
      yPercent: -40,
      scale: 0.1,
      duration: 1.5,
      ease: 'power3.out'
    }, '<').to(me, {
      rotateZ: 1440,
      duration: 1.5,
      ease: 'none'
    }, '<')
    // Fall down.
    .to(sign, {
      xPercent: -15,
      yPercent: 10,
      duration: 1,
      ease: 'power2.in'
    }, '>-0.6').to(sign, {
      rotateX: 1080,
      rotateY: 720,
      scale: 0.001,
      rotateZ: 360,
      duration: 1,
      ease: 'none'
    }, '<').to(me, {
      xPercent: 10,
      yPercent: -20,
      duration: 1,
      ease: 'power2.in'
    }, '<').to(me, {
      rotateZ: 1800,
      scale: 0.001,
      duration: 1,
      ease: 'none'
    }, '<')
    // Twinkle.
    .set([star1, star2], {
      scale: 0,
      visibility: 'visible'
    }).to([star1, star2], {
      scale: 1000,
      rotate: 180,
      duration: 0.2,
      ease: 'none'
    }, '>').to([star1, star2], {
      scale: 0,
      rotate: 360,
      duration: 0.2,
      ease: 'none'
    }, '>').set([star1, star2], {
      visibility: 'hidden',
      rotate: 0
    })
    // Hide.
    .set(content, {
      visibility: 'hidden'
    });
    punch.pause('punch');
    return punch;
  };
  var tlSunMove = function tlSunMove() {
    var sunMove = gsap.timeline().set(shadows, {
      transformOrigin: 'top center',
      skewX: 55,
      scaleY: 0.4
    }).to(sun, {
      keyframes: {
        x: [0, toVw(mirrorX(sun) / 2), toVw(mirrorX(sun))],
        easeEach: 'none'
      }
    }).to(sun, {
      keyframes: {
        '0%': {
          marginTop: '3vw'
        },
        '50%': {
          marginTop: '-3vw',
          ease: 'power2.out'
        },
        '100%': {
          marginTop: '3vw',
          ease: 'power2.in'
        }
      }
    }, '<').to(shadows, {
      keyframes: {
        skewX: [55, 0, -55],
        scaleY: [0.4, 0.2, 0.4],
        easeEach: 'none'
      }
    }, '<').fromTo(sky, {
      background: skyGradAm
    }, {
      ease: 'linear',
      background: skyGradPm
    }, '<');
    return sunMove;
  };
  var createScrollTriggers = function createScrollTriggers() {
    anim.punch = tlPunch();
    ScrollTrigger.create({
      trigger: scrollParent,
      start: 'top top-=100px',
      end: 'bottom top',
      onEnter: function onEnter() {
        return anim.punch.play('punch');
      },
      onLeave: function onLeave() {
        return anim.punch.pause('fadeIn');
      },
      onLeaveBack: function onLeaveBack() {
        return anim.punch.tweenFromTo('fadeIn', 'punch');
      } // Scroll above start.
    });

    anim.sunMove = tlSunMove();
    ScrollTrigger.create({
      trigger: scrollParent,
      start: 'top top-=500px',
      end: 'bottom bottom+=500px',
      scrub: 1,
      animation: anim.sunMove
    });
  };
  var timeout;
  var debounce = function debounce(fn, wait) {
    var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return fn.apply(void 0, welcome_animation_toConsumableArray(args));
    }, wait);
  };
  var updateOnResize = function updateOnResize() {
    Object.entries(anim).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        tl = _ref2[1];
      return tl.revert();
    });
    createScrollTriggers();
  };
  var init = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(init);
      createScrollTriggers();
      window.onresize = function () {
        return debounce(updateOnResize, 150);
      };
    }
  }, 100);
};

;// CONCATENATED MODULE: ./src/js/frontend/reveal-animation.js
/**
 * Reveal Animation
 * Handles slide-in 'reveal' animations powered by GSAP.
 */

var revealAnimation = function revealAnimation() {
  gsap.registerPlugin(ScrollTrigger, CSSPlugin);
  var animateFrom = function animateFrom(el, direction) {
    direction = direction || 1;
    var x = 0,
      y = direction * 100;
    if (el.classList.contains('gs_reveal_fromLeft')) {
      x = -200;
      y = 0;
    } else if (el.classList.contains('gs_reveal_fromRight')) {
      x = 200;
      y = 0;
    }
    el.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    el.style.opacity = '0';
    gsap.fromTo(el, {
      x: x,
      y: y,
      autoAlpha: 0
    }, {
      duration: 1.25,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: 'expo',
      overwrite: 'auto'
    });
  };
  var hide = function hide(el) {
    gsap.set(el, {
      autoAlpha: 0
    });
  };
  document.addEventListener('DOMContentLoaded', function () {
    // Add alternating left/right classes to sibling elements of class gs_reveal.
    var odds = Array.from(document.querySelectorAll('.gs_reveal:nth-child(2n+1)'));
    var evens = Array.from(document.querySelectorAll('.gs_reveal:nth-child(2n+2)'));
    var all = [].concat(odds, evens);
    if (all === 0) return;
    if (odds.length > 0) odds.forEach(function (el) {
      return el.classList.add('gs_reveal_fromLeft');
    });
    if (evens.length > 0) evens.forEach(function (el) {
      return el.classList.add('gs_reveal_fromRight');
    });
    all.forEach(function (el) {
      hide(el); // Element is hidden when scrolled into view.

      ScrollTrigger.create({
        trigger: el,
        onEnter: function onEnter() {
          animateFrom(el);
        },
        onEnterBack: function onEnterBack() {
          animateFrom(el, -1);
        },
        onLeave: function onLeave() {
          hide(el);
        } // Hide element again.
      });
    });
  });
};


;// CONCATENATED MODULE: ./src/js/frontend.js
/**
 * Webpack entry point.
 */

// import { cssAnimator } from './frontend/css-animator'








// cssAnimator()
dropdownControl.initialise();
hideHeader();
mobilePopupMenu();
modal();
screenClass();
welcomeAnimation();
revealAnimation();
/******/ })()
;