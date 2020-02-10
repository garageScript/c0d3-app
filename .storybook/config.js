import { configure } from '@storybook/react'
import registerRequireContextHook from 'babel-plugin-require-context-hook/register'

registerRequireContextHook()

// automatically import all files ending in *.stories.tsx
configure(require.context('../stories', true, /\.stories\.tsx?$/), module)
