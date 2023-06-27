# eecamp-wind

## Development

There are the services you'll need to run if you are developing.

```sh
docker-compose -f dev.docker-compose.yml up -d
```

Then you can attach to the containers for debugging.

```sh
docker attach eecamp-wind-backend-debug
docker attach eecamp-wind-frontend-debug
```

## Production

Start all services.

```sh
docker-compose -f prod.docker-compose.yml up -d
```

Backend will run on `http://localhost:9487`.

Frontend will run on `http://localhost:6987`.
