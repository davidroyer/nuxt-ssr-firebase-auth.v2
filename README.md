# nuxt-firebsae-auth-ex

> This project is used to demonstrate how to design and setup your NUXT project to manage default behaviour within 
Firebase authentication. By default Firebase persists the users logged in status on successful authentication. 
This project uses the session, to store the user uid and cookies to store the users token and used in situations where 
the sessions has ended (example when browser is closed) and then a new session started but where the user is still 
authenticated according to Firebase. In cases like these the user will not need to sign in to view protected resources. 

## Firebase project setup

* Create a Firebase project with Email/Password authentication
* Initialise standard Firebase database. Used to run a simple query to test if user has permissions and is authenticated 
by Firebase to do so 
* Modify the configuration settings in the development and production files to match your Firebase project configuration


## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
