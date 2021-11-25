# **SMSwithoutborders Admin**

### Setup Guide

Quick start guide to get the dashboard *running*:

### Install dependencies

```
yarn install
```
### Set env variables

Create a .env file from the example.env template

```
cp example.env .env
```

.env file contains all modifiable system variables. Below are the defaults

```
SASS_PATH="node_modules" /* used by the internal sass compiler */
REACT_APP_GATEWAY_API_URL="http://localhost:5000" /* address for your local gateway */
PORT=18500  /* local development port */
```
### Start development server

```
yarn start
```

Open [http://localhost:18500](http://localhost:18500) to view dashboard in the browser.

The page will reload if you make changes.

You will also see any lint errors in the console.

### Build for production

```
yarn build
```

## Open source tools used

Here are some of the tools and libraries we use for development

- [Carbon Design System](https://carbondesignsystem.com)

- [Carbon Components](https://github.com/carbon-design-system/carbon)

- [Carbon Charts](https://github.com/carbon-design-system/carbon-charts)

- [Carbon Icons](https://github.com/carbon-design-system/carbon-icons)

- [React Icons](https://react-icons.github.io/react-icons)

- [React Router](https://reactrouter.com)






