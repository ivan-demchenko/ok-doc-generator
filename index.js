#!/usr/bin/env node

const program = require('commander');
const generateTree = require('./generate-tree');
const chalk = require('chalk');

program
  .version(require('./package.json').version)
  .usage('[options]')
  .option('-s, --source-dir <source>', 'Source directory')
  .option('-o, --output <out>', 'Resulting JSON file path')
  .option('-i, --interactive', 'Run interactive mode')
  .parse(process.argv);

if (program.interactive) {
  require('./interactive');
  return;
}

console.log(chalk.yellow('Generating the tree from:'));
console.log(chalk.yellow.bold('  > ' + program.sourceDir));

generateTree({src: program.sourceDir, dest: program.output});

console.log(chalk.green('Done! You can now find JSON file at:'));
console.log(chalk.green.bold('  > ' + program.output));
