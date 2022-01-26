/* Manual Mocking the rehype-autolink-headings library because our jest and typscript
 * configuration doesn't use esm modules yet. After the package update,
 * rehype-autolink-headings is a fully ESM module now and the reason this is being
 * manual mocked is because it is being mocked as a CommonJS module.
 * Here is the link: https://jestjs.io/docs/manual-mocks#mocking-node-modules
 */
const autolink = () => {
  console.log('Manual Mocking of rehype-autolink-headings module')
}

module.exports = {
  autolink
}
