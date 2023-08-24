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

export { dashiconsInput }
