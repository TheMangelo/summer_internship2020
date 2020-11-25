#! /bin/bash

read -sp "PG password: "

docker volume create p3

docker run --name p3container -v p3:/var/lib/postgresql/data -e POSTGRES_PASSWORD="$REPLY" -p 5432:5432 -d postgres:latest