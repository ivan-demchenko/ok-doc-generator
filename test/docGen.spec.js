const assert = require('chai').assert;
const resolve = require('path').resolve;
const generateTree = require('../lib/generate-tree');

describe('Generate a tree', () => {

  it('should return JSON-tree for the propely structured dir structure', (done) => {

    const tree = generateTree(__dirname, './mocks/scenario1');

    const treeMock = JSON.stringify({
      name: 'The Library',
      path: 'mocks/scenario1',
      subs: [ { name: 'Components section',
                path: 'mocks/scenario1/components',
                subs: [ { name: 'The Component',
                          path: 'mocks/scenario1/components/the-component',
                          subs: [] } ] },
              { name: 'Comming soon...',
                path: 'mocks/scenario1/empty-info',
                subs: [] } ] }
    );

    assert.equal(JSON.stringify(tree), treeMock);

    done();

  });

  it('should return JSON-tree for the almost empty docs', (done) => {

    const tree = generateTree(__dirname, './mocks/scenario2');

    const treeMock = JSON.stringify({
      name: 'The Library',
      path: 'mocks/scenario2',
      subs: [ ]
    });

    assert.equal(JSON.stringify(tree), treeMock);

    done();

  });

});
