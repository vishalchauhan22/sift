export const getAtlassianIdHeader = ():
  | {
      'x-atlassian-auth-aaid'?: string;
    }
  | Record<string, never> => {
  const params = new URLSearchParams(window.location.search);
  const aaid = params.get('aaid') || (window as any).aaid;

  return aaid ? { 'x-atlassian-auth-aaid': aaid } : {};
};
