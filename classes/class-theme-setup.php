<?php
namespace BigupWeb\Lonewolf;

/**
 * Initialise Lonewolf Theme.
 *
 * Setup styles, functions, configuration and all dependencies for this theme.
 *
 * @package lonewolf
 */
class Theme_Setup {


	/**
	 * Setup all actions, filters and call functions.
	 */
	public function all() {
		// Gut' way to load stylesheet to match editor to frontend... (doesn't seem to override .editor-styles-wrapper).
		add_editor_style( LONEWOLF_URL . 'build/css/lonewolf.css' );

		// Methods in this class.
		add_action( 'wp_enqueue_scripts', array( $this, 'register_front_end_scripts_and_styles' ), 10, 0 );
		add_action( 'admin_enqueue_scripts', array( $this, 'register_admin_scripts_and_styles' ), 10, 0 );
		add_action( 'enqueue_block_editor_assets', array( $this, 'register_editor_scripts_and_styles' ), 10, 0 );
		add_action( 'wp_head', array( $this, 'add_pingback_header' ), 10, 0 );
		add_action( 'wp_head', array( new Head_Inject(), 'print_head_markup' ), 5, 0 );
		add_action( 'after_setup_theme', array( $this, 'theme_supports_and_features' ), 10, 0 );
		add_action( 'init', array( $this, 'register_taxonomy_for_default_posts' ), 10, 0 );
		self::remove_prefix_from_category_titles();
		self::customise_sitemap();
		self::set_auto_update_state();
		self::disable_wpautop();
		self::remove_head_bloat();

		// External classes.
		$Settings_Admin = new Settings_Admin();
		$Settings_Admin->setup();
		add_action( 'init', array( new Patterns(), 'register_categories' ), 10, 0 );
		add_filter( 'safe_style_css', fn( $styles ) => Escape::get_safe_styles( $styles ), 10, 1 );
	}


	/**
	 * Register front end scripts and styles.
	 */
	public function register_front_end_scripts_and_styles() {
		if ( $GLOBALS['pagenow'] !== 'wp-login.php' ) {
			wp_enqueue_style( 'lonewolf_css', LONEWOLF_URL . 'build/css/lonewolf.css', array(), filemtime( LONEWOLF_PATH . 'build/css/lonewolf.css' ), 'all' );
			wp_register_script( 'gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', array(), '3.12.2', true );
			wp_register_script( 'gsap_scrolltrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', array( 'gsap' ), '3.12.2', true );
			wp_enqueue_script( 'lonewolf_js', LONEWOLF_URL . 'build/js/lonewolf.js', array( 'gsap', 'gsap_scrolltrigger' ), filemtime( LONEWOLF_PATH . 'build/js/lonewolf.js' ), true );
		}
		if ( current_user_can( 'manage_options' ) && LONEWOLF_DEBUG ) {
			wp_enqueue_style( 'lonewolf_dev_css', LONEWOLF_URL . 'build/css/lonewolf-dev.css', array(), filemtime( LONEWOLF_PATH . 'build/css/lonewolf-dev.css' ), 'all' );
		}
	}


	/**
	 * Register admin scripts and styles.
	 */
	public function register_admin_scripts_and_styles() {
		if ( is_admin() && $GLOBALS['pagenow'] !== 'wp-login.php' ) {
			wp_enqueue_style( 'lonewolf_admin_css', LONEWOLF_URL . 'build/css/lonewolf-admin.css', array(), filemtime( LONEWOLF_PATH . 'build/css/lonewolf-admin.css' ), 'all' );
		}
		if ( current_user_can( 'manage_options' ) && LONEWOLF_DEBUG ) {
			wp_enqueue_style( 'lonewolf_dev_css', LONEWOLF_URL . 'build/css/lonewolf-dev.css', array(), filemtime( LONEWOLF_PATH . 'build/css/lonewolf-dev.css' ), 'all' );
		}
	}


	/**
	 * Register editor scripts and styles.
	 */
	public function register_editor_scripts_and_styles() {
		wp_enqueue_style( 'lonewolf_editor_css', LONEWOLF_URL . 'build/css/lonewolf-editor.css', array(), filemtime( LONEWOLF_PATH . 'build/css/lonewolf-editor.css' ), 'all' );
	}


	/**
	 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
	 */
	public function add_pingback_header() {
		if ( is_singular() && pings_open() ) {
			printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
		}
	}


	/**
	 * Setup theme defaults and register support for WordPress features.
	 */
	public function theme_supports_and_features() {
		load_theme_textdomain( 'lonewolf', get_template_directory() . '/languages' );
		add_theme_support( 'editor-styles' );
		add_theme_support( 'block-template-parts' );
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'align-wide' );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'custom-spacing' );
		add_theme_support( 'border' );
		add_theme_support( 'link-color' );
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 1000,
				'width'       => 1000,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}


	/**
	 * Enable taxonomy for default post types.
	 */
	public function register_taxonomy_for_default_posts() {
		register_taxonomy_for_object_type( 'post_tag', 'page' );
		register_taxonomy_for_object_type( 'category', 'page' );
	}


	/**
	 * Remove prefix from category titles.
	 */
	public static function remove_prefix_from_category_titles() {
		add_filter(
			'get_the_archive_title',
			function ( $title ) {
				if ( is_category() ) {
					$title = single_cat_title( '', false );
				} elseif ( is_tag() ) {
					$title = single_tag_title( '', false );
				} elseif ( is_author() ) {
					$title = '<span class="vcard">' . get_the_author() . '</span>';
				} elseif ( is_year() ) {
					$title = get_the_date( _x( 'Y', 'yearly archives date format' ) );
				} elseif ( is_month() ) {
					$title = get_the_date( _x( 'F Y', 'monthly archives date format' ) );
				} elseif ( is_day() ) {
					$title = get_the_date( _x( 'F j, Y', 'daily archives date format' ) );
				} elseif ( is_tax( 'post_format' ) ) {
					if ( is_tax( 'post_format', 'post-format-aside' ) ) {
						$title = _x( 'Asides', 'post format archive title' );
					} elseif ( is_tax( 'post_format', 'post-format-gallery' ) ) {
						$title = _x( 'Galleries', 'post format archive title' );
					} elseif ( is_tax( 'post_format', 'post-format-image' ) ) {
						$title = _x( 'Images', 'post format archive title' );
					} elseif ( is_tax( 'post_format', 'post-format-video' ) ) {
						$title = _x( 'Videos', 'post format archive title' );
					} elseif ( is_tax( 'post_format', 'post-format-quote' ) ) {
						$title = _x( 'Quotes', 'post format archive title' );
					} elseif ( is_tax( 'post_format', 'post-format-link' ) ) {
						$title = _x( 'Links', 'post format archive title' );
					} elseif ( is_tax( 'post_format', 'post-format-status' ) ) {
						$title = _x( 'Statuses', 'post format archive title' );
					} elseif ( is_tax( 'post_format', 'post-format-audio' ) ) {
						$title = _x( 'Audio', 'post format archive title' );
					} elseif ( is_tax( 'post_format', 'post-format-chat' ) ) {
						$title = _x( 'Chats', 'post format archive title' );
					}
				} elseif ( is_post_type_archive() ) {
					$title = post_type_archive_title( '', false );
				} elseif ( is_tax() ) {
					$title = single_term_title( '', false );
				} else {
					$title = __( 'Archives' );
				}
				return $title;
			}
		);
	}


	/**
	 * Remove unwanted content from the wp_head hook.
	 */
	public static function remove_head_bloat() {
		remove_action( 'wp_head', 'rsd_link' );
		remove_action( 'wp_head', 'wlwmanifest_link' );
		remove_action( 'wp_head', 'wp_generator' );
		remove_action( 'wp_head', 'index_rel_link' );
		remove_action( 'wp_head', 'wp_site_icon', 99, 0 );
		remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
		remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
		remove_action( 'wp_head', 'adjacent_posts_rel_link', 10, 0 );
		remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );
	}


	/**
	 * Customise the sitemap.
	 */
	public static function customise_sitemap() {
		// Remove USERS from sitemap.
		add_filter(
			'wp_sitemaps_add_provider',
			function ( $provider, $name ) {
				return ( $name == 'users' ) ? false : $provider;
			},
			10,
			2
		);
	}


	/**
	 * Set the theme and plugin auto-update state.
	 */
	public static function set_auto_update_state() {
		add_filter( 'auto_update_plugin', '__return_false' );
		add_filter( 'auto_update_theme', '__return_false' );
	}


	/**
	 * Disable wpautop function.
	 *
	 * By default WP adds p tags on blank template lines (of course?). This disables that.
	 */
	public static function disable_wpautop() {
		// Stop WP adding p tags on blank lines!
		remove_filter( 'the_content', 'wpautop' );
	}
}
