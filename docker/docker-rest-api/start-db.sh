source ./.env.db
source ./.env.network
source ./.env.volume

MONGODB_IMAGE="mongodb/mongodb-community-server"
MONGODB_TAG="7.0-ubuntu2204"

LOCALHOST_PORT=27017
CONTAINER_PORT=27017

#Storage
VOLUME_CONTAINER_PATH='/data/db'

# Setup volumes and network
source setup.sh

# Start MongoDB container with initialization script
if [ $(podman ps -a --format "{{.Names}}" | grep -w $CONTAINER_NAME | wc -l) -eq 0 ]; then
    echo "Starting MongoDB container..."
else
    echo "MongoDB container already exists. Removing existing container..."
    podman kill $CONTAINER_NAME
fi

# :ro means read-only
podman run --rm -d --name $CONTAINER_NAME \
    -e MONGO_INITDB_ROOT_USERNAME=$ROOT_USER \
    -e MONGO_INITDB_ROOT_PASSWORD=$ROOT_PASS \
    -e KEY_VALUE_DB=$KEY_VALUE_DB \
    -e KEY_VALUE_DB_USER=$KEY_VALUE_DB_USER \
    -e KEY_VALUE_DB_PASSWORD=$KEY_VALUE_DB_PASSWORD \
    -p $LOCALHOST_PORT:$CONTAINER_PORT \
    -v $VOLUME_NAME:$VOLUME_CONTAINER_PATH \
    -v ./db-config/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \
    --network $NETWORK_NAME \
    $MONGODB_IMAGE:$MONGODB_TAG