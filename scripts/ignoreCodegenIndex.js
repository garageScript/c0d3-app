const fs = require('fs')

fs.readFile('./graphql/index.tsx', 'utf-8', (err, data) => {
  if (err) throw new Error('Failed to read graphql/index.tsx')

  const newData = '// @ts-nocheck\n' + data

  fs.writeFile('./graphql/index.tsx', newData, (err, data) => {
    if (err) throw new Error('Failed to ignore graphql/index.tsx content')
  })
})
