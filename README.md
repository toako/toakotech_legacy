# express-react-boilerplate

This is a boilerplate template which holds a basic React app generated thorugh `create-react-app` and a basic Express API server. 

## Motivation

The problem is that I personally find it very hard to set up a simple React App with an Express Server all in one repository. This implementation hopes to bridge the gap so other people may use both React and Express in their projects. 

Through this implementation, not only are you able to quickly develop React and Express projects but this is quickly deployable to a service like Heroku. You may try it out if you wish to do so.

In addition, should you want to wish to deploy this to a service which provides hosting for front-end sites (such as GitHub Pages and Netlify) while hosting the backend separately, you may do so by using the environment variable `REACT_APP_PROJECT_SERVER` to reference the Express API Server in the React Project. Please refer to `.env.example` for the API URL format.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/mrsilver512/express-react-boilerplate) [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mrsilver512/express-react-boilerplate)

## Usage

Once this repository has been downloaded into your computer, run `npm install` to install all required dependencies. Depending on your internet connection, this may take a while (its more than 100mb).

All React code should be edited in the `client` directory beneath `src` while the Express code should be edited in `server` for simplicity. To prevent any breaking code, please do not change the filename of `src/index.js` as this is linked through `react-scripts`.

## Available Scripts

In the project directory, you can run:

### `npm start`

This initiates the Express server through `server.js` while opening a port at Port 5000 or whatever is specified through the `PORT` environment variable.

<b>Note:</b> If the browser shows an error message saying that it can't find anything in the `build` directory, please run `npm run build` in order to build the React project.

### `npm run dev`

This initiates a development server (initializing both the React Dev Server and the Express server) which reloads when a file has been saved.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
