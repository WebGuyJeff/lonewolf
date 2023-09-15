<?php
namespace BigupWeb\Lonewolf;

/**
 * Head Metadata Hook
 *
 * Builds and inserts metadata into the head.
 *
 * @package lonewolf
 */
class Head_Meta {

	/**
	 * Constants (need a source).
	 */
	private const SETTINGS = array(
		'siteauthor' => 'Jefferson Real',
		'localealt'  => 'en_US',
		'objecttype' => 'website',
	);

	/**
	 * Hook into `wp_head`.
	 */
	public function hook() {
		// Remove default title meta function.
		remove_action( 'wp_head', '_wp_render_title_tag', 1 );
		add_action( 'wp_head', array( $this, 'print_head_meta' ), 1 );
	}


	/**
	 * Generate and print the head meta.
	 */
	public function print_head_meta() {
		$seo_vars          = $this->get_seo_vars();
		$seo_meta          = $this->get_seo_meta( $seo_vars );
		$verification_keys = $this->get_verification_keys();
		$verification_meta = $this->get_verification_meta( $verification_keys );

		$head_meta  = "<!-- Bigup Web Meta START -->\n";
		$head_meta .= $seo_meta . $verification_meta;
		$head_meta .= "<!-- Bigup Web Meta END -->\n";

		echo wp_kses(
			$head_meta,
			array(
				'title' => array(),
				'meta'  => array(
					'charset'  => array(),
					'name'     => array(),
					'content'  => array(),
					'property' => array(),
				),
				'link'  => array(
					'rel'   => array(),
					'href'  => array(),
					'sizes' => array(),
				),
			)
		);
	}


	/**
	 * Return the first non-empty array value as a string.
	 *
	 * @return string The first non-empty value or empty string on failure.
	 * @param array $array The array to check for non-empty values.
	 */
	private function first_not_empty( $array ) {
		$string = '';
		if ( is_array( $array ) ) {
			foreach ( $array as &$value ) {
				$trimmed = trim( $value, ' ' );
				if ( ! empty( $trimmed ) ) {
					$string = $trimmed;
					goto end;
				}
			}
			end:
			unset( $value );
			if ( empty( $string ) ) {
				$string = '';
			}
		}
		return $string;
	}


	/**
	 * Parse string with regular expression to find an image src.
	 *
	 * @return string image src string without quotes.
	 * @param string $content The passed content to search.
	 */
	private function extract_image_from_content( $content ) {
		$url = '';

		if ( isset( $content ) && $content !== '' ) {

			if ( is_array( $content ) ) {
				implode( $content );
			}

			$regex = '/src="([^"]*)"/';
			preg_match_all( $regex, $content, $matches, PREG_PATTERN_ORDER );

			if ( isset( $matches[0][0] ) ) {
				$match     = $matches[0][0];
				$url_parts = explode( '"', $match, 3 );
				$url       = $url_parts[1];

			} else {
				$url = '';
			}
		} else {
			$url = '';
		}
			return $url;
	}

	/**
	 * Populate the SEO meta variables.
	 *
	 * @return array Array of meta variables.
	 */
	private function get_seo_vars() {

		/* Sitewide */
		$lw_sitetitle = wp_strip_all_tags( get_bloginfo( 'name', 'display' ) );
		$lw_blogtitle = wp_strip_all_tags( get_the_title( get_option( 'page_for_posts', true ) ) );
		$lw_sitedesc  = wp_strip_all_tags( get_bloginfo( 'description', 'display' ) );
		$lw_url       = esc_url( home_url( '/', 'https' ) );
		$lw_themeuri  = trailingslashit( get_template_directory_uri() );
		$lw_sitelogo  = esc_url( wp_get_attachment_url( get_theme_mod( 'custom_logo' ) ) );
		$lw_locale    = wp_strip_all_tags( get_bloginfo( 'language' ) );
		$lw_charset   = wp_strip_all_tags( get_bloginfo( 'charset' ) );

		/* Page-Specific */
		$post = get_post();// Set up the post manually
		setup_postdata( $post );
		$lw_postid      = get_the_ID();
		$lw_postcontent = get_post_field( 'post_content', $lw_postid, '' );
		$lw_postimage   = esc_url( $this->extract_image_from_content( $lw_postcontent ) );
		$lw_posttitle   = wp_strip_all_tags( get_the_title() );
		$lw_permalink   = esc_url( get_permalink() );

		/* Set scope */
		$lw_catexcerpt   = '';
		$lw_archivetitle = '';
		$lw_postexcerpt  = '';
		$lw_postauthor   = '';

		/* scrape conditionally by page type */
		if ( is_category() ) { // User may have set desc.
			$lw_catexcerpt = preg_split( '/[.?!]/', wp_strip_all_tags( category_description(), true ) )[0] . '.';
		}
		if ( is_archive() ) { // Also matches categories (don't set vars twice).
			$lw_archivetitle = wp_strip_all_tags( post_type_archive_title( '', false ) );
			$lw_thumbnail    = esc_url( get_the_post_thumbnail_url( $lw_postid ) );
		} else {
			$lw_postexcerpt = preg_split( '/[.?!]/', wp_strip_all_tags( $lw_postcontent, true ) )[0] . '.';
			$lw_postauthor  = wp_strip_all_tags( get_the_author() );
			$lw_thumbnail   = esc_url( get_the_post_thumbnail_url( $lw_postid ) );
		}

		/* choose the most suitable scraped value with preference order by page type */
		if ( is_front_page() ) {
			$lw_title   = ucwords( $lw_sitetitle );
			$lw_desc    = ucfirst( $this->first_not_empty( array( $lw_sitedesc, $lw_postexcerpt ) ) );
			$lw_author  = ucwords( $this->first_not_empty( array( self::SETTINGS['siteauthor'], $lw_postauthor ) ) );
			$lw_canon   = $lw_url;
			$lw_ogimage = $this->first_not_empty( array( $lw_sitelogo, $lw_thumbnail, $lw_postimage ) );

		} elseif ( is_home() ) {
			$lw_title   = ucwords( $this->first_not_empty( array( $lw_blogtitle, $lw_sitetitle ) ) );
			$lw_desc    = ucfirst( $this->first_not_empty( array( $lw_postexcerpt, $lw_sitedesc ) ) );
			$lw_author  = ucwords( self::SETTINGS['siteauthor'] );
			$lw_canon   = $this->trailingslashit( $lw_permalink );
			$lw_ogimage = $this->first_not_empty( array( $lw_thumbnail, $lw_sitelogo, $lw_postimage ) );

		} elseif ( is_category() ) {
			$lw_title   = ucwords( $this->first_not_empty( array( $lw_archivetitle, $lw_posttitle ) ) );
			$lw_desc    = ucfirst( $this->first_not_empty( array( $lw_catexcerpt, $lw_postexcerpt, $lw_sitedesc ) ) );
			$lw_author  = ucwords( $this->first_not_empty( array( $lw_postauthor, self::SETTINGS['siteauthor'] ) ) );
			$lw_canon   = $this->trailingslashit( $lw_permalink );
			$lw_ogimage = $this->first_not_empty( array( $lw_thumbnail, $lw_postimage, $lw_sitelogo ) );

		} elseif ( is_archive() ) {
			$lw_title   = ucwords( $this->first_not_empty( array( $lw_archivetitle, $lw_posttitle ) ) );
			$lw_desc    = ucfirst( $this->first_not_empty( array( $lw_catexcerpt, $lw_postexcerpt, $lw_sitedesc ) ) );
			$lw_author  = ucwords( $this->first_not_empty( array( $lw_postauthor, self::SETTINGS['siteauthor'] ) ) );
			$lw_canon   = $this->trailingslashit( $lw_permalink );
			$lw_ogimage = $this->first_not_empty( array( $lw_thumbnail, $lw_postimage, $lw_sitelogo ) );

		} elseif ( is_singular() ) {
			$lw_title   = ucwords( $lw_posttitle );
			$lw_desc    = ucfirst( $lw_postexcerpt );
			$lw_author  = ucwords( $lw_postauthor );
			$lw_canon   = $this->trailingslashit( $lw_permalink );
			$lw_ogimage = $this->first_not_empty( array( $lw_postimage, $lw_thumbnail, $lw_sitelogo ) );

		} else {
			echo '<!-- SEO META FALLBACK - WP TEMLPATE NOT MATCHED -->';
			$lw_title   = ucwords( $this->first_not_empty( array( $lw_posttitle, $lw_archivetitle, $lw_sitetitle ) ) );
			$lw_desc    = ucfirst( $this->first_not_empty( array( $lw_postexcerpt, $lw_catexcerpt, $lw_sitedesc ) ) );
			$lw_author  = ucwords( $this->first_not_empty( array( $lw_postauthor, self::SETTINGS['siteauthor'] ) ) );
			$lw_canon   = $this->trailingslashit( $lw_permalink );
			$lw_ogimage = $this->first_not_empty( array( $lw_thumbnail, $lw_postimage, $lw_sitelogo ) );
		}

		$meta = array(
			'title'       => $lw_title,
			'desc'        => $lw_desc,
			'author'      => self::SETTINGS['siteauthor'],
			'canon'       => $lw_canon,
			'ogimage'     => $lw_ogimage,
			'ogtitle'     => $lw_title,
			'ogtype'      => self::SETTINGS['objecttype'],
			'ogurl'       => $lw_canon,
			'oglocale'    => $lw_locale,
			'oglocalealt' => self::SETTINGS['localealt'],
			'ogdesc'      => $lw_desc,
			'ogsitename'  => $lw_sitetitle,
			'charset'     => $lw_charset,
			'url'         => $lw_url,
			'themeuri'    => $lw_themeuri,
		);

		return $meta;
	}

	/**
	 * Generate the SEO meta HTML.
	 *
	 * @return string HTML to be inserted into head.
	 * @param array $meta The array of SEO meta data variables.
	 */
	private function get_seo_meta( $meta ) {
		$head_meta =
			'<meta charset="' . $meta['charset'] . '">' .
			'<meta name="viewport" content="width=device-width, initial-scale=1">' .
			'<title>' . $meta['title'] . '</title>' .
			'<meta name="description" content="' . $meta['desc'] . '">' .
			'<meta name="author" content="' . $meta['author'] . '">' .
			'<link rel="canonical" href="' . $meta['canon'] . '">' .
			'<!-- Open Graph Meta - html tag namespace must match og:type -->' .
			'<meta property="og:title" content="' . $meta['ogtitle'] . '">' .
			'<meta property="og:type" content="' . $meta['ogtype'] . '">' .
			'<meta property="og:image" content="' . $meta['ogimage'] . '">' .
			'<meta property="og:url" content="' . $meta['ogurl'] . '">' .
			'<meta property="og:locale" content="' . $meta['oglocale'] . '">' .
			'<meta property="og:locale:alternate" content="' . $meta['oglocalealt'] . '">' .
			'<meta property="og:description" content="' . $meta['ogdesc'] . '">' .
			'<meta property="og:site_name" content="' . $meta['ogsitename'] . '">' .
			'<!-- Branding Meta -->' .
			'<!-- Favicon and Web App Definitions -->' .
			'<meta name="application-name" content="Jefferson Real - Web Development">' .
			'<meta name="msapplication-TileColor" content="#fff">' .
			'<meta name="msapplication-TileImage" content="' . $meta['themeuri'] . 'assets/img/favicon/mstile-144x144.png">' .
			'<meta name="msapplication-square70x70logo" content="' . $meta['themeuri'] . 'assets/img/favicon/mstile-70x70.png">' .
			'<meta name="msapplication-square150x150logo" content="' . $meta['themeuri'] . 'assets/img/favicon/mstile-150x150.png">' .
			'<meta name="msapplication-wide310x150logo" content="' . $meta['themeuri'] . 'assets/img/favicon/mstile-310x150.png">' .
			'<meta name="msapplication-square310x310logo" content="' . $meta['themeuri'] . 'assets/img/favicon/mstile-310x310.png">' .
			'<!-- Mobile Browser Colours -->' .
			'<!-- Chrome, Firefox OS and Opera -->' .
			'<meta name="theme-color" content="#262422">' .
			'<!-- Windows Phone -->' .
			'<meta name="msapplication-navbutton-color" content="#262422">' .
			'<!-- iOS Safari -->' .
			'<meta name="apple-mobile-web-app-capable" content="yes">' .
			'<meta name="apple-mobile-web-app-status-bar-style" content="#262422">' .
			'<!-- Favicons and vendor-specific icons -->' .
			'<link rel="shortcut icon" href="' . $meta['themeuri'] . 'assets/img/favicon/favicon.ico" type="image/x-icon">' .
			'<link rel="apple-touch-icon" sizes="57x57" href="' . $meta['themeuri'] . 'assets/img/favicon/apple-touch-icon-57x57.png">' .
			'<link rel="apple-touch-icon" sizes="114x114" href="' . $meta['themeuri'] . 'assets/img/favicon/apple-touch-icon-114x114.png">' .
			'<link rel="apple-touch-icon" sizes="72x72" href="' . $meta['themeuri'] . 'assets/img/favicon/apple-touch-icon-72x72.png">' .
			'<link rel="apple-touch-icon" sizes="144x144" href="' . $meta['themeuri'] . 'assets/img/favicon/apple-touch-icon-144x144.png">' .
			'<link rel="apple-touch-icon" sizes="60x60" href="' . $meta['themeuri'] . 'assets/img/favicon/apple-touch-icon-60x60.png">' .
			'<link rel="apple-touch-icon" sizes="120x120" href="' . $meta['themeuri'] . 'assets/img/favicon/apple-touch-icon-120x120.png">' .
			'<link rel="apple-touch-icon" sizes="76x76" href="' . $meta['themeuri'] . 'assets/img/favicon/apple-touch-icon-76x76.png">' .
			'<link rel="apple-touch-icon" sizes="152x152" href="' . $meta['themeuri'] . 'assets/img/favicon/apple-touch-icon-152x152.png">' .
			'<link rel="icon" type="image/png" href="' . $meta['themeuri'] . 'assets/img/favicon/favicon-196x196.png" sizes="196x196">' .
			'<link rel="icon" type="image/png" href="' . $meta['themeuri'] . 'assets/img/favicon/favicon-96x96.png" sizes="96x96">' .
			'<link rel="icon" type="image/png" href="' . $meta['themeuri'] . 'assets/img/favicon/favicon-32x32.png" sizes="32x32">' .
			'<link rel="icon" type="image/png" href="' . $meta['themeuri'] . 'assets/img/favicon/favicon-16x16.png" sizes="16x16">' .
			'<link rel="icon" type="image/png" href="' . $meta['themeuri'] . 'assets/img/favicon/favicon-128.png" sizes="128x128">';
		return $head_meta;
	}


	/**
	 * Get the verification keys from saved settings.
	 *
	 * @return array Array of verification name/content pairs.
	 */
	private function get_verification_keys() {
		$option = get_option( 'lw_settings_verification' );
		$keys   = array(
			'google-site-verification' => $option['google_verification_key'],
			'msvalidate.01'            => $option['microsoft_verification_key'],
		);
		return $keys;
	}


	/**
	 * Generate the verification meta HTML.
	 *
	 * @return string HTML to be inserted into head.
	 * @param array $data The array of verification names and content.
	 */
	private function get_verification_meta( $keys ) {
		$verification_meta = "<!-- Site verification -->\n";
		foreach ( $keys as $key => $value ) {
			$verification_meta .= "<meta name=\"${key}\" content=\"${value}\" />\n";
		}
		return $verification_meta;
	}
}
