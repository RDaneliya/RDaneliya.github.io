/** Append a contact id if not already revealed (no duplicates). */
export function revealContact<T>(current: T[], id: T): T[] {
  return current.includes(id) ? current : [...current, id]
}
