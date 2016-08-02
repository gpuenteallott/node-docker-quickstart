# Node-Docker Quickstart

Starting point to develop a node app using Docker.

1. `export NODE_PROJECT_ROOT=path/to/the/repo`

2. Duplicate `docker/.env.dist` into `docker/.env`

2. `npm install`

3. Generate a self signed certificate (to start). `openssl req -newkey rsa:2048 -nodes -keyout etc/certs/project.key -x509 -days 365 -out etc/certs/project.crt`

4. Build the container. `docker-compose build`

5. Kick it off. `docker-compose up -d`

6. Ensure the app didn't throw any errors. `docker-compose logs`

Site should be running. Hit the IP address of your docker machine on ports 8088 or 8043 to see.