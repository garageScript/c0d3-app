interface ReviewPageStorage {
  reviewText?: string
  isHidden?: boolean
}

export default function useReviewPageStorage(
  submissionId: number,
  line: number,
  content: ReviewPageStorage
) {
  const storedData = JSON.parse(
    localStorage.getItem('reviewPageStorage') || '{}'
  )
  if (!storedData[submissionId]) storedData[submissionId] = {}
  storedData[submissionId][line] = {
    ...storedData[submissionId][line],
    ...content
  }

  localStorage.setItem('reviewPageStorage', JSON.stringify(storedData))
  return storedData[submissionId][line]
}
