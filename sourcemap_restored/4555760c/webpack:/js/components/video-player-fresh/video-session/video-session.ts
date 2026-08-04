import { v4 as uuidv4 } from 'uuid';

interface Props {
  videoId: string;
  trimId?: number | null;
}

export interface VideoSessionData {
  id: string;
  videoId: string;
  trimId: number | null;
}

export function createVideoSessionData({
  videoId,
  trimId,
}: Props): VideoSessionData {
  return {
    id: uuidv4(),
    videoId,
    trimId: trimId || null,
  };
}
