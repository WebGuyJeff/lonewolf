<?php
namespace BigupWeb\Lonewolf;

/**
 * Lonewolf Theme Entry.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

// Development debugging.
$enable_debug = true;

 // Set global constants.
define( 'LONEWOLF_DEBUG', $enable_debug );
define( 'LONEWOLF_PATH', trailingslashit( __DIR__ ) );
define( 'LONEWOLF_URL', trailingslashit( get_site_url( null, strstr( __DIR__, '/wp-content/' ) ) ) );

// Register namespaced autoloader.
$namespace = 'BigupWeb\\Lonewolf\\';
$root      = LONEWOLF_PATH . 'classes/';
require_once $root . 'autoload.php';

// Setup the theme.
$Theme_Setup = new Theme_Setup();
$Theme_Setup->all();
