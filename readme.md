# Docker compose playground

## Summary

This is a project for practicing with docker compose, using 3 separate Docker containers: 
- an Angular frontend, hosted on a Caddy server
- a Node backend, hosted on an Express server
- a PostgreSQL database

## To run:

Clone the repo:  
`$ git clone git@github.com:smithwithatypo/docker-compose-playground.git`

Give execute permissions to the build script (mac and linux)  
`$ chmod 755 build_and_deploy.sh`

To see the build script (press q to exit):  
`$ less build_and_deploy.sh`

Install dependencies and run docker compose  
(note: you need docker running, and the easiest way is downloading the free Docker Desktop at [https://www.docker.com](https://www.docker.com))  
`$ ./build_and_deploy.sh`
