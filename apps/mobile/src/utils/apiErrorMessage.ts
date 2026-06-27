import axios from 'axios'

function nestMessage(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined
  const raw = (data as { message?: unknown }).message
  if (typeof raw === 'string' && raw.trim() !== '') return raw
  if (Array.isArray(raw)) {
    const parts = raw.filter((m): m is string => typeof m === 'string')
    if (parts.length > 0) return parts.join(' ')
  }
  return undefined
}

function responseMessage(error: unknown): string | undefined {
  if (!error || typeof error !== 'object' || !('response' in error)) return undefined
  const response = (error as { response?: { data?: unknown } }).response
  return nestMessage(response?.data)
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const noResponse = !error.response
    if (
      noResponse &&
      (error.code === 'ERR_NETWORK' ||
        error.message === 'Network Error' ||
        error.code === 'ECONNREFUSED')
    ) {
      return 'Sem conexão com o servidor. Confira se o backend está rodando e se EXPO_PUBLIC_API_URL usa o IP da sua máquina na rede (não use localhost no celular). No emulador Android use 10.0.2.2 no lugar do localhost.'
    }
    if (error.code === 'ECONNABORTED') {
      return 'Tempo esgotado ao falar com o servidor. Tente de novo.'
    }
    const fromBody = nestMessage(error.response?.data)
    if (fromBody) return fromBody
    const status = error.response?.status
    if (status === 401) return 'Credenciais inválidas.'
    if (status === 404) return 'Serviço não encontrado. Confira o endereço da API.'
    if (status === 409) return 'Este recurso já existe ou está em conflito.'
    if (status != null && status >= 500) return 'Falha no servidor. Tente mais tarde.'
  }
  const fromResponse = responseMessage(error)
  if (fromResponse) return fromResponse
  if (error instanceof Error && error.message.trim() !== '') return error.message
  return fallback
}
