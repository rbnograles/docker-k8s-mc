# Responsible for creating volumes and network for the application
source ./.env.volume
source ./.env.network

# Create Volume
if [ $(podman volume ls --format "{{.Name}}" | grep -w $VOLUME_NAME | wc -l) -eq 0 ]; then
    podman volume create $VOLUME_NAME
    echo "Volume $VOLUME_NAME created."
else
    echo "Volume $VOLUME_NAME already exists."
fi

# Network Creation
if [ $(podman network ls --format "{{.Name}}" | grep -w $NETWORK_NAME | wc -l) -eq 0 ]; then
    podman network create $NETWORK_NAME
    echo "Network $NETWORK_NAME created."
else
    echo "Network $NETWORK_NAME already exists."
fi