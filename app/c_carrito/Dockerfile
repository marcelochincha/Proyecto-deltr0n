FROM python:3.11-bullseye
WORKDIR /programas/api-usuarios

ENV PYTHONBUFFERED 1

# Install mysqlclient debian package dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
   libmariadb-dev-compat gcc                   `: MySQL client` \
&& rm -rf /var/lib/apt/lists/*

RUN pip3 install --no-cache-dir flask flask-cors flask-sqlalchemy flask-bcrypt flask-caching mysqlclient psycopg2

COPY . .

CMD ["python3", "./app.py"]



