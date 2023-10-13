<?php
/**
 * Title: Frequently asked questions
 * Slug: lonewolf/frequently-asked-questions
 * Categories: lonewolf
 * Keywords: section, faq, frequently, asked, boxes
 *
 * @package lonewolf
 */

$strings = array(
	'title'  => __( 'Frequently asked questions', 'lonewolf' ),
	'byline' => __( 'Have questions? We have the answers!', 'lonewolf' ),
	'button' => __( 'See More FAQs', 'lonewolf' ),
);

?>
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"64px","bottom":"64px"},"margin":{"top":"0px","bottom":"0px"}}},"layout":{"inherit":true}} -->
<div class="wp-block-group alignfull" style="margin-top:0px;margin-bottom:0px;padding-top:64px;padding-bottom:64px">
<!-- wp:heading {"textAlign":"center","className":"is-style-default"} -->
<h2 class="has-text-align-center is-style-default"><?php echo esc_html( $strings['title'] ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","fontSize":"normal"} -->
<p class="has-text-align-center has-normal-font-size"><?php echo esc_html( $strings['byline'] ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"textColor":"lonewolf-fg-alt"} -->
<div class="wp-block-button">
<a class="wp-block-button__link has-lonewolf-fg-alt-color has-text-color"><?php echo esc_html( $strings['button'] ); ?></a>
</div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->

<!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"align":"wide"} -->
<div class="wp-block-group alignwide">

<!-- wp:columns -->
<div class="wp-block-columns">
	<!-- wp:column {"style":{"spacing":{"padding":{"top":"24px","right":"24px","bottom":"24px","left":"24px"}}},"backgroundColor":"lonewolf-bg-alt"} -->
	<div class="wp-block-column has-lonewolf-bg-alt-background-color has-background" style="padding-top:24px;padding-right:24px;padding-bottom:24px;padding-left:24px">

	<!-- wp:heading {"level":3,"fontSize":"medium"} -->
	<h3 class="has-medium-font-size">Lorem ipsum sit dolor</h3>
	<!-- /wp:heading -->

	<!-- wp:paragraph -->
	<p>Ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
	<!-- /wp:paragraph -->

	</div>
	<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:columns -->
<div class="wp-block-columns">
	<!-- wp:column {"style":{"spacing":{"padding":{"top":"24px","right":"24px","bottom":"24px","left":"24px"}}},"backgroundColor":"lonewolf-bg-alt"} -->
	<div class="wp-block-column has-lonewolf-bg-alt-background-color has-background" style="padding-top:24px;padding-right:24px;padding-bottom:24px;padding-left:24px">

	<!-- wp:heading {"level":3,"fontSize":"medium"} -->
	<h3 class="has-medium-font-size">Lorem ipsum sit dolor</h3>
	<!-- /wp:heading -->

	<!-- wp:paragraph -->
	<p>Ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
	<!-- /wp:paragraph -->

	</div>
	<!-- /wp:column -->
</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->
