<?php
/**
 * Lonewolf Theme Setup.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

// Define constants.
define( 'LW_DEBUG', defined( 'WP_DEBUG' ) && WP_DEBUG === true );
define( 'LW_DIR', trailingslashit( __DIR__ ) );
define( 'LW_URL', trailingslashit( get_site_url( null, strstr( __DIR__, '/wp-content/' ) ) ) );

// Setup PHP namespace.
require_once LW_DIR . 'classes/autoload.php';

// Setup this theme.
use BigupWeb\Lonewolf\Theme_Setup;
new Theme_Setup();
