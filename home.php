<?php

/**
 * Lonewolf Theme Template - Home.php
 * 
 * This template is the default home page (unless set to a static page) and
 * forms the blog posts home page. When a static page is used as the site home
 * page, this template would normally be used, for example, as /blog.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

get_header();
?>

<main class="main">

	<div class="base"> <?php //MAIN CONTENT COLUMN ?>

		<section class="">
			<div >
				<?php
					if ( have_posts() ) :
					while ( have_posts() ) : the_post();
						get_template_part( 'template-parts/content', get_post_format() );
					endwhile;
				?>
				<nav class="pager">
					<div><?php next_posts_link( 'Previous' ); ?></div>
					<div><?php previous_posts_link( 'Next' ); ?></div>
				</nav>
				<?php
					endif;
				?>
			</div>
		</section>

	</div> <?php //MAIN CONTENT COLUMN END ?>

	<div class="sides-narrow">
		<?php get_sidebar( 'left' ); ?>
		<?php get_sidebar( 'right' ); ?>
	</div>

</main>

<?php get_footer(); ?>
<script> console.log( 'wp-template: home.php' )</script>