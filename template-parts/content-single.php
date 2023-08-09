<?php
/**
 * Template part for displaying a single post and used by single.php.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

namespace BigupWeb\Lonewolf;

?>

<article class="blog-post copy">

		<!-- If the post has a featured image, display it -->
		<?php
		if ( has_post_thumbnail() ) {
			the_post_thumbnail();
		}
		?>

		<h1 class="blog-post-title">
			<?php the_title(); ?>
		</h1>

		<p class="blog-post-meta">
			<?php the_date(); ?> by <a href="#"><?php the_author(); ?></a>
		</p>

		<?php the_content(); ?>

</article>
