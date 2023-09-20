/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/admin/input-image-select.js
/**
 * Image Select Input Functionality.
 *
 * @package lonewolf
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
			const textInput =
				button.parentElement.querySelector( '.meta-image' )

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
				const attachment = mediaFrame
					.state()
					.get( 'selection' )
					.first()
					.toJSON()
				const domain = window.location.origin
				const relativePath = attachment.url.replace( domain, '' )
				textInput.value = relativePath
				imagePreview
					.querySelector( 'img' )
					.setAttribute( 'src', relativePath )
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
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

const dashiconsInput = () => {
	const initialiseInput = () => {
		const cssClass = '.dashiconsDropdown',
			button = document.querySelector( cssClass + ' a' ),
			radios = document.querySelectorAll( cssClass + ' input' ),
			removeBtn = document.querySelector( cssClass + ' button' ),
			toggle = ( el ) =>
				el.querySelector( 'a' ).classList.toggle( 'open' )

		if ( ! button ) return

		button.addEventListener( 'click', ( e ) =>
			toggle( e.target.closest( cssClass ) )
		)

		radios.forEach( ( radio ) => {
			radio.addEventListener( 'change', ( e ) => {
				const label = e.target
					.closest( cssClass )
					.querySelector( 'a span:first-child' )
				label.innerHTML = ''
				label.className = 'dashicons dashicons-' + e.target.value
				e.target.checked = true
				toggle( e.target.closest( cssClass ) )
				// Stop event firing for more than one radio control.
				e.stopImmediatePropagation()
			} )
		} )

		removeBtn.addEventListener( 'click', ( e ) => {
			radios.forEach( ( radio ) => ( radio.checked = false ) )
			const label = e.target
				.closest( cssClass )
				.querySelector( 'a span:first-child' )
			label.innerHTML = '--select icon--'
			label.className = ''
			toggle( e.target.closest( cssClass ) )
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
 */




inputImageSelect()
dashiconsInput()

/******/ })()
;