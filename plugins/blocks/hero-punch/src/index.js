import { __ } from '@wordpress/i18n'
import { registerBlockCollection, registerBlockType } from '@wordpress/blocks'
import './style.scss'
import Edit from './edit'
import save from './save'
import metadata from './block.json'
import {
	Logo,
	LogoBase64
} from './svg'

console.log( 'lonewolf/hero-punch BLOCK LOADED' )
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
		icon: LogoBase64
	}
)

/**
 * Register the block.
 */
registerBlockType( 'lonewolf/hero-punch', {
	...metadata,
	icon: Logo,
	example: {
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: __( 'Welcome Amigo!' )
				}
			},
			{
				name: 'core/paragraph',
				attributes: {
					content: __( 'This is a full width section designed to provide impact as a hero banner. Some GSAP animation provides a surprise as you scroll down!' )
				}
			},
			{
				name: 'core/button',
				attributes: {
					content: __( 'Let\'s do something!' )
				}
			}
		]
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
