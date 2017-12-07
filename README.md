Firestarter
===

Firestarter is inspired by the band Prodigy (not really). It is _actually_ a Wordpress starter theme based on Underscores. Firestarter encorporates Bootstrap 4 and Gulp.

Getting Started
---------------
* Install Wordpress locally
* Grab Firestarter files and place in new theme directory
* Find and replace the Firestarter Demo text from theme files
  1. Search for: `'firestarter-demo'` and replace with: `'new-theme-name'`
  2. Search for: `firestarter_demo_` and replace with: `new_theme_name_`
  3. Search for: `Text Domain: firestarter-demo` and replace with: `Text Domain: new-theme-name` in `style.css`.
  4. Search for: <code>&nbsp;Firestarter_Demo</code> and replace with: <code>&nbsp;New_Theme_Name</code>
  5. Search for: `firestarter-demo-` and replace with: `new-theme-name-`
  6. Save all files (`Option + Command + S` if using Sublime)
  7. Rename `firestarter-demo.pot` from `languages` folder to use the theme's slug

Notes from Underscores' README.md
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