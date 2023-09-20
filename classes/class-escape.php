<?php
namespace BigupWeb\Lonewolf;

/**
 * Escape filters and args for use with wp_kses().
 *
 * @package lonewolf
 */
class Escape {


	/**
	 * Paths to json data.
	 */
	private const PATHS = array(
		'html_global' => LW_DIR . 'data/htmlGlobalAttributes.json',
		'html_head'   => LW_DIR . 'data/htmlHeadAttributes.json',
		'html_svg'    => LW_DIR . 'data/htmlSVGAttributes.json',
		'css_props'   => LW_DIR . 'data/cssProperties.json',
	);


	/**
	 * Escape and print HTML head markup.
	 *
	 * @param string $markup HTML markup to be escaped.
	 */
	public static function head( $markup ) {
		$args = self::get_html_attributes_as_kses_args( self::PATHS['html_head'] );
		echo wp_kses( $markup, $args );
	}


	/**
	 * Escape and print SVG markup.
	 *
	 * @param string $markup HTML markup to be escaped.
	 */
	public static function svg( $markup ) {
		$args = self::get_html_attributes_as_kses_args( self::PATHS['html_svg'] );
		echo wp_kses( $markup, $args );
	}


	/**
	 * Get global HTML attributes from JSON.
	 */
	private static function get_global_html_attributes() {
		$json              = Util::get_contents( self::PATHS['html_global'] );
		$global_attributes = json_decode( $json, true );
		return $global_attributes;
	}


	/**
	 * Get HTML attributes from JSON and return them as kses-args.
	 *
	 * @param string $path Path to JSON file.
	 */
	private static function get_html_attributes_as_kses_args( $path ) {
		$json              = Util::get_contents( $path );
		$html_tags         = json_decode( $json, true );
		$global_attributes = self::get_global_html_attributes();
		$args              = array();
		foreach ( $html_tags as $html_tag => $html_attributes ) {
			$allowed = array_merge( $html_attributes, $global_attributes );
			$tag     = strtolower( $html_tag );
			foreach ( $allowed as $html_attribute ) {
				$attribute                  = strtolower( $html_attribute );
				$args[ $tag ][ $attribute ] = true;
			}
		}
		return $args;
	}


	/**
	 * Add props to WP safe styles so they don't get stripped by kses.
	 *
	 * @param array $styles Array of CSS properties.
	 */
	public static function get_safe_styles( $styles ) {
		$json           = Util::get_contents( self::PATHS['css_props'] );
		$css_properties = json_decode( $json, true );
		foreach ( $css_properties as $properties ) {
			foreach ( $properties as $property ) {
				$styles[] = strtolower( $property );
			}
		}
		return $styles;
	}
}
