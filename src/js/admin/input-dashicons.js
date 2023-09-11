/**
 * Dashicons Input Functionality.
 *
 * @package
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

const dashiconsInput = () => {

	const initialiseInput = () => {

		const cssClass  = '.dashiconsDropdown',
		button    = document.querySelector( cssClass + ' a' ),
		radios    = document.querySelectorAll( cssClass + ' input' ),
		removeBtn = document.querySelector( cssClass + ' button' ),
		toggle    = ( el ) => el.querySelector( 'a' ).classList.toggle( 'open' )

		if ( ! button ) return
  
		button.addEventListener( 'click', ( e ) => toggle( e.target.closest( cssClass ) ) )

		radios.forEach( ( radio ) => {
			radio.addEventListener( 'change', ( e ) => {
				const label = e.target.closest( cssClass ).querySelector( 'a span:first-child' )
				label.innerHTML = ''
				label.className = 'dashicons dashicons-' + e.target.value
				e.target.checked = true
				toggle( e.target.closest( cssClass ) )
				// Stop event firing for more than one radio control.
				e.stopImmediatePropagation()
			} )
		} )
		
		removeBtn.addEventListener( 'click', ( e ) => {
			radios.forEach( ( radio ) => radio.checked = false )
			const label = e.target.closest( cssClass ).querySelector( 'a span:first-child' )
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

export { dashiconsInput }
