# TIVO

Tivo is in entertainment domain and provides unique way to its customer to enjoy their TV
viewing experience. Customers can watch live channels or view the OTT services like Netflix
or Prime video using Tivo set of box(STB). Customers can add/remove new channel
packages or OTT by calling customer care. To achieve this, Tivo customer care
representative needs a web application which can help them to configure customer needs.

The repo structure has been created out of Amit's public React template. Links are given below.

[Amit's React-csr-template Github page](https://amit040386.github.io/react-csr-template/)

Icon set: [Material icon](https://material.io/resources/icons/?icon=search&style=baseline)

## Primary Tech stack

- **React**: The primary UI library
- **Redux**: Redux data flow
- **Redis**: Redis in-memory data store
- **React-redux**: Integrating React with Redux data flow
- **Redux-thunk**: Redux middleware to support asynchronous operations
- **Redux-persist**: Persist and rehydrate a redux store.
- **Redux-pack**: Redux library to extend various stages (start, success, error, finish, always) of API calling
- **React-loadable**: Code splitting
- **React-router-dom**: SPA routing
- **SASS**: CSS pre-processor
- **Axios**: Javascript library to make rest API call
- **React-helmet**: React library to change header metadata and title
- **Node-sass**: SASS CSS pre-processor
- **Jest**: Testing framework and test runner for unit test cases
- **Enzyme**: React component testing utility
- **Webpack**: Webpack module bundler

## Features

- Complete UI architecture with mono-repo directories structure
- Centralised HTTP(S) request and response interceptor
- Progressive web app (PWA)
- Analytic service for tracking user's movements and clicks
- Webpack based module bundler
- Redis data store
- Lazy loading of images
- Virtual list for optimizing long list display
- Internationalization or localization support with English language. Later multiple languages could have added.
- Used React context to implement Internationalization
- Offline support with service worker
- Code splitting with react-loadable
- Redux data flow
- React hooks
- Hot module reloading (HMR) for local development
- React memo to stop redundant rendition
- Error boundary to catch unexpected UI errors
- Modular and functional programming paradigm used
- Common and extensible config
- EsLint for maintaining uniform coding standards
- CSS pre-processor
- Centralised color variables
- Test case setup with Jest
- Redux extension for better local debugging
- Editor config for maintaining the similar coding indentation even if various editors are used across the team

## Quick start: How to run this template

First clone project and install dependencies

```sh
$ git clone https://github.com/amit040386/TIVO.git
$ cd TIVO
$ npm install
```

Then install Redis in local if not installed

```sh
$ sudo brew install redis
$ sudo brew services start redis (It should display: Successfully started redis)
$ redis-server (Command to check whether redis server is running or not)
```

Then run local

```sh
$ npm run start
```

Default port number is 7009
Localhost URL: http://localhost:7009/user

**NOTE**: To change the port, create a .env in root folder and add your port number as follows.

```javascript
PORT=4566
```

or change the port number in this file: server/util/port.js

**NOTE**: If any new locale texts are added, please re-execute the npm start command

**NOTE**: If you want to check whether all redis keys have been created or not, please execute these commands.

```sh
$ redis-cli
$ EXISTS REDIS_TIVO_CUSTOMER_INFO
```
If it returns 1 then it is confirmed that the key has been created successfully. Otherwise it would return 0. For more details, please go through this [documentation](https://www.tutorialspoint.com/redis/redis_keys.htm).

## Unit Testing

Use the following commands to execute the test cases

```sh
$ npm run test
```

# Scope of improvements

- NodeJS architecture is not created
- Test case setup is done but test cases are not written. A few basic test cases have been written for two atomic components (LoadingIndicator and Message). Rigorous test cases yet to be written.
- Production deployment setup for Redis, is not created
- Complete theme setup is not done but created the scope
- Multiple languages are not added

## License

This project is licensed under the MIT license, Copyright (c) 2019 Amit Pal. For more information see LICENSE.md.
