# Welcome to the Anythink Market repo

To start the app use Docker. It will start both frontend and backend, including all the relevant dependencies, and the db.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.

## First setup

Run `docker-compose up` from the root directory and check that the backend then verify that the backend is up by hitting [http://localhost:3000/api/ping](http://localhost:3000/api/ping). In order to test the frontend, open the user registration page and create a test user. Here’s the link: [http://localhost:3001/register](http://localhost:3001/register).

**[TODO 05/01/2018 @vanessa-cooper]:** _It's been a while since anyone ran a fresh copy of this repo. I think it's worth documenting the steps needed to install and run the repo on a new machine?_
