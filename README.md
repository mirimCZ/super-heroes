# Before you start
- if you are using Atom: apm install editorconfig es6-javascript autocomplete-flow javascript-snippets linter linter-eslint language-babel sort-lines
- use https://yarnpkg.com

# Install
- npm install
- npm start

# Notes
I decided to build this exercise around my dev stack heavily inspired by este. Goal to make this stack was a) to get more familiar with this topic b) to have stack that can run browser + electron apps (with possible extension to mobile, someday). Electron used to work two months ago, but after fresh npm install it fails, I have no luck in fixing it so far. Stack is not finished completely (especially since 50% of it = electron, broke :P), there is lot more I will need to solve, eg.: proper using of epics, better flow integration, router, testing, ...

You can find the important app parts in src/app/browser and src/app/components. Stack/component architecture is meant to follow Atomic Design principles, it is bit overkill for small application like this, but I wanted to stick with the pattern. JS code is following airbnb style guide standard, css naming is basically BEM.

Alltogether its far from perfect, but its a start :) if there are any questions or requests for comments, feel free to hit me up.

# Big thanks to authors of este.js
Daniel Steigerwald
Mike Grabowski
and the community

Check este out! It´s great: https://github.com/este/este
