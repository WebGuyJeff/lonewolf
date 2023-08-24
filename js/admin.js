/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/admin/input-image-select.js
/**
 * Image Select Input Functionality.
 *
 * @package
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

const inputImageSelect = () => {

	const initialiseInput = () => {
		const button = document.querySelector( '.image-upload' )
		if ( ! button ) return

		let mediaFrame

		button.addEventListener( 'click', async ( e ) => {
			e.preventDefault()

			const imagePreview =
				button.parentElement.parentElement.querySelector(
					'.image-preview'
				)
			const textInput = button.parentElement.querySelector( '.meta-image' )

			// If the frame already exists, re-open it.
			if ( mediaFrame ) {
				mediaFrame.open()
				return
			}

			// Create a new media frame.
			mediaFrame = wp.media( {
				title: 'Select media to use as the profile image',
				button: {
					text: 'Use this image',
				},
				multiple: false,
			} )

			mediaFrame.on( 'select', () => {
				// Get attachment selection and create a JSON representation of the model.
				const attachment = mediaFrame.state().get( 'selection' ).first().toJSON()
				textInput.value = attachment.url
				imagePreview.querySelector( 'img' ).setAttribute( 'src', attachment.url )
			} )

			// Opens the media library frame.
			mediaFrame.open()
		} )
	}

	const docLoaded = setInterval( () => {
		if ( document.readyState === 'complete' ) {
			clearInterval( docLoaded )
			initialiseInput()
		}
	}, 100 )
}



;// CONCATENATED MODULE: ./src/js/admin/input-dashicons.js
/**
 * Dashicons Input Functionality.
 *
 * @package
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

const dashiconsInput = () => {

	const initialiseInput = () => {
		const selector = '.dashiconsDropdown'
		const button   = document.querySelector( selector + ' a' )
		const inputs   = document.querySelectorAll( selector + ' input' )
		
		const toggle = ( el ) => {
			const a = el.querySelector( 'a' ),
			span = el.querySelector( '.arrow' )
			span.classList.toggle( 'dashicons-arrow-down' )
			span.classList.toggle( 'dashicons-arrow-up' )
			a.classList.toggle( 'open' )
		}
		
		button.addEventListener( 'click', ( e ) => {
			e.preventDefault()
			toggle( e.target.closest( selector ) )
		} )

		inputs.forEach( ( input ) => {
			addEventListener( 'change', ( e ) => {
				const buttonLabel = e.target.closest( selector ).querySelector( '.default' ),
						selection = e.target.value,
							icon = document.createElement( 'span' )
				icon.className = 'dashicons dashicons-' + selection
				toggle( e.target.closest( selector ) )
				buttonLabel.replaceChildren( icon )
			} )
		} )
	}

	const docLoaded = setInterval( () => {
		if ( document.readyState === 'complete' ) {
			clearInterval( docLoaded )
			initialiseInput()
		}
	}, 100 )
}



;// CONCATENATED MODULE: ./src/js/admin.js
/**
 * Webpack entry point.
 *
 * @link https://metabox.io/modernizing-javascript-code-in-wordpress/
 */




inputImageSelect()
dashiconsInput()

/******/ })()
;
//# sourceMappingURL=admin.js.map