export const checkCanSubmit = (comment: string): boolean => {
  if (!comment.trim()) {
    return false;
  }

  return true;
};
