#!/bin/bash

npm run build
cp manifest.yml dist/
cp cf-nginx.conf dist/nginx.conf
touch dist/Staticfile
cd dist
cf push
cd ..

