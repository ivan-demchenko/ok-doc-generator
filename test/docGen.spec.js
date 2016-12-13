const assert = require('chai').assert;
const resolve = require('path').resolve;
const generateTree = require('../generate-tree');

describe('Generate a tree', () => {

  it('should return JSON-tree for the propely structured dir structure', (done) => {

    const tree = generateTree(resolve(__dirname, './mocks/scenario1'));

    const treeMock = JSON.stringify({
      id: 2,
      name: "The Library",
      path: resolve(__dirname, "mocks/scenario1"),
      subs: [ { id: 3,
                name: "Components section",
                path: resolve(__dirname, "mocks/scenario1/components"),
                subs: [ { id: 4,
                          name: "The Component",
                          path: resolve(__dirname, "mocks/scenario1/components/the-component"),
                          subs: [] } ] },
              { id: 3,
                name: "Comming soon...",
                path: resolve(__dirname, "mocks/scenario1/empty-info"),
                subs: [] } ] }
    );

    assert.equal(JSON.stringify(tree), treeMock);

    done();

  });

  it('should return JSON-tree for the almost empty docs', (done) => {

    const tree = generateTree(resolve(__dirname, './mocks/scenario2'));

    const treeMock = JSON.stringify({
      id: 2,
      name: "The Library",
      path: resolve(__dirname, "mocks/scenario2"),
      subs: [ ]
    });

    assert.equal(JSON.stringify(tree), treeMock);

    done();

  });

});
