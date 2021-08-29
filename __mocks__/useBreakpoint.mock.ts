export const mockUseBreakpoint = jest.fn(() => false)
jest.mock('../helpers/useBreakpoint', () => mockUseBreakpoint)
