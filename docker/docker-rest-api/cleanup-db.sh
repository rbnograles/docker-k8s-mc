source .env.db
source .env.network
source .env.volume

# Cleanup MongoDB container
if [ $(podman ps -a --format "{{.Names}}" | grep -w $CONTAINER_NAME | wc -l) -eq 1 ]; then
    echo "Removing MongoDB container..."
    podman rm -f $CONTAINER_NAME
else
    echo "No existing MongoDB container found."
fi

# Cleanup MongoDB volume
if [ $(podman volume ls --format "{{.Name}}" | grep -w $VOLUME_NAME | wc -l) -eq 1 ]; then
    echo "Removing MongoDB volume..."
    podman volume rm $VOLUME_NAME
else
    echo "No existing MongoDB volume found."
fi

# Cleanup MongoDB network
if [ $(podman network ls --format "{{.Name}}" | grep -w $NETWORK_NAME | wc -l) -eq 1 ]; then
    echo "Removing MongoDB network..."
    podman network rm $NETWORK_NAME
else
    echo "No existing MongoDB network found."
fi