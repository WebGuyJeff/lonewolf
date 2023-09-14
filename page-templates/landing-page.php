<?php
/**
 * Template Name: Landing Page
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

wp_enqueue_script( 'lw_hideheader_js' );
get_header( 'landing' );
?>

<main class="pageGrid pageGrid-landing">

	<section>
		<div class="landing_content" style="--row: 1 / -1; --col: narrow-l / narrow-r;">

				<?php
				if ( have_posts() ) :
					while ( have_posts() ) :
						the_post();
						get_template_part( 'template-parts/content-single', get_post_format() );
						if ( comments_open() || get_comments_number() ) :
							comments_template();
							endif;
						endwhile;
					endif;
				?>

		</div>
	</section>

	<div class="landing_backdrop"></div>

</main>

<?php
	get_footer( 'landing' );
	get_template_part( 'template-parts/modal', 'contact' );
?>
