#!/bin/sh

if [ "$#" -lt 2 ]; then
    echo "Usage: $0 <target> <interval-in-seconds>"
    exit 1
fi

TARGET=$1
INTERVAL=$2

echo "Starting traffic generation to $TARGET every $INTERVAL seconds..."

while true; do
    REQUEST_TIME=$(date +"%Y-%m-%d %H:%M:%S")
    RESPONSE=$(curl -s "$TARGET")

    echo "[$REQUEST_TIME] Response from $TARGET: $RESPONSE"
    sleep $INTERVAL
done