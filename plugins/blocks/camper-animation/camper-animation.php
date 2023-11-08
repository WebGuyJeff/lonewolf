<?php
/**
 * Plugin Name: Camper Animation.
 * Description: Animation of a camper driving along a road for hero backgrounds.
 * Author: Jefferson Real <me@jeffersonreal.uk>
 * Version: 0.0.1
 *
 * @package lonewolf
 */
function register_camper_animation() {
	$location = __DIR__ . '/build';
	$result   = register_block_type( $location );
	if ( false === $result ) {
		error_log( "ERROR: Block registration failed for path '{$location}'" );
	}
}
add_action( 'init', 'register_camper_animation' );
