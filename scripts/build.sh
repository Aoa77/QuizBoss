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
set -e  # Exit immediately on error
# set -x  # Enable debugging mode
###############################################################
tsc -b && vite build

# stop if the build failed
if [ $? -ne 0 ]; then
    echo ""
    echo "================================="
    echo "Build failed."
    echo "================================="
    echo ""
    exit 1
fi
###############################################################
echo ""
echo "================================="
echo "Build succeeded."
echo "================================="
echo ""
exit 0
###############################################################
