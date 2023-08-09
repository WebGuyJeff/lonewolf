<?php
/**
 * Template part for the bottom bar of the footer.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

namespace BigupWeb\Lonewolf;

?>

<div class="footer_bottom">

	<div class="column column-start">
		<?php
		Menu_Walker::output_theme_location_menu(
			array(
				'theme_location'    => 'global-legal-links',
				'nav_or_div'        => 'nav',
				'nav_aria_label'    => 'Legal links',
				'html_tab_indents'  => 3,
				'top_level_classes' => 'button button-noback',
			)
		);
		?>
	</div>

	<div class="column column-middle">
		<a href='https://jeffersonreal.uk' style='color: inherit; text-decoration: none;'>
			Website by BigupJeff
		</a>
	</div>

	<div class="column column-end">
		<?php
		$site_title = get_bloginfo();
		echo '<span class="footer_label">&copy; ' . gmdate( 'Y' ) . ' ' . esc_html( $site_title ) . '</span> ';
		?>
	</div>

</div>
