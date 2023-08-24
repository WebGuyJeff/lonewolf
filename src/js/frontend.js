/**
 * Webpack entry point.
 *
 * @link https://metabox.io/modernizing-javascript-code-in-wordpress/
 */

import { dropdownControl } from './frontend/dropdown-control'
import { hideHeader } from './frontend/hideheader'
import { mobilePopupMenu } from './frontend/mobile-popup-menu'
import { modal } from './frontend/modal'
import { screenClass } from './frontend/screenclass'

dropdownControl.initialise()
hideHeader()
mobilePopupMenu()
modal()
screenClass()
