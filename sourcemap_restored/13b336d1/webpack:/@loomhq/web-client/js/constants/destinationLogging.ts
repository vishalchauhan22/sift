export enum RecommendationVariant {
  HEURISTIC = 'heuristic',
  MODEL = 'model',
  SIMILAR_VIDEOS = 'Similar Videos',
}

export enum CardVariant {
  INLINE_PLAYER = 'inline_player',
  LINK_TO_SHARE_PAGE = 'link_to_share_page',
  LEGACY_VIDEOS_GRID_CARD = 'legacy_videos_grid_card',
}

export type VideoSuggestionContextType = {
  recommendationType: RecommendationVariant;
  recommendationSystemName: string;
} | null;

export const TAG_PAGE = 'tag_page';
export const PROFILE_PAGE = 'profile_page';
export const PROFILE_CARD = 'profile_card';
