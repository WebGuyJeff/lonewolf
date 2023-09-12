<?php
namespace BigupWeb\Lonewolf;

/**
 * Settings Tab - Identity.
 *
 * @package lonewolf
 */
class Settings_Tab_Identity {

	public const PAGE   = 'lw_page_identity';
	public const GROUP  = 'lw_group_identity';
	public const OPTION = 'lw_settings_identity';

	public $settings;


	/**
	 * Register the settings.
	 */
	public function init() {

		$this->settings = get_option( self::OPTION );

		register_setting(
			self::GROUP,
			self::OPTION,
			$args = array(
				'sanitize_callback' => array( $this, 'sanitize' ),
			)
		);


		// ============================================================= Contact Section


		add_settings_section(
			'section_contact',
			'Contact Information',
			array( $this, 'section_contact_callback' ),
			self::PAGE
		);

			add_settings_field(
				'email_address',
				'Email address',
				array( $this, 'email_address_callback' ),
				self::PAGE,
				'section_contact'
			);

			add_settings_field(
				'phone_number',
				'Phone number',
				array( $this, 'phone_number_callback' ),
				self::PAGE,
				'section_contact'
			);


		// ============================================== Social Media and External Links


		add_settings_section(
			'section_social',
			'Social Media and External Links',
			array( $this, 'section_social_callback' ),
			self::PAGE
		);

			add_settings_field(
				'facebook_url',
				'Facebook URL',
				array( $this, 'facebook_url_callback' ),
				self::PAGE,
				'section_social'
			);

			add_settings_field(
				'instagram_url',
				'Instagram URL',
				array( $this, 'instagram_url_callback' ),
				self::PAGE,
				'section_social'
			);

			add_settings_field(
				'twitter_url',
				'Twitter URL',
				array( $this, 'twitter_url_callback' ),
				self::PAGE,
				'section_social'
			);

			add_settings_field(
				'github_url',
				'Github URL',
				array( $this, 'github_url_callback' ),
				self::PAGE,
				'section_social'
			);

	}


	public function sanitize( $input ) {
		$sanitary_values = array();

		if ( isset( $input['email_address'] ) ) {
			$sanitary_values['email_address'] = sanitize_email( $input['email_address'] );
		}

		if ( isset( $input['phone_number'] ) ) {
			$sanitary_values['phone_number'] = sanitize_text_field( $input['phone_number'] );
		}

		if ( isset( $input['facebook_url'] ) ) {
			$sanitary_values['facebook_url'] = sanitize_text_field( $input['facebook_url'] );
		}

		if ( isset( $input['instagram_url'] ) ) {
			$sanitary_values['instagram_url'] = sanitize_text_field( $input['instagram_url'] );
		}

		if ( isset( $input['twitter_url'] ) ) {
			$sanitary_values['twitter_url'] = sanitize_text_field( $input['twitter_url'] );
		}

		if ( isset( $input['github_url'] ) ) {
			$sanitary_values['github_url'] = sanitize_text_field( $input['github_url'] );
		}

		return $sanitary_values;
	}


	// ================================================ Section Description Callbacks


	public function section_contact_callback() {
		echo '<p>Contact Information displayed across the website.</p>';
	}

	public function section_social_callback() {
		echo '<p>Configure external links for social accounts.</p>';
	}


	// =============================================== Settings Input Field Callbacks


	public function email_address_callback() {
		$field = array(
			'input_type' => 'email',
			'id'         => 'email_address',
			'required'   => '',
		);
		$value = isset( $this->settings['email_address'] ) ? esc_attr( $this->settings['email_address'] ) : '';
		$name  = self::OPTION . '[email_address]';
		echo Get_Input::markup( $field, $value, $name );
	}

	public function phone_number_callback() {
		$field = array(
			'input_type'   => 'text',
			'id'           => 'phone_number',
			'placeholder'  => '',
			'required'     => '',
			'regex'        => '[0-9 \-\+]+',
			'length_limit' => '20',
		);
		$value = isset( $this->settings['phone_number'] ) ? esc_attr( $this->settings['phone_number'] ) : '';
		$name  = self::OPTION . '[phone_number]';
		echo Get_Input::markup( $field, $value, $name );
	}

	public function facebook_url_callback() {
		$field = array(
			'input_type'  => 'url',
			'id'          => 'facebook_url',
			'placeholder' => '',
			'required'    => '',
		);
		$value = isset( $this->settings['facebook_url'] ) ? esc_attr( $this->settings['facebook_url'] ) : '';
		$name  = self::OPTION . '[facebook_url]';
		echo Get_Input::markup( $field, $value, $name );
	}

	public function instagram_url_callback() {
		$field = array(
			'input_type'  => 'url',
			'id'          => 'instagram_url',
			'placeholder' => '',
			'required'    => '',
		);
		$value = isset( $this->settings['instagram_url'] ) ? esc_attr( $this->settings['instagram_url'] ) : '';
		$name  = self::OPTION . '[instagram_url]';
		echo Get_Input::markup( $field, $value, $name );
	}

	public function twitter_url_callback() {
		$field = array(
			'input_type'  => 'url',
			'id'          => 'twitter_url',
			'placeholder' => '',
			'required'    => '',
		);
		$value = isset( $this->settings['twitter_url'] ) ? esc_attr( $this->settings['twitter_url'] ) : '';
		$name  = self::OPTION . '[twitter_url]';
		echo Get_Input::markup( $field, $value, $name );
	}

	public function github_url_callback() {
		$field = array(
			'input_type'  => 'url',
			'id'          => 'github_url',
			'placeholder' => '',
			'required'    => '',
		);
		$value = isset( $this->settings['github_url'] ) ? esc_attr( $this->settings['github_url'] ) : '';
		$name  = self::OPTION . '[github_url]';
		echo Get_Input::markup( $field, $value, $name );
	}
}
