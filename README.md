# Calculating Bolt Length

**Live site:** https://remustrapsa.github.io/Calculating-Bolt-Length/

A small React app that works out the bolt length you need for a joint. Enter the thickness and number of each part and washer, choose the bolt diameter, and the app adds an allowance for the nut and thread based on the diameter. It then rounds the total **up** to the next 1/4 inch.

Your last 7 results are saved in the browser, so they're still there after a page refresh. You can delete a result and undo the delete.

## How the length is calculated

```
length = (thickness1 × quantity1)
       + (thickness2 × quantity2)
       + (flat washer × quantity)
       + (bevel washer × quantity)
       + diameter allowance
```

The result is rounded up to the nearest 0.25 inch. The diameter allowance is:

| Bolt diameter | Allowance added |
| ------------- | --------------- |
| 1/2"          | 0.6875"         |
| 5/8"          | 0.875"          |
| 3/4"          | 1.0"            |
| 7/8"          | 1.125"          |
| 1"            | 1.25"           |

Flat washers default to 0.16" thick and bevel washers to 0.32". You can change both in the form.

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer, which comes with npm. Run `node --version` to see which version you have.
- [Git](https://git-scm.com/), if you're cloning the repository.

## Running the app

1. **Get the code**

   ```bash
   git clone https://github.com/RemusTrapsa/Calculating-Bolt-Length.git
   cd Calculating-Bolt-Length
   ```

2. **Install dependencies.** You only need to do this once, and again whenever `package.json` changes.

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

   The app opens at [http://localhost:3000](http://localhost:3000). The page reloads automatically when you save changes. Press `Ctrl+C` in the terminal to stop the server.

## Other commands

| Command         | What it does                                                    |
| --------------- | --------------------------------------------------------------- |
| `npm test`      | Runs the tests in watch mode. Press `q` to quit.                |
| `npm run build` | Creates an optimized production build in the `build/` folder.   |

To serve the production build on your own machine:

```bash
npm run build
npx serve -s build
```

## Project structure

```
src/
  App.tsx                     Main component: calculation, saved history, undo
  components/
    InputForm/InputForm.jsx   Input form for thicknesses, washers and diameter
    Info/Info.jsx             Card that shows one calculated result
  helpers/localStorage.js     Saves and loads data in the browser's localStorage
```

## Troubleshooting

- **`npm start` says port 3000 is already in use.** Answer `Y` to run on another port, or stop whatever else is using port 3000.
- **Errors during `npm install`, or "Cannot find module" errors.** Delete `node_modules` and `package-lock.json`, then run `npm install` again.
- **Old or odd results in the history.** The history is stored in your browser's localStorage. To clear it, open the browser dev tools, go to *Application → Local Storage*, and delete the `data` and `lastState` keys.

## Built with

React 18, TypeScript, [Create React App](https://create-react-app.dev/) (react-scripts 5) and [Materialize CSS](https://materializecss.com/).
