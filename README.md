# pokedex
pokedex style web application

# Running the application

## Clone Repository

```sh
git clone https://github.com/rwitam-b/pokedex.git
```

## Install dependencies

```sh
npm install
```

## Building deployables

```sh
npm run build
```

## Running

You can use any static server or [serve](https://www.npmjs.com/package/serve)
```sh
npm install --global serve
```

Run serve pointed to the `build` folder to run your app.

```sh
serve -s build
```

It should be available on [http://localhost:3000/](http://localhost:3000/)