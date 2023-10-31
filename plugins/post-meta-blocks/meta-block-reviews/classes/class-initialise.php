<?php
namespace BigupWeb\CPT_Review;

/**
 * Initialise.
 *
 * @package cpt-review
 */
class Initialise {


	/**
	 * Setup this plugin.
	 */
	public function __construct() {
		add_action( 'init', array( &$this, 'register_gutenberg_block' ) );
		$this->setup_plugin();
	}


	/**
	 * Register Gutenberg block.
	 */
	public function register_gutenberg_block() {
		$location = CPTREV_DIR . '/build';
		$result   = register_block_type( $location );
		if ( false === $result ) {
			error_log( "ERROR: Block registration failed for path '{$location}'" );
		}
	}


	/**
	 * Decode JSON definition and register the CPT.
	 */
	private function setup_plugin() {

		$json       = Util::get_contents( CPTREV_DIR . 'data/review-definition.json' );
		$definition = json_decode( $json, true );

		if ( is_array( $definition ) && array_key_exists( 'key', $definition ) ) {
			new Custom_Post_Type( $definition );
			if ( array_key_exists( 'customFields', $definition ) ) {
				new Meta_Box_Classic( $definition );
				new Meta_Box_Gutenberg( $definition );
			}
		} else {
			return;
		}
	}
}
