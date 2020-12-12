Bouncy Balls Documentation
==========================

Boucy balls is an HTML canvas showcase of an objects bouncing off the bootom of the screen
and coliding with each other.

The simple app is implemented in [Typescript](https://www.typescriptlang.org/) and uses [React](https://reactjs.org/).

Follow the [installation](#installation-and-build) instruction bellow to get the app up and running locally.

You can always check out the [demo available on Github](https://natemago.github.io/bouncy-balls/).

# API Docs

API reference documentation is available [here](https://natemago.github.io/bouncy-balls/docs/#/apidocs).

# Installation and build

## Set up

Clone this repository, the do an `npm install`:

```bash
git clone https://github.com/natemago/bouncy-balls.git
cd bouncy-balls
npm install
```

## Build

To build the full app, run:

```bash
npm run build
```

This should build the site itself and the related documentation in `docs`.

### Build the documentation

The documentation is in `docs` directory. It is in Markdown files, then served using [docsify](https://docsify.js.org/)



To build the documentation run:

```bash
npm run build:docs
```

## Testing

To run the tests, do:

```bash
npm run test
```

## Run for local development

Running for local development is easy, just do:

```bash
npm run start
```

and the app will be built and available on localhost.