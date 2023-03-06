# Tracking Plan Manager

This is a full-stack web application for managing tracking plans and events. The frontend is built using React and Material UI, and the backend is built using NestJS and TypeORM. The application uses a PostgreSQL database to store tracking plan and event data.

## Prerequisites

Before running the application, you need to have the following installed on your machine:

- Node.js
- Docker
- Docker Compose

### Setup Server Instructions

1. Clone the repository:

```
https://github.com/ishantgupta777/rudderstack-assgn.git
```

2. Navigate to the `server` directory:

```
cd server
```

3. Use the `.env.development` file for environment variables. If you change anything to recheck docker and docker-compose file as well.

4. Run the following command to start the server and database containers:

```
docker-compose -f docker-compose.development.yml up
```

5. The server should now be running on `http://localhost:3002`.

6. To run all the tests, run this command inside server folder. Before that, you need to create a new database named `testing-db`

```
yarn run test
```

### Setup Client Instructions

1. Navigate to the `client` directory:

```
cd ../client
```

2. Run the following command to install the dependencies:

```
yarn
```

3. API Base URL is defined in `constants.js` file inside `src/client` folder.

4. Run the following command to start the client:

```
yarn start
```

5. The client should now be running on `http://localhost:3000`.
