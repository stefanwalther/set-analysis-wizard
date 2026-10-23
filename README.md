# Set Analysis Wizard for QlikView & Qlik Sense

The Set Analysis Wizard helps QlikView and Qlik Sense authors build Set Analysis expressions without memorizing the syntax. The hosted version became one of the most used tools of its kind.

This repository holds the open-source effort around the wizard, including the MVP rewrite as a React app.

## Run the app (MVP)

Requires Node 16 (see `.nvmrc`):

```sh
$ npm install
$ npm start      # dev server
$ npm run build  # production build
$ npm test       # test suite
$ npm run lint   # eslint
```

See also [docs/get-started.md](./docs/get-started.md) and [docs/development.md](./docs/development.md).

## Contents

- `src/` - the MVP React + TypeScript app (tests live next to the code)
- `docs/` - background notes on the project
- `keep/mvp-v2`, `keep/basic-project-setup` - preserved pre-merge branches

## Background

The wizard started closed-source. Opening it up answered recurring requests: an offline-capable version, a Qlik Sense extension variant, and the freedom to build on it. See [docs/why.md](./docs/why.md) and [docs/about_project.md](./docs/about_project.md).

## Author

**Stefan Walther**

* [twitter/waltherstefan](http://twitter.com/waltherstefan)
* [github.com/stefanwalther](http://github.com/stefanwalther)
* [LinkedIn](https://www.linkedin.com/in/stefanwalther/)

## License

MIT
