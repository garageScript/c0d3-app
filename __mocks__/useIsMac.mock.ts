export const mockUseIsMac = jest.fn(() => false)
jest.mock('../helpers/useIsMac', () => ({
  __esModule: true,
  default: mockUseIsMac
}))
