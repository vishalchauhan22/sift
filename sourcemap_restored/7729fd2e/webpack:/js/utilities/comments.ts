export const getTotalCountOfCommentsAndChildrenComments = (
  comments: Array<unknown & { children_comments: unknown[] }> | undefined
): number => {
  return (
    comments?.reduce((acc, curr) => {
      return acc + 1 + (curr.children_comments?.length ?? 0);
    }, 0) ?? 0
  );
};
