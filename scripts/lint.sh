!#/bin/bash
clear
script="== bash $0 =="
CHAR=#
LEN=${#script}
line=$(eval printf '$CHAR%.0s' {1..$LEN})
echo && echo $line && echo $script && echo $line && echo
set -x
########################################
eslint .
########################################
set +x
echo
