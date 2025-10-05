# Tracker Project - Full Docker Setup

This repository contains a full-stack project with:

- **Backend:** Java Spring Boot API (`tracker-api`)
- **Frontend:** React (`tracker-frontend`)
- **Database:** PostgreSQL (`db`)

## Architecture Overview

The project is structured into three main services:

1. **PostgreSQL Database (`db`)**
   - Stores all application data.
   - Exposes port `5432` for local access.
   - Uses Docker volume `postgres_data` to persist data across container restarts.

2. **Spring Boot API (`api`)**
   - Java backend that provides REST endpoints.
   - Runs on port `7070`.
   - Connects to the PostgreSQL database (`db`) using the internal Docker network.
   - Waits for the database to be healthy before starting.

3. **React Frontend (`web`)**
   - Runs the user interface in a browser.
   - Communicates with the backend API at `http://localhost:7070/api`.
   - Runs on port `5173`.

All services are connected using a custom Docker network `tracker-network` for internal communication.

## Booting the Project with Docker

To start the full project using Docker:

1. Make sure Docker and Docker Compose are installed.
2. Navigate to the root of the repository.
3. Run the following command to build and start all services: docker-compose up --build
4. To stop all services run: docker-compose down 

   
