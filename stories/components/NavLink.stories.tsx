import * as React from 'react'
import NavLink from '../../components/NavLink'

export default {
  component: NavLink,
  title: 'Components/NavLink'
}

export const Basic: React.FC = () => <NavLink path="/">Basic NavLink</NavLink>

export const BlankLink: React.FC = () => (
  <NavLink path="http://c0d3.com" external>
    Blank NavLink
  </NavLink>
)

export const ExternalLink: React.FC = () => (
  <NavLink path="/" external>
    External Link
  </NavLink>
)

export const StyledLink: React.FC = () => (
  <NavLink path="/" className="btn btn-primary">
    Styled Link
  </NavLink>
)

export const ActiveLink: React.FC = () => (
  <>
    <NavLink path="/" activePath={true} className="btn btn-primary">
      Active Link
    </NavLink>
    <NavLink path="/other" className="btn btn-primary">
      Non-Active Link
    </NavLink>
  </>
)
