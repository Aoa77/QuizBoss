#!/bin/sh
###############################################################
clear
script="== sh $0 =="
CHAR="#"
LEN=$(printf "%s" "$script" | wc -c)
line=$(printf "%${LEN}s" | tr " " "$CHAR")
printf "\n%s\n%s\n%s\n\n" "$line" "$script" "$line"
printf "Current directory:\n$(pwd)\n\n"
###############################################################
set -e  # Exit immediately on error
set -x  # Enable debugging mode
###############################################################
# save the git branch name in a string variable
branch=$(git rev-parse --abbrev-ref HEAD)

# commit all changes
git add . && git commit -m "[$branch] deployment"

# save the commit hash in a string variable
commit=$(git rev-parse --short HEAD)

# save the current date and time in a string variable
vdate=$(date +"%Y-%m-%d %H:%M:%S");

# update the version file
echo "[$branch] $commit" >./public/version
echo $vdate >>./public/version

# write the current branch and commit hash to the version file
# echo $(git rev-parse --abbrev-ref HEAD) >>./public/version

#####
# tsc -b && vite build
###############################################################
