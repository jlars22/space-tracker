<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/ISS_spacecraft_model_1.png" alt="drawing" width="400"/>
</p>

# Introduction
This repository contains my project for the Softwaretechnology in Cyber-physical Systems exam portfolio. 

The objective of this project is to develop an application that collects external data over time and visualizes how it changes.

For my project i have decided to collect data about the International Space Station [(ISS)](https://www.nasa.gov/international-space-station/).

# Getting Started
## Frontend
To run the frontend locally, follow these steps:
1. Navigate to the project directory.
```console
cd frontend
```
2. Install dependencies.
```console
npm install
```
3. Set environment variables. An example can be found in `.env.example`, which can be cloned by:
```console
cp .env.example .env
```
4. Start the application.
```console
npm run start
```
## Backend
To run the backend locally, follow these steps:
1. Navigate to the project directory.
```console
cd backend
```
2. Set environment variables. An example can be found in `.env.example`, which can be cloned by:
```console
cp .env.example .env
```
3. Start PostgreSQL database. A docker-compose for this which matches the `.env` file can be started by:
```console
docker-compose -f docker-compose-local.yml up
```
4. Start the application.
```console
./gradlew bootRun
```

# Code style
## Frontend
The frontend application uses [Prettier](https://prettier.io/) for code formatting. Make sure this is installed in your preferred editor.

## Backend
The backend application uses [Spotless](https://github.com/diffplug/spotless) for code formatting.

Spotless is automatically applied every time the code is compiled.

To check formatting with Spotless on the entire codebase, use `./gradlew spotlessCheck`.

Most changes can be automatically applied with `./gradlew spotlessApply`.

# Technologies
## Frontend
- JavaScript
- React
- Node.js
## Backend
- Java
- Spring
- Gradle
