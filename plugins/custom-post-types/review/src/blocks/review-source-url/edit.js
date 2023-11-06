import ServerSideRender from '@wordpress/server-side-render'
import { TextControl, PanelBody, PanelRow, Button } from '@wordpress/components'
import { useSelect } from '@wordpress/data'
import { useEntityProp } from '@wordpress/core-data'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import metadata from './block.json'
import json from '../../../data/review-definition'
const { label, prefix, key, customFields } = json

/**
 * ServerSideRender passes the output task back to the `render_callback` defined in PHP function
 * register_block_type. That will render the content as we want it to appear on the front end.
 * 
 * NOTE: I can't get this to pass context to the PHP render_callback and therefore renders nothing.
 */ 
const ReviewServerSideRender = () => (
    <ServerSideRender
        block={ metadata.name }
    />
)

/**
 * Editor Handler.
 * 
 * User can only edit content in the review post type editor context. In all other cases the content
 * will be rendered the same as the front end.
 * 
 * Post type edit screen: Inputs should appear either at the bottom in th custom fields pane, or in
 * the sidebar with the other post fields - NOT on a separate tab. Custom fields should feel
 * built-in to the user, not have them looking in a different place to edit the content.
 * 
 * Inputs, values and setters are generated dynamically so that custom fields can be defined in
 * an external JSON file. The long-term plan is to enable users to define which fields they want to
 * include with the post type.
 *
 * This block consumes context from the query loop. See "usesContext" in block.json.
 * @link: https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/post-excerpt/block.json
 */
export default function Edit( {
	context: {
		postId,
		postType,
		queryId }
	} ) {

	const isPostEditorContext = ( key === useSelect( select => select( 'core/editor' ).getCurrentPostType() ) )
	const isBlockContext = ( key === postType )
	const isDescendentOfQueryLoop = Number.isFinite( queryId )

	const isEditable = ( isBlockContext && isPostEditorContext && ! isDescendentOfQueryLoop )

	console.log( 'isEditable' , isEditable )

	if ( true ) {
		const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta', postId )
		// Apply values and setters dynamically to the custom field objects.
		customFields.forEach( field => {
			field.metaKey = prefix + key + field.suffix
			field.value = meta[ field.metaKey ]
			field.updateValue = ( newValue ) => setMeta( { ...meta, [ field.metaKey ]: newValue } )
		} )
	}

/*
 *
 *<input
 *	label={ 'Review source URL' }
 *	value={ reviewSourceURL }
 *	onChange={ updateReviewSourceURL }
 *	maxLength={300}
 *	type="url"
 * />
 *
 */


	return (
		<>
			<InspectorControls>
				<PanelBody 
					title={ label }
					initialOpen={true}
				>

					{ isEditable && customFields.map( ( field, index ) => {
						return (
							<PanelRow key={ index }>
								<fieldset>
									<TextControl
										label={ field.label }
										value={ field.value }
										onChange={ field.updateValue }
										maxLength={50}
										required="required"
									/>
								</fieldset>
							</PanelRow>
						)
					} ) }

				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() }>

				{ isEditable && customFields.map( ( field, index ) => {
					return (
						<TextControl
							key={ index }
							label={ field.label }
							value={ field.value }
							onChange={ field.updateValue }
							maxLength={50}
							required="required"
						/>
					)
				} ) }

				{ ! isEditable && customFields.map( ( field, index ) => {
					switch( field.input_type ) {
						case 'text':
							return (
								<p>
									<em>
										{ '~ ' + field.value }
									</em>
								</p>
							)
						case 'url':
							return (
								<a
									style={{ borderStyle:'none', borderWidth:'0px' }}
									href={ field.value }
								>
									{ field.label }
								</a>
							)
						default:
							return (
								<p key={ index }>
									{ 'No configuration for field type ' + field.input_type }
								</p>
							)
					}
				} ) }

			</div>
		</>
	)
}
