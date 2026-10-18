# Weather App (Dockerized)

A multi-container weather application. Search for a city and see its current weather. The frontend is served by Nginx and the backend is a Node.js API, both orchestrated with Docker Compose.

## Architecture

| Service | Tech | Port |
|---------|------|------|
| front | Nginx (alpine) + HTML/CSS/JS | 8080 |
| back | Node.js + Express | 3000 |

The browser loads the page from the front service and sends /search and /weather requests to the back service.

## Features

- City search with live suggestions
- Current weather by coordinates
- Fully containerized, one command to run
- CORS enabled on the API

## Getting Started

Requirements: Docker and Docker Compose.

bash
git clone https://github.com/mahdikeshavarz1383/[repo-name].git
cd [repo-name]
docker compose up -d --build


Open http://localhost:8080 in your browser.

To stop the project:

bash
docker compose down


## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /search?q=<city> | Search cities by name |
| GET | /weather?lat=<lat>&lon=<lon> | Current weather for coordinates |

## What I Learned

- Writing Dockerfiles for a static site (Nginx) and a Node.js service
- Port mapping and how containers talk to each other
- Debugging with docker logs and the browser Network tab
- Why a browser blocks cross-origin requests (CORS) and how to fix it

## Roadmap

- [ ] Add an Nginx reverse proxy so the frontend needs no hardcoded API address
- [ ] Add a CI pipeline for building the images
- [ ] Deploy to a VPS

## Author

Mahdi Keshavarz
GitHub: [@mahdikeshavarz1383](https://github.com/mahdikeshavarz1383/weatherapp)
