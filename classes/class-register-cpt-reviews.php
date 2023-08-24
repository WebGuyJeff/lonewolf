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
	private const CPTID = 'review';

	// Custom post type label.
	private const CPTLABEL = 'Reviews';

	// Custom post type slug.
	public const CPTSLUG = 'edit.php?post_type=review';

	// Prefix for storing custom fields in the postmeta table.
	private const PREFIX = '_lwre_';

	// Metabox ID.
	private const METABOXID = 'review-meta';

	// Define custom meta fields.
	private const CUSTOMFIELDS = array(
		array(
			'name'        => '_source_url',
			'title'       => 'Source URL',
			'description' => 'Link to the review source',
			'type'        => 'url',
		),
		array(
			'name'        => '_name',
			'title'       => 'Reviewer Name',
			'description' => 'Name of the reviewer',
			'type'        => 'text',
		),
		array(
			'name'        => '_profile_image',
			'title'       => 'Profile Image',
			'description' => 'Profile image of the reviewer',
			'type'        => 'image-upload',
		),
		array(
			'name'        => '_title',
			'title'       => 'Title',
			'description' => 'Title of the review',
			'type'        => 'text',
		),
		array(
			'name'        => '_body',
			'title'       => 'Body',
			'description' => 'Main body content of the review',
			'type'        => 'textarea',
		),
		array(
			'name'        => '_icon',
			'title'       => 'Icon',
			'description' => 'Icon to show with the review',
			'type'        => 'dashicons-select',
		),
	);


	/**
	 * Register the custom post type.
	 */
	public function create_cpt() {
		register_post_type(
			self::CPTID,
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
				'supports'            => array( 'title', 'editor', 'custom-fields' ),
				'description'         => 'Feedback and reviews.',
				'public'              => true,
				'exclude_from_search' => false,
				'publicly_queryable'  => true,
				'query_var'           => true,
				'show_in_menu'        => self::CPTSLUG, // String set in add_submenu_page.
				'menu_position'       => 90,
				'menu_icon'           => 'dashicons-star-filled',
				'hierarchical'        => false,
				'taxonomies'          => array( 'category', 'post_tag' ),
				'show_in_rest'        => true,
				'delete_with_user'    => false,
			)
		);
		register_taxonomy_for_object_type( 'category', self::CPTID );
		register_taxonomy_for_object_type( 'post_tag', self::CPTID );
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
			remove_meta_box( 'postcustom', self::CPTID, $context );
		}
	}


	/**
	 * Create new custom fields meta box.
	 */
	public function create_custom_fields() {
		add_meta_box( self::METABOXID, 'Post Custom Fields', array( &$this, 'display_custom_fields' ), self::CPTID, 'normal', 'high' );
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
						echo '<tr>';
						echo '<th scope="row">';
						echo '<label for="' . self::PREFIX . $field['name'] . '"><b>' . $field['title'] . '</b></label>';
						echo '</th>';
						echo '<td>';
						switch ( $field['type'] ) {
							case 'text':
								echo '<input type="text" name="' . self::PREFIX . $field['name'] . '" id="' . self::PREFIX . $field['name'] . '" value="' . htmlspecialchars( get_post_meta( $post->ID, self::PREFIX . $field['name'], true ) ) . '" class="regular-text" />';
								break;
							case 'textarea':
								echo '<textarea name="' . self::PREFIX . $field['name'] . '" id="' . self::PREFIX . $field['name'] . '" columns="30" rows="3">' . htmlspecialchars( get_post_meta( $post->ID, self::PREFIX . $field['name'], true ) ) . '</textarea>';
								break;
							case 'url':
								echo '<input type="url" name="' . self::PREFIX . $field['name'] . '" id="' . self::PREFIX . $field['name'] . '" value="' . htmlspecialchars( get_post_meta( $post->ID, self::PREFIX . $field['name'], true ) ) . '" class="regular-text" />';
								break;
							case 'number':
								echo '<input type="number" name="' . self::PREFIX . $field['name'] . '" id="' . self::PREFIX . $field['name'] . '" value="' . htmlspecialchars( get_post_meta( $post->ID, self::PREFIX . $field['name'], true ) ) . '" />';
								break;
							case 'checkbox':
								echo '<input type="checkbox" name="' . self::PREFIX . $field['name'] . '" id="' . self::PREFIX . $field['name'] . '" value="1"';
								if ( get_post_meta( $post->ID, self::PREFIX . $field['name'], true ) == true ) {
									echo ' checked="checked"';
								}
								echo ' />';
								break;
							case 'image-upload':
								?>
								<label for="' . self::PREFIX . $field['name'] . '">
									<input type="text" name="' . self::PREFIX . $field['name'] . '" id="' . self::PREFIX . $field['name'] . '" class="meta-image regular-text" value="<?php echo $meta['image']; ?>">
									<input type="button" class="button image-upload" value="Browse">
								</label>
								<div class="image-preview"><img src="<?php echo $meta['image']; ?>" style="max-width: 250px; min-height: 0;"></div>
								<?php
								break;
							case 'dashicons-select':
								// Get a list of available dashicons from the SVG icon source file.
								$dashicons_svg = file_get_contents( ABSPATH . '/wp-includes/fonts/dashicons.svg' );
								$pattern = '/id="(.*?)"/';
								preg_match_all( $pattern, $dashicons_svg, $dashicon_slugs );
								?>
								<div class="dashiconsDropdown">
									<a href="#select">
										<span class="default">
											--select icon--
										</span>
										<span class="arrow dashicons dashicons-arrow-down"></span>
									</a>
									<ul id="select">
									<?php
									foreach ( $dashicon_slugs[1] as $slug ) :
										$checked = ( $slug === get_post_meta( $post->ID, self::PREFIX . $field['name'], true ) ) ? 'checked' : '';
										?>
										<li>
											<input type="radio" name="dashicon" value="<?php echo esc_attr( $slug ); ?>" id="<?php echo esc_attr( $slug ); ?>" <?php echo esc_attr( $checked ); ?>>
											<label for="<?php echo esc_attr( $slug ); ?>" title="<?php echo esc_attr( $slug ); ?>">
												<span class="dashicons dashicons-<?php echo esc_attr( $slug ); ?>"></span>
												<span class="screen-reader-text"><?php echo esc_attr( str_replace( '-', ' ', $slug ) ); ?></span>
											</label>
										</li>
									<?php endforeach ?>
									</ul>
								</div>
								<?php
								break;
							default:
								echo '<p>Custom field output error: Field type "' . $field['type'] . '" not found.</p>';
								break;
						}
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
			if ( isset( $_POST[ self::PREFIX . $field['name'] ] ) && trim( $_POST[ self::PREFIX . $field['name'] ] ) ) {
				$value = $_POST[ self::PREFIX . $field['name'] ];
				// Auto-paragraphs for textarea fields.
				if ( $field['type'] === 'textarea' ) {
					$value = wpautop( $value );
				}
				update_post_meta( $post_id, self::PREFIX . $field['name'], $value );
			} else {
				delete_post_meta( $post_id, self::PREFIX . $field['name'] );
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
