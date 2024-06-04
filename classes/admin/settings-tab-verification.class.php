<?php
namespace BigupWeb\Lonewolf;

/**
 * Settings Tab - Verification.
 *
 * @package lonewolf
 */
class Settings_Tab_Verification {

	public const PAGE   = 'lw_page_verification';
	public const GROUP  = 'lw_group_verification';
	public const OPTION = 'lw_settings_verification';

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

		// ==================================================== Verification Key Section

		add_settings_section(
			'section_verification_key',
			'Verification Keys',
			array( $this, 'section_verification_key_callback' ),
			self::PAGE
		);

			add_settings_field(
				'google_verification_key',
				'Google verification key',
				array( $this, 'google_verification_key_callback' ),
				self::PAGE,
				'section_verification_key'
			);

			add_settings_field(
				'microsoft_verification_key',
				'Microsoft verification key',
				array( $this, 'microsoft_verification_key_callback' ),
				self::PAGE,
				'section_verification_key'
			);
	}


	public function sanitize( $input ) {
		$sanitary_values = array();

		if ( isset( $input['google_verification_key'] ) ) {
			$sanitary_values['google_verification_key'] = Sanitize::general_api_key( $input['google_verification_key'] );
		}

		if ( isset( $input['microsoft_verification_key'] ) ) {
			$sanitary_values['microsoft_verification_key'] = Sanitize::general_api_key( $input['microsoft_verification_key'] );
		}

		return $sanitary_values;
	}


	// ================================================ Section Description Callbacks


	public function section_verification_key_callback() {
		echo '<p>Set verification keys to be inserted into head meta for external services.</p>';
	}


	// =============================================== Settings Input Field Callbacks


	public function google_verification_key_callback() {
		$field = array(
			'input_type'  => 'text',
			'id'          => 'google_verification_key',
			'placeholder' => '',
			'required'    => '',
		);
		$value = isset( $this->settings[ $field['id'] ] ) ? esc_attr( $this->settings[ $field['id'] ] ) : '';
		$name  = self::OPTION . '[' . $field['id'] . ']';
		echo Get_Input::markup( $field, $value, $name );
	}

	public function microsoft_verification_key_callback() {
		$field = array(
			'input_type'  => 'text',
			'id'          => 'microsoft_verification_key',
			'placeholder' => '',
			'required'    => '',
		);
		$value = isset( $this->settings['microsoft_verification_key'] ) ? esc_attr( $this->settings['microsoft_verification_key'] ) : '';
		$name  = self::OPTION . '[microsoft_verification_key]';
		echo Get_Input::markup( $field, $value, $name );
	}
}
