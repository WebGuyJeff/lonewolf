import { registerBlockType } from '@wordpress/blocks'
import { TextControl, MediaPlaceholder, PanelBody, PanelRow } from '@wordpress/components'
import { useEntityProp } from '@wordpress/core-data'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'

const Edit = () => {
	const blockProps = useBlockProps()
	const postType = 'reviews'

	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' )

	const reviewName      = meta.meta_block_reviews_name
	const reviewSourceURL = meta.meta_block_reviews_source_url
	const reviewIcon      = meta.meta_block_reviews_icon

	const updateReviewName      = ( newValue ) => setMeta( { ...meta, meta_block_reviews_name: newValue } )
	const updateReviewSourceURL = ( newValue ) => setMeta( { ...meta, meta_block_reviews_source_url: newValue } )
	// const updateReviewIcon      = ( newValue ) => setMeta( { ...meta, meta_block_reviews_icon: newValue } )


	const updateReviewIcon = ( media ) => {
		if ( !media || !media.url ) {
			setAttributes( {
				imageUrl: null,
				imageId: null,
				imageAlt: null,
			} )
			return
		}
		setAttributes( {
			imageUrl: media.url,
			imageId: media.id,
			imageAlt: media?.alt,
		} )
	}


	return (
		<>
			<InspectorControls>
				<PanelBody 
					title={ __( 'Review Details' )}
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
							<input
								label={__( 'Review source URL' )}
								value={ reviewSourceURL }
								onChange={ updateReviewSourceURL }
								maxLength={300}
								type="url"
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<MediaPlaceholder
								accept="image/*"
								allowedTypes={ [ 'image' ] }
								onSelect={ updateReviewIcon }
								multiple={false}
								handleUpload={true}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__( 'Review Icon' )}
								value={ reviewIcon }
								onChange={ updateReviewIcon }
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
				<input
					label={__( 'Review source URL' )}
					value={ reviewSourceURL }
					onChange={ updateReviewSourceURL }
					maxLength={300}
					type="url"
				/>
				<TextControl
					label={__( 'Review Icon' )}
					value={ reviewIcon }
					onChange={ updateReviewIcon }
				/>
				<MediaPlaceholder
					accept="image/*"
					allowedTypes={ [ 'image' ] }
					onSelect={ updateReviewIcon }
					multiple={false}
					handleUpload={true}
				/>
				{imageUrl && <img src={imageUrl} alt={imageAlt} />}
			</div>
		</>
	)
}

registerBlockType( 'lonewolf/meta-block-reviews', {
	edit: Edit,

	/*
	 * No information saved to the block.
	 * Data is saved to post meta via the hook.
	 */
	save: () => {
		return null
	},
} )
