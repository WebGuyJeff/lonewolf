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

<main class="main-landing">

	<section class="welcome">
		<?php get_template_part( 'template-parts/landing-home/welcome' ); ?>
	</section>

	<section class="services" id="section-services">
		<?php get_template_part( 'template-parts/landing-home/services' ); ?>
	</section>

	<section class="projects" id="section-projects">
		<?php get_template_part( 'template-parts/landing-home/projects' ); ?>
	</section>

	<section class="usp" id="working-with-me">
		<?php get_template_part( 'template-parts/landing-home/usp' ); ?>
	</section>

	<section class="contact" id="section-contact">
		<?php get_template_part( 'template-parts/landing-home/contact' ); ?>
	</section>

</main>

<?php
	get_footer( 'landing' );
	get_template_part( 'template-parts/modal', 'contact' );
?>
