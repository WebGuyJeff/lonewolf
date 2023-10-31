<?php
/**
 * Plugin Name: Hero Punch.
 * Description: A hero section for landing pages.
 * Author: Jefferson Real <me@jeffersonreal.uk>
 * Version: 0.0.1
 *
 * @package lonewolf
 */
function register_hero_punch() {
	$location = __DIR__ . '/build';
	$result   = register_block_type( $location );
	if ( false === $result ) {
		error_log( "ERROR: Block registration failed for path '{$location}'" );
	}
}
add_action( 'init', 'register_hero_punch' );
