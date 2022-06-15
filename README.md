# Chat-app-BE
## Live demo
A live demo of the chat API is hosted on heroku [here](https://jefvda-chat-app-api.herokuapp.com/api-docs), and is automaticly up-to-date with the main branch of this repo.

## Endpoints
The API endpoints are documented with [swaggerUI](https://swagger.io/).

The endpoint for the swagger docs is: `/api-docs`

<br>

Back-end system for a chat-app made in nodejs, using expressjs.
As databse, this project uses mongodb, more on how to set that up later in this guide.

If you want to know more about the project structure, naming conventions... look at our [wiki](https://github.com/JefvdA/Chat-app-BE/wiki).

In this guide, you will be explained how to run this project on your own device.

* [Setup mongodb](#Mongodb-Setup)
* [.env file](#env-file)
* [Run the project](#Setup)
* [Run the project (with docker)](#docker-setup)
* [Running tests](#Testing)

# Mongodb Setup
In this part of the guide, the setup for [mongodb](https://www.mongodb.com/docs/manual/installation/) is explained.

*Ofcourse, you can use any tutorial you want to setup a mongodb installation.*

It is recommended that you install mongodb in a docker container, as it's much easier, and makes the install non-permanent. It's very easy to delete the docker container when you don't want to use mongodb anymore.

Setup mongodb without authentication (a root user account):
```
sudo docker run --name mongodb -d -p 27017:27017 mongo
```

Setup mongodb with a root user account (of course you can change the uesrname and password to your liking):
```
sudo docker run \
--name mongodb \
-d -p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=admin \
mongo
```

[Mongosh](https://www.mongodb.com/docs/mongodb-shell/install/#std-label-mdb-shell-install) is a new addition for mongodb, it's an interactive shell to interact with your database.

This can also be used to test your database connection, and to test if the authentication was succesfull.

To test the connection, run following command:
```
mongosh
```

To test a connection, and also login as the created root user:
```
mongosh -u [username] -p [password]
```

To start, stop or remove the docker container, use following commands:
```
sudo docker start [containerName]
sudo docker stop [containerName]
sudo docker rm [containerName]
```

***

# .env file

Thourghout the application, environment variables are often used. Below, and expample of how a .env file looks, this file should be placed in the root of the project:

```
PORT=3000
MONGODB_URI="mongodb://localhost:27017/chat-app"
MONGODB_USERNAME="admin"
MONGODB_PASSWORD="admin"
COOKIE_SECRET="SECRET"
JWT_SECRET="SECRET"
```

Of course, change the MONGODB variables to your liking.

Secure secret strings for the cookie and the jwt can be generated by running following command in the terminal:
```
openssl rand -base64 64
```
*This will generate a random string of 64 base64 characters*

***

# Setup
After cloning the repo, and setting up the database, it's very easy to run the application.

**install the node modules**: `npm install` <br>
**run the application**: `npm start` or `node index.js` <br>

**Make use of hot-reloading**: `npm run dev` or `nodemon` (make sure you have [nodemon](https://www.npmjs.com/package/nodemon) installed)

***

# Docker setup
If you prefer, the project can also be ran by using docker.

The [Dockerfile](https://github.com/JefvdA/Chat-app-BE/blob/main/Dockerfile) builds the image for this project. <br>
This image, and the database (monogodb) are ran in seperate containers which can be ran with [docker-compose](https://github.com/JefvdA/Chat-app-BE/blob/main/docker-compose.yaml).

Start the container-cluster with:
```
docker-compose up -d
```
*Use the -d flag to start the cluster up in the background*

Docker-compose can be stopped with:
```
docker-compose stop
```

***

# Testing
If you are contributing to this project, but don't want to manualy test to see if everything still works, you can just run the tests this project has.

To run the tests, use following command:
```
npm test
```

For testing, we use the framework [mocha](https://www.npmjs.com/package/mocha), nyc is used to give test coverage when you end the tests.
