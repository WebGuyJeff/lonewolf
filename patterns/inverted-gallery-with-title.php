<?php
/**
 * Title: Inverted gallery with title
 * Slug: lonewolf/inverted-gallery-with-title
 * Categories: lonewolf
 * Keywords: section, gallery, image, title, images
 *
 * @package lonewolf
 */

$strings = array(
	'title' => __( 'Inverted gallery with title', 'lonewolf' ),
);

$images = array(
	LONEWOLF_URL . 'assets/svg/pattern-images/shape-01.svg',
	LONEWOLF_URL . 'assets/svg/pattern-images/shape-07.svg',
	LONEWOLF_URL . 'assets/svg/pattern-images/shape-06.svg',
	LONEWOLF_URL . 'assets/svg/pattern-images/shape-05.svg',
	LONEWOLF_URL . 'assets/svg/pattern-images/shape-08.svg',
);

?>
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"64px","bottom":"64px"},"margin":{"top":"0px","bottom":"0px"}}},"backgroundColor":"lonewolf-fg","textColor":"lonewolf-bg","layout":{"inherit":true,"type":"constrained"}} -->
<div class="wp-block-group alignfull has-lonewolf-bg-color has-lonewolf-fg-background-color has-text-color has-background" style="margin-top:0px;margin-bottom:0px;padding-top:64px;padding-bottom:64px"><!-- wp:group {"align":"wide","layout":{"inherit":false}} -->
<div class="wp-block-group alignwide"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"30%"} -->
<div class="wp-block-column" style="flex-basis:30%"><!-- wp:heading -->
<h2><?php echo esc_html( $strings['title'] ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"70%"} -->
<div class="wp-block-column" style="flex-basis:70%"><!-- wp:gallery {"linkTo":"none"} -->
<figure class="wp-block-gallery has-nested-images columns-default is-cropped"><!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="<?php echo esc_html( $images[0] ); ?>" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="<?php echo esc_html( $images[1] ); ?>" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="<?php echo esc_html( $images[2] ); ?>" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="<?php echo esc_html( $images[3] ); ?>" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="<?php echo esc_html( $images[4] ); ?>" alt=""/></figure>
<!-- /wp:image --></figure>
<!-- /wp:gallery --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
