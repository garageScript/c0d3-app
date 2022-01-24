/* Manual Mocking the remark-toc library because our jest and typscript
 * configuration doesn't use esm modules yet. After the package update,
 * remark-toc is a fully ESM module now and the reason this is being
 * manual mocked is because it is being mocked as a CommonJS module.
 * Here is the link: https://jestjs.io/docs/manual-mocks#mocking-node-modules
 */
const toc = () => {
  console.log('Manual Mocking of remark-toc module')
}

module.exports = {
  toc
}
