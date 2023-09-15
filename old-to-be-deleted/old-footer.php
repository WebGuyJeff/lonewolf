<?php
/**
 * Lonewolf Theme Template - Footer.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

namespace BigupWeb\Lonewolf;

?>


<footer class="pageGrid">
	<?php block_template_part( 'footer' ); /* Testing new block footer. */ ?>
	<?php get_template_part( 'template-parts/mobile-popup-menu' ); ?>
	<?php wp_footer(); ?>
</footer>





<?php return; // TESTING BLOCK THEME SETUP. ?>



		<footer class="pageGrid">
			<div class="pageGrid_inner sauce">

				<?php

				Menu_Walker::output_theme_location_menu(
					array(
						'theme_location'    => 'global-secondary-menu',
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
