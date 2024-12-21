#!/bin/sh

cp db/.env.sample db/.env
cp backend/.env.sample backend/.env

cd backend
npm install

cd ../frontend
npm install
ng build

cd ..
docker compose up


