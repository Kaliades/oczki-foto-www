/**
 * Hard-cap CMS-backed copy to a max string length (Payload `maxLength` / UTF-16).
 * Appends an ellipsis only when the source exceeds the cap.
 */
export function truncateWithEllipsis(text: string, maxChars: number): string {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (!cleaned) return ''
  if (maxChars <= 0) return ''
  if (cleaned.length <= maxChars) return cleaned

  return `${cleaned.slice(0, maxChars).trimEnd()}…`
}
