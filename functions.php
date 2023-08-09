<?php
/**
 * Lonewolf Theme Setup.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */


/**
 * Load the PHP autoloader from it's own file.
 */
require_once get_template_directory() . '/classes/autoload.php';


/**
 * Initialise the theme.
 */
use BigupWeb\Lonewolf\Init;
new Init();
