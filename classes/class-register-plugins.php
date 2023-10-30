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
					$this->register_blocks( $plugins['blocks'] );
					break;


				case 'post-meta-blocks':
					$this->register_post_meta_blocks( $plugins['post-meta-blocks'] );
					break;


				default:
					error_log( "ERROR: Plugin type '{$type}' not recognised." );
			}
		}
	}


	/**
	 * Register blocks.
	 *
	 * @param array $blocks Blocks to register.
	 */
	private function register_blocks( $blocks ) {
		foreach ( $blocks as $data ) {
			$path = LW_DIR . $data['path'];
			add_action(
				'init',
				function() use ( $path ) {
					$result = register_block_type_from_metadata( $path );
					if ( false === $result ) {
						error_log( "ERROR: Block registration failed for path '{$path}'" );
					}
				}
			);
		}
	}

	/**
	 * Register post meta blocks.
	 *
	 * @param array $blocks Blocks to register.
	 */
	private function register_post_meta_blocks( $blocks ) {
		foreach ( $blocks as $data ) {
			$path = LW_DIR . $data['path'];

			// Include index.php to register post meta fields.
			include $path . 'meta-block-reviews.php';

			// Register the meta block with block.json.
			add_action(
				'init',
				function() use ( $path ) {
					$result = register_block_type_from_metadata( $path );
					if ( false === $result ) {
						error_log( "ERROR: Block registration failed for path '{$path}'" );
					}
				}
			);
		}
	}

}
