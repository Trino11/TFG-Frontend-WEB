# AngularFrontend

## Running the web server
The main way to run the project is via Docker.

### Docker run

```
docker run -d \
  --name my-awesome-container \
  -p 80:80 \
  trino11/tfg-frontendangular:latest
```

### Docker compose

Other way to run docker containers is docker-compose.yml

Here is an example using it.

```
version: '3'
services:
  tfg_front-angular:
    image: trino11/tfg-frontendangular:latest
    ports:
      - 80:80
```

## API host configuration
The image is configured to use the default API host, you will have to download the project.

Configure this API direction under `src/environments/environment.prod.ts` path, there you can set both of the variables.
```
    api_url:"https://api.trinohost.com/v1",
    api_login_url:"https://auth.trinohost.com/v1",

```

Build the image and use it.
`docker build -t tfg-frontendangular:latest .`

