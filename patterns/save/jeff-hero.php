<?php
namespace BigupWeb\Lonewolf;

/**
 * Title: Jeff's Developer Hero
 * Slug: lonewolf/jeff-hero
 * Categories: bigupweb
 * Keywords: section, image, hero, title, button, animation, gsap
 *
 * @package lonewolf
 */

$strings = array(
	'title'  => __( 'Welcome Amigo!', 'lonewolf' ),
	'intro'  => __( 'This is a full width section designed to provide impact as a hero banner. Some GSAP animation provide a nice surprise as you scroll down!', 'lonewolf' ),
	'button' => __( 'Let\'s go', 'lonewolf' ),
);

$svg = array(
	'hand_left'     => Util::get_contents( LONEWOLF_PATH . 'assets/img/patterns/bigupjeff/grabhand-left.svg' ),
	'hand_right'    => Util::get_contents( LONEWOLF_PATH . 'assets/img/patterns/bigupjeff/grabhand-right.svg' ),
	'hipster'       => Util::get_contents( LONEWOLF_PATH . 'assets/img/patterns/bigupjeff/meToon_idle.svg' ),
	'fist'          => Util::get_contents( LONEWOLF_PATH . 'assets/img/patterns/bigupjeff/fist.svg' ),
	'star'          => Util::get_contents( LONEWOLF_PATH . 'assets/img/patterns/bigupjeff/twinkle.svg' ),
	'desert_fills'  => Util::get_contents( LONEWOLF_PATH . 'assets/img/patterns/bigupjeff/desert-fills.svg' ),
	'sun'           => Util::get_contents( LONEWOLF_PATH . 'assets/img/patterns/bigupjeff/sun.svg' ),
	'clouds'        => Util::get_contents( LONEWOLF_PATH . 'assets/img/patterns/bigupjeff/clouds.svg' ),
	'sand'          => Util::get_contents( LONEWOLF_PATH . 'assets/img/patterns/bigupjeff/desert-sand.svg' ),
	'desert_assets' => Util::get_contents( LONEWOLF_PATH . 'assets/img/patterns/bigupjeff/desert-furniture.svg' ),
);

?>
<!-- wp:group {"align":"full"} -->
<section class="heroDesert">
	<div class="scrollTriggerParent">
		<div class="scrollTriggerChild">
			<div class="sectionGrid">
				<div class="landing_content" style="--row: 1 / -1; --col: narrow-l / narrow-r;">
					<div class="sign ">
						<div class="sign_pinSignTop">
							<?php Escape::svg( $svg['hand_left'] ); ?>
							<?php Escape::svg( $svg['hand_right'] ); ?>
							<div class="star star-2">
								<?php Escape::svg( $svg['star'] ); ?>
							</div>
						</div>

						<!-- wp:column {"verticalAlignment":"center"} -->
						<div class="copy wp-block-column is-vertically-aligned-center">

							<!-- wp:heading {"level":1,"fontSize":"xxl"} -->
							<h1 class="sign_title title has-xxl-font-size"><?php echo esc_html( $strings['title'] ); ?></h1>
							<!-- /wp:heading -->

							<!-- wp:paragraph -->
							<p><?php echo esc_html( $strings['intro'] ); ?></p>
							<!-- /wp:paragraph -->

							<!-- wp:buttons -->
							<div class="wp-block-buttons">
								<!-- wp:button {"className":"is-style-primary"} -->
								<div class="wp-block-button is-style-primary">
									<a class="wp-block-button__link wp-element-button">
										<?php echo esc_html( $strings['button'] ); ?>
									</a>
								</div>
								<!-- /wp:button --></div>
							</div>
							<!-- /wp:buttons -->

						</div>
						<!-- /wp:column -->
					</div>


					<div class="svgMe_container">
						<?php Escape::svg( $svg['hipster'] ); ?>
						<div class="star star-1">
							<?php Escape::svg( $svg['star'] ); ?>
						</div>
					</div>
				</div>

				<div class="landing_backdrop">
					<?php Escape::svg( $svg['desert_fills'] ); ?>
					<?php Escape::svg( $svg['sun'] ); ?>
					<?php Escape::svg( $svg['clouds'] ); ?>
					<div class="desert_terrain">
						<?php Escape::svg( $svg['sand'] ); ?>
						<?php Escape::svg( $svg['desert_assets'] ); ?>
					</div>
				</div>

			</div>
		</div>
	</div>

	<div class="fist_container">
		<?php Escape::svg( $svg['fist'] ); ?>
	</div>

</section>
<!-- /wp:group -->
