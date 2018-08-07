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
The script above will run the express server and webpack in watch mode at the sime time.
You can then access the app `localhost:3000`

If you want to run using `react-hot-loader` you will have to run `yarn dev-hot` and access the app at `localhost:8080`. This serves the app from a custom server of `webpack-dev-server`, so if you are developing some backend code you might want to run the server without the `hot` mode.

Some considerations:
* CORS is enabled in development and disabled in production, for safety. During development we need cors to access the api from a
different host.
* The client has hot reloading via webpack's HMR (when using `yarn dev-hot`) and React Hot Loader. The server doesn't have hot reloading, but we use nodemon to
restart the server when we change code.

To test the app run:
```
yarn test
```
