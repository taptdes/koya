const API_URL = import.meta.env.VITE_API_URL || ''

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers ?? {}) },
    ...options,
  })
  const raw = await response.text()
  let data: (T & { error?: string }) | null = null
  try { data = JSON.parse(raw) as T & { error?: string } } catch { /* the proxy may return plain text while the API is offline */ }
  if (!response.ok) throw new Error(data?.error || 'Something went wrong')
  return data as T
}
