import * as React from 'react'
import NavLink from '../../components/NavLink'

export default {
  component: NavLink,
  title: 'Components/NavLink'
}

export const Basic: React.FC = () => <NavLink path="/" text="Basic NavLink" />

export const BlankLink: React.FC = () => (
  <NavLink path="http://c0d3.com" text="Blank NavLink" external blank />
)

export const ExternalLink: React.FC = () => (
  <NavLink path="/" text="External Link" external />
)

export const StyledLink: React.FC = () => (
  <NavLink path="/" text="Styled Link" className="btn btn-primary" />
)

export const ActiveLink: React.FC = () => (
  <>
    <NavLink
      path="/"
      activePath="/"
      text="Active Link"
      className="btn btn-primary"
    />
    <NavLink
      path="/other"
      activePath="/"
      text="Non-Active Link"
      className="btn btn-primary"
    />
  </>
)
