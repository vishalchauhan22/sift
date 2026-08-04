type Identifier = string | number;
type Entity = { id: string | number };

type EntityOrIdentifer = Entity | Identifier;

export function getIdentifier<T extends EntityOrIdentifer>(
  entityOrId: T
): T extends { id: infer U } ? U : T {
  if (typeof entityOrId === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return entityOrId.id as any;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return entityOrId as any;
}
