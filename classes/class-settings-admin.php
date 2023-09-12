<?php
namespace BigupWeb\Lonewolf;

/**
 * Settings Admin Page - Lonewolf Theme.
 *
 * To retrieve values:
 *
 * // Get the serialized array of all options:
 * $lw_settings = get_option( 'lw_settings_array' ); // Serialized array of all Options
 *
 * // Then get a single option from that array:
 * $lw_email_address = $lw_settings['lw_email_address']; // Email Address
 *
 * @package lonewolf
 */
class Settings_Admin {

	private const ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMzIgMTMyIj48cGF0aCBpZD0icGF0aDEiIGZpbGw9IiMwMDAiIGQ9Ik02MC43IDEyMS41czUuMyA3LjkgNyA2LjRjMi45LTMuMyA2LjktMiA4LjEtNi4xIDkuOC0xIDEyLjUgMS4yIDEyLjUuMi0uMi0zLTctMi43LTcuMS0xMS4yLS41LTMuMS0uNS02LjItLjYtOS4xIDguOS0zLjQgMTguMi01LjQgMjcuNy02LjIgNC4yLS4zIDguNS0uNSAxMi43LS41LjMtMi40IDAtNSAuOC03IDIuOS02IDYuMi0xMS45IDguOC0xOC4xIDEuMS0xLjcgMS01LTEuNy01bC0yOC4zLTdjLTItLjktNC4zLS45LTUuNy0yLjItLjctMi4zIDIuMy01LjMtLjYtNi41LTUuOC00LTExLjYtOC0xNy4zLTEyLjItMS4zLTEuMy0zLjctMi00LjItNEE4MC45IDgwLjkgMCAwIDEgNjkgOS4zYy4yLTItMS44IDEuMS0yLjcgMS40bC01LjUgNEE3OCA3OCAwIDAgMSA1OS40IDBjLTYgMy41LTEyLjkgNy0xNi43IDEzYTUxIDUxIDAgMCAwLTUuMyAxNC40Yy0uOSA0LTIuNiA4LjItNi4zIDEwLjUtMy43IDIuNy04IDQtMTEuNiA2LjktMS4yLjUtNCAyLjgtMS4yIDMuMSAyIC42IDQuOC0uOCA2LjIuOC0uNiAyLjItMi42IDMuMy0zLjcgNS4zQTYyLjcgNjIuNyAwIDAgMSA3IDY4LjVhMjAgMjAgMCAwIDEtNi4zIDMuM2M0LjYgMS43IDkuMSA0IDE0IDQuN0M5IDgwIDEwIDg2LjYgNy44IDkxLjNsMjAtMy43LTMgMjYuNiAxNC40LTcuOEw1MC43IDEzMmw3LjUtMi4zWk01NC4yIDExLjFjMS4zIDIgLjggNS4zIDEuNiA3LjZBMjUuMyAyNS4zIDAgMCAwIDY0LjEgMzNjLTYuMyAxLjItMTMgMS43LTE5LjIgMy41LTMtLjItLjItNC0uMi01LjcgMS00LjggMS44LTEwIDQuMy0xNC4zIDEuMy0xLjkgMi42LTMuNyA0LjQtNS4yaC40Wk03Ny41IDQ3YzIgMS4zIDQgMi43IDUuOCA0LjIgMS41IDEuMiA0LjIgMS44IDMuOCA0LjIuMyAxLjQtLjggMi41LTIuMiAxLjMtMi42LTEuMi01LTIuNi03LjgtMy0yLjMuNy00LjUgMS44LTYuOCAyLjMtMS42LjctNC41IDEuMS01LjIgMS42YTM1IDM1IDAgMCAxIDcuNCA0YzIuOS4zIDYtLjMgOC44LS41IDIuMy0uMiA0LjUtLjkgNi41LS42IDcuMyAyLjcgMTUgNC41IDIyLjUgNi4zIDIgLjIgMy45IDEuNSA0LjcgMy40IDEuOCAyLjMgMy45IDQgNS43IDYuNWEzNCAzNCAwIDAgMS0yLjggNy4yYy01LjUtLjYtMTEtLjgtMTYuNi0uOC02LjcgMC0xMy45IDEtMTkuNSA1LS45LjUtMi4xIDIuMy0uMiAxLjUgNi4yLTEuMiAxMi40LTMgMTguOC0zIDQuNS0uMiA4LjgtLjQgMTMuMS45LjggMS0yLjYuNi0zLjQuOS04LjEuOC0xNi40IDEuMS0yNC40IDMuMy0zLjkgMS03LjcgMi4yLTExLjEgNC4zLTIgMS4zIDAgNC40LS41IDYuNS40IDUuNi42IDIuMyAxLjUgOCAxLjQgMi40LTEuNSAzLjMtMy4yIDMuOS0yLjUgMS40LTQuNSAzLjItNyA0LjMtMiAuNS0zLTIuNi00LjItMy45LTEuMi0xLTItNC4yLTMtNC4yLTEgNS4yLTIuMyA5LjgtNC41IDE0LjQtMy4xLTMuNC04LjItMjMuNi0xMi4yLTI2LTEuOC0uMy03LjIgMy05LjIgMy44IDEuNy0zLjUgMi4yLTQuNyAzLjQtOC4zIDEuNC00LjMgMi40LTguNiA0LTEzIDEuMy0zLjUtMy41LTIuMi01LjctMi42LTQuMiAwLTguNy40LTEyLjYgMi0xLjEuMy0yLjYgMS43LTMuMiAxLjYgMS4yLTMgNC4zLTQuNiA2LjgtNi40YTI4IDI4IDAgMCAxIDEwLjUtNGMxLjEgMCAyLjYtLjcuNy0xLjEtMS42LS44LTQuOCAwLTUuNS0xLjQgMS43LTEuNyA0LjMtMiA2LjMtMyA2LjItMi4zIDEzLTIuNyAxOS41LTMuNC0uOS0xLjYtMi43LTIuOC0zLjgtNC40LTEuNS0xLjEtMy41LTMuNC0uNi00IDgtNC4xIDE2LjgtNS44IDI1LjQtNy44Wm00NC4zIDIxYzMuMS0uNSAxLjcgMyAuNiA0LjEtMS44LjYtMy45LTEuNS00LjMtMy4zLjctMS4yIDIuOC0uNSA0LS45Wk02NS42IDg1LjJjLTMgMy43LTUuNyA4LTUuMiAxMi45IDEuNyA1LjMgMi4yIDUuNCA1IDEwLjQgMS02LjYgMC03LjcuNy0xNC4yIDAtMi42LjQtNS4zLjQtOCAwLS42LS4zLTEuNC0uOS0xWiIvPjwvc3ZnPgo=';
	// private const SLUG = 'lonewolf-settings';

	public const PARENTSLUG   = 'lonewolf';
	private const SETTINGSLUG = 'lonewolf-settings';

	/**
	 * Register the settings admin hooks.
	 *
	 * In order to set a custom post menu item as a sub item, the 'admin_menu' hook priority must be
	 * 9 or lower. See the following documentation:
	 *
	 * @link https://developer.wordpress.org/reference/functions/register_post_type/#show_in_menu
	 */
	public function __construct() {
		// Move the default posts menu item from 5 to 9
		add_action(
			'admin_menu',
			function() {
				global $menu;
				$new_position = 9;
				$cpt_title    = 'Posts';
				foreach ( $menu as $key => $value ) {
					if ( $cpt_title === $value[0] ) {
						$copy = $menu[ $key ];
						unset( $menu[ $key ] );
						$menu[ $new_position ] = $copy;
					}
				}
			}
		);
		add_action( 'admin_menu', array( $this, 'add_settings_menu' ), 9 );
		add_action( 'admin_init', array( new Settings_Tab_Identity(), 'init' ) );
		add_action( 'admin_init', array( new Settings_Tab_Homepage(), 'init' ) );
		add_action( 'admin_init', array( new Settings_Tab_Features(), 'init' ) );
		add_action( 'admin_init', array( new Settings_Tab_Verification(), 'init' ) );
		add_action( 'below_parent_settings_page_heading', array( &$this, 'echo_settings_link_callback' ) );
	}

	public function add_settings_menu() {

		add_menu_page(
			'Lonewolf Theme',                     // Page title.
			'Lonewolf',                           // Menu title.
			'manage_options',                     // Capability.
			self::PARENTSLUG,                     // Parent Menu Slug.
			array( $this, 'create_parent_page' ), // Callback.
			self::ICON,                           // Icon.
			5                                     // Position.
		);

		// Overrides WP from giving the first sub menu item the same text as the parent menu.
		add_submenu_page(
			self::PARENTSLUG,           // Parent Slug.
			'Lonewolf Theme Dashboard', // Page Title.
			'Dashboard',                // Menu Title.
			'manage_options',           // Capability.
			self::PARENTSLUG            // Sub Menu Slug.
		);

		add_submenu_page(
			self::PARENTSLUG,                       // Parent Slug.
			'Lonewolf Theme Settings',              // Page Title.
			'Settings',                             // Menu Title.
			'manage_options',                       // Capability.
			self::SETTINGSLUG,                      // Sub Menu Slug.
			array( $this, 'create_settings_page' ), // Callback.
			2,                                      // Position.
		);
	}


	/**
	 * Do Action Hook
	 */
	public function below_parent_settings_page_heading() {
		do_action( 'below_parent_settings_page_heading' );
	}


	/**
	 * Create Parent Admin Page
	 */
	public function create_parent_page() {
		$theme_data = wp_get_theme();
		?>

		<div class="wrap">
			<h1>
				<span>
					<img
						style="max-height: 2em; margin-right: 0.5em; vertical-align: baseline;"
						src="<?php echo self::ICON; ?>"
					/>
				</span>
				<?php echo esc_html( get_admin_page_title() ); ?>
			</h1>

			<section>
				<h2>
					Information
				</h2>

				<table>
					<tbody>
						<tr>
							<td>Name</td>
							<td><?php echo $theme_data->get( 'Name' ); ?></td>
						</tr>

						<tr>
							<td>Theme URI</td>
							<td><a href="<?php echo $theme_data->get( 'ThemeURI' ); ?>"><?php echo $theme_data->get( 'ThemeURI' ); ?></a></td>
						</tr>
						<tr>
							<td>Description</td>
							<td><?php echo $theme_data->get( 'Description' ); ?></td>
						</tr>
						<tr>
							<td>Author</td>
							<td><?php echo $theme_data->get( 'Author' ); ?></td>
						</tr>
						<tr>
							<td>Author URI</td>
							<td><a href="<?php echo $theme_data->get( 'AuthorURI' ); ?>"><?php echo $theme_data->get( 'AuthorURI' ); ?></a></td>
						</tr>
						<tr>
							<td>Version</td>
							<td><?php echo $theme_data->get( 'Version' ); ?></td>
						</tr>
					</tbody>
				<table>

			</section>

			<section>
				<h2>
					Management
				</h2>
				<div class="dashTiles">
					<?php $this->below_parent_settings_page_heading(); ?>
				</div>
			</section>
		</div>

		<?php
	}


	public function create_settings_page() {

		// Get the active tab from the $_GET URL param.
		$tab = isset( $_GET['tab'] ) ? $_GET['tab'] : null;

		?>

		<div class="wrap">
			<h1>
				<span>
					<img
						style="max-height: 1em;margin-right: 0.5em;vertical-align: middle;"
						src="<?php echo self::ICON; ?>"
					/>
				</span>
				<?php echo esc_html( get_admin_page_title() ); ?>
			</h1>

			<p>These settings manage content that appears on the front end of the Lonewolf theme.</p>

			<?php settings_errors(); // Display the form save notices here. ?>

			<nav class="nav-tab-wrapper">                                                                                                                              
				<a
					href="?page=<?php echo self::SETTINGSLUG; ?>"
					class="nav-tab 
					<?php
					if ( $tab === null ) {
						echo 'nav-tab-active';}
					?>
					"
				>
					Identity
				</a>
				<a
					href="?page=<?php echo self::SETTINGSLUG; ?>&tab=homepage"
					class="nav-tab 
					<?php
					if ( $tab === 'homepage' ) {
						echo 'nav-tab-active';}
					?>
					"
				>
					Homepage
				</a>
				<a
					href="?page=<?php echo self::SETTINGSLUG; ?>&tab=features"
					class="nav-tab 
					<?php
					if ( $tab === 'features' ) {
						echo 'nav-tab-active';}
					?>
					"
				>
					Features
				</a>
				<a
					href="?page=<?php echo self::SETTINGSLUG; ?>&tab=verification"
					class="nav-tab 
					<?php
					if ( $tab === 'verification' ) {
						echo 'nav-tab-active';}
					?>
					"
				>
					Verification
				</a>
			</nav>

			<div class="tab-content">
				<form method="post" action="options.php">

					<?php

					switch ( $tab ) :
						case 'homepage':
								settings_fields( Settings_Tab_Homepage::GROUP );
								do_settings_sections( Settings_Tab_Homepage::PAGE );
							break;
						case 'features':
								settings_fields( Settings_Tab_Features::GROUP );
								do_settings_sections( Settings_Tab_Features::PAGE );
							break;
						case 'verification':
							settings_fields( Settings_Tab_Verification::GROUP );
							do_settings_sections( Settings_Tab_Verification::PAGE );
						break;
						default:
								settings_fields( Settings_Tab_Identity::GROUP );
								do_settings_sections( Settings_Tab_Identity::PAGE );
							break;
					endswitch;

					submit_button();

					?>

				</form>
			</div>
		</div>

		<?php
	}


	/**
	 * Echo a link to this theme's dashboard page.
	 */
	public static function echo_dashboard_page_link( $link, $text ) {
		?>
		<a href="<?php echo $link; ?>">
			<?php echo $text; ?>
		</a>
		<?php
	}


	/**
	 * Echo settings link on the dashboard page callback.
	 */
	public function echo_settings_link_callback() {
		self::echo_dashboard_page_link(
			'/wp-admin/admin.php?page=' . self::SETTINGSLUG,
			'Theme settings'
		);
	}
}
