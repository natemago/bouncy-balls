:balloon: Bouncy Balls :ballon:
===============================

Bouncing balls all over screen.

![Build](https://github.com/natemago/bouncy-balls/workflows/build-and-test/badge.svg)
![Deploy to Github Pages](https://github.com/natemago/bouncy-balls/workflows/Build%20and%20Deploy%20to%20Github%20Pages/badge.svg)
[![Visit the demo site](https://img.shields.io/badge/Demo-see%20the%20demo-ff69b4)](https://natemago.github.io/bouncy-balls/)
[![Read the documentation](https://img.shields.io/badge/Documentation-Read%20the%20documentation-blue)](https://natemago.github.io/bouncy-balls/docs/)

![Bouncy Bouncy Balls](bouncy-balls-demo.gif)

# Set up

Clone this repository, the do an `npm install`:

```bash
git clone https://github.com/natemago/bouncy-balls.git
cd bouncy-balls
npm install
```

# Build

To build the full app, run:

```bash
npm run build
```

This should build the site itself and the related documentation in `docs`.

## Build the documentation

The documentation is in `docs` directory. It is in Markdown files, then served using [docsify](https://docsify.js.org/)



To build the documentation run:

```bash
npm run build:docs
```

# Testing

To run the tests, do:

```bash
npm run test
```

# Run for local development

Running for local development is easy, just do:

```bash
npm run start
```

and the app will be built and available on localhost.