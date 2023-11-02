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
        attributes={ {
            showPostCounts: true,
            displayAsDropdown: false,
        } }
    />
)

export default function Edit() {
	const blockProps        = useBlockProps()
	const postType = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostType(),
		[]
	)
	// useEntityProp returns an array of post meta fields and a setter function.
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' )


	// Debug.
	const metaDebug = useEntityProp( 'postType', postType, 'meta' )
	console.log( metaDebug )

	// Awesome debug snippet!
	const reviews = useSelect( select => select( 'core' ).getEntityRecords( 'postType', postType ) )
	console.log( reviews )
	
	const name               = meta._bigup_review_name
	const sourceURL          = meta._bigup_review_source_url
	const profileImage       = meta._bigup_review_profile_image
	const updateName         = ( newValue ) => setMeta( { ...meta, _bigup_review_name: newValue } )
	const updateSourceURL    = ( newValue ) => setMeta( { ...meta, _bigup_review_source_url: newValue } )
	const updateProfileImage = ( newValue ) => setMeta( { ...meta, _bigup_review_profile_image: newValue } )


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

			<div { ...blockProps }>

				{ false &&	customFields.map( ( field, index ) => {
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

				{ false &&
				<>
					<TextControl
						label={ 'name' }
						value={ name }
						onChange={ updateName }
						maxLength={500}
					/>
					<TextControl
						label={ 'url' }
						value={ sourceURL }
						onChange={ updateSourceURL }
						maxLength={500}
					/>
					<TextControl
						label={ 'profile image' }
						value={ profileImage }
						onChange={ updateProfileImage }
						maxLength={500}
					/>

					<pre style={{ whiteSpace:'normal' }}>
						{ JSON.stringify( meta ) }
					</pre>
				</>
				}


				<ReviewsServerSideRender />

			</div>
		</>
	)
}
