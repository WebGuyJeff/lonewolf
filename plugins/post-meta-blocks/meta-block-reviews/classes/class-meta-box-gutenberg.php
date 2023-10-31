<?php
namespace BigupWeb\CPT_Review;

/**
 * Register custom meta box for the Gutenberg editor.
 *
 * @package cpt-review
 */
class Meta_Box_Gutenberg {

	/**
	 * Custom post type key.
	 *
	 * @var string
	 */
	private $key = '';

	/**
	 * Prefix for storing custom fields in the postmeta table.
	 *
	 * @var string
	 */
	private $prefix = '';

	/**
	 * Metabox ID.
	 *
	 * @var string
	 */
	private $metabox_id = '';

	/**
	 * Custom field definitions.
	 *
	 * @var array
	 */
	private $fields = '';


	/**
	 * Register the post meta for block support.
	 *
	 * The passed definition data is verbosely stored in the class properties before being used
	 * to setup the post meta with WP hooks.
	 */
	public function __construct( $definition ) {
		$this->key        = $definition['key'];
		$this->prefix     = $definition['prefix'];
		$this->metabox_id = $definition['metaboxID'];
		$this->fields     = $definition['customFields'];

		add_action( 'init', array( &$this, 'register_metafields' ) );
	}


	/**
	 * Register custom post meta fields on the post type.
	 */
	public function register_metafields() {
		foreach ( $this->fields as $metafield ) {
			register_post_meta(
				$this->key,                                                                    // Post type.
				$this->prefix . $this->key . $metafield['suffix'],                             // Metafield key.
				array(
					'type'              => $metafield['type'],                                 // The type of data.
					'description'       => $metafield['description'],                          // A description of the data.
					'sanitize_callback' => Sanitize::get_callback( $metafield['input_type'] ), // The sanitize callback.
					'show_in_rest'      => $metafield['show_in_rest'],                         // Show in REST API. Must be true for Gut.
					'single'            => $metafield['single'],                               // Single value or array of values?
					'auth_callback'     => function() {
						return current_user_can( $metafield['user_capabilities'] );
					},
				)
			);
		}
	}
}
