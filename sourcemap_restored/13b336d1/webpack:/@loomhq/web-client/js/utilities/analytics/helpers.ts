export const isInvalidUserId = (id?: string | null): boolean =>
  Boolean(id && id.length > 20);
