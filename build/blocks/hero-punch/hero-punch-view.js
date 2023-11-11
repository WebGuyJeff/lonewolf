/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************************!*\
  !*** ./src/blocks/hero-punch/hero-punch-view.js ***!
  \**************************************************/
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/**
 * Lonewolf Welcome Animation Javascript
 *
 * @package lonewolf
 */
var heroPunchAnimation = function heroPunchAnimation() {
  gsap.registerPlugin(ScrollTrigger);
  var selector = '.heroPunch';
  var scrollParent = selector + '.scrollTriggerParent',
    content = selector + '.landing_content',
    fist = selector + 'fist_container',
    hands = selector + '.sign_pinSignTop',
    sign = selector + '.sign',
    me = selector + '.svgMe_container',
    star1 = selector + '.star-1',
    star2 = selector + '.star-2',
    shadows = selector + '.desert_shadow',
    sun = selector + '.desert_sun',
    sky = selector + '.landing_backdrop',
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
      return fn.apply(void 0, _toConsumableArray(args));
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
heroPunchAnimation();
/******/ })()
;
//# sourceMappingURL=hero-punch-view.js.map