interface InternFormState {
  name: string
  score: number
  role: string
  isPresent: boolean
}

export function prepareInternRequest(data: InternFormState) {
  return {
    method: 'POST',
    body: JSON.stringify(data),
  }
}

export async function saveIntern(
  data: InternFormState,
  fetchFn: typeof fetch = fetch
): Promise<void> {
  const request = prepareInternRequest(data)

  await fetchFn('/api/interns', request)
}