import { TextControl, PanelBody, PanelRow, Button } from '@wordpress/components'
import { useEntityProp } from '@wordpress/core-data'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import './editor.scss'
import Definition from '../data/review-definition'
const { label, prefix, key, slug, customFields } = Definition

const EditReviewsButton = () => (
	<Button
		variant="link"
		href={ slug }
	>
		Edit Your Reviews
	</Button>
)

export default function Edit() {
	const blockProps        = useBlockProps()
	const postType          = 'review'
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' )

	/*
	 *const reviewName            = meta._meta_block_reviews_name
	 *const reviewSourceURL       = meta._meta_block_reviews_source_url
	 *const updateReviewName      = ( newValue ) => setMeta( { ...meta, _meta_block_reviews_name: newValue } )
	 *const updateReviewSourceURL = ( newValue ) => setMeta( { ...meta, _meta_block_reviews_source_url: newValue } )
	 */

	customFields.forEach( field => {
		const metaKey = prefix + key + field.suffix
		field.value = meta[ metaKey ]
		field.updateValue = ( newValue ) => setMeta( { ...meta, metaKey: newValue } )
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
								<pre style={{ whiteSpace:'normal' }}>
									{ JSON.stringify( index ) }
								</pre>
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

				<pre style={{ whiteSpace:'normal' }}>
					{ JSON.stringify( blockProps ) }
				</pre>

				{	customFields.map( ( field, index ) => {
					return (
						<>
							<pre key={ index } style={{ whiteSpace:'normal' }}>
								{ JSON.stringify( field ) }
							</pre>
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

			</div>
		</>
	)
}
