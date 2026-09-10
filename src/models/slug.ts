// Live-sanitizes free text into the lowercase-hyphenated format the backend requires
// (`/^[a-z0-9]+(?:-[a-z0-9]+)*$/`), so an invalid slug can never be typed in the first place.
export function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
