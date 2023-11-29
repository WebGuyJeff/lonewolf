/**
 * Webpack entry point.
 */

// import { cssAnimator } from './frontend/_css-animator'
import { dropdownControl } from './frontend/_dropdown-control'
import { slideHeader } from './frontend/_slide-header'
import { mobilePopupMenu } from './frontend/_mobile-popup-menu'
import { modal } from './frontend/_modal'
import { screenClass } from './frontend/_screenclass'
import { revealAnimation } from './frontend/_reveal-animation'

// cssAnimator()
dropdownControl.initialise()
slideHeader()
mobilePopupMenu()
modal()
screenClass()
revealAnimation()
