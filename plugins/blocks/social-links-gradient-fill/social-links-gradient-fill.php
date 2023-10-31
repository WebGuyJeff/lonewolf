<?php
/**
 * Plugin Name: Social Links Gradient Fill
 * Description: Display social links with a gradient fill!
 * Author: Jefferson Real <me@jeffersonreal.uk>
 * Version: 0.0.1
 *
 * @package lonewolf
 */
function register_social_links_gradient_fill() {
	$location = __DIR__ . '/build';
	$result   = register_block_type( $location );
	if ( false === $result ) {
		error_log( "ERROR: Block registration failed for path '{$location}'" );
	}
}
add_action( 'init', 'register_social_links_gradient_fill' );