<?php
/**
 * Title: Pricing Plans Section
 * Slug: lonewolf/pricing-plans
 * Categories: lonewolf
 * Keywords: pricing, section, plans, services, products
 *
 * @package lonewolf
 */


$strings = [
	'title'  => __( 'Pricing Plans', 'lonewolf' ),
	'byline' => 'Demonstrate 3 options side-by-side',
	'button' => __( 'Buy Now', 'lonewolf' ),
	'names' => [
		'1' => __( 'Budget-Friendly' ),
		'2' => __( 'Bang for your Buck' ),
		'3' => __( 'Our Best Service' ),
	],
	'prices' => [
		'1' => __( '£90' ),
		'2' => __( '£140' ),
		'3' => __( '£250' ),
	],
	'list' => [
		'1' => __( 'Lorem ipsum dolor sit amet' ),
		'2' => __( 'Consectetuer adipiscing elit' ),
		'3' => __( 'Aliquam tincidunt mauris eu risus' ),
		'4' => __( 'Vestibulum auctor dapibus neque' ),
		'5' => __( 'Nunc dignissim risus id metus' ),
		'6' => __( 'Cras ornare tristique elit' ),
	]
];

?>
<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|60"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
	<!-- wp:heading {"textAlign":"center","className":"is-style-default"} -->
	<h2 class="wp-block-heading has-text-align-center is-style-default"><?php echo esc_html( $strings['title'] ); ?></h2>
	<!-- /wp:heading -->
	<!-- wp:paragraph {"align":"center"} -->
	<p class="has-text-align-center"><?php echo esc_html( $strings['byline'] ); ?></p>
	<!-- /wp:paragraph -->
	<!-- wp:spacer {"height":"5rem"} -->
	<div style="height:5rem" aria-hidden="true" class="wp-block-spacer" />
	<!-- /wp:spacer -->
	<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|70"}}}} -->
	<div class="wp-block-columns alignwide">
		<!-- wp:column {"verticalAlignment":"stretch","backgroundColor":"lonewolf-bg-alt"} -->
		<div class="wp-block-column is-vertically-aligned-stretch has-lonewolf-bg-alt-background-color has-background">
			<!-- wp:group {"style":{"spacing":{"blockGap":"1rem","padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50","left":"0","right":"0"}},"dimensions":{"minHeight":"100%"}},"layout":{"type":"flex","orientation":"vertical","verticalAlignment":"space-between","justifyContent":"stretch"}} -->
			<div class="wp-block-group" style="min-height:100%;padding-top:var(--wp--preset--spacing--50);padding-right:0;padding-bottom:var(--wp--preset--spacing--50);padding-left:0">
				<!-- wp:group {"style":{"layout":{"selfStretch":"fit","flexSize":null}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"left"}} -->
				<div class="wp-block-group">
					<!-- wp:group {"style":{"layout":{"selfStretch":"fill","flexSize":null},"spacing":{"blockGap":"1rem"}},"layout":{"type":"constrained"}} -->
					<div class="wp-block-group">
						<!-- wp:heading {"level":3,"fontSize":"large"} -->
						<h3 class="wp-block-heading has-large-font-size"><?php echo esc_html( $strings['names']['1'] ); ?></h3>
						<!-- /wp:heading -->
						<!-- wp:paragraph {"className":"has-xxx-large-font-size","fontSize":"huge"} -->
						<p class="has-xxx-large-font-size has-huge-font-size"><?php echo esc_html( $strings['prices']['1'] ); ?></p>
						<!-- /wp:paragraph -->
						<!-- wp:spacer {"height":"1.5rem"} -->
						<div style="height:1.5rem" aria-hidden="true" class="wp-block-spacer" />
						<!-- /wp:spacer -->
						<!-- wp:paragraph {"fontSize":"small"} -->
						<p class="has-small-font-size"><?php echo esc_html( $strings['list']['1'] ); ?></p>
						<!-- /wp:paragraph -->
						<!-- wp:separator {"className":"is-style-wide"} -->
						<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />
						<!-- /wp:separator -->
						<!-- wp:paragraph {"fontSize":"small"} -->
						<p class="has-small-font-size"><?php echo esc_html( $strings['list']['2'] ); ?></p>
						<!-- /wp:paragraph -->
						<!-- wp:separator {"className":"is-style-wide"} -->
						<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />
						<!-- /wp:separator -->
						<!-- wp:paragraph {"fontSize":"small"} -->
						<p class="has-small-font-size"><?php echo esc_html( $strings['list']['3'] ); ?></p>
						<!-- /wp:paragraph -->
						<!-- wp:separator {"className":"is-style-wide"} -->
						<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />
						<!-- /wp:separator -->
						<!-- wp:paragraph {"fontSize":"small"} -->
						<p class="has-small-font-size"><?php echo esc_html( $strings['list']['4'] ); ?></p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->
				<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"center"}} -->
				<div class="wp-block-group">
					<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"layout":{"selfStretch":"fit","flexSize":null}}} -->
					<div class="wp-block-buttons">
						<!-- wp:button {"textColor":"lonewolf-fg-alt","width":100,"style":{"spacing":{"padding":{"left":"var:preset|spacing|60","right":"var:preset|spacing|60"}}}} -->
						<div class="wp-block-button has-custom-width wp-block-button__width-100">
							<a class="wp-block-button__link has-lonewolf-fg-alt-color has-text-color wp-element-button" href="/services/caravan-chassis-service/" style="padding-right:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--60)"><?php echo esc_html( $strings['button'] ); ?></a>
						</div>
						<!-- /wp:button -->
					</div>
					<!-- /wp:buttons -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
		<!-- wp:column {"verticalAlignment":"stretch","backgroundColor":"lonewolf-bg-alt"} -->
		<div class="wp-block-column is-vertically-aligned-stretch has-lonewolf-bg-alt-background-color has-background">
			<!-- wp:group {"style":{"spacing":{"blockGap":"1rem","padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50","left":"0","right":"0"}},"dimensions":{"minHeight":"100%"}},"layout":{"type":"flex","orientation":"vertical","verticalAlignment":"space-between","justifyContent":"stretch"}} -->
			<div class="wp-block-group" style="min-height:100%;padding-top:var(--wp--preset--spacing--50);padding-right:0;padding-bottom:var(--wp--preset--spacing--50);padding-left:0">
				<!-- wp:group {"style":{"layout":{"selfStretch":"fit","flexSize":null}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"left"}} -->
				<div class="wp-block-group">
					<!-- wp:group {"style":{"spacing":{"blockGap":"1rem"},"dimensions":{"minHeight":""},"layout":{"selfStretch":"fill","flexSize":null}},"layout":{"type":"constrained"}} -->
					<div class="wp-block-group">
						<!-- wp:heading {"level":3,"fontSize":"large"} -->
						<h3 class="wp-block-heading has-large-font-size"><?php echo esc_html( $strings['names']['2'] ); ?></h3>
						<!-- /wp:heading -->
						<!-- wp:paragraph {"className":"has-xxx-large-font-size","fontSize":"huge"} -->
						<p class="has-xxx-large-font-size has-huge-font-size"><?php echo esc_html( $strings['prices']['2'] ); ?></p>
						<!-- /wp:paragraph -->
						<!-- wp:spacer {"height":"1.5rem","width":"0px","style":{"layout":{}}} -->
						<div style="height:1.5rem;width:0px" aria-hidden="true" class="wp-block-spacer" />
						<!-- /wp:spacer -->
						<!-- wp:paragraph {"fontSize":"small"} -->
						<p class="has-small-font-size"><?php echo esc_html( $strings['list']['1'] ); ?></p>
						<!-- /wp:paragraph -->
						<!-- wp:separator {"className":"is-style-wide"} -->
						<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />
						<!-- /wp:separator -->
						<!-- wp:paragraph {"fontSize":"small"} -->
						<p class="has-small-font-size"><?php echo esc_html( $strings['list']['2'] ); ?></p>
						<!-- /wp:paragraph -->
						<!-- wp:separator {"className":"is-style-wide"} -->
						<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />
						<!-- /wp:separator -->
						<!-- wp:paragraph {"fontSize":"small"} -->
						<p class="has-small-font-size"><?php echo esc_html( $strings['list']['3'] ); ?></p>
						<!-- /wp:paragraph -->
						<!-- wp:separator {"className":"is-style-wide"} -->
						<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />
						<!-- /wp:separator -->
						<!-- wp:paragraph {"fontSize":"small"} -->
						<p class="has-small-font-size"><?php echo esc_html( $strings['list']['4'] ); ?></p>
						<!-- /wp:paragraph -->
						<!-- wp:separator {"className":"is-style-wide"} -->
						<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />
						<!-- /wp:separator -->
						<!-- wp:paragraph {"fontSize":"small"} -->
						<p class="has-small-font-size"><?php echo esc_html( $strings['list']['5'] ); ?></p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->
				<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"center"}} -->
				<div class="wp-block-group">
					<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center","verticalAlignment":"center"},"style":{"layout":{"selfStretch":"fit","flexSize":null}}} -->
					<div class="wp-block-buttons">
						<!-- wp:button {"textColor":"lonewolf-fg-alt","width":100,"style":{"spacing":{"padding":{"left":"var:preset|spacing|60","right":"var:preset|spacing|60"}}}} -->
						<div class="wp-block-button has-custom-width wp-block-button__width-100">
							<a class="wp-block-button__link has-lonewolf-fg-alt-color has-text-color wp-element-button" href="/services/habitation-check/" style="padding-right:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--60)"><?php echo esc_html( $strings['button'] ); ?></a>
						</div>
						<!-- /wp:button -->
					</div>
					<!-- /wp:buttons -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
		<!-- wp:column {"verticalAlignment":"stretch","style":{"spacing":{"blockGap":"var:preset|spacing|40"}}} -->
		<div class="wp-block-column is-vertically-aligned-stretch">
			<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50","left":"0","right":"0"},"blockGap":"2rem"},"dimensions":{"minHeight":"100%"}},"layout":{"type":"flex","orientation":"vertical","verticalAlignment":"space-between","justifyContent":"stretch"}} -->
			<div class="wp-block-group" style="min-height:100%;padding-top:var(--wp--preset--spacing--50);padding-right:0;padding-bottom:var(--wp--preset--spacing--50);padding-left:0">
				<!-- wp:group {"style":{"layout":{"selfStretch":"fill","flexSize":null}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"left"}} -->
				<div class="wp-block-group">
					<!-- wp:group {"style":{"spacing":{"blockGap":"1rem"},"layout":{"selfStretch":"fill","flexSize":null}},"layout":{"type":"constrained"}} -->
					<div class="wp-block-group">
						<!-- wp:heading {"level":3,"fontSize":"large"} -->
						<h3 class="wp-block-heading has-large-font-size"><?php echo esc_html( $strings['names']['3'] ); ?></h3>
						<!-- /wp:heading -->
						<!-- wp:paragraph {"className":"has-xxx-large-font-size","fontSize":"huge"} -->
						<p class="has-xxx-large-font-size has-huge-font-size"><?php echo esc_html( $strings['prices']['3'] ); ?></p>
						<!-- /wp:paragraph -->
						<!-- wp:spacer {"height":"1.5rem"} -->
						<div style="height:1.5rem" aria-hidden="true" class="wp-block-spacer" />
						<!-- /wp:spacer -->
						<!-- wp:paragraph {"fontSize":"small"} -->
						<p class="has-small-font-size"><?php echo esc_html( $strings['list']['1'] ); ?></p>
						<!-- /wp:paragraph -->
						<!-- wp:separator {"className":"is-style-wide"} -->
						<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />
						<!-- /wp:separator -->
						<!-- wp:paragraph {"fontSize":"small"} -->
						<p class="has-small-font-size"><?php echo esc_html( $strings['list']['2'] ); ?></p>
						<!-- /wp:paragraph -->
						<!-- wp:separator {"className":"is-style-wide"} -->
						<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />
						<!-- /wp:separator -->
						<!-- wp:paragraph {"fontSize":"small"} -->
						<p class="has-small-font-size"><?php echo esc_html( $strings['list']['3'] ); ?></p>
						<!-- /wp:paragraph -->
						<!-- wp:separator {"className":"is-style-wide"} -->
						<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />
						<!-- /wp:separator -->
						<!-- wp:paragraph {"fontSize":"small"} -->
						<p class="has-small-font-size"><?php echo esc_html( $strings['list']['4'] ); ?></p>
						<!-- /wp:paragraph -->
						<!-- wp:separator {"className":"is-style-wide"} -->
						<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />
						<!-- /wp:separator -->
						<!-- wp:paragraph {"fontSize":"small"} -->
						<p class="has-small-font-size"><?php echo esc_html( $strings['list']['5'] ); ?></p>
						<!-- /wp:paragraph -->
						<!-- wp:separator {"className":"is-style-wide"} -->
						<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />
						<!-- /wp:separator -->
						<!-- wp:paragraph {"fontSize":"small"} -->
						<p class="has-small-font-size"><?php echo esc_html( $strings['list']['6'] ); ?></p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->
				<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"center"}} -->
				<div class="wp-block-group">
					<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"left"}} -->
					<div class="wp-block-buttons">
						<!-- wp:button {"textColor":"lonewolf-fg-alt","width":100,"style":{"spacing":{"padding":{"left":"var:preset|spacing|60","right":"var:preset|spacing|60"}}}} -->
						<div class="wp-block-button has-custom-width wp-block-button__width-100">
							<a class="wp-block-button__link has-lonewolf-fg-alt-color has-text-color wp-element-button" href="/services/caravan-full-service/" style="padding-right:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--60)"><?php echo esc_html( $strings['button'] ); ?></a>
						</div>
						<!-- /wp:button -->
					</div>
					<!-- /wp:buttons -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->