# Firefighter Shift Monitoring

Webapp to register shifts on firefighters headquarters.

## Development

For dependencies:
```
yarn install
```

To run the server and the client: 
```
yarn dev
```
The script above will run the express server and the webpack-dev-server at the sime time. 
The server is at `localhost:3000` but the client code is actually served at `localhost:8080`. 
Use the second address to have access to hot module reloading.

Some considerations:
* CORS is enabled in development and disabled in production, for safety. During development we need cors to access the api from a
different host.
* The client has hot reloading via webpack's HMR and React Hot Loader. The server doesn't have hot reloading, but we use nodemon to
restart the server when we change code.

To test the app run:
```
yarn test
```
