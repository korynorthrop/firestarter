<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Firestarter_Demo
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'firestarter-demo' ); ?></a>

	<header id="masthead" class="site-header">
		<div class="site-branding">
			<?php
			the_custom_logo();
			if ( is_front_page() && is_home() ) : ?>
				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<?php else : ?>
				<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
			<?php
			endif;

			$description = get_bloginfo( 'description', 'display' );
			if ( $description || is_customize_preview() ) : ?>
				<p class="site-description"><?php echo $description; /* WPCS: xss ok. */ ?></p>
			<?php
			endif; ?>
		</div><!-- .site-branding -->

		<nav id="site-navigation" class="navbar navbar-expand-lg p-0">
			<button class="navbar-toggler pointer noborder" type="button" data-toggle="collapse" data-target="#main-nav-menu" aria-controls="main-nav-menu" aria-expanded="false" aria-label="Toggle navigation">
				<span class="sr-only">Toggle navigation</span>
        <span class="icon-bar first"></span>
        <span class="icon-bar second"></span>
        <span class="icon-bar third"></span>
			</button>
			<?php
			if (has_nav_menu('primary')) :
				wp_nav_menu( array(
					'theme_location' 	=> 'primary',
					'menu_id'        	=> 'primary-menu',
					'depth'           => 2,
					'container'       => 'div',
          'container_class' => 'collapse navbar-collapse',
          'container_id'    => 'main-nav-menu',
					'menu_class'      => 'navbar-nav m-0', // add Bootstrap menu classes
					'walker'					=> new WP_Bootstrap_Navwalker() // utilize Bootstrap navwalker class
				) );
			endif;
			?>
		</nav><!-- #site-navigation -->
	</header><!-- #masthead -->

	<div id="content" class="site-content">
