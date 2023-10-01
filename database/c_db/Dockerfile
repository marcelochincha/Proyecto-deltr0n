FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=deltron
ENV MYSQL_DATABASE=deltron_data

COPY ./init /docker-entrypoint-initdb.d/
