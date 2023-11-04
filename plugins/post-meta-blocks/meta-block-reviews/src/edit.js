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

const ReviewsServerSideRender = () => (
    <ServerSideRender
        block={ metadata.name }
    />
)


/**
 * User can only edit content in the review post type editor context. In all other cases the
 * content will be rendered the same as the front end.
 * 
 * Review post type edit screen:
 * Here the inputs should appear either at the bottom in th custom fields pane, or in the sidebar
 * with the other post options such as featured image etc - NOT on a separate tab. I want the 
 * custom fields to feel like they are in-built for the post type. This screen needs to have the
 * editor restricted to only using suitable block for the review content. Probably just P blocks.
 * 
 * Look at the post-excerpt for an example of consuming context, ie. content from the query loop
 * ancestor:
 * 
 * @link: https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/post-excerpt/block.json
 */
export default function Edit( { context: { postId, postType, queryId } } ) {

	const isEditorContextPostTypeReview = ( key === useSelect( select => select( 'core/editor' ).getCurrentPostType() ) )
	const isBlockContextPostTypeReview = ( key === postType )
	const isDescendentOfQueryLoop = Number.isFinite( queryId )

	/**
	 * User can only edit content in the review post type editor context. In all other cases the
	 * content will be rendered the same as the front end.
	 * 
	 * Inputs, values and setters are generated dynamically so that custom fields can be defined in
	 * an external JSON file. The long-term plan is the user can select which fields they want to
	 * include with the post type.
	 * 
	 * useEntityProp returns an array of post meta fields and a setter function.
	 */
	const isEditable = ( isBlockContextPostTypeReview && isEditorContextPostTypeReview && ! isDescendentOfQueryLoop )
	if ( isEditable ) {
		const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta', postId )
		customFields.forEach( field => {
			field.metaKey = prefix + key + field.suffix
			field.value = meta[ field.metaKey ]
			field.updateValue = ( newValue ) => setMeta( { ...meta, [ field.metaKey ]: newValue } )
		} )
	}


	// DEBUG.
	console.log( 'CONTEXT' )
	console.log( 'postId', postId )
	console.log( 'postType', postType )
	console.log( 'queryId', queryId )

	
	const test = useEntityProp( 'postType', postType, 'title' , postId )
	console.log( test )


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

				{ ! isEditable && <ReviewsServerSideRender /> }

			</div>
		</>
	)
}
