export const isFullScreen = (): boolean => {
  const doc = document as any;

  return doc.fullscreenElement || doc.webkitIsFullScreen;
};
