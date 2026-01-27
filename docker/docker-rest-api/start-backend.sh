source .env.db
source .env.network

LOCALHOST_PORT=3000
CONTAINER_PORT=3000

BACKEND_IMAGE_NAME='express-mongo'
BACKEND_CONTAINER_NAME='backend'

MONGODB_HOST=mongodb

# Start backend container with initialization script
if podman ps -a --format "{{.Names}}" | grep -Eq "^${BACKEND_CONTAINER_NAME}\$"; then
    echo "Removing existing container: $BACKEND_CONTAINER_NAME"
    podman rm -f $BACKEND_CONTAINER_NAME
fi

podman build -t $BACKEND_IMAGE_NAME .

podman run --rm -d --name $BACKEND_CONTAINER_NAME \
    -e KEY_VALUE_DB=$KEY_VALUE_DB \
    -e KEY_VALUE_DB_USER=$KEY_VALUE_DB_USER \
    -e KEY_VALUE_DB_PASSWORD=$KEY_VALUE_DB_PASSWORD \
    -e PORT=$CONTAINER_PORT \
    -e MONGODB_HOST=$MONGODB_HOST \
    -p $LOCALHOST_PORT:$CONTAINER_PORT \
    -v ./src:/app/src:z \
    --network $NETWORK_NAME \
    $BACKEND_IMAGE_NAME