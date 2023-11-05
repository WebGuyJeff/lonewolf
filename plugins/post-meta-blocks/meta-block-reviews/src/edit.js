import ServerSideRender from '@wordpress/server-side-render'
import { TextControl, PanelBody, PanelRow, Button } from '@wordpress/components'
import { useSelect } from '@wordpress/data'
import { useEntityProp } from '@wordpress/core-data'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import metadata from './block.json'
import './editor.scss'
import json from '../data/review-definition'
const { label, prefix, key, slug, customFields } = json

const EditReviewsButton = () => (
	<Button
		variant="link"
		href={ slug }
	>
		Edit Your Reviews
	</Button>
)

/**
 * ServerSideRender passes the output task back to the `render_callback` defined in PHP function
 * register_block_type. That will render the content as we want it to appear on the front end.
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

	// DEBUG.
	console.log( 'CONTEXT' )
	console.log( 'postId', postId )
	console.log( 'postType', postType )
	console.log( 'queryId', queryId )

	console.log( 'SELECT-CORE' )
	const core = useSelect( select => select( 'core' ).getEntityRecords( 'postType', key ) )
	console.log( core )

	console.log( 'SELECT-EDITOR' )
	const [ editor ] = useEntityProp( 'postType', postType, 'meta', postId )
	console.log( editor )

	const isPostEditorContext = ( key === useSelect( select => select( 'core/editor' ).getCurrentPostType() ) )
	const isBlockContext = ( key === postType )
	const isDescendentOfQueryLoop = Number.isFinite( queryId )

	const isEditable = ( isBlockContext && isPostEditorContext && ! isDescendentOfQueryLoop )
	if ( isEditable ) {
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

					<EditReviewsButton />

				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() }>

				{ isEditable && customFields.map( ( field, index ) => {
					return (
						<>
							<TextControl
								key={ index }
								label={ field.label }
								value={ field.value }
								onChange={ field.updateValue }
								maxLength={50}
								required="required"
							/>
						</>
					)
				} ) }

				{ ! isEditable && <ReviewServerSideRender /> }

			</div>
		</>
	)
}
