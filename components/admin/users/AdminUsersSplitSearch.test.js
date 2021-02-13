import { render } from '@testing-library/react'
import { AdminUsersSplitSearch } from './AdminUsersSplitSearch'

describe('AdminUsersSplitSearch component', () => {
  test('Should highlight full search hit', async () => {
    const { container } = render(AdminUsersSplitSearch('newbie', 'username'))
    expect(container).toMatchSnapshot()
  })
  test('Should highlight partial search hit', async () => {
    const { container } = render(AdminUsersSplitSearch('nameManeName', 'name'))
    expect(container).toMatchSnapshot()
  })
})
