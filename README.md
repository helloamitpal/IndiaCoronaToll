# IndiaCoronaToll

This application portrays COVID-19 spread, recovery status in India. The Govt data has been used in this application to depict various charts. API details are available below.

[GOVT CORONA dataset](https://api.covid19india.org/)

# Those who wants to contribute in this development

This is my personal project but I would encourage everyone who wants to contribute to make it better. Please feel free to drop me an email at amithellopublic@gmail.com that I could grant access to this repo.

## Primary Tech stack

- **React**: The primary UI library
- **Redux**: Redux data flow
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
- **Webpack**: Webpack module bundler
- **Material icons**: [link](https://material.io/resources/icons/?icon=search&style=baseline)

## Quick start: How to run this template

```sh
$ git clone https://github.com/amit040386/IndiaCoronaToll.git
$ cd IndiaCoronaToll
$ npm install
$ npm run start
```

Default port number is 7009
Localhost URL: http://localhost:7009

**NOTE**: To change the port, create a .env in root folder and add your port number as follows.

```javascript
PORT=4566
```

or change the port number in this file: server/util/port.js

**NOTE**: If any new locale texts are added, please re-execute the npm start command

## License

This project is licensed under the MIT license, Copyright (c) 2019 Amit Pal. For more information see LICENSE.md.
