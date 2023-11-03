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

export default function Edit() {

	/*
	 * postType will reflect the post context of the block. If you're in the editor of a 'page'
	 * containing this block, getCurrentPostType will return 'page' and the 'review' meta won't
	 * become available using `useSelect( select => select( 'core/editor' ).getCurrentPostType()`.
	 * I believe I'm 'selecting' the wrong data source possibly?
	 * 
	 * @link https://developer.wordpress.org/block-editor/reference-guides/data/data-core-editor/
	 * 
	 * getCurrentPostType - Returns the post type of the post currently being edited. NOT WHAT I WANT
	 */
	const postType = useSelect( select => select( 'core/editor' ).getCurrentPostType() )
	const isEditable = ( postType === key )


	// useEntityProp returns an array of post meta fields and a setter function.
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' )

	// Debug.
	const metaDebug = useEntityProp( 'postType', postType, 'meta' )
	console.log( metaDebug )

	// Awesome debug snippet!
	const reviews = useSelect( select => select( 'core' ).getEntityRecords( 'postType', postType ) )
	console.log( reviews )

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

					{ customFields.map( ( field, index ) => {
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

				{ customFields.map( ( field, index ) => {
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

				{ false && <ReviewsServerSideRender /> }

			</div>
		</>
	)
}
