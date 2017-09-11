<?php
/**
 * playground functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package playground
 */

//get asset region
function get_asset($tipo, $nombre, $bool_print = true) {
	if (isset($tipo) && isset($nombre)) {
		if ($bool_print) {
			echo get_stylesheet_directory_uri() . "/assets/" . $tipo . "/" . $nombre;
		} else {
			return get_stylesheet_directory_uri() . "/assets/" . $tipo . "/" . $nombre;
		}
	}
}
//get asset endregion

/*variables globales region*/

/*variables globales endregion*/

/*setup region*/
if ( ! function_exists( 'playground_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function playground_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on playground, use a find and replace
	 * to change 'playground' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'playground', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'menu-1' => esc_html__( 'Primary', 'playground' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'playground_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );
}
endif;
add_action( 'after_setup_theme', 'playground_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function playground_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'playground_content_width', 640 );
}
add_action( 'after_setup_theme', 'playground_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function playground_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'playground' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'playground' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'playground_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function playground_scripts() {
	$version = "20170512";
	wp_enqueue_style( 'playground-style', get_stylesheet_uri(), array(), $version );
	wp_enqueue_script( 'playground-navigation', get_template_directory_uri() . '/js/navigation.js', array(), $version, true );
	wp_enqueue_script( 'playground-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), $version, true );
	wp_enqueue_script( 'jquery_3', get_template_directory_uri() . '/js/jquery-3.2.1.min.js', array(), $version, true );
	wp_enqueue_script( 'playground-functions', get_template_directory_uri() . '/js/functions.js', array('jquery_3'), $version, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'playground_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';
/*setup endregion*/

/*funciones personalizadas region*/

/*funciones personalizadas endregion*/

