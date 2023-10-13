<?php
/**
 * Title: Posts Query loop
 * Slug: lonewolf/posts-query-loop
 * Categories: lonewolf
 * Keywords: section, blog, posts, latest
 *
 * @package lonewolf
 */

$strings = array(
	'button'   => __( 'Go to post', 'lonewolf' ),
	'title'    => __( 'Posts Query loop', 'lonewolf' ),
	'no_posts' => __( 'Unfortunately no posts were found', 'lonewolf' ),
);

?>
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"64px","bottom":"64px"},"margin":{"top":"0px","bottom":"0px"}}},"layout":{"inherit":true}} -->
<div class="wp-block-group alignfull" style="margin-top:0px;margin-bottom:0px;padding-top:64px;padding-bottom:64px">
<!-- wp:heading -->
<h2><?php echo esc_html( $strings['title'] ); ?></h2>
<!-- /wp:heading -->

<!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:query {"query":{"perPage":"1","pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false}} -->
<div class="wp-block-query">

<!-- wp:post-template -->

<!-- wp:post-featured-image {"align":"center"} /-->
<!-- wp:post-date {"fontSize":"small"} /-->
<!-- wp:post-title /-->
<!-- wp:post-terms {"term":"category","fontSize":"small"} /-->
<!-- wp:post-excerpt {"moreText":"\u003cstrong\u003e<?php echo esc_html( $strings['button'] ); ?>\u003c/strong\u003e","style":{"elements":{"link":{"color":{"text":"var:preset|color|lonewolf-accent"}}}}} /-->

<!-- wp:spacer {"height":"64px"} -->
<div style="height:64px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- /wp:post-template -->

<!-- wp:query-pagination {"layout":{"type":"flex","justifyContent":"space-between"}} -->
<!-- wp:query-pagination-previous /-->
<!-- wp:query-pagination-numbers /-->
<!-- wp:query-pagination-next /-->
<!-- /wp:query-pagination -->

<!-- wp:query-no-results -->
<!-- wp:paragraph {"backgroundColor":"lonewolf-bg-alt"} -->
<p class="has-lonewolf-bg-alt-background-color has-background"><?php echo esc_html( $strings['no_posts'] ); ?></p>
<!-- /wp:paragraph -->
<!-- /wp:query-no-results -->

</div>
<!-- /wp:query -->

</div>
<!-- /wp:group -->
