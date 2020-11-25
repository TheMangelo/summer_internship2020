#! /bin/sh


npm run build
scp -r build it2810:/var/www/frontend/