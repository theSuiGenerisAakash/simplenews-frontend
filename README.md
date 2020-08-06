# SimpleNews(Frontend) - All your news at one place!

> This project was made with the React Webpack Typescript Starter template available [here](https://github.com/vikpe/react-webpack-typescript-starter)

This project uses these distinctive libraries:

-   **[React](https://facebook.github.io/react/)** (16.x)
-   **[Webpack](https://webpack.js.org/)** (4.x)
-   **[Typescript](https://www.typescriptlang.org/)** (3.x)
-   **[Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)** ([React Hot Loader](https://github.com/gaearon/react-hot-loader))
-   Production build script (Webpack)
-   Image loading/minification ([Image Webpack Loader](https://github.com/tcoopman/image-webpack-loader))
-   [SASS](http://sass-lang.com/) support
-   Code linting ([ESLint](https://github.com/eslint/eslint)) and formatting ([Prettier](https://github.com/prettier/prettier))
-   Test framework ([Jest](https://facebook.github.io/jest/))
-   React-Modal
-   React-Toastify
-   React-Loader-Spinner
-   Moment.js

## Installation

1. Clone/download repo
2. Make sure you have node version `12.18.0` or higher.
3. `yarn install` (or `npm install` for npm)

## Usage

> According to your backend server's location, please change `env.apiHost` in `package.json` and `webpack/dev.js`/`webpack/prod.js`
> to inject base API url as per your convenience.

#### Development

> The dev backend proxy is also configured at `webpack/dev.js`. You can easily modify according to your needs from there.

`yarn run start-dev`

-   Build app continuously (HMR enabled)
-   App served @ `http://localhost:8080`

#### Production

`yarn run start-prod`

-   Build app once (HMR disabled) to `/dist/`
-   App served @ `http://localhost:3000`

---

#### All commands

| Command               | Description                                                                   |
| --------------------- | ----------------------------------------------------------------------------- |
| `yarn run start-dev`  | Build app continuously (HMR enabled) and serve @ `http://localhost:8080`      |
| `yarn run start-prod` | Build app once (HMR disabled) to `/dist/` and serve @ `http://localhost:3000` |
| `yarn run build`      | Build app to `/dist/`                                                         |
| `yarn run test`       | Run tests                                                                     |
| `yarn run lint`       | Run linter                                                                    |
| `yarn run lint --fix` | Run linter and fix issues                                                     |
| `yarn run start`      | (alias of `yarn run start-dev`)                                               |

**Note**: replace `yarn` with `npm` in `package.json` if you use npm.
