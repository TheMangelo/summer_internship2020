#! /bin/bash
docker stop p3frontend
docker rm  p3frontend
./build.sh
docker run -p 2000:80 --name p3frontend -d p3frontend:latest
