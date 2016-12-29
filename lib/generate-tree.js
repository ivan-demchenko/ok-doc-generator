const fs = require('fs');
const path = require('path');
const R = require('ramda');
const fastmatter = require('fastmatter');

// Helpers

const joinPaths =
  R.curryN(2, path.join);

const isDir =
  R.compose(R.invoker(0, 'isDirectory'), fs.statSync);

const idDirByBase =
  basePath => R.compose(isDir, joinPaths(basePath));

const isFile =
  R.compose(R.invoker(0, 'isFile'), fs.statSync);



/**
 * Build a partial JSON
 * @param  {string}  basePath
 * @param  {string}  currDir
 */
function buildSection(basePath, currDir) {
  const readmeFile =
    path.join(basePath, currDir, 'readme.md');

  if (!isFile(readmeFile)) {
    throw 'Missing ' + readmeFile;
  }

  const fm = fastmatter(fs.readFileSync(readmeFile, {encoding: 'utf-8'}));

  return {
    name: fm.attributes.name,
    path: currDir
  };
}

/**
 * Recursively generates tree of dir
 * @param  {string}  basePath
 * @param  {string}  currDir
 */
const traverse = R.curry((basePath, currDir) => {
  const section = buildSection(basePath, currDir);
  const subs = R.compose(
    R.objOf('subs'),
    R.cond([
      [ R.compose(R.not, R.contains('demos'))
      , R.compose(
          R.map(traverse(basePath)),
          R.filter(idDirByBase(basePath)),
          R.map(joinPaths(currDir))
        )
      ],
      [R.T, R.always([])]
    ]),
    fs.readdirSync,
    joinPaths
  )(basePath, currDir);
  return R.merge(section, subs);
});



/**
 * Takes the directory and returns the JSON
 * @param  {string} docsPath
 */
module.exports = (callerPath, docsRoot) => traverse(callerPath, path.join('./', docsRoot));
