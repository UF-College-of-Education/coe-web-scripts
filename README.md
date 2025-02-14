# coe-web-scripts

This repo houses scripts used for UF College of Education websites. The idea is to create single reference point for scripts where we can provide more detailed documentation to collaborate more effectively. Here is an overview of the set up of this repo.

## Repo Structure

### JavaScript Files

Working versions of js files are housed in the src folder. This allows our build agent (called esbuild) to know where to find files to compile them in minified versions which then get stored in the dist folder. 

### CSS Files

CSS files are stored in the code_snippets folder. You can use code comments to explain the structure and usage of the code.

### Other Files

* package.json & package-lock.json - These files are generated automatically using npm. [Npm](https://docs.npmjs.com/) is used to manage packages of third-party code that adds functionality. Some configuration settings are held in package.json, but mostly you can leave this alone.

* node_modules - This is the folder that holds third party code managed through npm. This should only be updated on the command line/terminal using the one of the commands below. 

* .gitignore -  Files that should be ignored by git version control.

* .prettierrc - This is a config file for the Prettier VS Code extension. This plugin adjusts code saved according to the styles set in this file.

* .prettierignore - This file can be used to exclude files from Prettier rules.

## Running Builds

We have a build process that takes some of the source code we provide and transforms it to be production ready. Running a new build currently affects files in the src folder and the dist folder. You should only edit js files in the src folder, and then run a build to make them production ready. Here's how:

1. Open a terminal window in the folder where you want to run the build. This is easier if you just open the folder in VS Code and choose new terminal in the terminal menu.
2. Type ```npm run build``` in the terminal and hit the return key.

The build should run and spit out a list of the files generated if it's successful. 

## Other NPM Commands

Update all packages:

```npm update```

Update single package:

```npm i packageNameHere@latest```
