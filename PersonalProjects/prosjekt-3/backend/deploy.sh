#! /bin/bash
docker stop p3backend
docker rm  p3backend
./build.sh
docker run -p 9000:9000 --name p3backend --net="host" -d p3backend:latest
