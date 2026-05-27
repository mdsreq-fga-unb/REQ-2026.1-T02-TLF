let _pendingDeleteId: string | null = null

export function setPendingDeleteId(id: string | null) {
  _pendingDeleteId = id
}

export function consumePendingDeleteId(): string | null {
  const id = _pendingDeleteId
  _pendingDeleteId = null
  return id
}
