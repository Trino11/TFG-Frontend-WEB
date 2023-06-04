# AngularFrontend

## Important

This is not the main repository of the project, just a mirror. The updated repo can be found on gitlab https://git.trinohost.com/trino/tfg-frontend-web

## General projects features (APIs and consumers)

### ES

La estructura del proyecto intenta seguir el estilo de arquitectura de microservicios. Consiste en 2 APIs en el Backend y N consumidores para el Frontend.

#### Backend

En el Backend esta la AuthAPI, que provee soluciones de login seguro para los desarrolladores, aislados de cualquier otro proyecto como el del foro, los desarrolladores podran hacer aplicaciones sin preocuparse del manejo de datos sensibles como emails o contraseñas.

Lista de caracteristicas principales:
- Login
- Crear tokens de login
- Verificar tokens de login

#

En el Beackend tambien esta la API del foro, esta es la APIREST principal, que provee soluciones de foro como almacenar posts o comentarios, tambien un chat integrado usando Websocket.

Lista de caracteristicas principales:
- Verificar usuarios logueados usando la AuthAPI
- Manejo de posts y su informacion
- Manejo de comentarios y su informacion relacionada con su post
- Manejo de directrios recurivos para el almacenamiento de posts y directorios
- Chat integrado para los usuarios del foro usando Websocket para una comunicacion bidireccional con el servidor.

#
#### Frontend

Para el Frontend, de momento esta el Cliente web basado en Angular, consume la mayor parte de la funcionalidad de ambas APIs.

Lista de caracteristicas principales:
 - Regitrar usuarios en la AuthAPI y la API del foro
 - Loguear usuarios y almacenar sesiones
 - Mostrar los posts y su informacion
 - Mostrar los comentarios y su informacion relacionada con su post
 - Mostrar los directorios y directorios
 - Chat integrado para los usuarios del foro usando Websocket


### EN

The structure of the project searchs for the microservices style of architectures. Consists of 2 APIs in the Backend and N consumers for the Frontend.

#

In the backend is the AuthAPI that provides secure login solutions for the developers, isolated from all other projects like the forum, the developers will be able to make apps without worry about handling sensible data like emails or passwords.

List of main features:
- Login
- Create login tokens
- Verify login tokens

#

In the backend also is the Forum API, this is the main app APIREST, providing the forum solutions like storing posts or comments, also the integrated chat via WebSocket.

List of main features:
- Verify logged in users using the AuthAPI
- Handle posts and his info
- Handle comments and his info related to its post
- Handle recursive folders and paths for store posts and folders
- Integrated chat for the forum users using websocket for bidirectional comunication with the server

#

For the frontend, at the moment there is a web client based on Angular, it consumes most of the functionality of both APIs.

List of main features:
- Register users on AuthAPI and Forum API.
- Login users and storing sessions
- Show posts and his info
- Show comments and his info related to its post
- Show recursive folders and paths
- Integrated chat for the forum users using websocket


## Specific project technologies

### ES

Esta aplicacion esta construida sobre Angular 16.0.2, consume de una APIREST para manejar y mostrar los endpoints proporcionados por ella.

Lista e las tecnologias usadas:
 - Angular routing para el enrutado
 - TailwindCSS para el estilado
 - Quill para el plugin de texto enrriquecido para los text areas
 - WebSocket para el chat integrado


### EN

This app is built on Angular 16.0.2, consumes an APIREST to handle and display the endpoints provided by it. 

List of technologies used:
 - Angular routing for the routes
 - TailwindCSS for the style
 - Quill plugin for the RichText text areas
 - WebSocket for the integrated chat


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

### API host configuration
The image is configured to use the default API host, you will have to download the project.

Configure this API direction under `src/environments/environment.prod.ts` path, there you can set both of the variables.
```
    api_url:"https://api.trinohost.com/v1",
    api_login_url:"https://auth.trinohost.com/v1",

```

Build the image and use it.
`docker build -t tfg-frontendangular:latest .`
