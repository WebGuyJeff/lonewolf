<?php
namespace BigupWeb\Lonewolf;

/**
 * Settings Tab - Features.
 *
 * @package lonewolf
 */
class Settings_Tab_Features {

	public const PAGE   = 'lw_page_features';
	public const GROUP  = 'lw_group_features';
	public const OPTION = 'lw_settings_features';

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


		// ================================================================== Google Maps


		add_settings_section(
			'section_gmaps',
			'Google Maps',
			array( $this, 'section_gmaps_callback' ),
			self::PAGE
		);

			add_settings_field(
				'gmaps_api_key',
				'Google Maps API key',
				array( $this, 'gmaps_api_key_callback' ),
				self::PAGE,
				'section_gmaps'
			);
	}


	public function sanitize( $input ) {
		$sanitary_values = array();

		if ( isset( $input['gmaps_api_key'] ) ) {
			$sanitary_values['gmaps_api_key'] = Sanitize::key( $input['gmaps_api_key'] );
		}

		return $sanitary_values;
	}


	// ================================================ Section Description Callbacks


	public function section_gmaps_callback() {
		echo '<p>Configure Google maps integration.</p>';
	}


	// =============================================== Settings Input Field Callbacks


	public function gmaps_api_key_callback() {
		$field = array(
			'input_type'  => 'text',
			'id'          => 'gmaps_api_key',
			'placeholder' => '',
			'required'    => '',
		);
		$value = isset( $this->settings['gmaps_api_key'] ) ? esc_attr( $this->settings['gmaps_api_key'] ) : '';
		$name  = self::OPTION . '[gmaps_api_key]';
		echo Get_Input::markup( $field, $value, $name );
	}
}
