export const mockUseBreakpoint = jest.fn(() => false)
jest.mock('../helpers/useBreakpoint', () => ({
  __esModule: true,
  default: mockUseBreakpoint
}))
