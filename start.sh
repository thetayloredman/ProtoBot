# run me instead of "node ." to support
# restarts.

echo 'Starting!';

while true; do
    tsc;
    node .;
    echo 'Restarting in 10 seconds. Press Ctrl+C to cancel.';
    sleep 10;
done;