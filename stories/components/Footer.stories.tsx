import * as React from 'react'
import Footer from '../../components/Footer'

export default {
  components: Footer,
  title: 'Components/Footer'
}

export const _Footer: React.FC = () => <Footer />

export const _FooterWithClass: React.FC = () => (
  <Footer footerType="py-5 bg-white text-muted" />
)
