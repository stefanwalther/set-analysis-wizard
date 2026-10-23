# Set Analysis Wizard for QlikView & Qlik Sense

The Set Analysis Wizard helps QlikView and Qlik Sense authors build Set Analysis expressions without memorizing the syntax. The hosted version became one of the most used tools of its kind.

This repository holds the open-source effort around the wizard: source, tests, the legacy implementation and preserved feature branches.

## Contents

- `src/` - current source (`index.ts`)
- `test/` - specs and expression testers
- `legacy_1/` - the original ASP.NET implementation, including examples and unit tests
- `legacy_2/` - supporting files
- `docs/` - background notes on the project

## Branches of interest

- `keep/mvp-v2` - preserved work toward a new version of the wizard
- `keep/basic-project-setup` - preserved early project setup

## Background

The wizard started closed-source. Opening it up answered recurring requests: an offline-capable version, a Qlik Sense extension variant, and the freedom to build on it. See [docs/why.md](./docs/why.md) and [docs/about_project.md](./docs/about_project.md).

## Author

**Stefan Walther**

* [twitter/waltherstefan](http://twitter.com/waltherstefan)
* [github.com/stefanwalther](http://github.com/stefanwalther)
* [LinkedIn](https://www.linkedin.com/in/stefanwalther/)

## License

MIT
