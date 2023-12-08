
/**
 *
 * There is an issue where adding some custom menu items will result in those items not having the
 * menu-active class applied when on that page. This script addresses that.
 *
 * This is a patch until WP core is updated to support these custom link cases.
 *
 * Code pinched from: https://github.com/WordPress/gutenberg/issues/31452
 *
 * UNTESTED!
 *
 */



/**
 * Set current-menu-item class on link that matches current URL.
 */
export function setCurrentMenuItemClass() {
	const menuItems = document.querySelectorAll( '.wp-block-navigation-item' )

	if ( ! menuItems.length ) {
		return
	}

	// Check for .current-menu-item class on any item and stop if found.
	for ( let i = 0; i < menuItems.length; i++ ) {
		if ( menuItems[ i ].classList.contains( 'current-menu-item' ) ) {
			return
		}
	}

	// Add trailing slash to path if missing.
	const url = window.location.href.endsWith( '/' )
		? window.location.href
		: `${ window.location.href }/`

	// Check for matching URL path on any child link of menuItems.
	for ( let i = 0; i < menuItems.length; i++ ) {
		const link = menuItems[ i ].querySelector( 'a' )
		const linkURL = link.href.endsWith( '/' )
			? link.href
			: `${ link.href }/`

		// Note: link.href returns full URL, even if it's a relative link.
		if ( linkURL === url ) {
			menuItems[ i ].classList.add( 'current-menu-item' )
		}
	}
}
