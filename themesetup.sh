#! /bin/sh

# Prompt user to type in a name for the theme
echo "Enter in a Theme Name: "
read themename

# Take the user input and save as different variables for the global search and replace commands below
uppercase=$(echo ${themename})
lowercase=$(echo "$themename" | tr '[:upper:]' '[:lower:]')
hyphens=$(echo ${lowercase// /-})
underscores=$(echo ${lowercase// /_})
suffix="_"
upperunders=$(echo ${themename// /_})
cur_dir=$(pwd)

# Replace Theme Name: Firestarter_Demo with the user inputted Theme Name (not part of _s README.md instructions, but seems good to me)
find . ! -name 'themesetup.sh' ! -name 'README.md' -type f -exec perl -pi -e "s/Theme Name: Firestarter_Demo/Theme Name: $uppercase/g" {} \;

# Search for: 'firestarter-demo' and replace with: 'new-theme-name' except in this script and README.md file
find . ! -name 'themesetup.sh' ! -name 'README.md' -type f -exec perl -pi -e "s/\'firestarter-demo\'/\'$hyphens\'/g" {} \;

# Search for: firestarter_demo_ and replace with: new_theme_name_
find . ! -name 'themesetup.sh' ! -name 'README.md' -type f -exec perl -pi -e "s/firestarter_demo_/$underscores$suffix/g" {} \;

# Search for: Text Domain: firestarter-demo and replace with: Text Domain: new-theme-name
find . ! -name 'themesetup.sh' ! -name 'README.md' -type f -exec perl -pi -e "s/Text Domain: firestarter-demo/Text Domain: $hyphens/g" {} \;

# Search for:  Firestarter_Demo and replace with:  New_Theme_Name (important to escape the leading nbsp)
find . ! -name 'themesetup.sh' ! -name 'README.md' -type f -exec perl -pi -e "s/\ Firestarter_Demo/\ $upperunders/g" {} \;

# Search for: firestarter-demo- and replace with: new-theme-name-
find . ! -name 'themesetup.sh' ! -name 'README.md' -type f -exec perl -pi -e "s/firestarter-demo-/$hyphens-/g" {} \;

# Rename firestarter-demo.pot from languages folder to new-theme-name.pot
mv languages/firestarter-demo.pot "languages/$hyphens.pot"

# Get the current directory path and replace the firestarter-demo with the new theme name
cur_dir=$(pwd)
cur_name=$(echo ${cur_dir//*\/})
theme_name=$(echo ${cur_dir//$cur_name/$hyphens})
mv $cur_dir $theme_name

# Refresh the directory
cd .

echo " "
echo "@@@@@@@@@@@"
echo "Theme setup complete! Now run \`npm install\` to import theme dependencies."
echo " "