import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import { ConsolidatedEditVideoFragmentDoc } from './ConsolidatedEditVideoFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditGetVideoQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ConsolidatedEditGetVideoQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo', id: string, message: string | null } | { __typename: 'RegularUserVideo', id: string, source_duration: number | null, playable_duration: number | null, name: string, personalizationType: Types.VideoPersonalizationType | null, boundedTrimRanges: Array<{ __typename: 'VideoTrimRange', from: number, to: number }>, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null }, boundedCanvasOverlays: { __typename: 'VideoCanvasOverlays', boundedCanvasTextOverlays: Array<{ __typename: 'VideoCanvasTextOverlay', canvasOverlayId: string, canvasZIndex: number, canvasType: string, lowerMs: number, upperMs: number, textOffsetX: number, textOffsetY: number, textSizeX: number, textSizeY: number, text: string, textColor: string, textFontFamily: string, textFontSize: number, textPadding: number, textLineHeight: number, textLetterSpacing: number, textAlign: string, textShadowColor: string, textShadowBlurRadius: number, textShadowOffsetX: number, textShadowOffsetY: number, textShadowOpacity: number, boxBackgroundColor: string, boxBackgroundCornerRadius: number, boxShadowColor: string, boxShadowBlurRadius: number, boxShadowOffsetX: number, boxShadowOffsetY: number, boxShadowOpacity: number, desiredTextWidth: number | null } | null> | null, boundedCanvasBoxOverlays: Array<{ __typename: 'VideoCanvasBoxOverlay', canvasOverlayId: string, canvasZIndex: number, canvasType: string, lowerMs: number, upperMs: number, boxOffsetX: number, boxOffsetY: number, boxSizeX: number, boxSizeY: number, boxBorderColor: string, boxBackgroundColor: string, boxCornerRadius: number, boxBorderThickness: number, boxShadowColor: string, boxShadowBlurRadius: number, boxShadowOffsetX: number, boxShadowOffsetY: number, boxShadowOpacity: number } | null> | null, boundedCanvasArrowOverlays: Array<{ __typename: 'VideoCanvasArrowOverlay', canvasOverlayId: string, canvasZIndex: number, canvasType: string, lowerMs: number, upperMs: number, arrowBaseOffsetX: number, arrowBaseOffsetY: number, arrowHeadOffsetX: number, arrowHeadOffsetY: number, arrowColor: string, arrowThickness: number, arrowWingLength: number, arrowWingAngleDegrees: number, arrowShadowColor: string, arrowShadowBlurRadius: number, arrowShadowOffsetX: number, arrowShadowOffsetY: number, arrowShadowOpacity: number } | null> | null }, clips: Array<{ __typename: 'VideoClipDetails', id: string, name: string | null, source_duration: number | null, playable_duration: number | null, source_video_id: string | null, currentUserIsSourceOwner: boolean, isSourceVideoMeetingRecording: boolean, isSourceVideoExternalUpload: boolean, video_properties: { __typename: 'VideoProperties', width: number | null, height: number | null, durationMs: number | null } }>, waveformData: Array<{ __typename: 'ClipWaveformData', clipId: string | null, status: Types.WaveformGenerationStatus | null, sourceDurationMs: number | null, peaks: Array<number> | null }>, textReplacements: Array<{ __typename: 'VideoTextReplacement', id: string, clipId: string, selectionLowerMs: number, selectionUpperMs: number, selectionReplacementText: string, audioGenerationStatus: Types.AudioGenerationStatus }>, editZoomInstructions: Array<{ __typename: 'EditZoomInstructions', id: string, clipId: string, videoId: string, zoomType: Types.ZoomType, zoomVersion: string, zoomCreatedBy: Types.ZoomCreatedBy, zoomLowerMs: number, zoomUpperMs: number, zoomLevel: number, createdAt: string, updatedAt: string }> } | { __typename: 'VideoPasswordMissingOrIncorrect', id: string, message: string | null } | null };


export const ConsolidatedEditGetVideoDocument = gql`
    query ConsolidatedEditGetVideo($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      ...ConsolidatedEditVideo
    }
    ... on PrivateVideo {
      id
      message
    }
    ... on VideoPasswordMissingOrIncorrect {
      id
      message
    }
  }
}
    ${ConsolidatedEditVideoFragmentDoc}`;

/**
 * __useConsolidatedEditGetVideoQuery__
 *
 * To run a query within a React component, call `useConsolidatedEditGetVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditGetVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsolidatedEditGetVideoQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useConsolidatedEditGetVideoQuery(baseOptions: Apollo.QueryHookOptions<ConsolidatedEditGetVideoQuery, ConsolidatedEditGetVideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConsolidatedEditGetVideoQuery, ConsolidatedEditGetVideoQueryVariables>(ConsolidatedEditGetVideoDocument, options);
      }
export function useConsolidatedEditGetVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConsolidatedEditGetVideoQuery, ConsolidatedEditGetVideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConsolidatedEditGetVideoQuery, ConsolidatedEditGetVideoQueryVariables>(ConsolidatedEditGetVideoDocument, options);
        }
export type ConsolidatedEditGetVideoQueryHookResult = ReturnType<typeof useConsolidatedEditGetVideoQuery>;
export type ConsolidatedEditGetVideoLazyQueryHookResult = ReturnType<typeof useConsolidatedEditGetVideoLazyQuery>;
export type ConsolidatedEditGetVideoQueryResult = Apollo.QueryResult<ConsolidatedEditGetVideoQuery, ConsolidatedEditGetVideoQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;