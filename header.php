<?php
/**
 * Lonewolf Theme Template - Header
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

namespace BigupWeb\Lonewolf;

?>

<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" prefix="og: https://ogp.me/ns/website#">

<head>
	<?php
	$seo = new Seo_Meta();
	echo $seo->head_meta;
	wp_head();
	?>
</head>

<body <?php body_class(); ?>>

	<header class="header">
		<div class="header_inner sauce">

			<div class="header_content header_content-left header_content-third">

				<a class="siteTitle" href="<?php echo get_bloginfo( 'wpurl' ); ?>" aria-label="Home">
					<?php
					if ( has_custom_logo() ) {

						$logo_id  = get_theme_mod( 'custom_logo' );
						$logo_src = wp_get_attachment_image_src( $logo_id, 'full' );
						echo '<img class="siteTitle_logo" alt="Jefferson Real Web Development Logo" src="' . esc_url( $logo_src[0] ) . '">';
					}
					?>
					<div class="siteTitle_text">
						<p class="siteTitle_sitename">
							<?php echo get_bloginfo( 'name' ); ?>
						</p>
						<span class="siteTitle_tagline">
							<?php echo get_bloginfo( 'description' ); ?>
						</span>
					</div>
				</a>

			</div>

			<div class="header_content header_content-right">
				<?php
					Menu_Walker::output_theme_location_menu(
						array(
							'theme_location'    => 'global-primary-menu',
							'menu_class'        => 'mainMenu',
							'nav_or_div'        => 'nav',
							'nav_aria_label'    => 'Menu',
							'html_tab_indents'  => 3,
							'top_level_classes' => 'button button-noback',
						)
					);
				?>
			</div>

		</div>
	</header>
