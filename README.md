Firestarter
===

Firestarter is inspired by the band Prodigy (not really). It is _actually_ a Wordpress starter theme based on Underscores. Firestarter encorporates Bootstrap 4 and Gulp.

Getting Started
---------------
* Install Wordpress locally
* Download Firestarter and place in themes directory
* Run `sh themesetup.sh` and type in a New Name for your theme, the shell script will find and replace the text in the theme files and change the theme directory name to match your chosen theme name
* Run `yarn install` from the theme directory
* Run `gulp` to generate the initial compiled CSS and JS files
* If you plan to use Browser Sync, be sure to change `proxy` to reflect your local development hostname within the `'browser-sync'` task in `gulpfile.js`

Theme Structure
---------------
```shell
themes/firestarter/   						# → Root of your Firestarter based theme
├── dist/                 				# → Built theme assets (don't edit)
├── inc/            							# → Default Underscores built directory with some theme include files
├── js/            								# → Default Underscores javascript files (can ignore)
├── languages/            				# → Underscores built directory for theme language files
├── layouts/            					# → Default Underscores layouts
├── node_modules/         				# → Node.js packages (don't edit)
├── sass/            							# → Default Underscores stylesheets
├── src/            							# → Firestarter theme assets and templates
│   ├── assets/           				# → Images go here
│   │   ├── raw/          				# → Place unprocessed images here
│   ├── css/     									# → Auto-generated Firestarter stylesheets (don't edit)
│   ├── js/        								# → Firestarter js files go here
│   │   ├── vendor/       				# → 3rd party js files go here
│   │   ├── combined.js   				# → Auto-generated file (don't edit)
│   │   ├── combined.min.js   		# → Auto-generated file (don't edit)
│   │   ├── combined.min.js.map 	# → Auto-generated file (don't edit)
│   ├── scss/    									# → Firestarter stylehseets go here
│   │   ├── main.scss   					# → Main stylesheet that imports other relevant stylesheets
│   │   ├── variables.scss   			# → Declare theme variables and Bootstrap overrides
│   │   ├── underscores.scss   		# → Default Underscores styles moved from default style.css file
│   │   ├── mixins.scss   				# → SASS mixins and functions that can be used in scss files
│   │   ├── classes.scss   				# → Declare custom theme classes here
├── template-parts/       				# → Default Underscores template parts
├── package.json          				# → Node.js dependencies and scripts
├── gulpfile.js          					# → Handles theme development automation tasks
├── style.css          						# → Contains theme information, but no actuall CSS
├── themesetup.sh          				# → Shell file used for one-time theme setup before development begins
```

Changes to underscores
---------------
* `src` directory added to theme root
* All CSS from style.css (except the theme information at the top) removed and placed in `src/scss/underscores.scss` to be imported by `main.scss` in the same directory
* Enqueue the minified Firestarted stylesheet in functions.php `wp_enqueue_style( 'firestarter-demo-main-style', get_template_directory_uri() . '/src/css/main.min.css' );`
* De-register and re-register jQuery in `functions.php` and also enqueue the Bootstrap and Popper js files
* Add Bootstrap navwalker to `inc` directory and require it in functions.php `require get_template_directory() . '/inc/bootstrap-wp-navwalker.php';` adopted from [https://github.com/wp-bootstrap/wp-bootstrap-navwalker/](https://github.com/wp-bootstrap/wp-bootstrap-navwalker/) using the 'v4' branch for Bootstrap 4
* Update `header.php` to use Bootstrap navwalker in `wp_nav_menu` call and modify the `<button>` markup to use Firestarter toggle button
* Changed `register_nav_menus` from `menu-1` to `primary` in functions.php

Notes about `themesetup.sh`
---------------
This shell script does a global find and replace of the theme files based on the "Getting Started" section of Underscores README.md file [here](https://github.com/automattic/_s). Below is a summary of what happens under the hood.

1. Search for: `'firestarter-demo'` and replace with: `'new-theme-name'`
2. Search for: `firestarter_demo_` and replace with: `new_theme_name_`
3. Search for: `Text Domain: firestarter-demo` and replace with: `Text Domain: new-theme-name` in `style.css`.
4. Search for: <code>&nbsp;Firestarter_Demo</code> and replace with: <code>&nbsp;New_Theme_Name</code>
5. Search for: `firestarter-demo-` and replace with: `new-theme-name-`
6. Rename `firestarter-demo.pot` from `languages` folder to use the theme's slug
7. Save all files (`Option + Command + S` if using Sublime)