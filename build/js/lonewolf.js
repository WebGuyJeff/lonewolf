/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/frontend/_css-animator.js":
/*!******************************************!*\
  !*** ./src/js/frontend/_css-animator.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animate: () => (/* binding */ animate)
/* harmony export */ });
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
let active;

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
  const fps = 60;
  const iterations = fps * (duration / 1000);
  const range = endValue - startValue;
  const timeIncrement = duration / iterations;
  let currentValue = 0;
  let time = 0;
  const isIncreasing = endValue >= startValue; // boolen to test for positive increment

  return new Promise(resolve => {
    const timer = setInterval(function () {
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
async function sequence() {
  if (!active) {
    active = true;
  } else {
    active = false;
    fadeOut(overlay);
  }
}

/*
 * Animation ease.
 *
 * Eases are adapted from git repo bameyrick/js-easing-functions.
 *
 */
function nextValue(ease, startValue, time, range, duration) {
  let t = time; // Time elapsed
  let s = startValue; // Initial property value before animation
  const r = range; // The difference between start and end values
  const d = duration; // Total duration of animation

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
const animate = async (element, property, ease, startValue, endValue, duration) => {
  await doAnimation(element, property, ease, startValue, endValue, duration);
};

/***/ }),

/***/ "./src/js/frontend/_dropdown-control.js":
/*!**********************************************!*\
  !*** ./src/js/frontend/_dropdown-control.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dropdownControl: () => (/* binding */ dropdownControl)
/* harmony export */ });
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
const dropdowns = document.querySelectorAll('.dropdown-hover');
const dropdownParents = [];
dropdowns.forEach(dropdown => {
  dropdownParents.push(dropdown.parentElement);
});
const menuContainers = [...new Set(dropdownParents)];

// True when mousedown on element, false after mouseup.
let mouseDown = false;
const dropdownControl = {
  /**
   * Initialise the dropdowns.
   *
   * Fired on doc ready to attach event listeners to all dropdowns in the DOM.
   */
  initDropdowns() {
    // Attach 'click' event handler to page.
    document.addEventListener('click', dropdownControl.pageClickHandler);

    // Attach 'mouseenter' and 'mouseleave' event handlers to dropdown(s).
    const hoverDropdowns = document.querySelectorAll('.dropdown-hover');
    [...hoverDropdowns].forEach(dropdown => {
      dropdownControl.registerHover(dropdown);
    });

    // Attach 'click' event handler to the menu container(s).
    menuContainers.forEach(menu => {
      menu.addEventListener('click', dropdownControl.menuClickHandler);
      menu.addEventListener('mousedown', () => {
        mouseDown = true;
      });
      menu.addEventListener('mouseup', () => {
        mouseDown = false;
      });
    });
  },
  /**
   * Call init function on document ready.
   *
   * Polls for document ready state.
   */
  initialise: () => {
    const docLoaded = setInterval(function () {
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
  isInLeftHalf(element) {
    const dims = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    return dims.left <= viewportWidth / 2;
  },
  /**
   * Check if passed elem is overflowing viewport bottom and scroll window if needed.
   *
   * @param {HTMLElement} menu - The dropdown contents (menu) element.
   */
  scrollIntoView(menu) {
    const menuStyles = menu.getBoundingClientRect();
    const bodyStyles = document.body.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    if (menuStyles.bottom > viewportHeight) {
      const scrollDistance = menuStyles.bottom - viewportHeight;
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
  pageClickHandler(event) {
    // Bail if the click is on a menu.
    let isAMenu = false;
    menuContainers.forEach(menu => {
      if (!!menu.contains(event.target) === true) {
        isAMenu = true;
      }
    });
    if (isAMenu) return;

    // Get all active top-level dropdowns.
    const activeDropdowns = [];
    document.querySelectorAll('.dropdown-hover').forEach(dropdown => {
      if (dropdown.contains(dropdown.querySelector('.dropdown_toggle-active'))) {
        activeDropdowns.push(dropdown);
      }
    });

    // Close all active top-level dropdowns.
    [...activeDropdowns].forEach(dropdown => {
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
  hoverHandler(event) {
    const button = event.target.closest('.dropdown-hover').getElementsByClassName('dropdown_toggle')[0];
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
        let hoverTarget;
        const mouseOverElem = event => {
          hoverTarget = event.target;
        };
        document.addEventListener('mouseover', mouseOverElem, false);
        setTimeout(() => {
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
  focusHandler(event) {
    // Bail if a click is being triggered to avoid duplicate calls to open().
    if (mouseDown) return;
    const button = event.target.closest('.dropdown').getElementsByClassName('dropdown_toggle')[0];
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
  registerHover(dropdown) {
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
  deregisterHover(dropdown) {
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
  menuClickHandler(event) {
    // If click is on a dropdown toggle button or dropdown primary element.
    if (!!event.target.closest('.dropdown_toggle') === true || !!event.target.closest('.dropdown_primary') === true) {
      // Find the toggle button inside the parent dropdown element.
      const button = event.target.closest('.dropdown').querySelector('.dropdown_toggle');

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
  open(button) {
    const dropdown = button.parentElement;

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
    const activeButtons = document.querySelectorAll('.dropdown_toggle-active');
    [...activeButtons].forEach(activeButton => {
      // Check this isn't an ancestor of the newly opened dropdown.
      if (!activeButton.parentElement.contains(button)) {
        // Close.
        dropdownControl.close(activeButton);
      }
    });

    // Get and close all top-level dropdowns that do not contain this dropdown.
    const activeTopLevelDropdowns = [];
    const allTopLevelDropdowns = document.querySelectorAll('.dropdown-hover:not( .fullscreenMenu .dropdown )');
    [...allTopLevelDropdowns].forEach(topLevelDropdown => {
      if (topLevelDropdown.contains(topLevelDropdown.querySelector('.dropdown_toggle-active'))) {
        activeTopLevelDropdowns.push(topLevelDropdown);
      }
    });
    [...activeTopLevelDropdowns].forEach(activeDropdown => {
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

      const inactiveAncestorDropdowns = [];
      const allBranchDropowns = [...dropdown.closest('.dropdown-hover').querySelectorAll('.dropdown')];
      // Push the top level dropdown to beginning of array.
      allBranchDropowns.unshift(dropdown.closest('.dropdown-hover'));
      // Remove the target dropdown as this will be handled by outer scope.
      allBranchDropowns.pop();
      allBranchDropowns.forEach(branchDropdown => {
        if (branchDropdown.contains(dropdown)) {
          inactiveAncestorDropdowns.push(branchDropdown);
          // Set attributes.
          const inactiveButton = branchDropdown.querySelector('.dropdown_toggle');
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
    const menu = dropdown.lastElementChild;
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
  close(button) {
    // If the button's dropdown also has active children.
    const activeBranch = button.parentElement.querySelectorAll('.dropdown_toggle-active');
    if (activeBranch.length > 1) {
      // Iterate through innermost to outer closing all open in branch.
      for (let i = activeBranch.length - 1; i >= 0; i--) {
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


/***/ }),

/***/ "./src/js/frontend/_hideheader.js":
/*!****************************************!*\
  !*** ./src/js/frontend/_hideheader.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hideHeader: () => (/* binding */ hideHeader)
/* harmony export */ });
/**
 * Lonewolf Hide-Header
 *
 * Handle header hide and reveal animation on button click and scroll events.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

const hideHeader = () => {
  let header,
    lastScrollY = 0,
    isAnimating = false,
    isThrottled = false;
  const init = () => {
    header = document.querySelector('.jsHideHeader');
    header.style.visibility = 'visible';
    window.addEventListener('scroll', hasScrolledThrottle);
  };
  const hasScrolledThrottle = () => {
    if (isThrottled) return;
    isThrottled = true;
    hasScrolled();
    const wait = setTimeout(() => {
      clearTimeout(wait);
      isThrottled = false;
    }, 100);
  };
  const hasScrolled = () => {
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > lastScrollY ? true : false;
    lastScrollY = currentScrollY;
    const isBelowFold = window.scrollY > window.innerHeight;

    // Style.
    if (isBelowFold) {
      header.classList.add('has-shadow');
      header.classList.add('is-squished');
    } else {
      header.classList.remove('has-shadow');
      header.classList.remove('is-squished');
    }

    // Animate.
    const isVisible = header.style.visibility === 'visible';
    if (!isAnimating) {
      isAnimating = true;
      if (!isBelowFold && !isVisible || !isVisible && !isScrollingDown) {
        show();
      } else if (isVisible && isBelowFold && isScrollingDown) {
        hide();
      } else {
        isAnimating = false;
      }
    }
  };
  const show = () => {
    visibilityToPromise(header, 'visible').then(() => transitionToPromise(header, 'transform', 'translate( 0, 0 )')).then(() => isAnimating = false);
  };
  const hide = () => {
    transitionToPromise(header, 'transform', 'translate( 0, -100% )').then(() => visibilityToPromise(header, 'hidden')).then(() => isAnimating = false);
  };
  const transitionToPromise = (element, property, value) => {
    return new Promise(resolve => {
      element.addEventListener('transitionend', () => resolve('transition ended!'), {
        'once': true
      });
      element.style[property] = value;
    });
  };

  // Custom listener as visibility doesn't trigger the `transitionend` listener.
  const visibilityToPromise = (element, value) => {
    return new Promise(resolve => {
      element.style.visibility = value;
      const hasChanged = setInterval(() => {
        if (element.style.visibility === value) {
          clearInterval(hasChanged);
          resolve('visibility changed!');
        }
      }, 50);
    });
  };
  const docLoaded = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(docLoaded);
      init();
    }
  }, 100);
};


/***/ }),

/***/ "./src/js/frontend/_mobile-popup-menu.js":
/*!***********************************************!*\
  !*** ./src/js/frontend/_mobile-popup-menu.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mobilePopupMenu: () => (/* binding */ mobilePopupMenu)
/* harmony export */ });
/**
 * Lonewolf Mobile Popup Menu Functionality
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

const mobilePopupMenu = () => {
  if (!document.querySelector('.thumbNav')) return;
  let timerElapsed = true;
  let thumbNavDisplayed = true;
  let prevScrollpos = window.pageYOffset;
  let currentScrollPos;
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


/***/ }),

/***/ "./src/js/frontend/_modal.js":
/*!***********************************!*\
  !*** ./src/js/frontend/_modal.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   modal: () => (/* binding */ modal)
/* harmony export */ });
/* harmony import */ var _css_animator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_css-animator */ "./src/js/frontend/_css-animator.js");
/**
 * Lonewolf Modal Javascript
 *
 * Handle modal animation and mechanics.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */


const modal = () => {
  function init() {
    document.querySelectorAll('.modal_control-open').forEach(buttonOpen => {
      buttonOpen.addEventListener('click', modalLaunch);
    });
  }
  let animating = false; // true when animation is in progress.
  let active = false; // true when modal is displayed.
  let mobile = true; // true when screen width is less than 768px (48em).

  // Plugin-wide vars.
  let overlay;
  let dialog;
  let buttonClose;

  /**
   * Open the model popup.
   *
   * @param event
   */
  async function modalLaunch(event) {
    // Get the modal elements
    const modalClass = event.currentTarget.id;
    overlay = document.querySelector('.' + modalClass);
    dialog = overlay.querySelector('.modal_dialog');
    buttonClose = overlay.querySelector('.modal_control-close');
    buttonClose.onclick = () => {
      closeModal();
    };

    // If a click event is not on dialog
    window.onclick = function (event) {
      if (dialog !== !event.target && !dialog.contains(event.target)) {
        closeModal();
      }
    };
    await Promise.all([setDeviceSize(), getScrollbarWidth()]);
    openModal();
  }
  async function setDeviceSize() {
    const pageWidth = parseInt(document.querySelector('html').getBoundingClientRect().width, 10);
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
  function setResizeListener() {
    let resizeTimer;
    const resizeListener = event => {
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
  async function openModal() {
    if (!active && !animating) {
      active = true;
      animating = true;
      disableScroll();
      setResizeListener();
      if (mobile) {
        dialog.style.left = '-768px';
        dialog.style.transform = 'scale(1)';
        dialog.style.opacity = '1';
        overlay.style.display = 'contents';
        overlay.style.opacity = '1';
        await (0,_css_animator__WEBPACK_IMPORTED_MODULE_0__.animate)(dialog, 'left', 'easeInOutCirc', -768, 0, 800);
        animating = false;
      } else {
        dialog.style.left = '0';
        dialog.style.transform = 'scale(0)';
        dialog.style.opacity = '0';
        overlay.style.display = 'flex';
        overlay.style.opacity = '0';
        fadeIn(overlay);
        await (0,_css_animator__WEBPACK_IMPORTED_MODULE_0__.animate)(dialog, 'scale', 'easeInOutCirc', 0, 1, 800);
        animating = false;
      }
    }
  }

  // Close the modal
  async function closeModal() {
    if (active && !animating) {
      active = false;
      animating = true;
      enableScroll();
      if (mobile) {
        dialog.style.left = '0';
        dialog.style.transform = 'scale(1)';
        dialog.style.opacity = '1';
        overlay.style.display = 'contents';
        overlay.style.opacity = '1';
        await (0,_css_animator__WEBPACK_IMPORTED_MODULE_0__.animate)(dialog, 'left', 'easeInOutCirc', 0, -768, 800);
        animating = false;
      } else {
        dialog.style.left = '0';
        dialog.style.transform = 'scale(1)';
        dialog.style.opacity = '1';
        overlay.style.display = 'flex';
        overlay.style.opacity = '1';
        fadeOut(overlay);
        await (0,_css_animator__WEBPACK_IMPORTED_MODULE_0__.animate)(dialog, 'scale', 'easeInOutCirc', 1, 0, 800);
        overlay.style.display = 'none';
        animating = false;
      }
    }
  }

  // Moody overlay - fadeout
  function fadeOut(overlay) {
    let p = 100; // 0.5 x 100 to escape floating point problem
    const animateFilterOut = setInterval(function () {
      if (p <= 0) {
        clearInterval(animateFilterOut);
      }
      overlay.style.opacity = p / 100;
      p -= 2; // 1 represents 0.01 in css output
    }, 16); // 10ms x 25 for 0.25sec animation
  }

  // Moody overlay - fadein
  function fadeIn(overlay) {
    let p = 4; // 0.01 x 100 to escape floating point problem
    const animateFilterIn = setInterval(function () {
      if (p >= 100) {
        // 100 (/100) represents 0.5 in css output
        clearInterval(animateFilterIn);
      }
      overlay.style.opacity = p / 100;
      p += 2; // 1 represents 0.01 in css output
    }, 16); // 10ms x 25 for 0.25sec animation
  }

  let scrollbarWidth;
  async function getScrollbarWidth() {
    // Get window width inc scrollbar
    const widthWithScrollBar = window.innerWidth;
    // Get window width exc scrollbar
    const widthWithoutScrollBar = document.querySelector('html').getBoundingClientRect().width;
    // Calc the scrollbar width
    scrollbarWidth = parseInt(widthWithScrollBar - widthWithoutScrollBar, 10) + 'px';
    return scrollbarWidth;
  }
  function disableScroll() {
    // Cover the missing scrollbar gap with a black div
    const elemExists = document.getElementById('js_psuedoScrollBar');
    if (elemExists !== null) {
      document.getElementById('js_psuedoScrollBar').style.display = 'block';
    } else {
      const psuedoScrollBar = document.createElement('div');
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
    const elemExists = document.getElementById('js_psuedoScrollBar');
    if (elemExists !== null) {
      document.getElementById('js_psuedoScrollBar').style.display = 'none';
      document.querySelector('body').style.overflow = 'visible';
      document.querySelector('html').style.paddingRight = '0';
    }
  }

  // Poll for doc ready state
  const docLoaded = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(docLoaded);
      init();
    }
  }, 100);
};


/***/ }),

/***/ "./src/js/frontend/_reveal-animation.js":
/*!**********************************************!*\
  !*** ./src/js/frontend/_reveal-animation.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   revealAnimation: () => (/* binding */ revealAnimation)
/* harmony export */ });
/**
 * Reveal Animation
 * Handles slide-in 'reveal' animations powered by GSAP.
 */

const revealAnimation = () => {
  gsap.registerPlugin(ScrollTrigger, CSSPlugin);
  const animateFrom = (el, direction) => {
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
  const hide = el => {
    gsap.set(el, {
      autoAlpha: 0
    });
  };
  document.addEventListener('DOMContentLoaded', function () {
    // Add alternating left/right classes to sibling elements of class gs_reveal.
    const odds = Array.from(document.querySelectorAll('.gs_reveal:nth-child(2n+1)'));
    const evens = Array.from(document.querySelectorAll('.gs_reveal:nth-child(2n+2)'));
    const all = [...odds, ...evens];
    if (all === 0) return;
    if (odds.length > 0) odds.forEach(el => el.classList.add('gs_reveal_fromLeft'));
    if (evens.length > 0) evens.forEach(el => el.classList.add('gs_reveal_fromRight'));
    all.forEach(el => {
      hide(el); // Element is hidden when scrolled into view.

      ScrollTrigger.create({
        trigger: el,
        onEnter: function () {
          animateFrom(el);
        },
        onEnterBack: function () {
          animateFrom(el, -1);
        },
        onLeave: function () {
          hide(el);
        } // Hide element again.
      });
    });
  });
};



/***/ }),

/***/ "./src/js/frontend/_screenclass.js":
/*!*****************************************!*\
  !*** ./src/js/frontend/_screenclass.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   screenClass: () => (/* binding */ screenClass)
/* harmony export */ });
/**
 * Lonewolf Dynamic Classes Javascript
 *
 * Applies classes to the body element to indicate screen size and orientation.
 * These can be accessed using CSS as a global alternative to media queries.
 *
 * @package lonewolf
 */

const screenClass = () => {
  let winPxWidth, winPxHeight;
  let oldOrient, newOrient;
  let oldDevice, newDevice;
  const element = document.querySelector('body');
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
    const withScrollBar = window.innerWidth;
    const noScrollBar = document.querySelector('html').getBoundingClientRect().width;
    const scrollbarWidth = parseInt(withScrollBar - noScrollBar, 10) + 'px';
    const root = document.documentElement;
    root.style.setProperty('--scrollbar', scrollbarWidth);
  }

  // Detect body resize changes and update the scrollbar width property.
  const resizeObserver = new ResizeObserver(entries => setCssCustomProperty());
  resizeObserver.observe(document.body);
  const docLoaded = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(docLoaded);
      getScreen();
    }
  }, 10);

  // Poll for resize settle to throttle updates
  let resizeTimeout;
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


/***/ }),

/***/ "./src/js/frontend/_welcome-animation.js":
/*!***********************************************!*\
  !*** ./src/js/frontend/_welcome-animation.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   welcomeAnimation: () => (/* binding */ welcomeAnimation)
/* harmony export */ });
/**
 * Lonewolf Welcome Animation Javascript
 *
 * @package lonewolf
 */

gsap.registerPlugin(ScrollTrigger);
const welcomeAnimation = () => {
  const scrollParent = '.welcome .scrollTriggerParent',
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
  const skyGradAm = 'radial-gradient( at 9% 9%, #fffb 0%, #fff0 30% ), linear-gradient( hsl(207, 53%, 60%) 0%, hsl(207, 53%, 88%) 20%, hsl(61, 75%, 60%) 55%, hsl(30, 75%, 60%) 60%, #fff 61% )',
    skyGradPm = 'radial-gradient( at 91% 9%, #fffb 0%, #fff0 30% ), linear-gradient( hsl(207, 53%, 50%) 0%, hsl(0, 76%, 88%) 25%, hsl(61, 75%, 60%) 55%, hsl(30, 76%, 50%) 70%, #fff 71% )';
  const toVw = px => px / window.innerWidth * 100 + 'vw';
  const mirrorX = selector => {
    const el = document.querySelector(selector),
      box = el.getBoundingClientRect(),
      boxWidth = box.right - box.left,
      leftOffset = 2 * box.left,
      x = document.body.clientWidth - boxWidth - leftOffset;
    return x;
  };
  const tlPunch = () => {
    const punch = gsap.timeline().addLabel('fadeIn').set(content, {
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
  const tlSunMove = () => {
    const sunMove = gsap.timeline().set(shadows, {
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
  const createScrollTriggers = () => {
    anim.punch = tlPunch();
    ScrollTrigger.create({
      trigger: scrollParent,
      start: 'top top-=100px',
      end: 'bottom top',
      onEnter: () => anim.punch.play('punch'),
      onLeave: () => anim.punch.pause('fadeIn'),
      onLeaveBack: () => anim.punch.tweenFromTo('fadeIn', 'punch') // Scroll above start.
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
  let timeout;
  const debounce = (fn, wait, args = []) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
  const updateOnResize = () => {
    Object.entries(anim).forEach(([, tl]) => tl.revert());
    createScrollTriggers();
  };
  const init = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(init);
      createScrollTriggers();
      window.onresize = () => debounce(updateOnResize, 150);
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
/*!****************************!*\
  !*** ./src/js/lonewolf.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _frontend_dropdown_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./frontend/_dropdown-control */ "./src/js/frontend/_dropdown-control.js");
/* harmony import */ var _frontend_hideheader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./frontend/_hideheader */ "./src/js/frontend/_hideheader.js");
/* harmony import */ var _frontend_mobile_popup_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./frontend/_mobile-popup-menu */ "./src/js/frontend/_mobile-popup-menu.js");
/* harmony import */ var _frontend_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./frontend/_modal */ "./src/js/frontend/_modal.js");
/* harmony import */ var _frontend_screenclass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./frontend/_screenclass */ "./src/js/frontend/_screenclass.js");
/* harmony import */ var _frontend_welcome_animation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./frontend/_welcome-animation */ "./src/js/frontend/_welcome-animation.js");
/* harmony import */ var _frontend_reveal_animation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./frontend/_reveal-animation */ "./src/js/frontend/_reveal-animation.js");
/**
 * Webpack entry point.
 */

// import { cssAnimator } from './frontend/_css-animator'








// cssAnimator()
_frontend_dropdown_control__WEBPACK_IMPORTED_MODULE_0__.dropdownControl.initialise();
(0,_frontend_hideheader__WEBPACK_IMPORTED_MODULE_1__.hideHeader)();
(0,_frontend_mobile_popup_menu__WEBPACK_IMPORTED_MODULE_2__.mobilePopupMenu)();
(0,_frontend_modal__WEBPACK_IMPORTED_MODULE_3__.modal)();
(0,_frontend_screenclass__WEBPACK_IMPORTED_MODULE_4__.screenClass)();
(0,_frontend_welcome_animation__WEBPACK_IMPORTED_MODULE_5__.welcomeAnimation)();
(0,_frontend_reveal_animation__WEBPACK_IMPORTED_MODULE_6__.revealAnimation)();
})();

/******/ })()
;
//# sourceMappingURL=lonewolf.js.map