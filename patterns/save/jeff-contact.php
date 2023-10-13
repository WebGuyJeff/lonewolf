<?php
/**
 * Title: Jeff's Developer Contact Section
 * Slug: lonewolf/jeff-contact
 * Categories: bigupweb
 * Keywords: section, form, contact
 *
 * @package lonewolf
 */

$strings = array(
	'title'  => __( 'Contact Form', 'lonewolf' ),
	'byline' => __( 'Use the form below to get started!', 'lonewolf' ),
);

?>
<div class="sectionGrid">

	<div class="landing_content" style="--col: narrow-l / narrow-r;">

		<div class="copy">
			<h2 class="title">
				<?php echo esc_html( $strings['title'] ); ?>
			</h2>
			<p>
				<?php echo esc_html( $strings['byline'] ); ?>
			</p>
		</div>

		<div class="align_me-centre">
			<?php echo do_shortcode( '[bigup_contact_form title="" message=""]' ); ?>
		</div>

	</div>

	<div class="landing_backdrop">
	</div>

</div>
