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
set -e # Exit immediately on error
# set -x # Enable debugging mode
###############################################################
# save the current date and time in a string variable
vdate=$(date +"%Y-%m-%d %H:%M:%S")

# save the git branch name in a string variable
branch=$(git rev-parse --abbrev-ref HEAD)

# build the project
tsc -b && vite build

# check if there are any changes to commit
if [ -n "$(git status --porcelain)" ]; then
    # commit all changes
    git add . && git commit -m "publishing [$branch]"
else
    ##########################################
    echo "No changes. Using last commit....."
    ##########################################
fi

# save the commit hash in a string variable
commit=$(git rev-parse --short HEAD)

# format the string to be used as a version
vtext="version [$branch:$commit] $vdate"

# update the version file
echo $vtext >./public/version

# commit the version file change
git add . && git commit -m "$vtext"

# create a deployment tag with the branch name.
# this will point to the commit used for deployment,
# which is always the version string update.
# Note: the version string itself always points to the
# previous commit hash.
tag="$branch-deploy"
git tag "$tag" --force

# push
git push --follow-tags
###############################################################
