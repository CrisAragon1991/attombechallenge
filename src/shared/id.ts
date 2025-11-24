export function generateId(): string {
  const uuid = crypto.randomUUID();
  return uuid;
}