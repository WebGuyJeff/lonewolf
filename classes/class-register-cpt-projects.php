<?php
namespace BigupWeb\Lonewolf;

/**
 * Register Projects Custom Post Type - Lonewolf Theme.
 *
 * This post type will store example projects for a portfolio.
 *
 * @package lonewolf
 */

class Register_CPT_Projects {

	// Custom post type ID.
	private const CPTKEY = 'project';

	// Custom post type label.
	private const CPTLABEL = 'Projects';

	// Custom post type slug.
	public const CPTSLUG = 'edit.php?post_type=' . self::CPTKEY;

	// Prefix for storing custom fields in the postmeta table.
	private const PREFIX = '_lwpr_';

	// Metabox ID.
	private const METABOXID = 'project-meta';

	// Define custom meta fields.
	private const CUSTOMFIELDS = array(
		array(
			'suffix'       => '_project_url',
			'label'        => 'Project URL',
			'description'  => 'Link to learn more. E.g the live project or a full blog post',
			'input_type'   => 'url',
			'placeholder'  => 'https://my-website.com/my-project/',
			'length_limit' => '300',
			'required'     => 'required',
		),
		array(
			'suffix'       => '_repository_url',
			'label'        => 'Repository URL',
			'description'  => 'Link to the project repository',
			'input_type'   => 'url',
			'placeholder'  => 'https://my-repos.com/my-repo/',
			'length_limit' => '300',
			'required'     => '',
		),
		array(
			'suffix'        => '_display_order',
			'label'         => 'Display Order',
			'description'   => 'Lower numbers have higher priority',
			'input_type'    => 'number',
			'number_min'    => 0,
			'number_max'    => 100,
			'number_step'   => 1,
			'required'      => '',
			'sanitize_type' => 'number',
			'var_type'      => 'integer',

		),
		array(
			'suffix'      => '_featured',
			'label'       => 'Featured',
			'description' => 'Whether this post will display in featured template areas',
			'input_type'  => 'checkbox',
		),
	);


	/**
	 * Register the custom post type.
	 */
	public function create_cpt() {
		register_post_type(
			self::CPTKEY,
			array(
				'labels'              => array(
					'name'               => 'Projects',
					'singular_name'      => 'Project',
					'add_new'            => 'New Project',
					'add_new_item'       => 'Add New Project',
					'edit_item'          => 'Edit Project',
					'new_item'           => 'New Project',
					'view_item'          => 'View Project',
					'search_items'       => 'Search Projects',
					'not_found'          => 'No Projects Found',
					'not_found_in_trash' => 'No Projects found in Trash',
				),
				'supports'            => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
				'description'         => 'A collection of projects.',
				'public'              => true,
				'exclude_from_search' => false,
				'publicly_queryable'  => true,
				'query_var'           => true,
				'show_in_menu'        => true,
				'menu_position'       => 5,
				'menu_icon'           => 'dashicons-portfolio',
				'hierarchical'        => false,
				'taxonomies'          => array( 'category', 'post_tag' ),
				'show_in_rest'        => true,
				'delete_with_user'    => false,
			)
		);
		register_taxonomy_for_object_type( 'category', self::CPTKEY );
		register_taxonomy_for_object_type( 'post_tag', self::CPTKEY );
		add_action( 'admin_menu', array( &$this, 'create_custom_fields' ) );
		add_action( 'save_post', array( &$this, 'save_custom_fields' ), 1, 2 );
		add_action( 'do_meta_boxes', array( &$this, 'remove_default_custom_fields' ), 10, 3 );
		add_action( 'below_parent_settings_page_heading', array( &$this, 'echo_cpt_link_callback' ) );
	}


	/**
	 * Remove default custom fields meta box.
	 */
	public function remove_default_custom_fields( $type, $context, $post ) {
		foreach ( array( 'normal', 'advanced', 'side' ) as $context ) {
			remove_meta_box( 'postcustom', self::CPTKEY, $context );
		}
	}


	/**
	 * Create new custom fields meta box.
	 */
	public function create_custom_fields() {
		add_meta_box( self::METABOXID, 'Post Custom Fields', array( &$this, 'display_custom_fields' ), self::CPTKEY, 'normal', 'high' );
	}


	/**
	 * Display the new custom fields meta box.
	 */
	public function display_custom_fields() {
		global $post;
		?>
		<div class="form-wrap">
			<?php wp_nonce_field( self::METABOXID, self::METABOXID . '_wpnonce', false, true ); ?>
			<table class="form-table" role="presentation">
				<tbody>
					<?php
					foreach ( self::CUSTOMFIELDS as $field ) {
						$field['id'] = self::PREFIX . $field['suffix'];
						echo '<tr>';
						echo '<th scope="row">';
						echo '<label for="' . $field['id'] . '"><b>' . $field['label'] . '</b></label>';
						echo '</th>';
						echo '<td>';

						$value = get_post_meta( $post->ID, $field['id'], true );
						echo Get_Input::markup( $field, $value );

						if ( $field['description'] ) {
							echo '<p>' . $field['description'] . '</p>';
						}
						echo '</td>';
						echo '</tr>';
					} // foreach END.
					?>
				</tbody>
			</table>
		</div>
		<?php
	}


	/**
	 * Save the new Custom Fields values
	 */
	public function save_custom_fields( $post_id, $post ) {
		if ( ! isset( $_POST[ self::METABOXID . '_wpnonce' ] )
			|| ! wp_verify_nonce( $_POST[ self::METABOXID . '_wpnonce' ], self::METABOXID )
			|| ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
		foreach ( self::CUSTOMFIELDS as $field ) {
			$field['id'] = self::PREFIX . $field['suffix'];
			if ( isset( $_POST[ $field['id'] ] ) && trim( $_POST[ $field['id'] ] ) ) {
				$value = $_POST[ $field['id'] ];
				update_post_meta( $post_id, $field['id'], $value );
			} else {
				delete_post_meta( $post_id, $field['id'] );
			}
		}
	}


	/**
	 * Echo link on the dashboard page callback.
	 */
	public function echo_cpt_link_callback() {
		Settings_Admin::echo_dashboard_page_link(
			self::CPTSLUG,
			self::CPTLABEL
		);
	}
}
