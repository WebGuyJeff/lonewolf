<?php
namespace BigupWeb\CPT_Review;

/**
 * Register custom post type.
 *
 * @package cpt-review
 */
class Custom_Post_Type {

	/**
	 * Custom post type key.
	 *
	 * @var string
	 */
	private $key = '';

	/**
	 * CPT definition formatted for the `$args` paramater of `register_post_type()`.
	 *
	 * @var array
	 */
	private $definition = '';

	/**
	 * Enabled taxonomies.
	 *
	 * @var array
	 */
	private $taxonomies = '';


	/**
	 * Register a custom post type.
	 *
	 * The passed CPT definition data is verbosely stored in the class properties before being used
	 * to register the CPT and hooks to integrate it into WP.
	 */
	public function __construct( $definition ) {
		$this->key        = $definition['key'];
		$this->definition = $definition['definition'];
		$this->taxonomies = $definition['definition']['taxonomies'];

		//add_action( 'init', array( &$this, 'register' ), 0, 1 );
	}


	/**
	 * Register the custom post type.
	 */
	public function register() {
		register_post_type(
			$this->key,
			$this->definition
		);
		if ( in_array( 'category', $this->taxonomies, true ) ) {
			register_taxonomy_for_object_type( 'category', $this->key );
		}
		if ( in_array( 'post_tag', $this->taxonomies, true ) ) {
			register_taxonomy_for_object_type( 'post_tag', $this->key );
		}
	}
}
