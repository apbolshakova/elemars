# Elemars frontend

Elemars frontend part with configuration based on a Phaser 3 project template with ES6 support via [Webpack 4](https://webpack.js.org/) and [Babel 7](https://babeljs.io/)
that includes hot-reloading for development and production-ready builds with externals `phaser.min.js`.

## Available Commands

| Command            | Description                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| `npm install`      | Install project dependencies                                                                       |
| `npm run dev`      | Build project and open web server running project in development mode                              |
| `npm run dev-stat` | Generate `stat.json` of project with development mode                                              |
| `npm run dev-host` | Build project and open web server running project in development mode that run at host = "0.0.0.0" |
| `npm run stat`     | Generate `stat.json` of project with production mode                                               |
| `npm run build`    | Builds code bundle with production settings (minification, uglification, etc..)                    |
| `npm run start`    | Start server running project                                                                       |
