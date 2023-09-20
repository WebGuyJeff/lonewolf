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

	let body,
		header,
		button,
		isAnimating = false

	const init = () => {
		body = document.querySelector( 'body' )
		header = document.querySelector( '.jsHideHeader' )
		button = document.querySelector( '.menuToggle' )
		isAnimating = false
		if ( button === null ) return
		button.addEventListener( 'click', toggleState )
	}

	const toggleState = () => {
		if ( ! isAnimating ) {
			isAnimating = true
			body.classList.contains( 'menu_active' ) ? hide() : show()
		}
	}

	const show = async () => {
		header.setAttribute( 'hidden', false )
		body.classList.add( 'menu_active' )
		await transitionToPromise( header, 'transform', 'translate( 0, 0 )' )
		window.addEventListener( 'scroll', hide, { once: true } )
		isAnimating = false
	}

	const hide = async () => {
		header.setAttribute( 'hidden', true )
		body.classList.remove( 'menu_active' )
		await transitionToPromise(
			header,
			'transform',
			'translate( 0, -100% )'
		)
		isAnimating = false
	}

	const transitionToPromise = ( element, property, value ) => {
		new Promise( ( resolve ) => {
			try {
				element.style[ property ] = value
				const transitionEnded = ( event ) => {
					if ( event.target !== element ) return
					header.removeEventListener(
						'transitionend',
						transitionEnded
					)
					resolve( 'Transition complete.' )
				}
				header.addEventListener( 'transitionend', transitionEnded )
			} catch ( error ) {
				console.error( error.name + ': ' + error.message )
				reject( error )
			}
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
