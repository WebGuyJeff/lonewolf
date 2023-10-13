<?php
/**
 * Title: Footer links
 * Slug: lonewolf/footer-links
 * Categories: lonewolf
 * Keywords: footer, links, copyright
 *
 * @package lonewolf
 */

?>
<!-- wp:group {"layout":{"type":"flex","allowOrientation":false,"justifyContent":"space-between"}} -->
<div class="wp-block-group"><!-- wp:group {"layout":{"type":"flex","allowOrientation":false}} -->
<div class="wp-block-group"><!-- wp:paragraph {"fontSize":"extra-small"} -->
<p class="has-extra-small-font-size"><?php echo esc_html__( 'Copyright', 'lonewolf' ) . ' ' . esc_html( date_i18n( _x( 'Y', 'copyright date format', 'lonewolf' ) ) ); ?></p><!-- /wp:paragraph -->
<!-- wp:site-title {"level":0, "fontSize":"extra-small"} /-->
<!-- wp:social-links {"className":"is-style-logos-only"} -->
<ul class="wp-block-social-links has-icon-color is-style-logos-only"><!-- wp:social-link {"url":"https://wordpress.org","service":"wordpress"} /--></ul>
<!-- /wp:social-links -->
</div><!-- /wp:group -->
</div><!-- /wp:group -->
