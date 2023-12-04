<?php
/**
 * Title: Inverted background
 * Slug: lonewolf/inverted-background
 * Categories: lonewolf
 * Keywords: section, background, inverted, image, features
 *
 * @package lonewolf
 */

$images = array(
	'shape-01.svg',
	'shape-04.svg',
);

$strings = array(
	'tilte' => __( 'Inverted background', 'lonewolf' ),
);

?>
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"backgroundColor":"lonewolf-fg","textColor":"lonewolf-bg"} -->
<div class="wp-block-group alignfull has-lonewolf-bg-color has-lonewolf-fg-background-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60);">

<!-- wp:group -->
<div class="wp-block-group">

<!-- wp:columns -->
<div class="wp-block-columns">

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:heading -->
<h2><?php echo esc_html( $strings['tilte'] ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Lorem ipsum dolor sit amet.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:image {"sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full">
<img src="<?php echo esc_url( LONEWOLF_URL . 'assets/svg/pattern-images/' . $images[0] ); ?>" alt="Illustration"/>
</figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3>Lorem ipsum</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:heading {"level":3} -->
<h3>Lorem ipsum</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full">
<img src="<?php echo esc_url( LONEWOLF_URL . 'assets/svg/pattern-images/' . $images[1] ); ?>" alt="Illustration"/>
</figure>
<!-- /wp:image -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->
