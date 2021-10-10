interface ReviewPageStorage {
  content?: string
  isHidden?: boolean
}

export default function useReviewPageStorage(
  submissionId: number,
  line: number,
  updateStorage: ReviewPageStorage
) {
  const storedData = JSON.parse(
    localStorage.getItem('reviewPageStorage') || '{}'
  )
  if (!storedData[submissionId]) storedData[submissionId] = {}
  storedData[submissionId][line] = {
    ...storedData[submissionId][line],
    ...updateStorage
  }

  localStorage.setItem('reviewPageStorage', JSON.stringify(storedData))
  return storedData[submissionId][line]
}
