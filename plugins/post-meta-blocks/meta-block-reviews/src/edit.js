import ServerSideRender from '@wordpress/server-side-render'
import { TextControl, PanelBody, PanelRow, Button } from '@wordpress/components'
import { useSelect } from '@wordpress/data'
import { useEntityProp } from '@wordpress/core-data'
import { useState } from '@wordpress/element'
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
 * This should behave differently on different scrrens:
 * 
 * Review post type edit screen:
 * Here the inputs should appear either at the bottom in th custom fields pane, or in the sidebar
 * with the other post options such as featured image etc - NOT on a separate tab. I want the 
 * custom fields to feel like they are in-built for the post type. This screen needs to have the
 * editor restricted to only using suitable block for the review content. Probably just P blocks.
 * 
 * Page and template editor screens:
 * Here the fields should be output when the meta block(s?) are inserted into the query template. As
 * per the in-built fields, the custom fields should not be editable on this screen. They should
 * be output the same as the front end, I think by using ServerSideRender.
 * 
 * Front end:
 * Obviously the fields - should be output as the template has been laid out looking the same as in
 * the editor.
 */
export default function Edit() {

	/*
	 * postType will reflect the post context of the block. If you're in the editor of a 'page'
	 * containing this block, getCurrentPostType will return 'page' and the 'review' meta won't
	 * become available using `useSelect( select => select( 'core/editor' ).getCurrentPostType()`.
	 * I believe I'm 'selecting' the wrong data source possibly?
	 * 
	 * The query block does pull in the built-in fields, so there is obviously a source for the
	 * data somewhere. It seems like useEntityProp isn't the right tool for the job, or I've
	 * registered the fields incorrectly...
	 * 
	 * @link https://developer.wordpress.org/block-editor/reference-guides/data/data-core-editor/
	 */
	const postType = useSelect( select => select( 'core/editor' ).getCurrentPostType() )
	const isEditable = ( postType === key )


	if ( isEditable ) {
		// useEntityProp returns an array of post meta fields and a setter function.
		const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' )

		/**
		 * Meta fields and setters are generated dynamically so that custom fields can be defined in
		 * an external JSON file. The long-term plan is the user can select which fields they want to
		 * include with the post type.
		 */
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

				{ ! isEditable && <ReviewsServerSideRender /> }

			</div>
		</>
	)
}
