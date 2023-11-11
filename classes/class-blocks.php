<?php
namespace BigupWeb\Lonewolf;

/**
 * Register blocks included with this theme.
 *
 * @package lonewolf
 */
class Blocks {


	/**
	 * Path to json block index.
	 */
	private const JSONPATH = LW_DIR . 'data/blockPaths.json';

	/**
	 * Block paths.
	 */
	private $blockpaths = array();

	/**
	 * Setup the class.
	 */
	public function __construct() {
		$json             = Util::get_contents( self::JSONPATH );
		$this->blockpaths = json_decode( $json, true );
	}


	/**
	 * Register all blocks.
	 */
	public function register_all() {
		if ( ! is_array( $this->blockpaths ) ) {
			return;
		}
		foreach ( $this->blockpaths as $path ) {
			$block_dir = LW_DIR . $path;
			$result    = register_block_type( $block_dir );
			if ( false === $result ) {
				error_log( "ERROR: Block registration failed for path '{$block_dir}'" );
			}
		}
	}
}
