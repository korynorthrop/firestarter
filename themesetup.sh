#! /bin/sh

# Prompt user to type in a name for the theme
echo "Enter in a Theme Name: "
read themename

# Take the user input and save as different variables for the global search and replace commands below
lowercase=$(echo "$themename" | tr '[:upper:]' '[:lower:]')
hyphens=$(echo ${lowercase// /-})
underscores=$(echo ${lowercase// /_})
suffix="_"
upperunders=$(echo ${themename// /_})
cur_dir=$(pwd)

# Search for: 'firestarter-demo' and replace with: 'new-theme-name'
find . ! -name 'setup.sh' -type f -exec perl -pi -e "s/\'firestarter-demo\'/\'$hyphens\'/g" {} \;

# Search for: firestarter_demo_ and replace with: new_theme_name_
find . ! -name 'setup.sh' -type f -exec perl -pi -e "s/firestarter_demo_/$underscores$suffix/g" {} \;

# Search for: Text Domain: firestarter-demo and replace with: Text Domain: new-theme-name
find . ! -name 'setup.sh' -type f -exec perl -pi -e "s/Text Domain: firestarter-demo/Text Domain: $hyphens/g" {} \;

# Search for:  Firestarter_Demo and replace with:  New_Theme_Name (important to escape the leading nbsp)
find . ! -name 'setup.sh' -type f -exec perl -pi -e "s/\ Firestarter_Demo/\ $upperunders/g" {} \;

# Search for: firestarter-demo- and replace with: new-theme-name-
find . ! -name 'setup.sh' -type f -exec perl -pi -e "s/firestarter-demo-/$hyphens-/g" {} \;

# Rename firestarter-demo.pot from languages folder to new-theme-name.pot
mv languages/firestarter-demo.pot "languages/$hyphens.pot"


echo "Theme setup complete."