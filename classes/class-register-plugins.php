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
	private const INDEX = LW_DIR . 'data/plugins.json';


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
					$this->register_json_blocks( $plugins['blocks'] );
					break;

				case 'php_entrypoint':
					$this->require_entry_points( $plugins['php_entrypoint'] );
					break;

				default:
					error_log( "ERROR: Plugin type '{$type}' not recognised." );
			}
		}
	}


	/**
	 * Require enytrpoints for self-registering PHP plugins.
	 *
	 * @param array $php_entrypoints Relative paths to PHP entrypoints.
	 */
	private function require_entry_points( $php_entrypoints ) {
		foreach ( $php_entrypoints as $entrypoint ) {
			require_once LW_DIR . $entrypoint;
		}
	}


	/**
	 * Register `block.json` blocks.
	 *
	 * @param array $block_paths Relative paths to block dirs.
	 */
	public function register_json_blocks( $block_paths ) {
		foreach ( $block_paths as $path ) {
			$block_dir = LW_DIR . $path;
			$result    = register_block_type( $block_dir );
			if ( false === $result ) {
				error_log( "ERROR: Block registration failed for path '{$block_dir}'" );
			}
		}
	}
}
