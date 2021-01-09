# Welcome to Development Setup!

If you are reading this you are ready to contribute to c0d3.com!

To begin we will need to set up the code base on your own machine. To do this we will be creating a copy of the **c0d3** [GitHub repository](https://github.com/garageScript/c0d3-app).

## Prerequisites

- [Yarn](https://classic.yarnpkg.com/en/)
- [Node](https://nodejs.org/en/)
- [Postgresql](https://www.postgresql.org/download/)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker-compose](https://docs.docker.com/compose/install/)

## Installation

![forkExample](developmentSetup/forkExample.png)

1. Click on the button in the top right corner with the text `Fork` to create a copy of this repository:

   ![cloneExample](developmentSetup/cloneExample.png)

   **Notice** in the top left corner of the screenshot above that it states that the repository was forked from garageScript/c0d3-app

2. Click on the "Clone or download" green button and copy the `ssh` or `https` url.

3. Navigate to your terminal and clone: `git clone url-goes-here`.

4. After cloning, you will want to change the current directory to the `c0d3-app` folder that was created.

5. `yarn install` to install all of the dependencies needed to run the app.

6. Configure your local environment. Create .env file in your c0d3-app directory with the following variables.
 **Do not commit MAILGUN_API_KEY or share it outside c0d3.**
```
   MAILGUN_API_KEY=123abc #ask for valid key in chat
   MATTERMOST_ACCESS_TOKEN=123abc #you will generate it yourself
   CHAT_URL=http://localhost:8080/api/v4 #see instructions below for mattermost docker image
   CLIENT_URL=http://localhost:4000
   #postgres user, database name, password, host and port
   DB_USER=postgres
   DB_NAME=c0d3
   DB_PW=postgres
   DB_HOST=localhost
   PORT=5432
```

7. Create a new postgres database which will be used for c0d3-app. By default postgres uses `postgres` for username and password. Default port is 5432.
```
   psql -U postgres
   CREATE DATABASE c0d3;
```

8. [Install and run mattermost docker image](https://docs.mattermost.com/install/prod-docker.html). By default this configuration needs port 80 which is most likely already in use. Open docker-compose.yml file and change `80:80` to `8080:80` at line 57. Start the mattermost image with `docker-compose up`.

9. Configure your local mattermost server. When you open [http://localhost:8080](http://localhost:8080), you will be greeted with the mattermost login page. Enter any email (this setup won't have an SMTP server, so no actual mails will be send). First user automatically becomes the server admin. Create new team and enable use of personal access tokens *System Console > Integrations > Custom Integrations*.

10. Generate a personal access token. Close system console, go to team chat (town square) and click on three horizontal bars near your name *Account settings > Security* , then `generate personal access token`. This value will be used as MATTERMOST_ACCESS_TOKEN.

11. Now you can finally start your application `PORT=4000 yarn dev`.

12. Open [http://localhost:4000/](http://localhost:4000/), register new user as usual and login.

13. You can start submitting your challenges but you can't review them since you haven't passed any lessons yet. To fix it you need to manually alter the userLesson table. The important values here are userId (you're the first user, so it's 1), for lessonId check lessons table `TABLE lessons;`.
```
INSERT INTO "userLessons"("isPassed", "lessonId", "userId", "createdAt", "updatedAt") VALUES('true', 5, 1,'2020-12-29 18:16:48.56+03','2020-12-29 18:16:48.56+03');
```

14. Make yourself admin:
```
UPDATE users SET "isAdmin"='true' WHERE id=1;
```


To submit challenges:
1. Logout `c0d3 logout`.
2. Login to your local server `c0d3 login --url http://localhost:4000/api/graphql`.
3. Submit your code `c0d3 submit --url http://localhost:4000/api/graphql`
It should be visible on your local setup.

To connect to mattermost db:
1. Check your current active docker containers `docker ps`. There should be three of them - web, db and app. Notice the db container id.
2. Open bash console inside db container `docker exec -it *db container id* /bin/bash`.
3. Connect to postgres `psql -U mmuser -d mattermost`.


### Known problems

Snapshots are failing with:

`
    - colSpan={5} +   colSpan={4}     `                                                    
`
                      - href="#"                                                             +             href="/#" 
                      `
Or `yarn autofix` is failing with `Component definition is missing display name` in `containers/withQueryLoader.tsx` error.

You most likely installed a new module by using npm instead of yarn. While in theory these tools should be interchangeable, in practice it can result in such weird errors. Recloning git repo should help.  
  

### You are now all setup on your machine! Keep up the great work and thank you for your contributions 
👍