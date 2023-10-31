import { __ } from '@wordpress/i18n'
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'
import {
	Defs
} from '../svg'
import './editor.scss'

const template = [
	[
		'core/social-links'
	]
]

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {
	return (
		<div { ...useBlockProps() }>
			<Defs />
			<InnerBlocks
                template={ template }
                templateLock="all"
            />
		</div>
	)
}
