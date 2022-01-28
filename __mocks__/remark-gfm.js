/* Manual Mocking the remark-gfm library because our jest and typscript
 * configuration doesn't use esm modules yet. After the package update,
 * remark-gfm is a fully ESM module now and the reason this is being
 * manual mocked is because it is being mocked as a CommonJS module.
 * Here is the link: https://jestjs.io/docs/manual-mocks#mocking-node-modules
 */
const gfm = () => {
  console.log('Manual Mocking remark-gfm module')
}

module.exports = {
  gfm
}
