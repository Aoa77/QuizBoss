#!/bin/sh
###############################################################
clear
script="== sh $0 =="
CHAR="#"
LEN=$(printf "%s" "$script" | wc -c)
line=$(printf "%${LEN}s" | tr " " "$CHAR")
printf "\n%s\n%s\n%s\n\n" "$line" "$script" "$line"
set -x
###############################################################

# copy files matching the pattern "components/App.theme.*.css" to the "public/themes" folder.
# create a new folder "public/themes" if it does not exist.
mkdir -p public/themes
cp src/app/components/App.theme.*.css public/themes


tsc -b && vite build
###############################################################
set +x
echo
