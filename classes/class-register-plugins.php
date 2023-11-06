<?php
namespace BigupWeb\Lonewolf;

/**
 * Register plugins included with this theme.
 *
 * @package lonewolf
 */
class Register_Plugins {


	/**
	 * Path to json plugin index.
	 */
	private const INDEX = LW_DIR . 'plugins.json';


	/**
	 * Run the class.
	 */
	public function __construct() {
		$json    = Util::get_contents( self::INDEX );
		$plugins = json_decode( $json, true );
		if ( is_array( $plugins ) ) {
			$this->register_all( $plugins );
		}
	}


	/**
	 * Register all plugins.
	 *
	 * @param array $plugins All plugins to register.
	 */
	private function register_all( $plugins ) {
		foreach ( $plugins as $type => $array ) {
			switch ( $type ) {

				case 'blocks':
					$this->require_entry_points( $plugins['blocks'] );
					break;

				case 'custom-post-types':
					$this->require_entry_points( $plugins['custom-post-types'] );
					break;

				default:
					error_log( "ERROR: Plugin type '{$type}' not recognised." );
			}
		}
	}


	/**
	 * Register blocks.
	 *
	 * @param array $plugin_paths Relative paths to plugin entrypoints.
	 */
	private function require_entry_points( $plugin_paths ) {
		foreach ( $plugin_paths as $rel_path ) {
			require_once LW_DIR . $rel_path;
		}
	}
}
