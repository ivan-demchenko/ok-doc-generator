const fs = require('fs');
const path = require('path');
const compose = require('ramda/src/compose');
const curryN = require('ramda/src/curryN');
const curry = require('ramda/src/curry');
const invoker = require('ramda/src/invoker');
const map = require('ramda/src/map');
const filter = require('ramda/src/filter');
const fastmatter = require('fastmatter');

// Helpers

const isDir = compose(invoker(0, 'isDirectory'), fs.statSync);

const isFile = compose(invoker(0, 'isFile'), fs.statSync);

const joinPaths = curryN(2, path.join);



/**
 * Build a partial JSON
 * @param  {number}  id
 * @param  {string}  src
 * @return {Promise}
 */
function buildSection(id, src) {
  const readmeFile = path.join(src, 'readme.md');

  if (!isFile(readmeFile)) {
    throw 'Missing readme.md file in ' + src;
  }

  const fm = fastmatter(fs.readFileSync(readmeFile, {encoding: 'utf-8'}));

  return {
    id: ++id,
    name: fm.attributes.name,
    path: src
  };
}



/**
 * Recursively generates tree of dir
 * @param  {number}  id counter
 * @param  {string}  src input
 * @return {Promise}
 */
const traverse = curry((id, src) => {
  let res = buildSection(++id, src);
  const dirContents = fs.readdirSync(src);
  res.subs = dirContents.indexOf('demos') == -1
    ? compose(map(traverse(id)), filter(isDir), map(joinPaths(src)))(dirContents)
    : [];
  return res;
});



/**
 * Takes the directory and returns the JSON
 * @param  {string} docsPath
 * @return {Promise}
 */
module.exports = docsPath => traverse(0, path.resolve(docsPath));
