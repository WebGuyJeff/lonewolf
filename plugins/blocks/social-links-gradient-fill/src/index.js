import { __ } from '@wordpress/i18n'
import { registerBlockCollection, registerBlockType } from '@wordpress/blocks'
import {
	Logo
} from '../svg'

/**
 * Internal dependencies
 */
import './style.scss'
import Edit from './edit'
import save from './save'
import metadata from './block.json'

console.log( 'lonewolf/social-links-gradient-fill BLOCK LOADED' )
// RUN IN CONSOLE TO SEE REGISTERED BLOCKS: wp.blocks.getBlockTypes() 


// Register the collection.
registerBlockCollection(
	'lonewolf',
	{
		title: __( 'Lonewolf' ),
		icon: Logo
	}
)

/**
 * Register the block.
 */
registerBlockType( 'lonewolf/social-links-gradient-fill', {
	...metadata,
	icon: Logo,
	example: {
		innerBlocks: [ { name: 'core/social-links' } ]
    },

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} )
