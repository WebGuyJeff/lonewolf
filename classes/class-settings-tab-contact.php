<?php
namespace BigupWeb\Lonewolf;

/**
 * Settings Tab - Contact.
 *
 * Settings Index
 * ==============/
 *
 * $lw_theme_settings['lw_email_address']; // Email Address
 * $lw_theme_settings['lw_phone_number'];  // Phone Number
 * $lw_theme_settings['lw_gmaps_api_key']; // Google Maps API Key
 * $lw_theme_settings['lw_facebook_url'];  // Facebook URL
 * $lw_theme_settings['lw_instagram_url']; // Instagram URL
 * $lw_theme_settings['lw_twitter_url'];   // Twitter URL
 * $lw_theme_settings['lw_github_url'];    // Github URL
 *
 * @package lonewolf
 */
class Settings_Tab_Contact {

	public const PAGE  = 'lw_page_theme';
	public const GROUP = 'lw_group_theme';

	public $settings;

	public function init() {

		$this->settings = get_option( 'lw_theme_settings' );

		register_setting(
			self::GROUP,
			'lw_theme_settings',
			array( $this, 'lw_sanitize' )
		);


		// ============================================================= Contact Section


		add_settings_section(
			'lw_contact_section',
			'Contact Information',
			array( $this, 'lw_contact_section_callback' ),
			self::PAGE
		);

			add_settings_field(
				'lw_email_address',
				'Email address',
				array( $this, 'lw_email_address_callback' ),
				self::PAGE,
				'lw_contact_section'
			);

			add_settings_field(
				'lw_phone_number',
				'Phone number',
				array( $this, 'lw_phone_number_callback' ),
				self::PAGE,
				'lw_contact_section'
			);

			add_settings_field(
				'lw_gmaps_api_key',
				'Google Maps API key',
				array( $this, 'lw_gmaps_api_key_callback' ),
				self::PAGE,
				'lw_contact_section'
			);


		// ============================================== Social Media and External Links


		add_settings_section(
			'lw_social_section',
			'Social Media and External Links',
			array( $this, 'lw_social_section_section_callback' ),
			self::PAGE
		);

			add_settings_field(
				'lw_facebook_url',
				'Facebook URL',
				array( $this, 'lw_facebook_url_callback' ),
				self::PAGE,
				'lw_social_section'
			);

			add_settings_field(
				'lw_instagram_url',
				'Instagram URL',
				array( $this, 'lw_instagram_url_callback' ),
				self::PAGE,
				'lw_social_section'
			);

			add_settings_field(
				'lw_twitter_url',
				'Twitter URL',
				array( $this, 'lw_twitter_url_callback' ),
				self::PAGE,
				'lw_social_section'
			);

			add_settings_field(
				'lw_github_url',
				'Github URL',
				array( $this, 'lw_github_url_callback' ),
				self::PAGE,
				'lw_social_section'
			);

	}


	public function lw_sanitize( $input ) {
		$sanitary_values = array();

		if ( isset( $input['lw_email_address'] ) ) {
			$sanitary_values['lw_email_address'] = sanitize_email( $input['lw_email_address'] );
		}

		if ( isset( $input['lw_phone_number'] ) ) {
			$sanitary_values['lw_phone_number'] = sanitize_text_field( $input['lw_phone_number'] );
		}

		if ( isset( $input['lw_gmaps_api_key'] ) ) {
			$sanitary_values['lw_gmaps_api_key'] = sanitize_text_field( $input['lw_gmaps_api_key'] );
		}

		if ( isset( $input['lw_facebook_url'] ) ) {
			$sanitary_values['lw_facebook_url'] = sanitize_text_field( $input['lw_facebook_url'] );
		}

		if ( isset( $input['lw_instagram_url'] ) ) {
			$sanitary_values['lw_instagram_url'] = sanitize_text_field( $input['lw_instagram_url'] );
		}

		if ( isset( $input['lw_twitter_url'] ) ) {
			$sanitary_values['lw_twitter_url'] = sanitize_text_field( $input['lw_twitter_url'] );
		}

		if ( isset( $input['lw_github_url'] ) ) {
			$sanitary_values['lw_github_url'] = sanitize_text_field( $input['lw_github_url'] );
		}

		return $sanitary_values;
	}


	// ================================================ Section Description Callbacks


	public function lw_contact_section_callback() {
		echo '<p>Contact Information displayed across the website.</p>';
	}

	public function lw_social_section_section_callback() {
		echo '<p>Configure external links for social accounts.</p>';
	}


	// =============================================== Settings Input Field Callbacks


	public function lw_email_address_callback() {
		printf(
			'<input class="regular-text" type="email" name="lw_theme_settings[lw_email_address]" id="lw_email_address" value="%s">',
			isset( $this->settings['lw_email_address'] ) ? esc_attr( $this->settings['lw_email_address'] ) : ''
		);
	}

	public function lw_phone_number_callback() {
		printf(
			'<input class="regular-text" type="tel" pattern="[0-9 ]+" name="lw_theme_settings[lw_phone_number]" id="lw_phone_number" value="%s">',
			isset( $this->settings['lw_phone_number'] ) ? esc_attr( $this->settings['lw_phone_number'] ) : ''
		);
	}

	public function lw_gmaps_api_key_callback() {
		printf(
			'<input class="regular-text" type="text" name="lw_theme_settings[lw_gmaps_api_key]" id="lw_gmaps_api_key" value="%s">',
			isset( $this->settings['lw_gmaps_api_key'] ) ? esc_attr( $this->settings['lw_gmaps_api_key'] ) : ''
		);
	}

	public function lw_facebook_url_callback() {
		printf(
			'<input class="regular-text" type="url" name="lw_theme_settings[lw_facebook_url]" id="lw_facebook_url" value="%s">',
			isset( $this->settings['lw_facebook_url'] ) ? esc_url( $this->settings['lw_facebook_url'] ) : ''
		);
	}

	public function lw_instagram_url_callback() {
		printf(
			'<input class="regular-text" type="url" name="lw_theme_settings[lw_instagram_url]" id="lw_instagram_url" value="%s">',
			isset( $this->settings['lw_instagram_url'] ) ? esc_url( $this->settings['lw_instagram_url'] ) : ''
		);
	}

	public function lw_twitter_url_callback() {
		printf(
			'<input class="regular-text" type="url" name="lw_theme_settings[lw_twitter_url]" id="lw_twitter_url" value="%s">',
			isset( $this->settings['lw_twitter_url'] ) ? esc_url( $this->settings['lw_twitter_url'] ) : ''
		);
	}

	public function lw_github_url_callback() {
		printf(
			'<input class="regular-text" type="url" name="lw_theme_settings[lw_github_url]" id="lw_github_url" value="%s">',
			isset( $this->settings['lw_github_url'] ) ? esc_url( $this->settings['lw_github_url'] ) : ''
		);
	}

}
