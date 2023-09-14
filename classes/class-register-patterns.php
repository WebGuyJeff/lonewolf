<?php
namespace BigupWeb\Lonewolf;

/**
 * Setup block patterns.
 *
 * @package lonewolf
 */
use WP_Block_Pattern_Categories_Registry;

class Register_Patterns {

	/**
	 * Pattern categories to be registered.
	 *
	 * @var array
	 */
	private $categories = array();

	/**
	 * Register_Patterns constructor.
	 */
	public function __construct() {
		$this->categories = array(
			'lonewolf' => array( 'label' => __( 'Lonewolf Patterns', 'lonewolf' ) ),
		);
		$this->register_categories();
	}


	/**
	 * Register block patterns categories.
	 *
	 * @return void
	 */
	private function register_categories() {
		foreach ( $this->categories as $slug => $args ) {
			if ( WP_Block_Pattern_Categories_Registry::get_instance()->is_registered( $slug ) ) {
				continue;
			}
			register_block_pattern_category( $slug, $args );
		}
	}
}
