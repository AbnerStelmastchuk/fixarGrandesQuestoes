docker run \
    --name postgres \
    -e POSTGRES_USER=abnerstelmastchuk \
    -e POSTGRES_PASSWORD=minhasenhasecreta \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    postgres

docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer

## ----- MONGODB
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhadmin \
    -d \
    mongo:4

docker run \
     --name mongoclient \
     -p 3000:3000 \
     --link mongodb:mongodb \
     -d \
     mongoclient/mongoclient

docker exec -it mongodb \
     mongo --host localhost -u admin -p senhadmin --authenticationDatabase admin \
     --eval "db.getSiblingDB('herois').createUser({user: 'abnerstelmastchuk', pwd: 'minhasenha', roles: [{role: 'readWrite', db: 'herois'}]})"