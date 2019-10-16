# ue-checkin

> Urban Engine Checkin Accelerator

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


## Build/Run with Docker

### Build

```docker build -t openhsv-qr-image .```

### Run

```docker run --rm -it -u `id -u`:`id -g` -v "$PWD":/src --network="host"  openhsv-qr-image /bin/bash -c "./run.sh"```

NOTE: `--network="host"` binds the ports inside the container to your host's ports. This may not work in macOS or Windows.

For more information on this:
    
* [Official Docs](https://docs.docker.com/network/host/)
* [Stack Overflow answer](https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach)

This runs the `run.sh` script which builds and launches the production app.
