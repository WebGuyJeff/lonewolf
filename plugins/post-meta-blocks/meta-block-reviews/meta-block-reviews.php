<?php
/**
 * Plugin Name:       meta-block-reviews
 * Description:       A custom 'Reviews' post type with custom fields.
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            Jefferson Real
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       meta-block-reviews
 *
 * @package           meta-block-reviews
 * @link              https://kinsta.com/blog/wordpress-add-meta-box-to-post/
 */

// Define constants.
define( 'CPTREV_DEBUG', defined( 'WP_DEBUG' ) && WP_DEBUG === true );
define( 'CPTREV_DIR', trailingslashit( __DIR__ ) );

// Setup PHP namespace.
require_once CPTREV_DIR . '/classes/autoload.php';

// Setup this plugin.
use BigupWeb\CPT_Review\Initialise;
new Initialise();
