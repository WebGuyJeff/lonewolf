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
	}


	/**
	 * Register Gutenberg block.
	 */
	public function register_gutenberg_block() {
		$location = CPTREV_DIR . '/build';
		$result   = register_block_type(
			$location,
			array(
				'render_callback' => array( $this, 'dynamic_render_callback' ),
			)
		);
		if ( false === $result ) {
			error_log( "ERROR: Block registration failed for path '{$location}'" );
		}
	}


	/**
	 * Register metafields on the post type.
	 */
	public function register_metafields() {
		foreach ( $this->fields as $metafield ) {
			$user_capabilities = $metafield['user_capabilities'];
			$sanitize_callback = Sanitize::get_callback( $metafield['input_type'] );
			register_post_meta(
				$this->key,                                                 // Post type.
				$this->prefix . $this->key . $metafield['suffix'],          // Metafield key.
				array(
					'type'              => $metafield['type'],              // The type of data.
					'description'       => $metafield['description'],       // A description of the data.
					'sanitize_callback' => $sanitize_callback,              // The sanitize callback.
					'show_in_rest'      => $metafield['show_in_rest'],      // Show in REST API. Must be true for Gut.
					'single'            => $metafield['single'],            // Single value or array of values?

					// DEBUG.
					'auth_callback'     => function () {
						return true;
					},

					// 'auth_callback'     => function() use ( $user_capabilities ) {
					// return current_user_can( $user_capabilities );
					// },
				)
			);
		}
	}


	/**
	 * Dynamic front-end render callback.
	 *
	 * Defines the dynamic content in the frontend when called by the render_callback property of
	 * register_block_type.
	 *
	 * This server-side rendering is a function taking the block and the block inner content as
	 * arguments, and returning the markup (quite similar to shortcodes).
	 *
	 * get_post_meta() is used to retrive the values of the custom fields.
	 *
	 * @link https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/
	 */
	public function dynamic_render_callback( $block_attributes, $content ) {

		echo '<p>dynamic_render_callback debug</p><pre>';
		var_dump( $block_attributes );
		var_dump( $content );
		echo '</pre>';

		$review_name          = get_post_meta( get_the_ID(), '_bigup_review_name', true );
		$review_source_url    = get_post_meta( get_the_ID(), '_bigup_review_source_url', true );
		$review_profile_image = get_post_meta( get_the_ID(), '_bigup_review_profile_image', true );

		$output = '';

		if ( ! empty( $review_name ) ) {
			$output .= '<h3>' . esc_html( $review_name ) . '</h3>';
		}
		if ( ! empty( $review_source_url ) ) {
			$output .= '<a href="' . esc_url( $review_source_url ) . '">' . __( 'Read full review' ) . '</a>';
		}
		if ( ! empty( $review_profile_image ) ) {
			$output .= '<p>' . esc_html( $review_profile_image ) . '</p>';
		}
		if ( strlen( $output ) > 0 ) {
			return '<div ' . get_block_wrapper_attributes() . '>' . $output . '</div>';
		} else {
			return '<div ' . get_block_wrapper_attributes() . '><strong>' . __( 'No fields available!' ) . '</strong></div>';
		}
	}
}
