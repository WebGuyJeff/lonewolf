<?php
namespace BigupWeb\Lonewolf;

/**
 * Development info printed in-page as html comment.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package lonewolf
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2023 Jefferson Real
 */
class Dev_Info {

	public static function print() {
		echo '<!-- Lonewolf Development Info -->';
		echo '<!--' . 'PostID:' . get_the_ID() . '-->';
		if ( is_front_page() ) {
			echo '<!--is_front_page:true-->';
		} else {
			echo '<!--is_front_page:false-->';}
		if ( is_home() ) {
			echo '<!--is_home:true-->';
		} else {
			echo '<!--is_home:false-->';}
		if ( is_archive() ) {
			echo '<!--is_archive:true-->';
		} else {
			echo '<!--is_archive:false-->';}
		if ( is_singular() ) {
			echo '<!--is_singular:true-->';
		} else {
			echo '<!--is_singular:false-->';}
	}

}
