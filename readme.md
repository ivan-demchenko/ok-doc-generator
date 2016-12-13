# Docs View Generator

Effortless and live documentation generation.

This project is a satellite for the [docsViewElm](https://github.com/raqystyle/docsViewElm) project.

### How to run

```
npm i
./index.js -h
```

### Why

Components libraries, pattern labs, etc. These are all tree like way to organise your code.

The main goal of this project is to generate a JSON-tree structure from your directories.

You only need to know a simple convention:
 - each directory of your documentation should contain a readme file. Even the simplest one just with front-matter
 - demos for components should go into `demo` directory

So, basically, the docs structure for your project might look like the following:

```
.gitignore
package.json
src
tests
docs
  - atoms
    - atom 1
      - demo
        - demo1.html
        - demo2.html
      - atom1.scss
      - readme.md
    - atom 2
      - demo
        - demo1.html
        - demo2.html
      - atom2.scss
      - readme.md
    - readme.md
  - molecules
    - ...
    - readme.md
  - components
    - ...
    - readme.md
  - readme.md
```
