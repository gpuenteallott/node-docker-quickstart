# Node-Docker Quickstart

Starting point to develop a node app using Docker.

1. Duplicate `docker/.env.dist` to `docker/.env`

2. `npm install`

3. Generate a self signed certificate (only to get started). `openssl req -newkey rsa:2048 -nodes -keyout etc/certs/project.key -x509 -days 365 -out etc/certs/project.crt`

4. Build the container. `docker-compose build`

5. Kick it off. `docker-compose up -d`

6. Ensure the app didn't throw any errors. `docker-compose logs`

Site should be running. Open in a browser the docker machine IP address on ports 8088 or 8043 to see.