import * as React from 'react'
import { ReviewStatus } from '../../components/ChallengeMaterial'

export default {
  component: ReviewStatus,
  title: 'Components/ReviewStatus'
}

export const PassedStatus: React.FC = () => (
  <ReviewStatus status="passed" reviewerUserName="dan" />
)

export const OpenStatus: React.FC = () => (
  <ReviewStatus status="open" reviewerUserName="dan" />
)

export const NeedMoreWorkStatus: React.FC = () => (
  <ReviewStatus status="needMoreWork" reviewerUserName="dan" />
)
