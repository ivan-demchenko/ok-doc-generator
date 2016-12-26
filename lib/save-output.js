const fs = require('fs');
const path = require('path');
const curry = require('ramda/src/curry');

module.exports = curry((outputPath, tree) => {
  fs.writeFileSync(
    path.resolve(outputPath), JSON.stringify(tree, null, 2), { encoding: 'utf8' }
  );
});
