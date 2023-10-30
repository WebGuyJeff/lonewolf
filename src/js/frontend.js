/**
 * Webpack entry point.
 */

// import { cssAnimator } from './frontend/css-animator'
import { dropdownControl } from './frontend/dropdown-control'
import { hideHeader } from './frontend/hideheader'
import { mobilePopupMenu } from './frontend/mobile-popup-menu'
import { modal } from './frontend/modal'
import { screenClass } from './frontend/screenclass'
import { welcomeAnimation } from './frontend/welcome-animation'
import { revealAnimation } from './frontend/reveal-animation'

// cssAnimator()
dropdownControl.initialise()
hideHeader()
mobilePopupMenu()
modal()
screenClass()
welcomeAnimation()
revealAnimation()
