<?php
/**
 * Title: Cover title with background
 * Slug: lonewolf/cover-background
 * Categories: lonewolf
 * Keywords: cover, section, header, hero
 *
 * @package lonewolf
 */

$image = LONEWOLF_URL . 'assets/img/patterns/raft/lonewolf-cover-bg.svg';

$strings = array(
	'title'  => __( 'This is a cover with a background image', 'lonewolf' ),
	'byline' => 'Lorem ipsum dolor',
	'button' => __( 'This is a button', 'lonewolf' ),
);

?>
<!-- wp:cover {"url":"<?php echo esc_url( $image ); ?>","dimRatio":60,"overlayColor":"black","minHeight":60,"minHeightUnit":"vh","align":"full","style":{"spacing":{"padding":{"top":"24px","right":"24px","bottom":"24px","left":"24px"}}}} -->
<div class="wp-block-cover alignfull" style="padding-top:24px;padding-right:24px;padding-bottom:24px;padding-left:24px;min-height:60vh">
<span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-60 has-background-dim"></span>
<img class="wp-block-cover__image-background" alt="" src="<?php echo esc_url( $image ); ?>" data-object-fit="cover"/>
<div class="wp-block-cover__inner-container">

<!-- wp:group {"textColor":"lonewolf-fg-alt","layout":{"inherit":true}} -->
<div class="wp-block-group has-lonewolf-fg-alt-color has-text-color">

<!-- wp:heading {"fontSize":"huge"} -->
<h2 class="has-xxx-large-font-size"><?php echo esc_html( $strings['title'] ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"medium"} -->
<p class="has-medium-font-size"><?php echo esc_html( $strings['byline'] ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link"><?php echo esc_html( $strings['button'] ); ?></a></div>
<!-- /wp:button -->
</div>

<!-- /wp:buttons -->
</div>

<!-- /wp:group -->
</div>

</div>
<!-- /wp:cover -->
