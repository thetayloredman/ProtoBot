#!/bin/bash
# Clean the ProtoBot workspace of unnecessary compilation
# archives that are messy and hard to code with.

# confirmation
echo "WARNING";
echo "Running this script will delete files from";
echo "the ProtoBot workspace.";
echo "";
echo "Examples of files deleted are compilation items";
echo "such as ./commands/*.js, but NOT DATABASES!";
echo "";
read -p "Are you 100% SURE you want to continue? [y/N] " isSure;
case "$isSure" in
    [yY][eE][sS]|[yY]) 
        # user said ok
        echo "Copying out important data...";
        mkdir DATA_BKP;
        mkdir DATA_BKP/data;
        mkdir DATA_BKP/logs;
        cp -rv ./dist/data/* ./DATA_BKP/data/
        cp -rv ./dist/logs/* ./DATA_BKP/logs/
        echo "Clearing dist..."
        rm -rfv ./dist/*
        echo "Replacing data..."
        mkdir dist/data;
        mkdir dist/logs;
        cp -rv ./DATA_BKP/data/* ./dist/data/
        cp -rv ./DATA_BKP/logs/* ./dist/logs/
        echo "Cleaning up...";
        rm -rfv ./DATA_BKP/
        echo "Done.";
        ;;
    [nN][oO]|[nN])
        echo "You rejected.";
        exit 1;
        ;;
    *)
        echo "Unknown input $isSure";
        exit 2;
        ;;
esac