const path = require('path');
const inquirer = require('inquirer');
const generateTree = require('./generate-tree');
const fs = require('fs');

inquirer
.prompt([
  {
    type: 'input',
    name: 'src',
    message: 'Please, specify the directory for which the documenation should be generated:',
    validate: ans => {
      const parsed = path.parse(ans);
      if (parsed.ext) {
        return 'It must the path to the directory';
      }
      return true;
    }
  }, {
    type: 'input',
    name: 'dest',
    message: 'Please, specify the path to the output JSON file:',
    validate: ans => {
      const parsed = path.parse(ans);
      if (!parsed.ext || parsed.ext !== '.json') {
        return 'You should specify the correct path to the JSON file';
      }
      return true;
    }
  }
])
.then(generateTree)
.then(_ => console.log('Done, JSON file has been generated successfully!'))
.catch(console.error.bind(console));
