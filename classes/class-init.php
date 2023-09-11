<?php
namespace BigupWeb\Lonewolf;

/**
 * Initialise Lonewolf Theme.
 *
 * Setup styles, functions, configuration and all dependencies for this theme.
 *
 * @package lonewolf
 */
class Init {

	/**
	 * Setup all actions, filters and call functions.
	 */
	public function __construct() {
		// Methods in this class.
		add_action( 'wp_enqueue_scripts', array( $this, 'register_front_end_scripts_and_styles' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'register_admin_scripts_and_styles' ) );
		add_action( 'customize_controls_enqueue_scripts', array( $this, 'register_customizer_scripts_and_styles' ) );
		add_action( 'widgets_init', array( $this, 'register_widget_areas' ) );
		add_filter( 'body_class', array( $this, 'add_body_classes' ) );
		add_action( 'wp_head', array( $this, 'add_pingback_header' ) );
		add_action( 'after_setup_theme', array( $this, 'theme_configuration_and_features' ) );
		add_action( 'init', array( $this, 'register_taxonomy_for_default_posts' ) );
		self::register_menu_locations();
		self::remove_prefix_from_category_titles();
		self::remove_unwanted_wp_head_content();
		self::customise_sitemap();
		self::set_auto_update_state();
		self::register_custom_post_types();

		// External classes.
		add_action( 'admin_init', array( new Settings_Admin(), '__construct' ) );
	}


	/**
	 * Register front end scripts and styles.
	 */
	public function register_front_end_scripts_and_styles() {
		if ( ! is_admin() && $GLOBALS['pagenow'] !== 'wp-login.php' ) {
			wp_enqueue_style( 'style_css', get_template_directory_uri() . '/style.css', array(), filemtime( get_template_directory() . '/style.css' ), 'all' );
			wp_register_script( 'gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js', array( 'jquery' ), '3.9.1', true );
			wp_register_script( 'gsap_scrolltrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js', array( 'gsap' ), '3.9.1', true );
			wp_enqueue_script( 'lw_frontend_js', get_template_directory_uri() . '/js/frontend.js', array( 'gsap', 'gsap_scrolltrigger' ), filemtime( get_template_directory() . '/js/frontend.js' ), true );
		}
	}


	/**
	 * Register admin scripts and styles.
	 */
	public function register_admin_scripts_and_styles() {
		if ( is_admin() && $GLOBALS['pagenow'] !== 'wp-login.php' ) {
			wp_enqueue_media(); // Initialise wp.media to handle and control the admin media upload/select modal.
			wp_enqueue_style( 'admin_css', get_template_directory_uri() . '/style-admin.css', array(), filemtime( get_template_directory() . '/style-admin.css' ), 'all' );
			wp_enqueue_script( 'lw_admin_js', get_template_directory_uri() . '/js/admin.js', array(), filemtime( get_template_directory() . '/js/admin.js' ), true );
		}
	}


	/**
	 * Register customizer scripts and styles.
	 */
	public function register_customizer_scripts_and_styles() {
		global $wp_customize;
		if ( isset( $wp_customize ) ) {
			wp_enqueue_script( 'lw_customizer_js', get_template_directory_uri() . '/js/customizer.js', array(), filemtime( get_template_directory() . '/js/customizer.js' ), true );
		}
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

		// Make theme available for translation. File translations in /languages/ directory.
		load_theme_textdomain( 'lonewolf', get_template_directory() . '/languages' );

		/**
		 * Add block theme support.
		 * 
		 * NOTE: The following supports are enabled automatically when adding block theme support.
		 * Any of these entries further down will be left intact until this theme is fully migrated
		 * to a dedicated block theme.
		 * 
		 * add_theme_support( 'post-thumbnails' );
		 * add_theme_support( 'responsive-embeds' );
		 * add_theme_support( 'editor-styles' );
		 * add_theme_support( 'html5', array( 'style','script', ) );
		 * add_theme_support( 'automatic-feed-links' );
		 */
		add_theme_support( 'block-template-parts' );
		add_theme_support( 'wp-block-styles' );
		add_editor_style( 'style-editor.css' );

		// Enable support for Post Thumbnails on posts and pages.
		add_theme_support( 'post-thumbnails' );

		/*
		// Enable custom image sizes and set the sizes required for the theme.
		add_theme_support( 'pop-up-banner' );
		add_image_size( 'service-tile', 960, 960, TRUE );
		add_image_size( 'review-avatar', 150, 150, TRUE );
		add_image_size( 'full-width-banner', 1920, 480, TRUE );
		add_image_size( 'page-featured', 615, 615, TRUE );
		*/

		// Switch core markup for search form, comment form, and comments to valid HTML5.
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

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		// Add support for core custom logo.
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
	public static function remove_unwanted_wp_head_content() {
		remove_action( 'wp_head', 'rsd_link' );
		remove_action( 'wp_head', 'wlwmanifest_link' );
		remove_action( 'wp_head', 'wp_generator' );
		remove_action( 'wp_head', 'index_rel_link' );
		remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
		remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
		remove_action( 'wp_head', 'adjacent_posts_rel_link', 10, 0 );
		remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		// RSS feeds.
		// remove_action( 'wp_head', 'feed_links', 2 );
		// remove_action( 'wp_head', 'feed_links_extra', 3 );
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
	 * Register custom post types.
	 */
	private function register_custom_post_types() {
		$data = file_get_contents( get_template_directory() . '/data/customPostTypes.json' );
		$cpts = json_decode( $data, true );
		foreach ( $cpts as $cpt ) {
			add_action( 'init', fn() => new Register_Custom_Post_Type( $cpt ) );
		}
		// Enable WP custom fields even if ACF is installed.
		add_filter( 'acf/settings/remove_wp_meta_box', '__return_false' );
	}
}
