import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'
import {
	Defs
} from './svg'

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save() {
	return (
		<div className='svg-fill-wrapper' { ...useBlockProps.save() }>
			<Defs />
			<InnerBlocks.Content />
		</div>
	)
}
