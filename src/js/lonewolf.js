/**
 * Webpack entry point.
 */

// import { cssAnimator } from './frontend/_css-animator'
import { dropdownControl } from './frontend/_dropdown-control'
import { hideHeader } from './frontend/_hideheader'
import { mobilePopupMenu } from './frontend/_mobile-popup-menu'
import { modal } from './frontend/_modal'
import { screenClass } from './frontend/_screenclass'
import { welcomeAnimation } from './frontend/_welcome-animation'
import { revealAnimation } from './frontend/_reveal-animation'

// cssAnimator()
dropdownControl.initialise()
hideHeader()
mobilePopupMenu()
modal()
screenClass()
welcomeAnimation()
revealAnimation()
