<?php
namespace BigupWeb\Lonewolf;

/**
 * Lonewolf Theme Template - Footer Variant for Landing Pages.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */
?>

<footer class="footer">
	<div class="footer_inner">

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
		?>

		<div class="footer_legalLinks">

			<?php
			Menu_Walker::output_theme_location_menu(
				array(
					'theme_location'    => 'global-legal-links',
					'menu_class'        => 'menu',
					'nav_or_div'        => 'nav',
					'nav_aria_label'    => 'Legal links',
					'html_tab_indents'  => 3,
					'top_level_classes' => 'button button-noback',
				)
			);

			$site_title = get_bloginfo();
			echo '<p class="footer_label">&copy; ' . gmdate( 'Y' ) . ' ' . esc_html( $site_title ) . '</p > ';

			?>
		</div>

	</div>
</footer>

<?php get_template_part( 'template-parts/nav', 'mobile' ); ?>

<?php wp_footer(); ?>

</body>
</html>
