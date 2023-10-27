/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log( 'Hello World! (from hero-punch block)' )
/* eslint-enable no-console */

/**
 * Lonewolf Welcome Animation Javascript
 *
 * @package lonewolf
 */
gsap.registerPlugin( ScrollTrigger )

const heroDesertAnimation = () => {
	const scrollParent = '.heroDesert .scrollTriggerParent',
		content = '.heroDesert .landing_content',
		fist = '.heroDesert .fist_container',
		hands = '.heroDesert .sign_pinSignTop',
		sign = '.heroDesert .sign',
		me = '.heroDesert .svgMe_container',
		star1 = '.heroDesert .star-1',
		star2 = '.heroDesert .star-2',
		shadows = '.heroDesert .desert_shadow',
		sun = '.heroDesert .desert_sun',
		sky = '.heroDesert .landing_backdrop',
		anim = []

	if ( ! document.querySelector( shadows ) ) return

	const skyGradAm =
			'radial-gradient( at 9% 9%, #fffb 0%, #fff0 30% ), linear-gradient( hsl(207, 53%, 60%) 0%, hsl(207, 53%, 88%) 20%, hsl(61, 75%, 60%) 55%, hsl(30, 75%, 60%) 60%, #fff 61% )',
		skyGradPm =
			'radial-gradient( at 91% 9%, #fffb 0%, #fff0 30% ), linear-gradient( hsl(207, 53%, 50%) 0%, hsl(0, 76%, 88%) 25%, hsl(61, 75%, 60%) 55%, hsl(30, 76%, 50%) 70%, #fff 71% )'

	const toVw = ( px ) => ( px / window.innerWidth ) * 100 + 'vw'

	const mirrorX = ( selector ) => {
		const el = document.querySelector( selector ),
			box = el.getBoundingClientRect(),
			boxWidth = box.right - box.left,
			leftOffset = 2 * box.left,
			x = document.body.clientWidth - boxWidth - leftOffset
		return x
	}

	const tlPunch = () => {
		const punch = gsap
			.timeline()
			.addLabel( 'fadeIn' )
			.set( content, { y: '-100vh', opacity: 0 } )
			.to(
				content,
				{ y: 0, opacity: 1, duration: 1, ease: 'power4.out' },
				'>'
			)
			.addLabel( 'punch' )
			.set( fist, { visibility: 'visible' } )
			.to( fist, { top: 0, duration: 0.3, ease: 'elastic.out(1,0.8)' } )
			.to( fist, { top: '110vh', duration: 1.8, ease: 'power3.out' } )
			.set( fist, { visibility: 'hidden' } )
			// Fly up.
			.set( hands, { visibility: 'hidden' }, '<-2.02' )
			.set( sign, { position: 'absolute', margin: 0 }, '<' )
			.to(
				sign,
				{
					xPercent: -13,
					yPercent: -20,
					scale: 0.1,
					duration: 1.5,
					ease: 'power3.out',
				},
				'<'
			)
			.to(
				sign,
				{
					rotateX: 1080,
					rotateY: 720,
					rotateZ: 360,
					duration: 1.5,
					ease: 'none',
				},
				'<'
			)
			.to(
				me,
				{
					xPercent: 10,
					yPercent: -40,
					scale: 0.1,
					duration: 1.5,
					ease: 'power3.out',
				},
				'<'
			)
			.to( me, { rotateZ: 1440, duration: 1.5, ease: 'none' }, '<' )
			// Fall down.
			.to(
				sign,
				{ xPercent: -15, yPercent: 10, duration: 1, ease: 'power2.in' },
				'>-0.6'
			)
			.to(
				sign,
				{
					rotateX: 1080,
					rotateY: 720,
					scale: 0.001,
					rotateZ: 360,
					duration: 1,
					ease: 'none',
				},
				'<'
			)
			.to(
				me,
				{ xPercent: 10, yPercent: -20, duration: 1, ease: 'power2.in' },
				'<'
			)
			.to(
				me,
				{ rotateZ: 1800, scale: 0.001, duration: 1, ease: 'none' },
				'<'
			)
			// Twinkle.
			.set( [ star1, star2 ], { scale: 0, visibility: 'visible' } )
			.to(
				[ star1, star2 ],
				{ scale: 1000, rotate: 180, duration: 0.2, ease: 'none' },
				'>'
			)
			.to(
				[ star1, star2 ],
				{ scale: 0, rotate: 360, duration: 0.2, ease: 'none' },
				'>'
			)
			.set( [ star1, star2 ], { visibility: 'hidden', rotate: 0 } )
			// Hide.
			.set( content, { visibility: 'hidden' } )
		punch.pause( 'punch' )
		return punch
	}

	const tlSunMove = () => {
		const sunMove = gsap
			.timeline()
			.set( shadows, {
				transformOrigin: 'top center',
				skewX: 55,
				scaleY: 0.4,
			} )
			.to( sun, {
				keyframes: {
					x: [
						0,
						toVw( mirrorX( sun ) / 2 ),
						toVw( mirrorX( sun ) ),
					],
					easeEach: 'none',
				},
			} )
			.to(
				sun,
				{
					keyframes: {
						'0%': { marginTop: '3vw' },
						'50%': { marginTop: '-3vw', ease: 'power2.out' },
						'100%': { marginTop: '3vw', ease: 'power2.in' },
					},
				},
				'<'
			)
			.to(
				shadows,
				{
					keyframes: {
						skewX: [ 55, 0, -55 ],
						scaleY: [ 0.4, 0.2, 0.4 ],
						easeEach: 'none',
					},
				},
				'<'
			)
			.fromTo(
				sky,
				{ background: skyGradAm },
				{ ease: 'linear', background: skyGradPm },
				'<'
			)
		return sunMove
	}

	const createScrollTriggers = () => {
		anim.punch = tlPunch()
		ScrollTrigger.create( {
			trigger: scrollParent,
			start: 'top top-=100px',
			end: 'bottom top',
			onEnter: () => anim.punch.play( 'punch' ),
			onLeave: () => anim.punch.pause( 'fadeIn' ),
			onLeaveBack: () => anim.punch.tweenFromTo( 'fadeIn', 'punch' ), // Scroll above start.
		} )
		anim.sunMove = tlSunMove()
		ScrollTrigger.create( {
			trigger: scrollParent,
			start: 'top top-=500px',
			end: 'bottom bottom+=500px',
			scrub: 1,
			animation: anim.sunMove,
		} )
	}

	let timeout
	const debounce = ( fn, wait, args = [] ) => {
		clearTimeout( timeout )
		timeout = setTimeout( () => fn( ...args ), wait )
	}

	const updateOnResize = () => {
		Object.entries( anim ).forEach( ( [ , tl ] ) => tl.revert() )
		createScrollTriggers()
	}

	const init = setInterval( () => {
		if ( document.readyState === 'complete' ) {
			clearInterval( init )
			createScrollTriggers()
			window.onresize = () => debounce( updateOnResize, 150 )
		}
	}, 100 )
}

export { heroDesertAnimation }
