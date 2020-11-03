#!/bin/bash
# Clean the ProtoBot workspace of unnecessary compilation
# archives that are messy and hard to code with.

# confirmation
echo "WARNING";
echo "Running this script will delete files from";
echo "the ProtoBot workspace.";
echo "";
echo "Examples of files deleted are compilation items";
echo "such as ./commands/*.js";
echo "";
read -p "Are you 100% SURE you want to continue? [y/N] " isSure;
case "$isSure" in
    [yY][eE][sS]|[yY]) 
        # user said ok
        echo "Clearing ./commands/*.js";
        rm -fv ./commands/*.js;
        echo "Clearing ./modules/*.js";
        rm -fv ./modules/*.js;
        echo "Clearing ./index.js";
        rm -fv ./index.js;
        echo "Clearing ./template*.js";
        rm -fv ./template*.js;
        echo "Clearing ./config.js";
        rm -fv ./config.js;
        echo "Clearing ./config.rename-me.js";
        rm -fv ./config.rename-me.js;
        echo "Clearing ./log.js";
        rm -fv ./log.js;
        echo "All cleaned! Have a nice day!";
        ;;
    *)
        echo "You need to type 'y'!";
        exit 1;
        ;;
esac