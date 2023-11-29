/**
 * Lonewolf Slide-Header
 *
 * Handle header slide animation on button click and scroll events.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

const slideHeader = () => {

	let header,
		lastScrollY = 0,
		isAnimating = false,
		isThrottled = false

	const init = () => {
		const target = document.querySelector( '.jsSlideHeader' )
		if ( ! target ) {
			return
		} else {
			header = target.closest( 'header' )
		}
		header.style.visibility = 'visible'
		window.addEventListener( 'scroll', hasScrolledThrottle )
	}

	const hasScrolledThrottle = () => { 
		if ( isThrottled ) return
		isThrottled = true
		hasScrolled()
		const wait = setTimeout( () => {
			clearTimeout( wait )
			isThrottled = false
		}, 100 )
	}

	const hasScrolled = () => {
		const currentScrollY = window.scrollY
		const isScrollingDown = ( currentScrollY > lastScrollY ) ? true : false
		lastScrollY = currentScrollY
		const isBelowFold = window.scrollY > window.innerHeight

		// Style.
		if ( isBelowFold ) {
			header.classList.add( 'has-shadow' )
			header.classList.add( 'is-squished' )
		} else {
			header.classList.remove( 'has-shadow' )
			header.classList.remove( 'is-squished' )
		}

		// Animate.
		const isVisible = ( header.style.visibility === 'visible' )
		if ( ! isAnimating ) {
			isAnimating = true
			if ( ! isBelowFold && ! isVisible || ! isVisible && ! isScrollingDown ) {
				show()
			} else if ( isVisible && isBelowFold && isScrollingDown ) {
				hide()
			} else {
				isAnimating = false
			}
		}
	}

	/**
	 * Header must transform to 'none' and not 'translate( 0, 0 )' otherwise inner fixed position
	 * modals will not be able to break out of the header element. Issue discovered with the WP
	 * nav modal getting locked into the header. Note: behaviour is per W3 spec, not a bug.
	 */
	const show = () => {
		visibilityToPromise( header, 'visible' )
			.then( () => transitionToPromise( header, 'transform', 'none' ) )
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

export { slideHeader }
