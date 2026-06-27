type ApiResponse<T> = {
  data: T
}

export const unwrap = <T>(payload: unknown): T => {
  return (payload as ApiResponse<T>).data
}
