#!/bin/sh

cd backend
npm install

cd ../frontend
npm install
ng build

cd ..
docker compose up


