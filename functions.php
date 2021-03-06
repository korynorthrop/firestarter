<?php
/**
 * Firestarter_Demo functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Firestarter_Demo
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

if ( ! function_exists( 'firestarter_demo_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function firestarter_demo_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Firestarter_Demo, use a find and replace
		 * to change 'firestarter-demo' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'firestarter-demo', get_template_directory() . '/languages' );

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
		register_nav_menus(
			array(
				'primary' => esc_html__( 'Primary', 'firestarter-demo' ),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'firestarter_demo_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'firestarter_demo_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function firestarter_demo_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'firestarter_demo_content_width', 640 );
}
add_action( 'after_setup_theme', 'firestarter_demo_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function firestarter_demo_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'firestarter-demo' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'firestarter-demo' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'firestarter_demo_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function firestarter_demo_scripts() {
	wp_enqueue_style( 'firestarter-demo-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'firestarter-demo-style', 'rtl', 'replace' );

	// Enqueue the main 'firestarter-demo' minified stylesheet
	wp_enqueue_style( 'firestarter-demo-main-style', get_template_directory_uri() . '/src/css/main.min.css' );

	// Enqueue the main 'firestarter-demo' minified javascript file
	wp_enqueue_script( 'firestarter-demo-js', get_template_directory_uri() . '/src/js/combined.min.js', array(), _S_VERSION, true );

	wp_enqueue_script( 'firestarter-demo-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	// De-register and re-register jQuery js
	wp_deregister_script('jquery');
	wp_register_script('jquery', get_template_directory_uri().'/src/js/vendor/jquery.min.js', array(), null, false);
	wp_enqueue_script('jquery');

	// Register Popper, Bootstrap js
	wp_register_script('popper-js', get_template_directory_uri().'/src/js/vendor/popper.min.js', array('jquery'), '', true );
	wp_register_script('bootstrap-js', get_template_directory_uri().'/src/js/vendor/bootstrap.min.js', array('jquery'), '', true );

	// Enqueue Popper, Bootstrap js
	wp_enqueue_script( 'popper-js' );
	wp_enqueue_script( 'bootstrap-js' );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'firestarter_demo_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Register Custom Navigation Walker
 */
function register_navwalker() {
	require_once get_template_directory() . '/inc/class-wp-bootstrap-navwalker.php';
}
add_action( 'after_setup_theme', 'register_navwalker' );

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

/**
 * Load WooCommerce compatibility file.
 */
if ( class_exists( 'WooCommerce' ) ) {
	require get_template_directory() . '/inc/woocommerce.php';
}
