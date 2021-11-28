# react-template

## Features

- Use **Webpack 5** for bundler
- Use **Babel** for **Javascript** compiler
- Use **Eslint** && **Prettier** for linter
- Support **Fast Refresh** of **React** (`v17+`)
- No need to do `import React from 'react'` since `@babel/preset-react` has injected **React** to scripts for you
- Support **sass** (Replace `node-sass` with `dart-sass` for [LibSass is Deprecated](https://sass-lang.com/blog/libsass-is-deprecated)), **Postcss** && **Autoprefixer** for applying prefixes to support browsers you want
- Run the project in development mode and monitor production deployment through **Docker**, you can understand the pipeline of deployment clearly
- Use **Jest** for unit test, you can make it a **TDD** project to level up your personal skills

## Highly recommend to use `pnpm` as a package manager

## Set up project

```bash
$ pnpm setup
```

## Install dependencies

```bash
$ pnpm install
```

## Start up development

```bash
$ pnpm start
```

### Then open http://localhost:8080/ to see your app

## Build for deploy

```bash
$ pnpm build
```

## Check code formation

```bash
$ pnpm lint
```

## Lint to correct code formation

```bash
$ pnpm lint:fix
$ pnpm prettify
```

## Unit test

> Use `jest` for tesing but highly recommend to use `mocha` + `chai`.

### For test running

```bash
$ pnpm test
```

> It is a running with `watch` mode, you can change to other modes.

## Docker for development

```bash
$ pnpm docker:dev
```

### If you have not installed node && npm, try the command below

```bash
$ docker build -f Dockerfile.dev -t dev:builder . && docker run -v ${PWD}:/app -v /app/node_modules -p 8080:8080 --rm dev:builder
```

#### Then open http://localhost:8080/ to see your app

## Docker for deploy

```bash
$ pnpm docker:deploy
```

### If you have not installed node && npm, try the command below

```bash
$ docker build -f Dockerfile.prod -t prod:builder . && docker run -it -p 80:80 --rm prod:builder
```

#### Then open http://localhost/ to see your app
