<?php
/**
 * Class Autoloader for the Lonewolf Project
 *
 * After registering this autoload function with SPL, the following line
 * would cause the function to attempt to load the \Brand\Project\Sub_Project\Class class
 * from /path/to/project/src/sub_project/class.php:
 *
 *      new \Brand\Project\Sub_Project\Class;
 *
 * @package lonewolf
 * @param string $class The fully-qualified class name.
 */

spl_autoload_register(
	function( $class ) {

		$namespace       = 'BigupWeb\\Lonewolf\\';
		$classes_dir     = dirname( __FILE__ );
		$filename_prefix = 'class-';

		// does the class use the namespace prefix?
		$namespace_length = strlen( $namespace );
		if ( strncmp( $namespace, $class, $namespace_length ) !== 0 ) {
			return;
		}

		$relative_classname = substr( $class, $namespace_length );
		$classname          = array_reverse( explode( '\\', $class ) )[0];
		$sub_namespace      = str_replace( $classname, '', $relative_classname );

		$filename       = str_replace( '\\', DIRECTORY_SEPARATOR, $sub_namespace . DIRECTORY_SEPARATOR . $filename_prefix . $classname . '.php' );
		$class_filepath = strtolower( $classes_dir . str_replace( '_', '-', $filename ) );

		if ( file_exists( $class_filepath ) ) {
			require $class_filepath;
		} else {
			error_log( $namespace . ' autoload error: file not found: ' . $class_filepath );
		}
	}
);
