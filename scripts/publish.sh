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
set -x  # Enable debugging mode
set -e  # Exit immediately on error
###############################################################
# save the git branch name in a string variable
branch=$(git rev-parse --abbrev-ref HEAD)

# write the current date and time to the version file
echo $(date +"%Y-%m-%d %H:%M:%S") >./public/version

# commit the changes
git add . && git commit -m "[$(branch)] deployment"

# write the current branch and commit hash to the version file
echo $(git rev-parse --abbrev-ref HEAD) >>./public/version

#####
# tsc -b && vite build
###############################################################
