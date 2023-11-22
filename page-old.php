<?php
namespace BigupWeb\Lonewolf;

/**
 * Lonewolf Theme Template - Front Page
 *
 * This template overrides the home page.
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */

wp_deregister_style( 'lonewolf_css' );
wp_deregister_script( 'lonewolf_js' );
wp_enqueue_style( 'old_css', LONEWOLF_URL . 'build/css/old.css', array(), filemtime( LONEWOLF_PATH . 'build/css/old.css' ), 'all' );
wp_enqueue_script( 'old_js', LONEWOLF_URL . 'build/js/old.js', array( 'gsap', 'gsap_scrolltrigger' ), filemtime( LONEWOLF_PATH . 'build/js/old.js' ), true );
?>

<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" prefix="og: https://ogp.me/ns/website#">

<head>
	<?php wp_head(); ?>
</head>

<body
	<?php body_class(); ?>
	style="color: #333; background:#fff;"
>

	<header 
		class="pageGrid jsHideHeader"
		style="transform: translate( 0, -100% );
				position: fixed;"
		hidden="true"
	>
		<div class="pageGrid_inner">
			<div class="header_content header_content-left">
				<a class="siteTitle" href="<?php echo get_bloginfo( 'wpurl' ); ?>" aria-label="Home">
					<?php
					if ( has_custom_logo() ) {
						$logo_id  = get_theme_mod( 'custom_logo' );
						$logo_src = wp_get_attachment_image_src( $logo_id, 'full' );
						echo '<img class="siteTitle_logo" src="' . esc_url( $logo_src[0] ) . '">';
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
						'theme_location'    => 'landing-page-primary-menu',
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

	<button aria-label="Main Menu" title="Main Menu" type="button" class="menuToggle">
		<?php
			$burger = Util::get_contents( LONEWOLF_PATH . 'assets/svg/icons/burger.svg' );
			Escape::svg( $burger );
		?>
	</button>

	<main>

		<section class="heroPunch">
			<div class="scrollTriggerParent">
				<div class="scrollTriggerChild">
					<div class="sectionGrid">
						<div class="landing_content" style="--row: 1 / -1; --col: narrow-l / narrow-r;">
							<div class="sign ">
								<div class="sign_pinSignTop">
									<svg class="grabhand grabhand-left" xmlns="http://www.w3.org/2000/svg" width="164" height="100" viewBox="0 0 164 100">
										<g id="grabhand-l" stroke-linecap="round" stroke-linejoin="round" stroke="#000" stroke-width="1">
											<path id="grabhand-l_thumb" fill="#e8a984" d="M120 29h36s12-11 6-17c-13-12-42 17-42 17Z"></path>
											<path id="grabhand-l_finger1" fill="#e8a984" d="M80 80c6 1 10-4 13-7 7-7 8-17 13-26 2-5 4-11 8-15 2-2 6-3 6-5 1-11-9-24-20-26-6-1-15 2-16 8l-5 54c-1 5-4 16 1 17Z"></path>
											<path id="grabhand-l_finger2" fill="#e8a984" d="M77 78s-2 18-15 18-9-20-9-31c0-9 0-26 3-54 1-6 9-8 15-8 5 0 14 1 13 6l-7 69"></path>
											<path id="grabhand-l_finger3" fill="#e8a984" d="M53 65s-2 18 1 26c-1 4-4 8-10 8-6 1-12-4-13-10l-2-27c-1-11-4-23-3-35 1-5 1-12 5-16 4-5 13-8 19-6 3 1 6 3 6 6-2 17-4 44-3 54"></path>
											<path id="grabhand-l_finger4" fill="#e8a984" d="M19 8c3 0 6 2 7 4 3 5 0 10 0 15 0 17 4 52 4 52s-8 0-11-5c-4-8-9-16-11-28-2-8-8-16-7-25 0-3 0-6 3-8 4-4 10-5 15-5Z"></path>
											<path id="grabhand-l_shadow" fill="#000" opacity=".2" stroke="none" d="M66 11c9 0 17 9 17 14 8-23 32-14 31 7-4 4-6 10-8 15-5 9-6 19-13 26-3 3-7 8-13 7-5-1-2-12-1-17l2-23-4 38s-2 18-15 18c-4 0-6-2-8-5-1 4-4 8-10 8-6 1-12-4-13-10l-2-27-2-16 3 33s-8 0-11-5c-4-8-9-16-11-28L3 33c0-14 3-18 9-19 6 0 15 6 14 13 9-23 23-10 28 10v-9c1-6 2-16 8-17h4Zm91 8c4 0 6 0 5 1-2 5-6 9-6 9h-36c11-6 28-10 37-10ZM53 65v13-13Z"></path>
										</g>
									</svg>
									<svg class="grabhand grabhand-right" xmlns="http://www.w3.org/2000/svg" width="164" height="100" viewBox="0 0 164 100">
										<g id="grabhand-r" stroke-linecap="round" stroke-linejoin="round" stroke="#000" stroke-width="1">
											<path id="grabhand-r_thumb" fill="#e8a984" d="M44 29H8S-4 18 2 12C15 0 44 29 44 29Z"></path>
											<path id="grabhand-r_finger1" fill="#e8a984" d="M84 80c-6 1-10-4-13-7-7-7-8-17-13-26-2-5-4-11-8-15-2-2-6-3-6-5-1-11 9-24 20-26 6-1 15 2 16 8l5 54c1 5 4 16-1 17Z"></path>
											<path id="grabhand-r_finger2" fill="#e8a984" d="M87 78s2 18 15 18 9-20 9-31c0-9 0-26-3-54-1-6-9-8-15-8-5 0-14 1-13 6l7 69"></path>
											<path id="grabhand-r_finger3" fill="#e8a984" d="M111 65s2 18-1 26c1 4 4 8 10 8 6 1 12-4 13-10l2-27c1-11 4-23 3-35-1-5-1-12-5-16-4-5-13-8-19-6-3 1-6 3-6 6 2 17 4 44 3 54"></path>
											<path id="grabhand-r_finger4" fill="#e8a984" d="M145 8c-3 0-6 2-7 4-3 5 0 10 0 15 0 17-4 52-4 52s8 0 11-5c4-8 9-16 11-28 2-8 8-16 7-25 0-3 0-6-3-8-4-4-10-5-15-5Z"></path>
											<path id="grabhand-r_shadow" fill="#000" opacity=".2" stroke="none" d="M98 11c-9 0-17 9-17 14-8-23-32-14-31 7 4 4 6 10 8 15 5 9 6 19 13 26 3 3 7 8 13 7 5-1 2-12 1-17l-2-23 4 38s2 18 15 18c4 0 6-2 8-5 1 4 4 8 10 8 6 1 12-4 13-10l2-27 2-16-3 33s8 0 11-5c4-8 9-16 11-28l5-13c0-14-3-18-9-19-6 0-15 6-14 13-9-23-23-10-28 10v-9c-1-6-2-16-8-17h-4ZM7 19c-4 0-6 0-5 1 2 5 6 9 6 9h36C33 23 16 19 7 19Zm104 46v13-13Z"></path>
										</g>
									</svg>
									<div class="star star-2">
										<svg class="twinkle" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
											<g id="star">
												<path fill="#fff" d="M44 62c-7 2-10 6-16 9 2-5 7-9 10-14-14-6-23-4-38-8 7-1 37-4 38-6L28 29c4 1 14 11 15 8 4-13 4-24 7-37 3 13 1 24 7 38 6-2 9-6 15-9-2 5-11 11-9 14 13 6 22 4 37 6-6 3-37 6-38 8 3 6 7 9 10 14-5-2-9-7-15-9-5 13-4 23-7 38-3-12-2-27-6-38Z"></path>
											</g>
										</svg>
									</div>
								</div>
								<div class="copy">
									<h1 class="sign_title title">
										Oi oi saveloy!
									</h1>
									<p>
										This is a little demo of me being punched across a desert by harnessing the magical powers of GSAP and its scrollTrigger goodness 💚
									</p>
									<div class="textAlignCenter">
										<button type="button" class="button aligncenter">
											<span>
												Do Nothing
											</span>
										</button>
									</div>
								</div>
							</div>
							<div class="svgMe_container">	
								<svg class="svgMe" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin slice" viewBox="0 0 359 1000">
									<defs>
										<pattern id="brown80sPattern" width="100" height="100" patternTransform="translate(717 742)" patternUnits="userSpaceOnUse">
											<g transform="translate(-717 -742)">
												<path fill="#6d4739" d="M717 742h100v100H717Z"></path>
												<path fill="#54341b" d="m729 747-6 9 10 7 8-11Z"></path>
												<path fill="#54341b" d="m744 760-8 10 14 3v-10Z"></path>
												<path fill="#54341b" d="m755 773-1 9h8l-2-11Z"></path>
												<path fill="#ab2c1a" d="M742 798c-3-7-1-14 7-8 6 5-6 12 1 14 10 2 19 1 1 6-8 2-12 13-14 8-4-7 13-7 3-10s-12-6-3-5c5 1 6-1 5-5Z"></path>
												<ellipse fill="#54341b" cx="796.6" cy="828.9" rx="9.2" ry="9.7"></ellipse>
												<ellipse fill="#54341b" cx="771.6" cy="763.2" rx="6.8" ry="7.2"></ellipse>
												<path fill="#54341b" d="m800 772-12 6 8 14-13 7 2 12-12 8 1 2 19-9-7-12 14-7-7-13 10-6Z"></path>
												<path fill="#334555" d="M808 753s3 0 0-4c-4-3-7-5-7-1 1 3-2 7-4 7-3-1-7 9-3 9 3-1 4-3 9 0 5 2 13 2 8-3-4-5-2-5 0-6 1-1-3-2-3-2Z"></path>
												<path fill="#54341b" d="m749 820 10 1-2 11-14-2Z"></path>
											</g>
										</pattern>
									</defs>
									<g id="meToon-idle" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1">
										<g id="foot-r">
											<path id="foot-r_sock" fill="#814c4c" d="m267 913 4 29-46 15s4-34 2-48Z"></path>
											<path id="foot-r_top" fill="#261920" d="M316 980c1-13-20-14-31-24a51 51 0 0 1-13-23c-1-9-32-5-30 3-6 4-18-2-18-2-5 10-6 26-5 34 30 6 9 26 97 12Z"></path>
											<path id="foot-r_sole" fill="#b1bcbc" d="M319 992c-8 10-65 10-75-1-5-6-17-13-26-16-2-2 0-13 0-13 19 5 24 13 36 15 23 4 44 4 63-2 2 2 4 12 2 17Z"></path>
											<path id="foot-r_fastner" fill="#b1bcbc" d="M258 958c4-1 12-4 24-2l-6-10s-13-6-26 5Z"></path>
											<path id="foot-r_shadow" fill="#000" stroke-width="0" d="M227 909v26l-3-1c-4 8-5 19-5 28h-1s-2 11 0 13a70 70 0 0 1 28 18c0-7 0-23-4-34-4-10-10-23-3-31 6-6 22-6 29-5l-1-10Z" opacity=".4"></path>
										</g>
										<g id="foot-l">
											<path id="foot-l_sock" fill="#814c4c" d="M62 908c2 6-1 30-1 30l45 14s-4-34-2-48Z"></path>
											<path id="foot-l_top" fill="#261920" d="M13 980c0-13 20-14 32-24 10-9 12-23 12-23 2-9 33-5 31 3 6 4 18-2 18-2 5 10 6 26 5 34-31 6-10 26-98 12Z"></path>
											<path id="foot-l_sole" fill="#b1bcbc" d="M10 992c9 10 66 10 76-1 5-6 17-13 26-16v-13c-19 5-25 13-36 15-23 4-44 4-63-2-2 2-4 12-3 17Z"></path>
											<path id="foot-l_fastner" fill="#b1bcbc" d="M72 958c-4-1-12-4-24-2l6-10s13-6 26 5Z"></path>
											<path id="foot-l_shadow" fill="#000" stroke-width="0" d="m103 904-40 4v12s20-2 26 4c7 7 5 18 4 28-1 15-11 17-12 42l5-3c5-6 17-13 26-16v-13h-1c0-9-1-20-5-28l-2 1v-30Z" opacity=".4"></path>
										</g>
										<g id="trousers">
											<path id="trousers-l" fill="url(#brown80sPattern)" d="M80 466c46 21 184 14 205 2 2 73-60 167-117 180-6 33-27 89-27 89-4 15-4 63-12 104-5 21 4 74-25 73H61c-13 0-17 0-31-25-9-18 15-36-9-76-5-7 6-34 6-39 0-33-4-43 0-66 8-44 17-108 28-161 1-4 9-13 9-16 2-8-2-14-2-24-1-22 15-37 18-41Z"></path>
											<path id="trousers-r" fill="url(#brown80sPattern)" d="M175 479c47 0 98-5 110-11 14 26 22 163 15 257-1 20-5 28 0 54 1 6 5 25 0 29s-6 23-1 33c9 19 6 79-30 79l-43-2c-22-4-28-40-19-49 4-5 4-26-1-31-7-8 2-22 2-27 2-27 1-44-8-69-6-40-31-77-38-112 1-7 4-13 3-19-5-35 1-60 10-132Z"></path>
											<path id="trousers_shadow" fill="#000" stroke-width="0" d="m68 482-3 6c43 46 177 39 227 4l-1-5c-61-21-166-40-223-5Zm-6 26c1 9 4 16 2 23 6 1 93 18 96 4 1-9-68-8-98-27Zm53 85c-10 0 42 40 42 40s-40-9-31-2c4 4 36 15 36 15-34 47-35 166-35 206l2-11c8-41 8-89 12-104 0 0 20-54 27-87 10 29 27 60 32 92l4 15c1-34-4-75-29-117 24 9 61-2 67-4 24-10-56 0-67-12 0 0 63-21 31-26l-15-3c-29-1-11 27-63 3-7-4-11-5-13-5Zm187 213c-5 5-12 13-15 24-5 21-50 29-50 34 0 4 18 7 41-3 15-7 19-25 19-25v-2c-2-10-1-23 3-26l2-2Zm-281 8c11 18 12 31 10 42 9-1 42-7 43-12 3-13-24-29-53-30Zm254 11c-9 0-48 21-70 12l1 1c4 3 4 14 3 22l1-1c6-7 60-18 66-31 2-2 1-4-1-3Zm-162 1-1 2c-13 33-51 41-49 47 1 5 22 2 27 1 7-1 24-11 28-17 4-9-1-34-5-33Zm13 49c-9 28-82 20-97 11l1 3c14 25 18 25 31 25h43c18 1 21-19 22-39Zm176 10-18 6c-29 9-74 7-78 4l-1-1c2 11 9 22 21 24l43 2c19 0 29-17 33-35Z" opacity=".4"></path>
										</g>
										<g id="arm-l">
											<path id="arm-l_skin" fill="#e8a984" d="M67 203S37 306 35 322l-12 31c-8 31-11 52-10 79 1 20-6 29-5 49-3 7-9 28-7 35 1 10 0 14 3 22l6 8c3 4 5 5 7 4-4-3-9-21-9-27l3 14 5 12c2 4 9 11 12 10-3-5-11-15-11-38l2 17 5 14c2 4 8 16 11 15 5-1 2-13-2-21-2-5-3-10-2-12l1-20c4 2 4 0 4 0l-1-11s1 22 4 26c2 5 6 12 11 10 5-1 1-10 0-15l-1-10 1-9c-1-7-4-14-8-21l-4-11c-1-4 0-11 1-14 10-20 20-54 27-76 3-9 6-9 8-23 7-53 39-114 34-137Z"></path>
											<path id="arm-l_shadow" fill="#000" stroke-width="0" d="m76 293-11 62c-5 29-26 104-26 104 9-16 26-73 27-76 1-4 7-15 7-18l6-31 7-44ZM36 500c-6-3-6 15-7 21l2 13 1-20h4s1 14 4 18c-3-10-1-31-4-32Zm-19 21c0 8 2 29 17 46-7-15-15-33-15-44 0-1-1-3-2-2Zm-16 0s1 13 3 17c1 3 7 10 10 12-10-13-13-29-13-29Zm7 2c1 9 4 28 18 36-7-9-13-23-15-35 0 0-1-3-3-1Z" opacity=".4"></path>
										</g>
										<g id="arm-r">
											<path id="arm-r_skin" fill="#e8a984" d="M292 208s30 104 32 119c0 6 9 21 11 31 8 31 12 53 11 79-1 20 6 29 5 49 3 8 8 28 7 36l-3 21c0 2-5 8-6 9-4 3-5 5-7 4 4-3 9-22 9-28l-3 14-5 12c-3 5-9 11-12 10 3-5 10-14 11-38l-2 17-5 14c-3 5-8 16-11 15-5-1-2-12 1-21 3-5 3-10 3-12l-2-19h-3l1-11s-1 21-4 26c-3 4-7 12-11 10-5-2-1-11-1-16l2-10c0-3-2-6-1-8 0-8 4-15 7-21l5-11c1-4 0-12-1-15-11-19-20-54-27-75-3-9-6-9-8-23-7-54-39-115-35-137Z"></path>
											<path id="arm-r_shadow" fill="#000" stroke-width="0" d="m282 298 12 62c4 30 26 104 26 104-10-16-26-72-27-75-2-4-7-15-7-18l-6-32-8-43Zm40 208c7-3 7 14 7 21 1 6 0 12-1 13l-2-20h-3s-1 14-5 18c4-10 2-31 4-32Zm20 21c-1 7-3 29-17 45 7-14 14-32 14-43 0-1 1-3 3-2Zm15 0-2 17-11 12c11-14 13-29 13-29Zm-7 2c-1 8-3 28-18 35 8-8 14-23 16-34 0 0 1-3 2-1Z" opacity=".4"></path>
										</g>
										<path id="neck" fill="#e8a984" d="M147 140c7 15-5 31-7 33 13 23 65 22 80 1-8-5-13-23-6-35Z"></path>
										<g id="tshirt">
											<path id="tshirt_torso" fill="#f9e0d0" d="M213 162c0 18-62 25-68 1-11 16-69 27-74 30-41 21-11 105 10 141-1 41 4 89-14 127-5 7 1 11 0 16l-2 4c36 30 113 34 170 25l15-3c19-4 35-11 44-18-3-9-11-19-7-27 8-15-3-21-7-31-7-30-8-64-6-95 23-26 53-118 15-138-22-11-49-10-76-32Z"></path>
											<path id="tshirt_sleeve-l" fill="#f9e0d0" d="M64 198c-20 14-32 97-48 108-1 27 65 28 65 28 0-47 1-95-17-136Z"></path>
											<path id="tshirt_sleeve-r" fill="#f9e0d0" d="M274 332c18-3 60-8 67-21-15-10-25-94-44-111-27 34-22 96-23 132Z"></path>
											<path id="tshirt_shadow" fill="#000" stroke-width="0" d="M274 294c-7 7-10 69-1 79l1-41 16-2s-7-23-16-36Zm-193 2c-8 12-16 37-16 37l16 1v40c9-9 7-71 0-78Zm209 154c-49 13-80 13-111 15-49 5 79 8 107-4l1-3 3-8ZM65 466l2 10c47 12 157 18 146 12-5-3-99-7-148-22Z" opacity=".4"></path>
										</g>
										<g id="noggin">
											<g id="eyes">
												<path id="eyes_white" fill="#fff" d="M144 50h72v40h-72z"></path>
												<g id="eye-r">
													<circle id="eye-r_pupil" cx="200.7" cy="73.6" r="4.5" fill="#000" stroke-width="0"></circle>
													<path id="eye-r_bottomLid" fill="#e8a984" d="M201 96c-8 1-17-6-15-16l29 2c-1 10-8 14-14 14Z"></path>
													<path id="eye-r_topLid" fill="#e8a984" d="M201 51c8 0 16 6 14 17l-29-3c1-10 8-14 15-14Z"></path>
												</g>
												<g id="eye-l">
													<circle id="eye-l_pupil" cx="158.9" cy="67.4" r="4.5" fill="#000" stroke-width="0"></circle>
													<path id="eye-l_bottomLid" fill="#e8a984" d="M159 90c-8 0-17-6-14-17l28 3c0 10-8 14-14 14Z"></path>
													<path id="eye-l_topLid" fill="#e8a984" d="M159 45c8 0 17 6 14 16l-28-2c0-10 8-14 14-14Z"></path>
												</g>
											</g>
											<path id="neck_shadow" fill="#000" stroke-width="0" d="m213 139-61 1-3 4c1 7 0 13-3 19 0 12 10 20 15 22 16 3 39-19 50-33l2-11v-2Z" opacity=".4"></path>
											<path id="bun" fill="#520000" d="M217 33c14-22 4-27-4-28 16-14 5 10 27-1-14 10-5 19-13 23 9 4 20-21 20-21 1 16-8 25-8 25 11-5 13-25 31 1 0 0-22-9-31 8 0 0-11 8 4 0 27-26 11 21 11 21-4-23-26-5-26-5 35-11 22 47-2 27-10-7-14-14-13-26l4-24Z"></path>
											<path id="head" fill="#e8a984" d="M187 15c-14 0-22 5-34 20-11 10-10 31-11 35-10 10-10 25-10 32-1 29 7 47 32 52 21 4 52 5 70-34 8-19 9-46 7-56-5-21-17-44-43-48Zm-29 41c8-1 16 6 13 16-8 3-19 3-26-2 0-10 7-14 13-14Zm42 6c8 0 16 6 13 16-8 4-19 3-26-2 0-10 6-14 13-14Z"></path>
											<path id="hair" fill="#520000" d="M143 50c-2 5 1 6 0 12l2-12c6-13 18-30 33-31 8-1 8 2 16 3 7 1 18-2 30 8 9 8 15 28 11 38-2 8-5 20-6 33-1 9-7 15-11 22-13 24-13-5-10-13 2-5-12-4-15-4-5-1-12-8-20-3-7 3-9-5-16-2-8 2-12-6-17-2-4 4 5 27-2 22-5-6-4-6-6-11v-8l-1 7c-1 12-1 17 5 28 4 7 5 22 12 26 8 5 20 7 28 7 9 0 20-13 27-18 11-3 15-8 18-10 1-3 11-13 13-51 2-1 7-4 9-2 3-17 4-30-3-45-7-17-20-31-39-34-32-5-48 17-58 40Zm16-8c-4 0-10 4-8 6 4-4 16-1 21 2-3-6-9-8-13-8Zm59 16c-1-6-7-10-15-11s-13 3-12 4c10-1 19 1 27 7Zm-71 49c8 0 15 11 20 4 2 7 26 0 31 0 15 2-18 36-21 24-1-7-10-4-13-5-12-3-5 4-12 5-6 0-14-28-5-28Z"></path>
											<g id="mouth">
												<path id="mouth_back" fill="#000" d="M195 115c-20 4-39 1-48-5v8c2 6 28 15 48 4Z"></path>
												<path id="mouth_teeth-bottom" fill="#fefefe" d="M153 119v4c10 4 23 6 37 1v-3c-12 3-25 3-37-2Z"></path>
												<path id="mouth_teeth-top" fill="#fefefe" d="M151 112v5c10 6 27 7 41 3v-4c-16 2-27 2-41-4Z"></path>
											</g>
											<g id="ear">
												<path id="ear_outer" fill="#e8a984" d="M234 91s0 12-3 25c0 0 9 2 9-9 0-4 11-17 4-22-4-2-10 6-10 6Z"></path>
												<path id="ear_inner" fill="none" d="M235 99c1-1 2 0 2 1l-2 6c-1 4 2 6 3 3 1-10 9-17 5-20-3-2-6 5-6 5"></path>
											</g>
											<g id="nose">
												<path id="nose_fill" fill="#e8a984" stroke-width="0" d="m172 69-5 5-5 9c-3 3-7 5-7 10s7 7 11 7c8 0 21 1 21-4 1-3-3-7-3-7s-2-22-12-20Z"></path>
												<path id="nose_nostril-l" fill="#000" d="M158 93c0 2 4 3 6 4-1-2-3-4-6-4Z"></path>
												<path id="nose_nostril-r" fill="#000" d="m178 95-5 2c2 1 8 0 8-1l-3-1Z"></path>
												<path id="nose_outline" fill="none" d="M184 89s4 4 3 7c0 5-13 4-21 4-4 0-11-2-11-7s4-7 7-10l5-9 5-5"></path>
											</g>
										</g>
									</g>
								</svg>
								<div class="star star-1">
									<svg class="twinkle" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
										<g id="star">
											<path fill="#fff" d="M44 62c-7 2-10 6-16 9 2-5 7-9 10-14-14-6-23-4-38-8 7-1 37-4 38-6L28 29c4 1 14 11 15 8 4-13 4-24 7-37 3 13 1 24 7 38 6-2 9-6 15-9-2 5-11 11-9 14 13 6 22 4 37 6-6 3-37 6-38 8 3 6 7 9 10 14-5-2-9-7-15-9-5 13-4 23-7 38-3-12-2-27-6-38Z"></path>
										</g>
									</svg>
								</div>

							</div>
						</div>
						<div class="landing_backdrop">
							<svg class="desert_fills" viewBox="0 0 50 50">
								<defs>
									<pattern id="desert_pattern-greenWool" width="50" height="50" patternUnits="userSpaceOnUse">
										<path id="path2744" fill="#93c9a1" style="fill:var(--lw_green-light);" d="M0 0v50h50V0Z"></path>
										<path id="path2746" fill="#61af76" style="fill:var(--lw_green);" d="m33 0-3 10-3 7-4 3V10l4-10h-7v20l-3 7-4 3v3h-3l-3-6 3-4V13l3-10V0H0v50h13v-7l7-6c3-4 3 0 3 3l-3 7v3l3-3 7-17v-3l3-4 4 4-4 10v13h17V0Zm14 10 3 7-3 6v20l-7-3V20l3-7zM3 10v7l4 6v4L3 37v6l-3-6a530 530 0 0 0 3-24Zm20 20v3z"></path>
									</pattern>
									<filter id="desert_filter-roughPaper" y="0" height="1" x="0" width="1" style="color-interpolation-filters:sRGB">
										<feTurbulence type="fractalNoise" baseFrequency="0.003" numOctaves="8" seed="0" result="result4" id="feTurbulence115"></feTurbulence>
										<feDisplacementMap in="SourceGraphic" in2="result4" yChannelSelector="G" xChannelSelector="R" scale="0" result="result3" id="feDisplacementMap117"></feDisplacementMap>
										<feDiffuseLighting lighting-color="#e9e6d7" diffuseConstant="1" surfaceScale="-5" result="result1" in="result4" id="feDiffuseLighting121" kernelUnitLength="0.01">
											<feDistantLight id="feDistantLight192" azimuth="118" elevation="42"></feDistantLight>
										</feDiffuseLighting>
										<feComposite operator="in" in="result3" in2="result1" result="result2" id="feComposite123"></feComposite>
										<feComposite in2="result1" result="result5" operator="arithmetic" k1="1.7" id="feComposite125" k2="0" k3="0" k4="0"></feComposite>
										<feBlend in="result5" in2="result3" mode="normal" id="feBlend127"></feBlend>
									</filter>
									<linearGradient id="lg_heroDesertSand" x1="0" x2="0" y1="277" y2="800" gradientUnits="userSpaceOnUse">
										<stop offset=".2" stop-color="#fae87f" style="stop-color:var(--lw_yellow-light);"></stop>
										<stop offset="1" stop-color="#e88527" style="stop-color:var(--lw_orange);"></stop>
									</linearGradient>
								</defs>
							</svg>
							<svg class="desert_sun" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" width="20vmin" height="20vmin" viewBox="0 0 150 150">
								<defs>
									<style>
										#sun,
										#sun_ora,
										#sun_yel {
											transform-origin: center;
										}
										#sun { animation: linear 2s infinite sun_breathe; }
										#sun_ora { animation: linear 32s infinite sun_rotate; }
										#sun_yel { animation: linear 32s infinite reverse sun_rotate; }
										@keyframes sun_breathe {
											50% { transform: scale(0.9); }
											100% { transform: scale(1); }
										}
										@keyframes sun_rotate {
											25% { transform: rotate(90deg); }
											50% { transform: rotate(180deg); }
											75% { transform: rotate(270deg); }
											100% { transform: rotate(360deg); }
										}
									</style>
									<radialGradient id="rgl_ora">
										<stop offset="0" stop-color="#fff"/>
										<stop offset=".5" stop-color="#feffe8" style="stop-color:var(--lw_orange-lightest);"/>
										<stop offset=".6" stop-color="#fedea0" style="stop-color:var(--lw_orange-light);"/>
										<stop offset="1" stop-color="#fff0"/>
									</radialGradient>
									<radialGradient id="rgl_yel">
										<stop offset="0" stop-color="#fff"/>
										<stop offset=".5" stop-color="#feffe8" style="stop-color:var(--lw_yellow-lightest);"/>
										<stop offset=".6" stop-color="#fbff9f" style="stop-color:var(--lw_yellow-light);"/>
										<stop offset="1" stop-color="#fff0"/>
									</radialGradient>
								</defs>
								<g id="sun">
									<path id="sun_ora" fill="url(#rgl_ora)" transform-origin="50% 50%" d="M134 28c4 6-22 20-19 26s30-6 33 1c1 6-28 10-28 17 0 6 30 6 30 12-1 6-30-1-32 5s26 17 23 23c-4 5-28-13-32-8s18 26 13 30c-6 4-21-21-26-19-6 3 6 30 0 32-7 2-11-28-17-27-7 1-6 31-13 30s1-30-5-32-17 26-23 22c-5-3 12-26 8-31-5-3-26 17-30 13-4-6 22-20 19-26-4-6-30 6-33-1-1-6 28-10 28-16 0-7-30-6-30-12 1-7 30 0 32-5 2-7-26-18-23-24 3-5 28 13 32 8S23 20 28 16c5-3 21 22 26 19 6-3-6-30 0-32 7-2 11 28 17 27 7 0 6-30 13-30 5 1-1 30 5 32s17-26 23-22c5 3-13 26-8 31 5 3 26-17 30-13Z"/>
									<path id="sun_yel" fill="url(#rgl_yel)" transform-origin="50% 50%" d="M132 124c-4 5-24-17-29-13s12 28 6 32c-6 2-16-26-22-24-6 1 0 31-6 31-7 1-5-29-12-30-6-1-11 29-18 27-5-3 7-29 2-32-6-4-22 22-27 17-5-4 17-24 13-29s-28 12-31 6c-3-5 25-16 24-21-2-7-32 0-32-8-1-6 29-4 30-10 1-7-28-13-26-18 2-7 28 6 31 1 4-5-21-22-17-27s24 18 29 14c5-5-12-29-6-32s16 25 22 24c6-2 0-31 6-32 7 0 5 29 11 30S92 1 99 3c5 2-7 30-2 33s22-23 27-18c4 4-18 24-13 30 4 4 28-13 31-7s-26 16-24 22 32 0 32 6c0 7-30 5-30 11-1 7 28 13 26 19s-28-8-31-2c-4 6 21 22 17 27Z"/>
								</g>
							</svg>
							<svg class="desert_clouds" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 1920 1920">
								<defs>
									<linearGradient id="clouds_gradSunset" x1="0" x2="0" y1="0" y2="1">
										<stop offset="0.5" stop-color="#fff"></stop>
										<stop offset="1" stop-color="#ccc"></stop>
									</linearGradient>
								</defs>
								<path class="desert_cloud" style="--animDur:225s;" fill="url(#clouds_gradSunset)" d="M582 700c-4 22 50 18 63 17-28 23 77 31 84 4 3-13-14-17-34-18 39-28-108-41-113-3z"></path>
								<path class="desert_cloud" style="--animDur:185s;" fill="url(#clouds_gradSunset)" d="M668 650c-1 24 53 15 71 13-42 11 121 35 124-6 1-34-69-23-101-16 27-19-93-22-94 9z"></path>
								<path class="desert_cloud" style="--animDur:150s;" fill="url(#clouds_gradSunset)" d="M0 590c-4 16 17 17 43 20-32 25 139 47 148-1 2-14-15-12-40-15 34-26-140-53-151-4z"></path>
								<path class="desert_cloud" style="--animDur:120s;" fill="url(#clouds_gradSunset)" d="M1803 520c-4 19 21 24 51 26-71 40 186 72 196 7 6-40-82-33-119-31-11-41-117-43-128-2z"></path>
								<path class="desert_cloud" style="--animDur:95s;" fill="url(#clouds_gradSunset)" d="M1920 440c-43-5-72 2-69 20 7 47 293 27 223-10 27-1 123 5 119-21-3-26-101-25-152-18-43-30-164-4-121 29z"></path>
								<path class="desert_cloud" style="--animDur:75s;" fill="url(#clouds_gradSunset)" d="M250 370c-69 3-130 1-121 43 17 85 310 21 260-18 124-22-167-104-139-25z"></path>
								<path class="desert_cloud" style="--animDur:60s;" fill="url(#clouds_gradSunset)" d="M1142 270c-35 5-177-24-173 35 7 100 213 57 303 20 35 18 166 39 169-18 3-44-85-36-128-30 49-49-230-76-171-7z"></path>
								<path class="desert_cloud" style="--animDur:50s;" fill="url(#clouds_gradSunset)" d="M0 160c-55-19-94-3-91 29 8 89 185 59 266 30 56 22 168 23 170-35 2-53-97-65-154-43 158-74-332-70-191 19z"></path>
							</svg>
							<div class="desert_terrain">
								<svg class="desert_sand" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 800">
									<path fill="#ec9983" style="fill:var(--lw_orange-light);" d="M1456 146c-11 3-30 3-26 18 2 8-1 10-8 8-6-3 2 28-2 42-12 16-32 12-50 17-18-1-35 4-52 4-10-1-21-1-31 1-11 1-23 4-34 4-29-5-59-11-88-14-26 1-51 13-77 8-17 2-33-5-49-7-21-1-41 7-62 7-39-1-79 1-118 4l-47-11c-6-12-6-23-7-34 0-8-3-21-11-16 1 8-3 32-12 15 1-13-4-20-17-13s-11 25-13 38-22 15-32 21c-25-1-50-7-74-3-32 3-63 10-94 3-25-4-50 5-75 5-28-4-56-14-84-10-33 4-67 2-99 10-13 2-26 6-38 2-23-4-46-9-69-5-20 1-40 6-58-4-15-6-28-6-28-27 1-33-19-24-34-20 0-8-6-20-9-5-2 5 4 18-6 17-4 5 0 16-4 23-7 13-48 23-48 23v253h1920V244s-45-6-66-6c-16-1-32-6-48-3-27 1-54-2-80 1-27 3-53 8-80 5-31 0-61-9-92-9-19-4-36-10-55-10-6-4-9-9-8-16 1-5 2-13-4-15-11-3-1-34-7-30 0 7-1 32-8 16-3-7 2-19-3-24l-13-7z" display="inline"></path>
									<path fill="url(#lg_heroDesertSand)" d="M1920 260H0v540s257-56 388-60c170-5 339 65 510 50 125-12 270-86 364-103 183-33 306 16 406 23 206 15 252-43 252-43z"></path>
								</svg> 
								<svg class="desert_furniture" xmlns="http://www.w3.org/2000/svg" width="clamp(100%, 1920px, 177.777%)" height="100%" preserveAspectRatio="none">
									<svg class="desert_rock desert_rock-topRight" height="40%" y="15%" x="36%" viewBox="0 0 526 320">
										<path class="desert_shadow" fill="#000000" style="fill:var(--lw_orange);" d="m228 316-77-23c-11-8-23 9-34-1-15-5-28-10-40-17-7 1-5-9-5-9l10-1c-1-2-1-4 1-7-3-7-1-19-4-21-2 3-3 3-6 3-13 12-20-19-18-28 4-7-11-15-14-21-9-13-41-31-41-31h526l-73 61c-1 20-16 28-21 29 3 10-4 16-9 22-4 8-9 14 0 20-17 8-37 16-51 11-8-2-13-7-11-11l7-4c-9-15-27-23-33-41-9-10-11-12-4-19 3-14 8-8-23-21-11-1-24-5-31-10l-18-7c-6 1-10 2-15 5 2 1 8 2 10 4 4 4 2 11-1 15-2 6 10 3 12 9 3 5 5 6 5 9 0 4-3 6-9 7-6 0-13-12-11-1 4 13 20 16 20 27 0 5-4 11-9 14 3 11 17 14 23 22 5 16-14 18-24 18l-8 1c-8 0-17-2-24-4Zm161-42c10-16 3-24-15-16-4 0 9 15 15 16Zm-187-9c-1-4-2-7-1-10-15 2-15-9-13-18l2-19c-1-8 18-14 21-18 3-15-8-11-19-11l-11 1c-15 9-52 3-61 13l4 19c2 5-1 6-5 7-4 3-15 4-13 13l18 3 16 9c16 3 32 7 48 13 4 1 12 2 14-2Z"></path>
										<path fill="#fead5f" style="fill:var(--lw_orange-light);" d="M252 0c-8-1-16 1-24 4l-77 23c-11 8-23-9-34 1-15 5-28 10-40 17-7-1-5 9-5 9l10 1c-1 2-1 4 1 7-4 10 2 30-12 16-14-3-19 20-16 30 4 7-11 15-14 21-9 13-28 25-41 31 69 2 297-3 366-3l88-1c8-42-69-112-31-128-16-7-32-20-51-11-11 3-17 12-4 15-9 15-27 23-33 41-13 14-12 32 10 36-3 13-33 11-45 19-14 10-30 18-47 22-5 0-10-4-9-7 1-2 8-3 10-4 4-7-4-21-4-21s12-13 20-18l-9-7c-29 5-2-25 6-32 7-4 2-16-6-20 3-11 17-14 23-22 5-16-14-18-24-18Zm1 150 6-2ZM389 46l1 1c9 1 9 24-16 15-4 0 9-15 15-16Zm-194 6c3 0 6 1 7 3-1 4-2 7-1 10-15-2-15 9-13 18l2 33c2 11 23 2 21 18 3 15-8 19-19 19-40-3-77-15-78-23l5-30c-18 2-21-27-12-41l33 7 42-11s7-3 13-3Z"></path>
										<path fill="#ed6361" style="fill:var(--lw_red-light);" d="M251 1c-4 0-8 2-10 7-13 5-26 13-40 18-20 2-40 6-59 7-7-3-14-11-19-1-8 9-18 12-28 15-7 4-16 1-23 3 5 4 16-3 14 8l6 18c-1 7-7 14-16 4-18-4-8 19-6 29 2 8-11 13-15 18 28 15-55 33-55 33h15c100 19 357 5 442 4l69-4-73-61c-1-21-18-29-22-29 6-10-3-16-8-22-6-7-11-13 0-20-10-6-22-11-33-10-7 0-14 2-20 7-25 2 9 13 18 8 20-5-13 8-16 14-12 14-34 18-42 35-4 42 23 23-30 46-20 3-17 18-46 22h-1l-9-7c3-1 10-3 11-5s2-4 1-10c2-3 1-2-3-8-9-5 9-3 12-9 3-5 5-8 5-11 0-4-3-6-9-7-6 0-13 2-11-9 4-9 12-14 17-23 6-4 3-10-1-11-2-5-13-9-4-14 7-6 15-12 22-20 2-9-8-13-15-12Zm135 41c3 0 7 2 10 9 13 16-5 14-18 18-5-4-12-10-2-14-1-5 4-12 10-13Zm-184 7c9 4-9 16 4 19-13-1-17 2-14 11-2 1 43 8 42 11-2 11-40-1-40-1-1 7-2 13 1 17 0 5 45 4 32 17-5 0-25-12-36-12-4 0 1 5-1 5-1 8 18 14 21 18 3 8 0 12 1 19l1 1c-46 1-84-6-92-19-4-5 1-17 1-24 10-16-14-6-14-16-4-6-3-12-2-17l18-3 21-13c8-3 16 3 24-4Z"></path>
										<path fill="#de3854" style="fill:var(--lw_red);" d="m280 9-2 1c-5 1-11 3-16 2l-16-1c-1 3 0 10-4 8-5-1-10 3-15 5l-15 7c0 2 2 5-1 5l-47 9-51 9-8 15 19 6 16-9 35-8 29-11c2 2 4 4 6 3h6c3-3 8-3 11-5l29-6 27-23c0-3 0-7-3-7Zm143 19c-11 5-25 2-31 4 11 1 23 17 31 16-4-8-9-14 0-20ZM265 56c-2 0-6 2-8 1l-21 1-15 13c-1 5 7 4 9 5l20 4 2-2 15-18c0-3-1-3-2-4Zm165 1c-6 0-17 13-27 13h-8c-9 0-13 1-25 4 10 6 28 7 40 5 10 2 31-7 20-22Zm-31 32c-26 0-50 1-40 8 13 7-24 28-43 35l-19 11c-6 4-16 7-25 10-2-3-11-5-29-8-2-4 4-5 7-6h4c3-2 2-8 3-12 1-3-8-8-3-10 4 0 10-2 11-6l5-11-16-2c-5 1-13 1-18 4 0 3-7 12-2 13 5 2 12 1 16 3-1 3-7 1-10 2l-11 1c-2 1-3 3-3 6l-2 12c3 2 8 5 3 8-10 4-16 6-20 9-49-6-84-20-84-20l-1 1-2-3 4-29c1-6-32-4-32-4-1 0-1 4 2 10-3-2-7 1-8 1-2 0-15 29-16 41l-42 9c46 16 430 4 430 4l68-6c-61-38-96-72-127-71Z"></path>
									</svg>
									<svg class="desert_rock desert_rock-topLeft" height="55%" y="9%" x="-25%" viewBox="0 0 562 556">
										<path class="desert_shadow" fill="#000000" style="fill:var(--lw_orange);" d="M359 556c-32 0-100-10-100-10s-6 0-10-5l-4-16 3-22c8-4 28-6 49-8 16-4 19-9 9-12l-3-15 1-16 1-6v-2l3-1c8-5 12-17 1-20v-1s-5-2-10-9l3-19 5-9 3-2c11-5 2-15-6-16h-3c-47-9-47-30-104-38l-8 47c-4 2-6 7-1 10l-4 54-1 14c-1 5-5 11-9 12v1h-2l-33-9-2 2-5 7c-2 2-4 4-12 2-11-2-17-8-26-4-5 3-9 7-14 2-11-4-17-14-17-25s-8-18-8-18v-1c0-22 23-43 23-65 3 0 5-5 2-8-2 0-2-1-3-2-1-3 1-8 1-11 0 0-8-16-15-17-21-2-63-42-63-42h562s-67 29-121 43c-18 4-14 21-35 25-24 6-2-6-27 1-5 7 0 10 4 12l4 1c7 10 8 23 11 34l4 11v2c-1 2-3 4-6 5-5 4-11 9-5 15 2 15 4 32 3 47-7 7-2 10 3 11 8 2 63-6 64 8-5 17 1 36 0 51-19 15-73 7-86 10Z"></path>
										<path fill="#fead5f" style="fill:var(--lw_orange-light);" d="M375 213c-3-6-12-9-1-12 11-15 8-35 17-51-2-9-10-17-3-25 6-31 6-70-21-84-13-8-91 5-105-3-17-3-9 7-14 15 52 4 76 14 58 20 0 5-3 33-1 38 10 4 16 18 4 22l-2 38c18 6 2 20-6 18-47 9-47 30-104 38-22-37-11-89-14-125-6-11-6-2-9-13-4-1-24 7-35 9-9-7-4-15-19-11-11 2-17 8-26 4-5-3-9-7-14-2-11 4-17 14-17 25s-8 18-8 18c0 1 28 60 23 66 4 0 6 8-1 10l1 11-25 58Zm86-201c-19-15-73-7-86-10-13-8-116 8-116 8s-6 0-10 5"></path>
										<path fill="#ed6361" style="fill:var(--lw_red-light);" d="m432 7-183 8-4 16 3 22c17 9 97 8 118 13 12 14-24 6-33 7h-27l-3 15 2 24c19 4 39 7 58 14-9 5-28-1-40 0 13 5 31 3 41 12-14 3-41-3-55-4 0 0-5 2-10 9l3 19 5 9c10 5 28 7 36 13 2 7-2 17 1 21-5 3-12 2-18-2-16-10-23 5-23-11l1-3h-3c-5 10-18-4-14 23-1 5-82 23-90 15-18-45-13-84-14-125 0 0-12 2-19 15-13 7-31-4-42 5 5-9 10-23 17-24-15-12-22 41-43 39-11 1-35-11-41-4 0 22 23 43 23 65 13 1 16-4 28-2-2 8-15 8-26 10-6 1-2 9-2 13 0 0-8 16-15 17-21 2-33 35-63 42 31 3 26 17 58 14l121-11s88-4 139 2l53-53s3-18 8-21c-8-11 8-13 8-13 2-10 11-34 15-45 2-6-21-12-11-22l3-47c-7-7-2-10 3-11 52-5 37-32 37-32ZM170 174l1 9c-9 4-28 10-37 10l-1-11c3-3 10-4 16-4Z"></path>
										<path fill="#de3854" style="fill:var(--lw_red);" d="M432 7c-1 15 4 40-6 53 0 3-52 5-60 6l31 5c8-2 63 6 64-8-5-17 1-36 0-51-7-4-22-10-29-5Zm-61 69-6 2-1 47c8 0 20 8 27 4 2-15 4-32 3-47-5-4-16-7-23-6ZM131 88l-4 7c-7 17-21 29-31 43l10 58c8 4 14 11 14 21 1 8-11 26-9 33l9-6c15-8 13-24 13-37l1-14c9 0 4-16-1-11 0 0-6 0-5-14-4-14-10-28-9-42 7-9 13-25 20-28-5-4-6-9-8-10Zm41 1c-2 0-3 2-4 6-2 15-6 28-3 42l6 46s14 42 11 80l16-1-4-13c-4-11 1-12 3-22l-8-47c-4-2-6-7-1-10l-5-61c3-6-5-20-11-20Zm196 52c-4 0-6 1-5 7-2 14-9 25-17 36 10 3 35 17 41 12 9-14 9-33 15-46-1-11-27-8-34-9Zm-21 65s4 12 6 30l-35 47 106 2 57-1s63-6 81-6c-31-15-67-29-121-43-18-4-14-21-35-25-24-6-2 6-27-1-7-10-19 3-32-3Z"></path>
									</svg>
									<svg class="desert_grass desert_grass-clone6" height="7%" y="40%" x="28%" viewBox="0 0 140 343">
										<use href="#desert_grass"></use>
									</svg>
									<svg class="desert_cactus desert_cactus-clone1" height="23%" y="30%" x="40%" viewBox="0 0 180 585">
										<use href="#desert_cactus"></use>
									</svg>
									<svg class="desert_grass desert_grass-clone5" height="12%" y="41%" x="34%" viewBox="0 0 140 343">
										<use href="#desert_grass"></use>
									</svg>
									<svg class="desert_grass desert_grass-clone4" height="18%" y="41%" x="45%" viewBox="0 0 140 343">
										<use href="#desert_grass"></use>
									</svg>
									<svg class="desert_rock desert_rock-bottomRight" height="20%" y="49%" x="36%" viewBox="0 0 135 132">
										<path class="desert_shadow" fill="#000" style="fill:var(--lw_orange);" d="M3 66 0 88v1a556 556 0 0 1 14 23l2 2 5 5c14 10 46 17 51 11 4-4 8-6 11-7 0 0 37-10 48-24 7-10 2-33 2-33Z"></path>
										<path fill="#ec8c2f" style="fill:var(--lw_orange-light);" d="M3 66 0 44c0-2 8-14 14-24l7-7C35 3 67-4 72 2c4 4 9 6 11 7 13 4 25 9 36 15 14 8 13 28 13 28Z"></path>
										<path fill="#d93833" style="fill:var(--lw_red);" d="M83 9c-1 6-5 9-2 17 16 6 35 17 50 7C120 19 83 9 83 9Zm-67 9C12 26 2 35 0 44c4 8 3 22 3 22l41 5 1-7-5-14c-1-11-13-18-16-23 1-2 3-1 5-2 6 1 12-2 19-3-4 0-14 3-15 2-6-1-9 2-11 1Z"></path>
										<path fill="#c90d2b" style="fill:var(--lw_red-dark);" d="M13 23 0 44c0 2 5 8 13 18 4 5 4 5 0-4-3-3-4-8-6-11v-9Zm10 3c0 6-3 8-2 11l1 4c0-5 3-13 1-15Zm108 7-16 5c-8 4-15 0-23 0-15 2-35 6-45 14-2 1-6 14-3 19l9 1 22 2 37-2 21-6s5-23-2-33ZM22 41c-2 7-4 8-2 10 2 0 3-7 2-11Z"></path>
									</svg>
									<svg class="desert_grass desert_grass-clone2" height="11%" y="41%" x="-22%" viewBox="0 0 140 343">
										<use href="#desert_grass"></use>
									</svg>
									<svg class="desert_cactus" height="56%" y="22%" x="-37%" viewBox="0 0 180 584">
										<g id="desert_cactus">
											<path class="desert_shadow" fill="#000" style="fill:var(--lw_orange);" d="M89 584c-12 0-24-8-31-29v-1c-15-47 51-158-10-116l-4 5c-8 13 6 35 3 50l-1 5v1c-2 3-5 6-9 7-8 4-18 3-25-3-9-7-11-21-12-33-1-22 3-48 21-63 9-9 20-11 32-12 32-3 8-103 8-103h54s-31 95 12 91l10-1c11-1 21 0 27 9l2 3c12 15 15 35 14 53-1 17-7 33-19 42h1c-6 4-14 6-21 4-15-6-19-24-14-38 3-12 27-43-12-38l-2 2c-4 6-4 23-2 43 3 27 8 59 8 81v5c0 7-1 12-4 17-2 5-5 9-9 12l-1 1-1 1v-1c-4 4-10 6-15 6Z"></path>
											<path fill="url(#desert_pattern-greenWool)" d="M58 30c-15 47 51 157-10 116-16-11 2-37-1-55-2-16-24-19-35-10-9 7-11 21-12 33-1 22 3 48 21 63 9 9 20 10 32 11 35 3 8 104 8 104 3 14 44 10 54 0 0 0-31-96 12-92 13 2 29 5 37-8 19-22 19-55 9-81-5-13-19-24-32-20-15 6-19 24-14 38 3 12 27 43-12 38-15-3 6-111 4-131-1-36-46-55-61-7Z"></path>
											<path fill="#448756" style="fill:var(--lw_green-dark)" d="M48 146c-16-11 2-37-1-55-1-6-4-11-10-13 9 31-18 55 11 68Zm67 146s-31-96 12-92c13 2 29 5 37-8 19-22 23-77-3-97 23 47 11 111-45 96-32-7-28 89-28 103 0 2-24 7-27-2 2 16 48 11 54 0Zm0-125c-16-6 6-93 4-131-1-14-6-24-15-31 27 45-36 161 11 162Z"></path>
										</g>
									</svg>
									<svg class="desert_grass desert_grass-clone3" height="18%" y="44%" x="-43%" viewBox="0 0 140 343">
										<use href="#desert_grass"></use>
									</svg>
									<svg class="desert_grass desert_grass-clone1" height="40%" y="49%" x="-44%" viewBox="0 0 140 343">
										<use href="#desert_grass"></use>
									</svg>
									<svg class="desert_grass" height="29%" x="23%" y="47%" viewBox="0 0 140 344">
										<g id="desert_grass">
											<path class="desert_shadow" fill="#000" style="fill:var(--lw_orange);" d="M27 343c-25-36-14-99-6-134-11 6-16 67-13 76-24-46 14-113 14-113h95c14 29 31 82 18 105 0-28-3-48-14-68 4 41 17 81-5 116 8-34 5-75-8-107 0 21 7 66-6 86 3-10 3-59-13-99 3 44 9 93-13 129 8-27 4-100-5-126-18 29-4 88 3 106-21-9-24-92-22-101-10 26-15 59-3 84-17-14-14-61-13-80-20 39-24 85-9 126Z"></path>
											<path fill="url(#desert_pattern-greenWool)" d="M27 0C2 36 13 99 21 134 10 128 5 67 8 58c-24 46 14 114 14 114 22 8 65 6 95 0 14-29 31-83 18-106 0 28-3 48-14 68 4-41 17-81-5-116 8 34 5 75-8 107 0-21 7-66-6-86 3 10 3 59-13 99 3-44 9-93-13-129 8 27 4 100-5 126-18-29-4-88 3-106-21 9-24 92-22 101-10-26-15-59-3-84-17 14-14 61-13 80C16 87 12 41 27 0Z"></path>
											<path fill="#448756" style="fill:var(--lw_green-dark)" d="M27 0C1 52 20 147 52 167 11 85 12 41 27 0Zm49 9c21 39 0 147 11 156 1-40 15-120-11-156Zm40 9c21 37-6 135-1 135 5-39 27-93 1-135ZM74 29c-11 23-35 107 6 135-32-44-12-118-6-135Zm28 10c10 24-7 111 3 117-2-7 14-93-3-117Zm-53 7c-14 14-16 95 14 122-25-45-26-98-14-122ZM8 58c-5 20-5 95 27 107C6 137 5 66 8 58Zm127 8c5 27-2 75-25 100-3 5-49 13-88 6 4 4 51 11 95 0 14-29 30-83 18-106Z"></path>
										</g>
									</svg>
									<svg class="desert_rock desert_rock-bottomLeft" height="28%" y="59%" x="-28%" viewBox="0 0 244 188">
										<path class="desert_shadow" fill="#000" style="fill:var(--lw_orange);" d="M135 188s-46-17-59-10c-27-1-21-25-49-36-6-4-23-22-23-22L0 94h244l-41 60-42 24Z"></path>
										<path fill="#ec8c2f" style="fill:var(--lw_orange-light);" d="m0 94 1-21s21-24 26-27c35-15 21-33 49-36 13 7 59-10 59-10l24 12 46 82Z"></path>
										<path fill="#d93833" style="fill:var(--lw_red);" d="m0 94 1-21c9-14 20-22 26-27 16 4 31 4 46 2-4-7-15-17-15-17 7-10 16-14 26-14 18 15 44 16 62 20l18-11-9-5-30-5 27-1 7-3c14 13 36 25 46 38l33 38 6 6Zm21-19c13-2 19-4 31-4-16-5-34-16-43-3-5 5-6 6-5 7Zm108-14c-3-2-12-6-22-2-13 3-30-1-41 6 9 3 27-6 34 0 13-1 23-2 34 1-1-2-2-4-5-5Z"></path>
										<path fill="#c90d2b" style="fill:var(--lw_red-dark);" d="M109 106c-18-3-37-5-50-5-23 0-29 4-46-2L0 94c12-5 31-7 42-6l37-17c10 5 18 10 30 12 9-7 42-10 42-10l-5-36 18-11-9-5-30-5 27-1 7-3c13 10 25 20 39 29l46 53c-16 8-35 11-53 9-28-2-55 4-82 3Z"></path>
									</svg>
								</svg>
							</div>
						</div>

					</div>

				</div>
			</div>
			<div class="fist_container">
				<svg class="fist" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin meet" width="100%" height="100%" viewBox="0 0 612 1000">
					<g id="fist" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
						<path id="fist_skin" fill="#e8a984" d="M292 1c-18-1-22 17-43 21-18 3-32-17-59-3-21 11-18 21-25 33-16 27-24 38-23 73 0 9-17 21-13 78-33 36 10 75 17 85 10 12 23 37 51 56 0 0-13 138-32 193C113 688 7 983 1 999h610l-11-46s-99-294-129-430c-8-41-15-109-17-130-1-19 2-48-11-69a62 62 0 0 0 0 0s15-43 25-64c22-48 18-138-16-183-5-7-27-4-37-10-14-7-21-24-38-30s-26 4-39-1c-17-7-23-34-46-35Z"></path>
						<path id="fist_mids" fill="#000" stroke="none" opacity=".2" d="M270 15c-2-2-4 6-2 17 11 57 19 21 32 12 6-5-18 4-27-24ZM169 43l-4 9c-16 27-24 38-23 73 0 9-17 21-13 78-3 3 14 58 12 55-10-11-18-48-23-35-7 30 22 57 28 65 10 12 23 37 51 56 0 0-13 136-32 191 8-6 35-18 45-8 53 51 72 43 55 19-28-40-41-87-45-129-1-24-8-36-1-75 10-50 60-47 51-59-72 5-80-68-88-116-7-35 20-118-13-124Zm302 71c-2 35 12 71-15 78-66 10-83-21-94-58-8-23 9 61 15 96 4 24 25-68 57 20 4 11-1 38-10 55 11 9 17 15 19 19-13-20 19-52 25-64 17-37 19-99 3-146Zm-149 19-1 3c-10 58 20 124 16 83-1-13-10-85-15-86Zm88 194c-23 0-1 18 12 28 14 10 33 41 32 38l-3-44c-8-13-15-21-41-22Zm60 187c-18 41 33 147 29 200-7 100 74 205-23 231-101 27-179-189-244-326-11-22-66-54-70-74C109 699 7 983 1 999h610l-11-46s-99-294-129-430Z"></path>
						<path id="fist_highlights" fill="#fff" stroke="none" opacity=".4" d="m292 1-9 1c2 6 5 10 15 15 12 5 22 19 34 24 18 7 31-1 44 5 12 5 14 17 25 23s27 4 38 11c16 9 10 16 30 30-6-15-9-22-17-33-6-8-27-4-37-10-14-7-21-24-38-30s-26 4-39-1c-17-7-23-34-46-35Zm-84 13c-6 0-11 1-18 5h-1c11 2 27 3 42 14 6 4 15-3 21-12l-3 1c-13 2-25-8-41-8Z"></path>
						<path id="fist_shadow" fill="#000" stroke="none" opacity=".2" d="M165 52c-16 27-24 38-23 73 0 9-17 21-13 78l-1 1 13 54c-9 3-13-26-23-35-7 30 22 57 28 65 10 12 23 37 51 56 0 0-13 138-32 193 43-62 33-67 38-112 2-19 0-59 3-71 7-23-12-24-1-63-28-28-41-41-52-90-9-41 0-61 7-91 6-25 16-38 5-58Zm316 119s-2 29-14 31c-34 8-19 30-18 51 0 26-8 18-2 39l21-32c12-26 14-56 13-89Z"></path>
					</g>
				</svg>
			</div>
		</section>

		<section class="contact" id="section-contact">
			<div class="sectionGrid">
				<div class="landing_content" style="--col: narrow-l / narrow-r;">
					<div class="copy">
						<h2 class="title">
							Contact Form
						</h2>
						<p>
							Complete the form below to get started
						</p>
					</div>
					<div class="align_me-centre">
						<?php echo do_shortcode( '[bigup_contact_form title="" message=""]' ); ?>
					</div>
				</div>
				<div class="landing_backdrop">
				</div>
			</div>
		</section>

	</main>

	<footer class="pageGrid">
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
		</div>
	</footer>

	<aside class="modal modal_contactForm">
		<div 
			role="dialog" 
			aria-labelledby="aria_form-title" 
			aria-describedby="aria_form-desc" 
			class="modal_dialog sauce "
		>
			<div class="modal_controls">
				<button 
					aria-label="Close Contact Form"
					title="Close Contact Form"
					type="button"
					class="modal_control-close"
				>
					Close
				</button>
			</div>
			<div class="modal_contents">
				<?php echo do_shortcode( '[bigup_contact_form title="Let&apos;s Get Your Project Started" message="Complete the form below and I&apos;ll get back to you shortly - Jeff"]' ); ?>
			</div>
		</div>
	</aside>

	<?php wp_footer(); ?>

	</body>
</html>
