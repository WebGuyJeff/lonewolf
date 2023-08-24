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

export { inputImageSelect }
