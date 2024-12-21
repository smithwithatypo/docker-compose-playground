#!/bin/sh

cd frontend
ng build
cd ..
docker compose up


