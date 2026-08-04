// ad blockers sometimes block our analytics libs from loading
export const amplitudeLoaded = function (): boolean {
  return (
    window.amplitude != null && window.amplitude.getInstance().options != null
  );
};
