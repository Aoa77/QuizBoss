#!/bin/sh
###############################################################
clear
script="== sh $0 =="
CHAR="#"
LEN=$(printf "%s" "$script" | wc -c)
line=$(printf "%${LEN}s" | tr " " "$CHAR")
printf "\n%s\n%s\n%s\n\n" "$line" "$script" "$line"
printf "Current directory:\n$(pwd)\n\n"
set -x
###############################################################
vite --host --port 3000
###############################################################
set +x
echo
