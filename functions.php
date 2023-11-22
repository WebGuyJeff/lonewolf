<?php
namespace BigupWeb\Lonewolf;

/**
 * Lonewolf Theme Entry.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

// Set global constants.
define( 'LONEWOLF_DEBUG', defined( 'WP_DEBUG' ) && WP_DEBUG === true );
define( 'LONEWOLF_PATH', trailingslashit( __DIR__ ) );
define( 'LONEWOLF_URL', trailingslashit( get_site_url( null, strstr( __DIR__, '/wp-content/' ) ) ) );

// Setup PHP namespace.
require_once LONEWOLF_PATH . 'classes/autoload.php';

// Setup the plugin.
$Theme_Setup = new Theme_Setup();
$Theme_Setup->all();
