<?php
/**
 * Lonewolf Theme Template - Footer Variant for Landing Pages.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

namespace BigupWeb\Lonewolf;

?>

	<footer class="pageGrid pageGrid-landing">
		<div class="pageGrid_inner">

			<?php

			Menu_Walker::output_theme_location_menu(
				array(
					'theme_location'    => 'landing-page-secondary-menu',
					'menu_class'        => 'footer_nav',
					'nav_or_div'        => 'nav',
					'nav_aria_label'    => 'Footer menu',
					'html_tab_indents'  => 3,
					'top_level_classes' => 'button button-noback',
				)
			);

			get_template_part( 'template-parts/footer-bottom' );

			?>

		</div>
	</footer>

	<?php get_template_part( 'template-parts/mobile-popup-menu' ); ?>
	<?php wp_footer(); ?>

	</body>
</html>
