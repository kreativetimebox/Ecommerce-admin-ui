// Strips the "API request failed with status N: " prefix @commerce/api-client adds,
// leaving just the server's real validation/error message for display to the user.
export function errorMessage(error: unknown, fallback: string): string {
  if (!(error instanceof Error)) return fallback;
  const match = error.message.match(/^API request failed with status \d+: (.+)$/);
  return match?.[1] ?? fallback;
}
