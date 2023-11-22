<?php
namespace BigupWeb\Lonewolf;

/**
 * Head Inject Handler.
 *
 * Builds and prints markup for the html head.
 *
 * @package lonewolf
 */
class Head_Inject {


	/**
	 * Verification keys meta markup.
	 */
	private string $verification_markup = '';


	/**
	 * Populate class properties.
	 */
	public function __construct() {
		$keys = $this->get_verification_keys();
		if ( is_array( $keys ) && ! empty( $keys ) ) {
			$this->verification_markup = $this->get_verification_markup( $keys );
		}
	}


	/**
	 * Print head markup.
	 */
	public function print_head_markup() {
		$output  = "<!-- Lonewolf head inject START -->\n";
		$output .= $this->verification_markup;
		$output .= "<!-- Lonewolf head inject END -->\n";

		Escape::head( $output );
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
	private function get_verification_markup( $keys ) {
		$verification_meta = "<!-- Site verification -->\n";
		foreach ( $keys as $key => $value ) {
			$verification_meta .= "<meta name=\"{$key}\" content=\"{$value}\" />\n";
		}
		return $verification_meta;
	}
}
