export const isInvalidUserId = (id: string): boolean =>
  Boolean(id && id.length > 20);
