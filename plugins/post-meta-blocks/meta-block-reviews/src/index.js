import { __ } from '@wordpress/i18n'
import { registerBlockCollection, registerBlockType } from '@wordpress/blocks'
import {
	Logo,
	LogoBase64
} from './svg'
import Edit from './edit'
import metadata from './block.json'
import './style.scss'

console.log( 'lonewolf/meta-block-reviews BLOCK LOADED' )
// RUN IN CONSOLE TO SEE REGISTERED BLOCKS: wp.blocks.getBlockTypes() 

/**
 * Register the collection.
 * 
 * COLLECTIONS ARE NOT CATEGORIES!
 * @link https://make.wordpress.org/core/2020/02/27/block-collections/
 */
registerBlockCollection(
	'bigupweb',
	{
		title: __( 'Bigup Web' ),
		icon: LogoBase64
	}
)

registerBlockType( metadata.name, {
	...metadata,
	icon: Logo,

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/*
	 * With static blocks we would also have seen a save function. In this case, the save
	 * function is missing because we are creating a dynamic block. The content shown on the
	 * frontend will be generated dynamically via PHP.
	 */
} )
