# Webnode

The webnode script runs on oyster-enabled websites, to replace or augment ad revenue. This script will run in the browsers of visitors to the website. Files on the tangle expire and must be periodically reattached. In the process of doing the reattachment, the webnode could find PRL which the brokernode will send to the website owner's ETH address. To obtain the genesis hashes that the webnode needs to begin a treasure hunt, it will do some PoW for brokernodes to assist with in-progress file uploads.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Clone the repo

```
git clone https://github.com/oysterprotocol/webnode.git
```

Modify webnode/src/config to point to development brokers, change API_ROOT_URL

Install dependencies

```
npm
```

Start web server

```
npm start
```

Navigate to url

[http://localhost:3000/](http://localhost:3000/)

## Running the tests

### Unit Tests (Jest)

Run Once

```
npm test
```

Run with watcher

```
npm test:watch
```

Run with code coverage

```
npm test:coverage
```

### Coding style tests

ES Lint is configured to run on compile, you will see warnings in the console in regards to code style. Eventually, we will start failing the build when code style warnings appear.

## Deploy

`npm build` bundles react and a script to initiate treasure hunting

## Built With

- [React](https://reactjs.org/) - The web framework used
- [Redux](https://redux.js.org/) - State Management
- [IOTA](https://github.com/iotaledger/iota.lib.js/) - IOTA Core API
- [Webpack](https://webpack.js.org/) - Build tools

## Project Status

- [Travis CI Builds](https://travis-ci.org/oysterprotocol/webnode) - Build Report
- [E2E Test Dashboard (Cypress)](https://www.cypress.io/) - E2E test results
- [Code Climate](https://codeclimate.com/github/oysterprotocol/webnode) - Reports code coverage, maintainability, and trends

## Contributing

Please read [CONTRIBUTING.md](https://google.com) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.
