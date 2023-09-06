<?php
namespace BigupWeb\Lonewolf;

/**
 * Register Reviews Custom Post Type - Lonewolf Theme.
 *
 * This post type will store customer reviews.
 *
 * @package lonewolf
 */

class Register_CPT_Reviews {

	// Custom post type ID.
	private const CPTKEY = 'review';

	// Custom post type label.
	private const CPTLABEL = 'Reviews';

	// Custom post type slug.
	public const CPTSLUG = 'edit.php?post_type=' . self::CPTKEY;

	// Prefix for storing custom fields in the postmeta table.
	private const PREFIX = '_lwre_';

	// Metabox ID.
	private const METABOXID = 'review-meta';

	// Define custom meta fields.
	private const CUSTOMFIELDS = array(
		array(
			'suffix'      => '_body',
			'label'       => 'Review',
			'description' => 'Main body content of the review',
			'input_type'  => 'textarea',
			'required'    => 'required',
			'rows'        => '10',
			'cols'        => '40',
		),
		array(
			'suffix'       => '_source_url',
			'label'        => 'Source URL',
			'description'  => 'Link to the review source',
			'input_type'   => 'url',
			'placeholder'  => 'https://my-reviews.com/my-review/',
			'length_limit' => '300',
			'required'     => '',
		),
		array(
			'suffix'       => '_name',
			'label'        => 'Reviewer Name',
			'description'  => 'Name of the reviewer',
			'input_type'   => 'text',
			'placeholder'  => 'Peter Pan',
			'length_limit' => '50',
			'required'     => 'required',
		),
		array(
			'suffix'      => '_profile_image',
			'label'       => 'Profile Image',
			'description' => 'Profile image of the reviewer',
			'input_type'  => 'image-upload',
		),
		array(
			'suffix'      => '_icon',
			'label'       => 'Icon',
			'description' => 'Icon to show with the review',
			'input_type'  => 'dashicons-select',
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
					'name'               => 'Reviews',
					'singular_name'      => 'Review',
					'add_new'            => 'New Review',
					'add_new_item'       => 'Add New Review',
					'edit_item'          => 'Edit Review',
					'new_item'           => 'New Review',
					'view_item'          => 'View Review',
					'search_items'       => 'Search Reviews',
					'not_found'          => 'No Reviews Found',
					'not_found_in_trash' => 'No Reviews found in Trash',
				),
				'supports'            => array( 'title', 'custom-fields' ),
				'description'         => 'Feedback and reviews.',
				'public'              => true,
				'exclude_from_search' => false,
				'publicly_queryable'  => true,
				'query_var'           => true,
				'show_in_menu'        => true,
				'menu_position'       => 5,
				'menu_icon'           => 'dashicons-star-filled',
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
		add_action( 'below_parent_settings_page_heading', array( &$this, 'echo_cpt_link' ) );
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
	public function echo_cpt_link() {
		Settings_Admin::echo_dashboard_page_link(
			self::CPTSLUG,
			self::CPTLABEL
		);
	}
}
