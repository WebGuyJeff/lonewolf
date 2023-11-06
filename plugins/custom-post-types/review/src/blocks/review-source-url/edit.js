import { __ } from '@wordpress/i18n'
import PropTypes from 'prop-types'
import { TextControl, PanelBody, PanelRow } from '@wordpress/components'
import { useSelect } from '@wordpress/data'
import { useEntityProp } from '@wordpress/core-data'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import metadata from './block.json'
import json from '../../../data/review-definition'
const { label, prefix, key, customFields } = json

/**
 * Editor Handler.
 * 
 * User can only edit content in the post type editor. In all other cases the content will be
 * rendered the same as the front end.
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
	attributes: {
		linkText
	},
	setAttributes,
	isSelected,
	context: {
		postId,
		postType,
		queryId }
	} ) {

	const blockProps = useBlockProps()

	const isPostEditorContext = ( key === useSelect( select => select( 'core/editor' ).getCurrentPostType() ) )
	const isBlockContext = ( key === postType )
	const isDescendentOfQueryLoop = Number.isFinite( queryId )
	const isEditable = ( isBlockContext && isPostEditorContext && ! isDescendentOfQueryLoop )

	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta', postId )
	let field = {}
	customFields.forEach( customField => {
		if ( customField[ 'block_name' ] === metadata.name ) {
			field = customField
			field.metaKey = prefix + key + customField.suffix
			field.value = meta[ field.metaKey ]
		}
	} )
	if ( isEditable ) {
		field.updateValue = ( newValue ) => setMeta( { ...meta, [ field.metaKey ]: newValue } )
	}

	const postEditUri = 'post.php?post=' + postId + '&action=edit'

	return (
		<>
			{ isEditable && isSelected &&
				<InspectorControls>
					<PanelBody 
						title={ label }
						initialOpen={true}
					>
						<PanelRow>
							<fieldset>
								<TextControl
									label={ field.label }
									value={ field.value }
									onChange={ field.updateValue }
									maxLength={ field.length_limit }
									required={ field.required }
									type={ field.input_type }
								/>
							</fieldset>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
			}

			{ ! isEditable && isSelected &&
				<InspectorControls>
					<PanelBody 
						title={ label }
						initialOpen={true}
					>
						<PanelRow>
							<fieldset>
								<div { ...blockProps }>
									<TextControl
										label={ 'Link text' }
										value={ linkText }
										onChange={ ( newLinkText ) => setAttributes( { linkText: newLinkText } ) }
									/>
								</div>
							</fieldset>
						</PanelRow>
						<PanelRow>
							<a
								href={ postEditUri }
							>
								{ __( 'Edit this post to set the URL' ) }
							</a>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
			}

			<div { ...blockProps }>

				{ isEditable &&
					<TextControl
						label={ field.label }
						value={ field.value }
						onChange={ field.updateValue }
						maxLength={ field.length_limit }
						required={ field.required }
						type={ field.input_type }
						placeholder={ field.placeholder }
					/>
				}

				{ ! isEditable &&
					<a
						style={{ borderStyle:'none', borderWidth:'0px' }}
						href={ field.value }
						onClick={ ( e ) => e.preventDefault() }
					>
						{ ( field.value ) ? linkText : field.placeholder }
					</a>
				}

			</div>
		</>
	)
}

Edit.propTypes = {
	context: PropTypes.object,
	attributes: PropTypes.object,
	setAttributes: PropTypes.func,
	isSelected: PropTypes.bool,
}
