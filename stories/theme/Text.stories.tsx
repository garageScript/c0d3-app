import * as React from 'react'

import { Text } from '../../components/theme/Text'

export default {
  component: Text,
  title: 'Theme/Text'
}

export const Basic: React.FC = () => <Text>Basic Text</Text>

export const BoldText: React.FC = () => <Text bold>Bold Text</Text>

export const ColoredText: React.FC = () => (
  <>
    <Text color="white">Colored Text</Text>
    <Text color="lightgrey">Colored Text</Text>
    <Text color="darkgrey">Colored Text</Text>
    <Text color="black">Colored Text</Text>
  </>
)

export const SizedText: React.FC = () => (
  <>
    <Text size="xs">XSmall Text</Text>
    <Text size="sm">Small Text</Text>
    <Text size="md">Medium Text</Text>
    <Text size="lg">Large Text</Text>
    <Text size="xl">XLarge Text</Text>
  </>
)
