Firestarter
===

Firestarter is inspired by the band Prodigy (not really). It is _actually_ a Wordpress starter theme based on Underscores. Firestarter encorporates Bootstrap 4 and Gulp.

Getting Started
---------------
* Install Wordpress locally
* Download Firestarter and place in themes directory
* Run `npm install` from inside the Firestarter theme directory
* Find and replace the Firestarter Demo text from theme files
  1. Search for: `'firestarter-demo'` and replace with: `'new-theme-name'`
  2. Search for: `firestarter_demo_` and replace with: `new_theme_name_`
  3. Search for: `Text Domain: firestarter-demo` and replace with: `Text Domain: new-theme-name` in `style.css`.
  4. Search for: <code>&nbsp;Firestarter_Demo</code> and replace with: <code>&nbsp;New_Theme_Name</code>
  5. Search for: `firestarter-demo-` and replace with: `new-theme-name-`
  6. Rename `firestarter-demo.pot` from `languages` folder to use the theme's slug
  7. Save all files (`Option + Command + S` if using Sublime)

Changes to underscores
---------------
* `src` directory added to theme root
* All CSS from style.css (except the theme information at the top) removed and placed in `src/scss/underscores.scss` to be imported by `main.scss` in the same directory
* Enqueue the minified Firestarted stylesheet in functions.php `wp_enqueue_style( 'firestarter-demo-main-style', get_template_directory_uri() . '/src/css/main.min.css' );`
* De-register and re-register jQuery in `functions.php` and also enqueue the Bootstrap and Popper js files
* Add Bootstrap navwalker to `inc` directory and require it in functions.php `require get_template_directory() . '/inc/bootstrap-wp-navwalker.php';` adopted from [https://github.com/wp-bootstrap/wp-bootstrap-navwalker/](https://github.com/wp-bootstrap/wp-bootstrap-navwalker/) using the 'v4' branch for Bootstrap 4
* Update `header.php` to use Bootstrap navwalker in `wp_nav_menu` call and modify the `<button>` markup to use Firestarter toggle button
* Changed `register_nav_menus` from `menu-1` to `primary` in functions.php


Notes from underscores' README.md
---------------

* A just right amount of lean, well-commented, modern, HTML5 templates.
* A helpful 404 template.
* A custom header implementation in `inc/custom-header.php` just add the code snippet found in the comments of `inc/custom-header.php` to your `header.php` template.
* Custom template tags in `inc/template-tags.php` that keep your templates clean and neat and prevent code duplication.
* Some small tweaks in `inc/template-functions.php` that can improve your theming experience.
* A script at `js/navigation.js` that makes your menu a toggled dropdown on small screens (like your phone), ready for CSS artistry. It's enqueued in `functions.php`.
* 2 sample CSS layouts in `layouts/` for a sidebar on either side of your content.
* Smartly organized starter CSS in `style.css` that will help you to quickly get your design off the ground.
* Licensed under GPLv2 or later. :) Use it to make something cool.