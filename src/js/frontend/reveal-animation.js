/**
 * Reveal Animation
 * Handles slide-in 'reveal' animations powered by GSAP.
 */


const revealAnimation = () => {

	gsap.registerPlugin( ScrollTrigger, CSSPlugin )

	const animateFrom = ( el, direction ) => {
		direction = direction || 1
		var x = 0,
			y = direction * 100
		if( el.classList.contains( 'gs_reveal_fromLeft' ) ) {
			x = -200
			y = 0
		} else if ( el.classList.contains( 'gs_reveal_fromRight' ) ) {
			x = 200
			y = 0
		}
		el.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
		el.style.opacity = '0'
		gsap.fromTo( el, { x: x, y: y, autoAlpha: 0 }, {
			duration: 1.25,
			x: 0,
			y: 0,
			autoAlpha: 1,
			ease: 'expo',
			overwrite: 'auto'
		} )
	}

	const hide = ( el ) => {
		gsap.set( el, { autoAlpha: 0 } )
	}

	document.addEventListener( 'DOMContentLoaded', function() {

		// Add alternating left/right classes to sibling elements of class gs_reveal.
		const odds  = Array.from( document.querySelectorAll( '.gs_reveal:nth-child(2n+1)' ) )
		const evens = Array.from( document.querySelectorAll( '.gs_reveal:nth-child(2n+2)' ) )
		const all   = [ ...odds, ...evens ]

		if ( all === 0 ) return

		if ( odds.length > 0 ) odds.forEach( el => el.classList.add( 'gs_reveal_fromLeft' ) )
		if ( evens.length > 0 ) evens.forEach( el => el.classList.add( 'gs_reveal_fromRight' ) )
		all.forEach( el => {
			hide( el ) // Element is hidden when scrolled into view.

			ScrollTrigger.create( {
				trigger: el,
				onEnter: function() { animateFrom( el ) },
				onEnterBack: function() { animateFrom( el, -1 ) },
				onLeave: function() { hide( el ) } // Hide element again.
			} )
		} )
	} )
}

export { revealAnimation }
