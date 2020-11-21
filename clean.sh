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
        echo "Clearing ./commands/*.js.map";
        rm -fv ./commands/*.js.map;
        echo "Clearing ./modules/*.js";
        rm -fv ./modules/*.js;
        echo "Clearing ./modules/*.js.map";
        rm -fv ./modules/*.js.map;
        echo "Clearing ./index.js";
        rm -fv ./index.js;
        echo "Clearing ./index.js.map";
        rm -fv ./index.js.map
        echo "Clearing ./template*.js";
        rm -fv ./template*.js;
        echo "Clearing ./template*.js.map";
        rm -fv ./template*.js.map;
        echo "Clearing ./config.js";
        rm -fv ./config.js;
        echo "Clearing ./config.js.map";
        rm -fv ./config.js.map;
        echo "Clearing ./config.rename-me.js";
        rm -fv ./config.rename-me.js;
        echo "Clearing ./config.rename-me.js.map";
        rm -fv ./config.rename-me.js.map;
        echo "Clearing ./log.js";
        rm -fv ./log.js;
        echo "Clearing ./log.js.map";
        rm -fv ./log.js.map;
        echo "Clearing ./Client.js";
        rm -fv ./Client.js;
        echo "Clearing ./Client.js.map";
        rm -fv ./Client.js.map;
        echo "Clearing ./header.js";
        rm -fv ./header.js;
        echo "Clearing ./header.js.map";
        rm -fv ./header.js.map;
        echo "All cleaned! Have a nice day!";
        ;;
    *)
        echo "You need to type 'y'!";
        exit 1;
        ;;
esac