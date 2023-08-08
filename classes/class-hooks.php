<?php
namespace BigupWeb\Lonewolf;

/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package lonewolf
 */
class Hooks {


	// init the class on each new instance
	function __construct() {

		add_filter( 'body_class', array( $this, 'add_body_classes' ) );
		add_action( 'wp_head', array( $this, 'add_pingback_header' ) );

	}//end __construct()


	/**
	 * Adds custom classes to the array of body classes.
	 *
	 * @param array $classes Classes for the body element.
	 * @return array
	 */
	public function add_body_classes( $classes ) {

		// Home
		if ( is_front_page() ) { // Homepage
			$classes[] = 'lw__home';
		}

		// Page type
		if ( is_page_template( 'page-templates/landing-page.php' ) ) {
			$classes[] = 'lw__pag-landing';
		} elseif ( is_home() ) { // Posts Page
			$classes[] = 'lw__pag-posts';
		} elseif ( is_category() ) {
			$classes[] = 'lw__pag-category';
		} elseif ( is_archive() ) { // Auto-gen 'cats'
			$classes[] = 'lw__pag-archive';
		} elseif ( is_singular() ) {
			$classes[] = 'lw__pag-singular';
		} else {
			$classes[] = 'lw__pag-typeunknown';
		}

		// Template
		if ( is_page_template( 'column-sidebar' ) ) {
			$classes[] = 'lw__tmp-sidesright';
		} elseif ( is_page_template( 'sidebar-column' ) ) {
			$classes[] = 'lw__tmp-sidesleft';
		} elseif ( is_page_template( 'sidebar-column-sidebar' ) ) {
			$classes[] = 'lw__tmp-sidesboth';
		} elseif ( is_page_template( 'landing-page' ) ) {
			$classes[] = 'lw__tmp-landingpage';
		} elseif ( is_page_template( 'full-width-page' ) ) {
			$classes[] = 'lw__tmp-fullwidthpage';
		}

		return $classes;
	}


	/**
	 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
	 */
	public function add_pingback_header() {
		if ( is_singular() && pings_open() ) {
			printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
		}
	}


}//end class
