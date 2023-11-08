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

	const selector = '.jsHideHeader'

	let header,
		isAnimating = false

	const init = () => {
		header = document.querySelector( selector )
		window.addEventListener( 'scroll', toggleState )
	}

	const toggleState = () => {
		const belowFold = window.scrollY > window.innerHeight
		const isVisible = ( header.style.visibility === 'visible' )
		if ( belowFold && isVisible ) return
		if ( ! belowFold && ! isVisible ) return
		if ( ! isAnimating ) {
			isAnimating = true
			if ( belowFold && ! isVisible ) show()
			if ( ! belowFold && isVisible ) hide()
		}
	}

	const show = () => {
		visibilityToPromise( header, 'visible' )
			.then( () => transitionToPromise( header, 'transform', 'translate( 0, 0 )' ) )
			.then( () => isAnimating = false )
	}

	const hide = () => {
		transitionToPromise( header, 'transform', 'translate( 0, -100% )' )
			.then( () => visibilityToPromise( header, 'hidden' ) )
			.then( () => isAnimating = false )
	}

	const transitionToPromise = ( element, property, value ) => {
		return new Promise( ( resolve ) => {
			element.addEventListener( 'transitionend', () => resolve( 'transition ended!' ), { 'once': true } )
			element.style[ property ] = value
		} )
	}

	// Custom listener as visibility doesn't trigger the `transitionend` listener.
	const visibilityToPromise = ( element, value ) => {
		return new Promise( ( resolve ) => {
			element.style.visibility = value
			const hasChanged = setInterval( () => {
				if ( element.style.visibility === value ) {
					clearInterval( hasChanged )
					resolve( 'visibility changed!' )
				}
			}, 50 )
		} )
	}

	const docLoaded = setInterval( () => {
		if ( document.readyState === 'complete' ) {
			clearInterval( docLoaded )
			init()
		}
	}, 100 )
}

export { hideHeader }
