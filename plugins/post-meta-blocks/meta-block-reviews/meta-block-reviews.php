<?php
namespace BigupWeb\Lonewolf;

/**
 * Plugin Name:       meta-block-reviews
 * Description:       A custom meta block (custom fields) for the 'Reviews' custom post type.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Jefferson Real
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       meta-block-reviews
 *
 * @package           meta-block-reviews
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 */
/*
function meta_block_reviews_init() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'meta_block_reviews_init' );
*/

add_action(
	'init',
	function() {
		register_block_type( __DIR__ );
	}
);


$metafields = array(
	'meta_block_reviews_name'       => array(
		'type'              => 'string',
		'description'       => 'Name of the reviewer',
		'sanitize_callback' => array( new Sanitize(), 'text' ),
		'show_in_rest'      => true,
		'single'            => true,
	),
	'meta_block_reviews_source_url' => array(
		'type'              => 'string',
		'description'       => 'Link to the review source',
		'sanitize_callback' => array( new Sanitize(), 'domain' ),
		'show_in_rest'      => true,
		'single'            => true,
	),
	'meta_block_reviews_icon'       => array(
		'type'              => 'array',
		'description'       => 'Icon to show with the review',
		'sanitize_callback' => array( new Sanitize(), 'text' ),
		'show_in_rest'      => true,
		'single'            => true,
	),
);

/**
 * Register custom post meta field.
 */
/*
function meta_block_reviews_register_post_meta() {
	foreach ( $metafields as $key => $value ) {
		register_post_meta(
			'reviews',                                            // Post type.
			$key,                                                 // Metafield key.
			array(
				'type'              => $key['type'],              // The type of data.
				'description'       => $key['description'],       // A description of the data.
				'sanitize_callback' => $key['sanitize_callback'], // The sanitize callback.
				'show_in_rest'      => $key['show_in_rest'],      // Whether to show in REST API.
				'single'            => $key['single'],            // Single value or array of values?
			)
		);
	}
}
add_action( 'init', 'meta_block_reviews_register_post_meta' );
*/


add_action(
	'init',
	function() {
		$metafields = array(
			'meta_block_reviews_name'       => array(
				'type'              => 'string',
				'description'       => 'Name of the reviewer',
				'sanitize_callback' => array( new Sanitize(), 'text' ),
				'show_in_rest'      => true,
				'single'            => true,
			),
			'meta_block_reviews_source_url' => array(
				'type'              => 'string',
				'description'       => 'Link to the review source',
				'sanitize_callback' => array( new Sanitize(), 'domain' ),
				'show_in_rest'      => true,
				'single'            => true,
			),
			'meta_block_reviews_icon'       => array(
				'type'              => 'array',
				'description'       => 'Icon to show with the review',
				'sanitize_callback' => array( new Sanitize(), 'text' ),
				'show_in_rest'      => true,
				'single'            => true,
			),
		);
		foreach ( $metafields as $key => $value ) {
			register_post_meta(
				'reviews',                                            // Post type.
				$key,                                                 // Metafield key.
				array(
					'type'              => $metafields[ $key ]['type'],              // The type of data.
					'description'       => $metafields[ $key ]['description'],       // A description of the data.
					'sanitize_callback' => $metafields[ $key ]['sanitize_callback'], // The sanitize callback.
					'show_in_rest'      => $metafields[ $key ]['show_in_rest'],      // Whether to show in REST API.
					'single'            => $metafields[ $key ]['single'],            // Single value or array of values?
				)
			);
		}
	}
);