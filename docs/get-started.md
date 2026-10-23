# Get Started

## Online Version

To start using the Set Analysis Wizard, just follow [this link](https://stefanwalther.github.io/set-analysis-wizard/)

## Using the Set Analysis Wizard Offline

There are several approaches how you can use the Set Analysis Wizard offline:

### Run the application locally (FROM DOCKER)

**Prerequisites:**

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed locally
  - Works on Windows, macOS & Linux   

**Step-by-Step Instruction**

Use your terminal window and run the following code:

```bash
$ docker run -t stefanwalther/set-analysis-wizard
``` 


### Run the application locally (FROM CODE)

**Prerequisites:**

- Some basic understanding on how to clone a Git repository and how to run some code locally
- Node.js installed locally
- Git installed locally

**Step-by-step instruction:**

- Clone the repository

```bash
$ git clone https://github.com/stefanwalther/set-analysis-wizard.git
```

- Then switch to the target directory

```bash
$ cd ./set-analysis-wizard
```

- Install dependencies

```bash
$ npm install
```

- Finally, run the application

```bash
$ npm run start:prod
```

This will start the production build of the application locally, typically served at [http://localhost:3000](http://localhost:3000)
