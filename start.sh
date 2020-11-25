# run me instead of "node ." to support
# restarts.

echo 'Starting!';

while true; do
    tsc;
    cd dist;
    node .;
    echo 'Restarting in 3 seconds. Press Ctrl+C to cancel.';
    cd ..;
    sleep 3;
done;