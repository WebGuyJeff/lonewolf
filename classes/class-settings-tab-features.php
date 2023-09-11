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
	public const OPTION = 'lw_features_settings';

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


		// =================================================== Custom Post Types Section


		add_settings_section(
			'section_cpt',
			'Custom Post Types',
			array( $this, 'section_cpt_callback' ),
			self::PAGE
		);

			add_settings_field(
				'cpt_services',
				'Services custom posts',
				array( $this, 'cpt_services_callback' ),
				self::PAGE,
				'section_cpt'
			);

			add_settings_field(
				'cpt_reviews',
				'Reviews custom posts',
				array( $this, 'cpt_reviews_callback' ),
				self::PAGE,
				'section_cpt'
			);

			add_settings_field(
				'cpt_projects',
				'Projects custom posts',
				array( $this, 'cpt_projects_callback' ),
				self::PAGE,
				'section_cpt'
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

		if ( isset( $input['cpt_services'] ) ) {
			$sanitary_values['cpt_services'] = Sanitize::checkbox( $input['cpt_services'] );
		}

		if ( isset( $input['cpt_reviews'] ) ) {
			$sanitary_values['cpt_reviews'] = Sanitize::checkbox( $input['cpt_reviews'] );
		}

		if ( isset( $input['cpt_projects'] ) ) {
			$sanitary_values['cpt_projects'] = Sanitize::checkbox( $input['cpt_projects'] );
		}

		if ( isset( $input['gmaps_api_key'] ) ) {
			$sanitary_values['gmaps_api_key'] = Sanitize::key( $input['gmaps_api_key'] );
		}

		return $sanitary_values;
	}


	// ================================================ Section Description Callbacks


	public function section_cpt_callback() {
		echo '<p>Enable/disable custom post types.</p>';
	}

	public function section_gmaps_callback() {
		echo '<p>Configure Google maps integration.</p>';
	}


	// =============================================== Settings Input Field Callbacks


	public function cpt_services_callback() {
		$field = array(
			'input_type' => 'checkbox',
			'id'         => 'cpt_services',
		);
		$value = isset( $this->settings['cpt_services'] ) ? esc_attr( $this->settings['cpt_services'] ) : '';
		$name  = self::OPTION . '[cpt_services]';
		echo Get_Input::markup( $field, $value, $name );
	}

	public function cpt_reviews_callback() {
		$field = array(
			'input_type' => 'checkbox',
			'id'         => 'cpt_reviews',
		);
		$value = isset( $this->settings['cpt_reviews'] ) ? esc_attr( $this->settings['cpt_reviews'] ) : '';
		$name  = self::OPTION . '[cpt_reviews]';
		echo Get_Input::markup( $field, $value, $name );
	}

	public function cpt_projects_callback() {
		$field = array(
			'input_type' => 'checkbox',
			'id'         => 'cpt_projects',
		);
		$value = isset( $this->settings['cpt_projects'] ) ? esc_attr( $this->settings['cpt_projects'] ) : '';
		$name  = self::OPTION . '[cpt_projects]';
		echo Get_Input::markup( $field, $value, $name );
	}

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
