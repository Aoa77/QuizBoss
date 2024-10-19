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
tsc -b && vite build
###############################################################
set +x
echo
