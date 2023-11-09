import { __ } from '@wordpress/i18n'
import { registerBlockCollection, registerBlockType } from '@wordpress/blocks'
import './camper-animation.scss'
import Edit from './edit'
import save from './save'
import metadata from './block.json'
import {
	Logo
} from './svg'

console.log( 'lonewolf/camper-animation BLOCK LOADED' )
// RUN IN CONSOLE TO SEE REGISTERED BLOCKS: wp.blocks.getBlockTypes() 

/**
 * Register the collection.
 * 
 * COLLECTIONS ARE NOT CATEGORIES!
 * @link https://make.wordpress.org/core/2020/02/27/block-collections/
 */
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
registerBlockType( 'lonewolf/camper-animation', {
	...metadata,
	icon: Logo,

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} )
