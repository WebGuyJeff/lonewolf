<?php
namespace BigupWeb\Lonewolf;

/**
 * Register Custom Post Types - Lonewolf Theme.
 *
 * This class retrieves CPT definitions from `./data/customPostTypes.json` and registers them.
 *
 * @package lonewolf
 */
class Register_Custom_Post_Type {

	/**
	 * Custom post type key.
	 *
	 * @var string
	 */
	private $key = '';

	/**
	 * Custom post type label.
	 *
	 * @var string
	 */
	private $label = '';

	/**
	 * Custom post type slug.
	 *
	 * @var string
	 */
	public $slug = '';

	/**
	 * Prefix for storing custom fields in the postmeta table.
	 *
	 * @var string
	 */
	private $prefix = '';

	/**
	 * Metabox ID.
	 *
	 * @var string
	 */
	private $metabox_id = '';

	/**
	 * Enabled taxonomies.
	 *
	 * @var array
	 */
	private $taxonomies = '';

	/**
	 * CPT definition formatted for the `$args` paramater of `register_post_type()`.
	 *
	 * @var array
	 */
	private $definition = '';

	/**
	 * Custom field definitions.
	 *
	 * @var array
	 */
	private $fields = '';


	/**
	 * Register a custom post type.
	 *
	 * The passed CPT definition data is verbosely stored in the class properties before being used
	 * to register the CPT and hooks to integrate it into WP.
	 */
	public function __construct( $cpt ) {
		$this->key        = $cpt['key'];
		$this->label      = $cpt['label'];
		$this->slug       = $cpt['slug'];
		$this->prefix     = $cpt['prefix'];
		$this->metabox_id = $cpt['metaboxID'];
		$this->taxonomies = $cpt['definition']['taxonomies'];
		$this->definition = $cpt['definition'];
		$this->fields     = $cpt['customFields'];

		register_post_type(
			$this->key,
			$this->definition
		);
		if ( in_array( 'category', $this->taxonomies, true ) ) {
			register_taxonomy_for_object_type( 'category', $this->key );
		}
		if ( in_array( 'post_tag', $this->taxonomies, true ) ) {
			register_taxonomy_for_object_type( 'post_tag', $this->key );
		}
		add_action( 'do_meta_boxes', array( &$this, 'remove_default_custom_fields' ), 10, 3 );
		add_action( 'admin_menu', array( &$this, 'create_custom_fields' ) );
		add_action( 'save_post', array( &$this, 'save_custom_fields' ), 1, 2 );
		add_action( 'below_parent_settings_page_heading', array( &$this, 'echo_cpt_link' ) );
	}


	/**
	 * Remove default custom fields meta box.
	 */
	public function remove_default_custom_fields( $type, $context, $post ) {
		foreach ( array( 'normal', 'advanced', 'side' ) as $context ) {
			remove_meta_box( 'postcustom', $this->key, $context );
		}
	}


	/**
	 * Create new custom fields meta box.
	 */
	public function create_custom_fields() {
		add_meta_box( $this->metabox_id, 'Post Custom Fields', array( &$this, 'display_custom_fields' ), $this->key, 'normal', 'high' );
	}


	/**
	 * Display the new custom fields meta box.
	 */
	public function display_custom_fields() {
		global $post;
		?>
		<div class="form-wrap">
			<?php wp_nonce_field( $this->metabox_id, $this->metabox_id . '_wpnonce', false, true ); ?>
			<table class="form-table" role="presentation">
				<tbody>
					<?php
					foreach ( $this->fields as $field ) {
						$field['id'] = $this->prefix . $field['suffix'];
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
	 * Save the new custom field values.
	 */
	public function save_custom_fields( $post_id, $post ) {
		if ( ! isset( $_POST[ $this->metabox_id . '_wpnonce' ] )
			|| ! wp_verify_nonce( $_POST[ $this->metabox_id . '_wpnonce' ], $this->metabox_id )
			|| ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
		foreach ( $this->fields as $field ) {
			$field['id'] = $this->prefix . $field['suffix'];
			if ( isset( $_POST[ $field['id'] ] ) && trim( $_POST[ $field['id'] ] ) ) {
				$value = $_POST[ $field['id'] ];
				update_post_meta( $post_id, $field['id'], $value );
			} else {
				delete_post_meta( $post_id, $field['id'] );
			}
		}
	}


	/**
	 * Echo link on the theme dashboard admin page using the theme's inbuilt static method.
	 */
	public function echo_cpt_link() {
		Settings_Admin::echo_dashboard_page_link(
			$this->slug,
			$this->label
		);
	}
}
