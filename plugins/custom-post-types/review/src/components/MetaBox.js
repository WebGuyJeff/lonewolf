import { __ } from '@wordpress/i18n'
import PropTypes from 'prop-types'
import { compose } from '@wordpress/compose'
import { withSelect, withDispatch } from '@wordpress/data'
import { PluginDocumentSettingPanel } from '@wordpress/edit-post'
import { PanelRow, TextControl } from '@wordpress/components'
import json from '../../data/review-definition'
const { label, prefix, key, customFields } = json


/**
 * Add a metabox for all post custom fields.
 * 
 * @see https://kinsta.com/blog/wordpress-add-meta-box-to-post/ 
 */
const MetaBox = ( { postType, metaFields, setMetaFields } ) => {

console.log( 'HELLO I R METABOX PLUGIN' )


	if ( postType !== key ) return null

	let fields = []
	customFields.forEach( customField => {
		if ( !! metaFields[ prefix + key + customField.suffix ] ) {
			// I know this is horrible. To be refactored.
			const metaKey = prefix + key + customField.suffix
			fields[ metaKey ] = {
				'metaKey': metaKey,
				'value': metaFields[ metaKey ],
				// updateValue sets metaFields[ metaKey ].
				'updateValue': ( newValue ) => setMetaFields( { [ fields[ metaKey ].metaKey ]: newValue } ),
			}
		}
	} )

	return(
		<PluginDocumentSettingPanel 
			title={ label + ' Meta Fields' } 
			initialOpen={ true }
		>

			{ fields.map( ( field, index ) => {
				return (
					<PanelRow key={ index }>
						<TextControl 
							value={ field.value }
							label={ __( "Title" ) }
							onChange={ field.updateValue }
						/>
					</PanelRow>
				)
			} ) }

		</PluginDocumentSettingPanel>
	)
}

const applyWithSelect = withSelect( ( select ) => {
	return {
		metaFields: select( 'core/editor' ).getEditedPostAttribute( 'meta' ),
		postType: select( 'core/editor' ).getCurrentPostType()
	}
} )

const applyWithDispatch = withDispatch( ( dispatch ) => {
	return {
		setMetaFields ( newValue ) {
			dispatch( 'core/editor' ).editPost( { meta: newValue } )
		}
	}
} )

export default compose( [
	applyWithSelect,
	applyWithDispatch
] )( MetaBox )

MetaBox.propTypes = {
	postType: PropTypes.string,
	metaFields: PropTypes.object,
	setMetaFields: PropTypes.func,
}
