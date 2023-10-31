import { __ } from '@wordpress/i18n'
import { TextControl, PanelBody, PanelRow } from '@wordpress/components'
import { useEntityProp } from '@wordpress/core-data'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import './editor.scss'

export default function Edit() {
	const blockProps            = useBlockProps()
	const postType              = 'review'
	const [ meta, setMeta ]     = useEntityProp( 'postType', postType, 'meta' )
	const reviewName            = meta._meta_block_reviews_name
	const reviewSourceURL       = meta._meta_block_reviews_source_url
	const updateReviewName      = ( newValue ) => setMeta( { ...meta, _meta_block_reviews_name: newValue } )
	const updateReviewSourceURL = ( newValue ) => setMeta( { ...meta, _meta_block_reviews_source_url: newValue } )

/*
 *
 *<input
 *	label={__( 'Review source URL' )}
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
					title={__( 'Review Details' )}
					initialOpen={true}
				>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__( 'Reviewer name' )}
								value={ reviewName }
								onChange={ updateReviewName }
								maxLength={50}
								required="required"
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__( 'Review source URL' )}
								value={ reviewSourceURL }
								onChange={ updateReviewSourceURL }
								maxLength={300}
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<TextControl
					label={__( 'Reviewer name' )}
					value={ reviewName }
					onChange={ updateReviewName }
					maxLength={50}
					required="required"
				/>
				<TextControl
					label={__( 'Review source URL' )}
					value={ reviewSourceURL }
					onChange={ updateReviewSourceURL }
					maxLength={300}
				/>
			</div>
		</>
	)
}
