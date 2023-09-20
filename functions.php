<?php
/**
 * Lonewolf Theme Setup.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

/**
 * Setup Lonewolf PHP namespace with class autoloader.
 */
require_once get_template_directory() . '/classes/autoload.php';

/**
 * Setup the theme.
 */
use BigupWeb\Lonewolf\Theme_Setup;
new Theme_Setup();
