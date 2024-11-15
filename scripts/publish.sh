#!/bin/sh
###############################################################
echo ""
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

# build the project, do not continue if the build fails
npm run build

# check if there are any changes to commit
if [ -n "$(git status --porcelain)" ]; then
    # commit all changes
    git add . && git commit -m "publishing [$branch]"
else
    echo ""
    echo "========================================"
    echo "No changes to commit. Skipping publish."
    echo "========================================"
    echo $vtext
    echo ""
    exit 0
fi

# save the commit hash in a string variable
commit=$(git rev-parse --short HEAD)

# tag as the source commit
git tag "$branch-source" --force

# format the string to be used as a version
vtext="$branch:$commit $vdate"

# update the version file
echo $vtext >./public/version

# commit the version file change
git add . && git commit -m "$vtext"

# tag as the deploy commit
git tag "$branch-deploy" --force

# push commits and tags
git push
git push --tags --force

# print the version string
echo ""
echo "================================="
echo "New version deployed:"
echo "================================="
echo $vtext
echo ""
###############################################################
