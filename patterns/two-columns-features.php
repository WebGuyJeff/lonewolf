<?php
/**
 * Title: Two columns of features
 * Slug: lonewolf/two-columns-features
 * Categories: lonewolf
 * Keywords: section, image, text, columns, title
 *
 * @package lonewolf
 */

$images = array(
	'shape-05.svg',
	'shape-01.svg',
);

$strings = array(
	'title'           => __( 'Two columns of features', 'lonewolf' ),
	'byline'          => 'Lorem ipsum dolor sit amet',
	'feature_title'   => 'Lorem ipsum',
	'feature_content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
);

$columns_markup = '';

foreach ( $images as $image ) {
	$columns_markup .= '<!-- wp:column -->';
	$columns_markup .= '<div class="wp-block-column">';

	$columns_markup .= '<!-- wp:image {"sizeSlug":"full","linkDestination":"none"} -->';
	$columns_markup .= '<figure class="wp-block-image size-full">';
	$columns_markup .= '<img src="' . esc_url( LW_URL . 'assets/img/patterns/raft/' . $image ) . '" alt="Illustration"/>';
	$columns_markup .= '</figure>';
	$columns_markup .= '<!-- /wp:image -->';

	$columns_markup .= '<!-- wp:heading {"level":3} -->';
	$columns_markup .= '<h3>' . esc_html( $strings['feature_title'] ) . '</h3>';
	$columns_markup .= '<!-- /wp:heading -->';

	$columns_markup .= '<!-- wp:paragraph -->';
	$columns_markup .= '<p>' . esc_html( $strings['feature_content'] ) . '</p>';
	$columns_markup .= '<!-- /wp:paragraph -->';

	$columns_markup .= '</div>';
	$columns_markup .= '<!-- /wp:column -->';
}

?>
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"64px","bottom":"64px"},"margin":{"top":"0px","bottom":"0px"}}},"backgroundColor":"lonewolf-bg-alt","layout":{"inherit":true}} -->
<div class="wp-block-group alignfull has-lonewolf-bg-alt-background-color has-background" style="margin-top:0px;margin-bottom:0px;padding-top:64px;padding-bottom:64px">

<!-- wp:heading -->
<h2><img src="<?php echo esc_html( $strings['title'] ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"medium"} -->
<p class="has-medium-font-size"><img src="<?php echo esc_html( $strings['byline'] ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:group -->
<div class="wp-block-group">

<!-- wp:columns -->
<div class="wp-block-columns"><img src="<?php echo wp_kses_post( $columns_markup ); ?></div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->
