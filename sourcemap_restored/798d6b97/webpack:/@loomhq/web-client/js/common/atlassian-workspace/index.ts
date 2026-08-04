import { useIsAtlassianManagedWorkspace } from '@js/hooks/useIsAtlassianManagedWorkspace';
interface Props {
  AtlassianUI?: JSX.Element | null;
  LoomUI?: JSX.Element | null;
}

export const AtlassianManaged = ({
  AtlassianUI = null,
  LoomUI = null,
}: Props): JSX.Element | null => {
  const isAtlassianManagedWorkspace = useIsAtlassianManagedWorkspace();

  return isAtlassianManagedWorkspace ? AtlassianUI : LoomUI;
};
