import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import './camper-animation.scss'
import './camper-animation-editor.scss'
import {
	Motorhome
} from './svg'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https: //developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {
	const blockProps = useBlockProps( {
        className:  'camperAnimation_wrapper'
    } )

	const template = [
		[ 'core/group', { 'minHeight': 100, "minHeightUnit": '%', 'layout': { 'type': 'constrained', 'justifyContent': 'center' } }, [
			[ 'core/group', { 'minHeight': 100, "minHeightUnit": '%', 'align': 'wide', 'layout': { 'type': 'constrained', 'contentSize': '37.5rem', 'justifyContent': 'right' } }, [
				[ 'core/spacer', { 'height': '15vh' } ], 
				[ 'core/site-title', { 'textAlign': 'right' } ], 
				[ 'core/site-tagline', { 'textAlign': 'right' } ], 
				[ 'core/buttons', { 'layout': { 'type': 'flex', 'justifyContent': 'right' } }, [
					[ 'core/button', { 'placeholder': 'I want some!' } ], 
				] ]
			] ]
		] ]
	]

	return (
		<div { ...blockProps }>
			<div id='camperAnimation'>
				<div id='camperAnimation_stars'></div>
				<div id='camperAnimation_hillRear'></div>
				<div id='camperAnimation_hillFront'></div>
				<div id='camperAnimation_floraRear'></div>
				<div id='camperAnimation_floraMid'></div>
				<div id='camperAnimation_road'></div>
				<div id='camperAnimation_floraFront'></div>
				<div id='camperAnimation_camperSVG'>
					<Motorhome />
				</div>
			</div>
			<InnerBlocks
				template={ template }
			/>
		</div>
	)
}
