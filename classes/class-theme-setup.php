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
	public function __construct() {
		// Methods in this class.
		add_action( 'wp_enqueue_scripts', array( $this, 'register_front_end_scripts_and_styles' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'register_admin_scripts_and_styles' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'register_editor_scripts_and_styles' ) );
		add_action( 'widgets_init', array( $this, 'register_widget_areas' ) );
		add_filter( 'body_class', array( $this, 'add_body_classes' ) );
		add_action( 'wp_head', array( $this, 'add_pingback_header' ) );
		add_action( 'after_setup_theme', array( $this, 'theme_configuration_and_features' ) );
		add_action( 'init', array( $this, 'register_taxonomy_for_default_posts' ) );
		add_filter( 'site_icon_image_sizes', array( $this, 'add_custom_site_icon_sizes' ) );
		self::register_menu_locations();
		self::remove_prefix_from_category_titles();
		self::customise_sitemap();
		self::set_auto_update_state();
		self::disable_wpautop();
		self::setup_custom_post_types();
		self::modify_head_content();
		self::register_plugins();

		// External classes.
		add_action( 'admin_init', array( new Settings_Admin(), '__construct' ) );
		add_action( 'init', array( new Register_Patterns(), '__construct' ) );
		add_filter( 'safe_style_css', fn( $styles ) => Escape::get_safe_styles( $styles ) );
	}


	/**
	 * Register front end scripts and styles.
	 */
	public function register_front_end_scripts_and_styles() {
		if ( $GLOBALS['pagenow'] !== 'wp-login.php' ) {
			wp_enqueue_style( 'lonewolf_css', LW_URL . 'assets/css/lonewolf.css', array(), filemtime( LW_DIR . 'assets/css/lonewolf.css' ), 'all' );
			wp_enqueue_script( 'gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', array(), '3.12.2', true );
			wp_enqueue_script( 'gsap_scrolltrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', array( 'gsap' ), '3.12.2', true );
			wp_enqueue_script( 'lonewolf_js', LW_URL . 'assets/js/lonewolf.js', array( 'gsap', 'gsap_scrolltrigger' ), filemtime( LW_DIR . 'assets/js/lonewolf.js' ), true );
		}
	}


	/**
	 * Register admin scripts and styles.
	 */
	public function register_admin_scripts_and_styles() {
		if ( is_admin() && $GLOBALS['pagenow'] !== 'wp-login.php' ) {
			wp_enqueue_media(); // Initialise wp.media to handle the admin media upload/select modal.
			wp_enqueue_style( 'lonewolf_admin_css', LW_URL . 'assets/css/lonewolf-admin.css', array(), filemtime( LW_DIR . 'assets/css/lonewolf-admin.css' ), 'all' );
			wp_enqueue_script( 'lonewolf_admin_js', LW_URL . 'assets/js/lonewolf-admin.js', array(), filemtime( LW_DIR . 'assets/js/lonewolf-admin.js' ), true );
		}
	}


	/**
	 * Register editor scripts and styles.
	 *
	 * WP is supposed to include frontend styles in the editor apparently, but it doesn't. Loading
	 * here until I have time to investigate.
	 */
	public function register_editor_scripts_and_styles() {
		wp_enqueue_style( 'lonewolf_css', LW_URL . 'assets/css/lonewolf.css', array(), filemtime( LW_DIR . 'assets/css/lonewolf.css' ), 'all' );
		wp_enqueue_style( 'lonewolf_editor_css', LW_URL . 'assets/css/lonewolf-editor.css', array(), filemtime( LW_DIR . 'assets/css/lonewolf-editor.css' ), 'all' );
		wp_enqueue_script( 'lonewolf_editor_js', LW_URL . 'assets/js/lonewolf-editor.js', array(), filemtime( LW_DIR . 'assets/js/lonewolf-editor.js' ), true );
	}


	/**
	 * Register widget areas.
	 */
	public function register_widget_areas() {
		register_sidebar(
			array(
				'name'          => esc_html__( 'Left Sidebar', 'lonewolf' ),
				'id'            => 'sidebar-left',
				'description'   => esc_html__( 'Used for article contents and includes right sidebar content at mid-width.', 'lonewolf' ),
				'before_widget' => '<section id="%1$s" class="sauce widget %2$s">',
				'after_widget'  => '</section>',
				'before_title'  => '<span class="widget_title">',
				'after_title'   => '</span>',
			)
		);
		register_sidebar(
			array(
				'name'          => esc_html__( 'Right Sidebar', 'lonewolf' ),
				'id'            => 'sidebar-right',
				'description'   => esc_html__( 'Used for related content and unimportant stuff.', 'lonewolf' ),
				'before_widget' => '<section id="%1$s" class="sauce widget %2$s">',
				'after_widget'  => '</section>',
				'before_title'  => '<span class="widget_title">',
				'after_title'   => '</span>',
			)
		);
	}


	/**
	 * Add custom classes to the HTML body element.
	 */
	public function add_body_classes( $classes ) {
		// Home.
		if ( is_front_page() ) {
			$classes[] = 'lw__home';
		}
		// Page type.
		if ( is_page_template( 'page-templates/landing-page.php' ) ) {
			$classes[] = 'lw__pag-landing';
		} elseif ( is_home() ) {
			$classes[] = 'lw__pag-posts';
		} elseif ( is_category() ) {
			$classes[] = 'lw__pag-category';
		} elseif ( is_archive() ) {
			$classes[] = 'lw__pag-archive';
		} elseif ( is_singular() ) {
			$classes[] = 'lw__pag-singular';
		} else {
			$classes[] = 'lw__pag-typeunknown';
		}
		// Template.
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


	/**
	 * Setup theme defaults and register support for WordPress features.
	 */
	public function theme_configuration_and_features() {
		load_theme_textdomain( 'lonewolf', get_template_directory() . '/languages' );
		add_theme_support( 'block-template-parts' );
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'post-thumbnails' );
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
	 * Register menu locations.
	 */
	public static function register_menu_locations() {
		register_nav_menus(
			array(
				'mobile-popup-menu'           => esc_html__( 'Mobile Popup Menu', 'lonewolf' ),
				'global-primary-menu'         => esc_html__( 'Global Header Menu', 'lonewolf' ),
				'global-secondary-menu'       => esc_html__( 'Global Footer Menu', 'lonewolf' ),
				'global-legal-links'          => esc_html__( 'Global Legal Links', 'lonewolf' ),
				'landing-page-primary-menu'   => esc_html__( 'Landing Page Header Menu', 'lonewolf' ),
				'landing-page-secondary-menu' => esc_html__( 'Landing Page Footer Menu', 'lonewolf' ),
			)
		);
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
	public static function modify_head_content() {
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

		// Hook theme SEO and other meta.
		$head_meta = new Head_Meta();
		$head_meta->hook();
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


	/**
	 * Register custom post types.
	 */
	private function setup_custom_post_types() {
		$data   = Util::get_contents( LW_DIR . 'data/customPostTypes.json' );
		$cpts   = json_decode( $data, true );
		$option = get_option( 'lw_settings_features' );
		if ( ! is_array( $option ) ) {
			return;
		}
		$enabled = array(
			$option['cpt_services'] ? 'service' : false,
			$option['cpt_reviews'] ? 'review' : false,
			$option['cpt_projects'] ? 'project' : false,
		);
		foreach ( $cpts as $cpt ) {
			if ( in_array( $cpt['key'], $enabled, true ) ) {
				new Custom_Post_Type( $cpt );
			}
		}
		// Enable WP custom fields even if ACF is installed.
		add_filter( 'acf/settings/remove_wp_meta_box', '__return_false' );
	}


	/**
	 * Register plugins.
	 */
	private function register_plugins() {
		$register = new Register_Plugins();
	}


	/**
	 * Add site icon (favicon) sizes.
	 */
	public function add_custom_site_icon_sizes( $sizes ) {
		$sizes[] = 96;
		return $sizes;
	}

}
