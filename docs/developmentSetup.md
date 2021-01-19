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

3. Navigate to your terminal and clone `git clone *url-goes-here*`.

4. After cloning, you will want to change the current directory to the `c0d3-app` folder that was created.

5. `yarn install` to install all of the dependencies needed to run the app. 

6. Configure your local environment. Create a .env file in your c0d3-app directory with the following variables. Port numbers are completely arbitrary, as long as docker-compose.yml is consistent with this .env file you're good.
 **Do not commit MAILGUN_API_KEY or share it outside c0d3.**
```
   MAILGUN_API_KEY=123abc #ask for valid key in chat
   MATTERMOST_ACCESS_TOKEN=123abc #you will generate it yourself
   CHAT_URL=http://localhost:8000/api/v4 #mattermost api 
   CLIENT_URL=http://localhost:4000 #used in registration email
   #postgres user, database name, password, host and port
   DB_USER=c0d3_admin
   DB_NAME=c0d3
   DB_PW=admin
   DB_HOST=localhost
   DB_PORT=7000
```
7. Build docker images. Go to docker directory and type `docker-compose build`. It will take some time for docker to pull and install everything. In the end you will have one container with a postgres database and one container for mattermost. 

8. Prepare volume directories. Volumes are mappings from containers to your local machine.
```
mkdir -pv ./volumes/app/mattermost/{data,logs,config,plugins,client-plugins}
sudo chown -R 2000:2000 ./volumes/app/mattermost/
```
9. Now you can start docker `docker-compose up` (add -d flag to start in detached mode). To stop all containers `docker-compose down`.

10. Configure your local mattermost server. When you open [http://localhost:8080](http://localhost:8000), you will be greeted with the mattermost login page. Enter any email (this setup won't have an SMTP server, so no actual mails will be sent). First user automatically becomes the server admin. Create new team and enable use of personal access tokens *System Console > Integrations > Custom Integrations*.

11. Generate a personal access token. Close system console, go to team chat (town square) and click on three horizontal bars near your name *Account settings > Security* , then `generate personal access token`. This value will be used as MATTERMOST_ACCESS_TOKEN.

12. Allow new users to join your team. As mattermost admin go to *Team settings/Allow any user with an account on this server to join this team*. 

13. Start c0d3 app `PORT=4000 yarn dev`. If everything went right you will see the landing page. There are two premade users: `admin:password` (admin, passed all lessons, can review submissions) and `newbie:password` (new user). And you can always register new ones if you want to.  


To submit challenges:
1. Logout `c0d3 logout`.
2. Login to your local server `c0d3 login --url http://localhost:4000/api/graphql`.
3. Submit your code `c0d3 submit --url http://localhost:4000/api/graphql`
It should be visible on your local setup.

To connect to postgres database inside container:
1. Open bash console inside postgres container `docker exec -it c0d3_db /bin/bash`.
2. Connect to postgres `psql -U c0d3_admin -d c0d3`. 

If you have psql installed locally you can type `psql -U c0d3_admin -h localhost -p 7000 -d c0d3` with the same result.

There are also various useful graphical database management tools like [pgAdmin](https://www.pgadmin.org/) and [dBeaver](https://dbeaver.io/).

### Known problems

Snapshots are failing with:

`
    - colSpan={5} +   colSpan={4}     `                                                    
`
                      - href="#"                                                             +             href="/#" 
                      `
Or `yarn autofix` is failing with `Component definition is missing display name` in `containers/withQueryLoader.tsx` error.

You most likely installed a new module by using npm instead of yarn. While in theory these tools should be interchangeable, in practice it can result in such weird errors. Recloning git repo should help.  
  

### You are now all set up on your machine! Keep up the great work and thank you for your contributions 
👍