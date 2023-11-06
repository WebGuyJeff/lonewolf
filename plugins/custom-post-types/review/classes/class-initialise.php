<?php
namespace BigupWeb\CPT_Review;

/**
 * Initialise.
 *
 * @package cpt-review
 */
class Initialise {

	/**
	 * Relative path to the definition JSON file.
	 *
	 * @var string
	 */
	private $definition_path = 'data/review-definition.json';


	/**
	 * Setup this plugin.
	 *
	 * Get and check definition, then call functions to register CPT and custom fields.
	 * All action hooks for this plugin should be registered here to manage sequence.
	 */
	public function __construct() {
		$def = $this->get_definition();

		if ( ! is_array( $def ) || ! array_key_exists( 'key', $def ) ) {
			return;
		}

		$cpt = new Custom_Post_Type( $def );
		add_action( 'init', array( $cpt, 'register' ), 0, 1 );

		if ( ! array_key_exists( 'customFields', $def ) ) {
			return;
		}

		$classic = new Meta_Box_Classic( $def );
		add_action( 'do_meta_boxes', array( &$classic, 'remove_default_meta_box' ), 10, 3 );
		add_action( 'add_meta_boxes', array( &$classic, 'add_custom_meta_box' ), 10, 0 );
		add_action( 'save_post', array( &$classic, 'save_custom_meta_box_data' ), 1, 2 );

		$gutenberg = new Meta_Box_Gutenberg( $def );
		add_action( 'init', array( &$gutenberg, 'register_gutenberg_block' ), 10, 0 );
		add_action( 'init', array( &$gutenberg, 'register_metafields' ), 11, 0 );

		// Enable WP custom fields even if ACF is installed.
		add_filter( 'acf/settings/remove_wp_meta_box', '__return_false' );
	}


	/**
	 * Get JSON definition, decode and return.
	 */
	private function get_definition() {
		$json       = Util::get_contents( CPTREV_DIR . $this->definition_path );
		$definition = json_decode( $json, true );
		return $definition;
	}
}
