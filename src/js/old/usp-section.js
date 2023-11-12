/**
 * OLD BUNDLE!!! USP Javascript
 */


const uspSectionOld = () => {

	const toggles = document.querySelectorAll( '.usp_state' )
	const labels  = document.querySelectorAll( '.usp_graphicWrap' )

	const initToggles = () => {
		[ ...labels ].forEach( label => {
			label.addEventListener( 'click', function() {

				for( let i = 0; i < toggles.length; i++ ){
					toggles[ i ].checked = false
				}
		
				toggles[ 0 ].parentElement.scrollIntoView()
			} )
		} )
	}

	let docLoaded = setInterval( () => {
		if ( document.readyState === 'complete' ) {
			clearInterval( docLoaded )
			initToggles()
		}
	}, 100 )

}

export { uspSectionOld }
