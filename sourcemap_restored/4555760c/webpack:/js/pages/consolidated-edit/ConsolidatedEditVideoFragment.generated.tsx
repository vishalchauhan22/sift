import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import { ConsolidatedEditVideoNameFragmentDoc } from './header/editable-video-name/ConsolidatedEditVideoName.generated';
import { ConsolidatedEditVideoClipsFragmentDoc } from './waveform-editor/clips-waveform/clips-layer/ConsolidatedEditGetClips.generated';
import { ConsolidatedEditVideoClipDimensionsFragmentDoc } from './common/use-clips-dimensions/ConsolidatedEditGetClipDimensions.generated';
import { ConsolidatedEditVideoWaveformFragmentDoc } from './waveform-editor/clips-waveform/ConsolidatedEditWaveformData.generated';
import { ConsolidatedEditVideoHasVariablesFragmentDoc } from './waveform-editor/waveform-controls/ConsolidatedEditGetVideoHasVariables.generated';
import { ConsolidatedEditVideoTextReplacementsFragmentDoc } from './common/use-video-text-replacements/ConsolidatedEditGetVideoTextReplacements.generated';
export type ConsolidatedEditVideoTrimsFragment = { __typename: 'RegularUserVideo', id: string, source_duration: number | null, playable_duration: number | null, boundedTrimRanges: Array<{ __typename: 'VideoTrimRange', from: number, to: number }>, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null } };

export type ConsolidatedEditCanvasTextOverlayFragment = { __typename: 'VideoCanvasTextOverlay', canvasOverlayId: string, canvasZIndex: number, canvasType: string, lowerMs: number, upperMs: number, textOffsetX: number, textOffsetY: number, textSizeX: number, textSizeY: number, text: string, textColor: string, textFontFamily: string, textFontSize: number, textPadding: number, textLineHeight: number, textLetterSpacing: number, textAlign: string, textShadowColor: string, textShadowBlurRadius: number, textShadowOffsetX: number, textShadowOffsetY: number, textShadowOpacity: number, boxBackgroundColor: string, boxBackgroundCornerRadius: number, boxShadowColor: string, boxShadowBlurRadius: number, boxShadowOffsetX: number, boxShadowOffsetY: number, boxShadowOpacity: number, desiredTextWidth: number | null };

export type ConsolidatedEditCanvasBoxOverlayFragment = { __typename: 'VideoCanvasBoxOverlay', canvasOverlayId: string, canvasZIndex: number, canvasType: string, lowerMs: number, upperMs: number, boxOffsetX: number, boxOffsetY: number, boxSizeX: number, boxSizeY: number, boxBorderColor: string, boxBackgroundColor: string, boxCornerRadius: number, boxBorderThickness: number, boxShadowColor: string, boxShadowBlurRadius: number, boxShadowOffsetX: number, boxShadowOffsetY: number, boxShadowOpacity: number };

export type ConsolidatedEditCanvasArrowOverlayFragment = { __typename: 'VideoCanvasArrowOverlay', canvasOverlayId: string, canvasZIndex: number, canvasType: string, lowerMs: number, upperMs: number, arrowBaseOffsetX: number, arrowBaseOffsetY: number, arrowHeadOffsetX: number, arrowHeadOffsetY: number, arrowColor: string, arrowThickness: number, arrowWingLength: number, arrowWingAngleDegrees: number, arrowShadowColor: string, arrowShadowBlurRadius: number, arrowShadowOffsetX: number, arrowShadowOffsetY: number, arrowShadowOpacity: number };

export type ConsolidatedEditVideoOverlaysFragment = { __typename: 'RegularUserVideo', id: string, boundedCanvasOverlays: { __typename: 'VideoCanvasOverlays', boundedCanvasTextOverlays: Array<{ __typename: 'VideoCanvasTextOverlay', canvasOverlayId: string, canvasZIndex: number, canvasType: string, lowerMs: number, upperMs: number, textOffsetX: number, textOffsetY: number, textSizeX: number, textSizeY: number, text: string, textColor: string, textFontFamily: string, textFontSize: number, textPadding: number, textLineHeight: number, textLetterSpacing: number, textAlign: string, textShadowColor: string, textShadowBlurRadius: number, textShadowOffsetX: number, textShadowOffsetY: number, textShadowOpacity: number, boxBackgroundColor: string, boxBackgroundCornerRadius: number, boxShadowColor: string, boxShadowBlurRadius: number, boxShadowOffsetX: number, boxShadowOffsetY: number, boxShadowOpacity: number, desiredTextWidth: number | null } | null> | null, boundedCanvasBoxOverlays: Array<{ __typename: 'VideoCanvasBoxOverlay', canvasOverlayId: string, canvasZIndex: number, canvasType: string, lowerMs: number, upperMs: number, boxOffsetX: number, boxOffsetY: number, boxSizeX: number, boxSizeY: number, boxBorderColor: string, boxBackgroundColor: string, boxCornerRadius: number, boxBorderThickness: number, boxShadowColor: string, boxShadowBlurRadius: number, boxShadowOffsetX: number, boxShadowOffsetY: number, boxShadowOpacity: number } | null> | null, boundedCanvasArrowOverlays: Array<{ __typename: 'VideoCanvasArrowOverlay', canvasOverlayId: string, canvasZIndex: number, canvasType: string, lowerMs: number, upperMs: number, arrowBaseOffsetX: number, arrowBaseOffsetY: number, arrowHeadOffsetX: number, arrowHeadOffsetY: number, arrowColor: string, arrowThickness: number, arrowWingLength: number, arrowWingAngleDegrees: number, arrowShadowColor: string, arrowShadowBlurRadius: number, arrowShadowOffsetX: number, arrowShadowOffsetY: number, arrowShadowOpacity: number } | null> | null }, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null } };

export type ConsolidatedEditZoomInstructionFragment = { __typename: 'EditZoomInstructionsMetadata', id: string, zoomCreatedBy: Types.ZoomCreatedBy, lowerMs: number, upperMs: number };

export type ConsolidatedEditZoomInstructionsFragment = { __typename: 'RegularUserVideo', id: string, editZoomInstructions: Array<{ __typename: 'EditZoomInstructionsMetadata', id: string, zoomCreatedBy: Types.ZoomCreatedBy, lowerMs: number, upperMs: number }> };

export type ConsolidatedEditVideoFragment = { __typename: 'RegularUserVideo', id: string, source_duration: number | null, playable_duration: number | null, name: string, personalizationType: Types.VideoPersonalizationType | null, boundedTrimRanges: Array<{ __typename: 'VideoTrimRange', from: number, to: number }>, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null }, boundedCanvasOverlays: { __typename: 'VideoCanvasOverlays', boundedCanvasTextOverlays: Array<{ __typename: 'VideoCanvasTextOverlay', canvasOverlayId: string, canvasZIndex: number, canvasType: string, lowerMs: number, upperMs: number, textOffsetX: number, textOffsetY: number, textSizeX: number, textSizeY: number, text: string, textColor: string, textFontFamily: string, textFontSize: number, textPadding: number, textLineHeight: number, textLetterSpacing: number, textAlign: string, textShadowColor: string, textShadowBlurRadius: number, textShadowOffsetX: number, textShadowOffsetY: number, textShadowOpacity: number, boxBackgroundColor: string, boxBackgroundCornerRadius: number, boxShadowColor: string, boxShadowBlurRadius: number, boxShadowOffsetX: number, boxShadowOffsetY: number, boxShadowOpacity: number, desiredTextWidth: number | null } | null> | null, boundedCanvasBoxOverlays: Array<{ __typename: 'VideoCanvasBoxOverlay', canvasOverlayId: string, canvasZIndex: number, canvasType: string, lowerMs: number, upperMs: number, boxOffsetX: number, boxOffsetY: number, boxSizeX: number, boxSizeY: number, boxBorderColor: string, boxBackgroundColor: string, boxCornerRadius: number, boxBorderThickness: number, boxShadowColor: string, boxShadowBlurRadius: number, boxShadowOffsetX: number, boxShadowOffsetY: number, boxShadowOpacity: number } | null> | null, boundedCanvasArrowOverlays: Array<{ __typename: 'VideoCanvasArrowOverlay', canvasOverlayId: string, canvasZIndex: number, canvasType: string, lowerMs: number, upperMs: number, arrowBaseOffsetX: number, arrowBaseOffsetY: number, arrowHeadOffsetX: number, arrowHeadOffsetY: number, arrowColor: string, arrowThickness: number, arrowWingLength: number, arrowWingAngleDegrees: number, arrowShadowColor: string, arrowShadowBlurRadius: number, arrowShadowOffsetX: number, arrowShadowOffsetY: number, arrowShadowOpacity: number } | null> | null }, clips: Array<{ __typename: 'VideoClipDetails', id: string, name: string | null, source_duration: number | null, playable_duration: number | null, source_video_id: string | null, currentUserIsSourceOwner: boolean, isSourceVideoMeetingRecording: boolean, isSourceVideoExternalUpload: boolean, video_properties: { __typename: 'VideoProperties', width: number | null, height: number | null, durationMs: number | null } }>, waveformData: Array<{ __typename: 'ClipWaveformData', clipId: string | null, status: Types.WaveformGenerationStatus | null, sourceDurationMs: number | null, peaks: Array<number> | null }>, textReplacements: Array<{ __typename: 'VideoTextReplacement', id: string, clipId: string, selectionLowerMs: number, selectionUpperMs: number, selectionReplacementText: string, audioGenerationStatus: Types.AudioGenerationStatus }>, editZoomInstructions: Array<{ __typename: 'EditZoomInstructionsMetadata', id: string, zoomCreatedBy: Types.ZoomCreatedBy, lowerMs: number, upperMs: number }> };

export const ConsolidatedEditVideoTrimsFragmentDoc = gql`
    fragment ConsolidatedEditVideoTrims on RegularUserVideo {
  id
  source_duration
  playable_duration
  boundedTrimRanges {
    from
    to
  }
  processing_information {
    trim_id
  }
}
    `;
export const ConsolidatedEditCanvasTextOverlayFragmentDoc = gql`
    fragment ConsolidatedEditCanvasTextOverlay on VideoCanvasTextOverlay {
  canvasOverlayId
  canvasZIndex
  canvasType
  lowerMs
  upperMs
  textOffsetX
  textOffsetY
  textSizeX
  textSizeY
  text
  textColor
  textFontFamily
  textFontSize
  textPadding
  textLineHeight
  textLetterSpacing
  textAlign
  textShadowColor
  textShadowBlurRadius
  textShadowOffsetX
  textShadowOffsetY
  textShadowOpacity
  boxBackgroundColor
  boxBackgroundCornerRadius
  boxShadowColor
  boxShadowBlurRadius
  boxShadowOffsetX
  boxShadowOffsetY
  boxShadowOpacity
  desiredTextWidth
}
    `;
export const ConsolidatedEditCanvasBoxOverlayFragmentDoc = gql`
    fragment ConsolidatedEditCanvasBoxOverlay on VideoCanvasBoxOverlay {
  canvasOverlayId
  canvasZIndex
  canvasType
  lowerMs
  upperMs
  boxOffsetX
  boxOffsetY
  boxSizeX
  boxSizeY
  boxBorderColor
  boxBackgroundColor
  boxCornerRadius
  boxBorderThickness
  boxShadowColor
  boxShadowBlurRadius
  boxShadowOffsetX
  boxShadowOffsetY
  boxShadowOpacity
}
    `;
export const ConsolidatedEditCanvasArrowOverlayFragmentDoc = gql`
    fragment ConsolidatedEditCanvasArrowOverlay on VideoCanvasArrowOverlay {
  canvasOverlayId
  canvasZIndex
  canvasType
  lowerMs
  upperMs
  arrowBaseOffsetX
  arrowBaseOffsetY
  arrowHeadOffsetX
  arrowHeadOffsetY
  arrowColor
  arrowThickness
  arrowWingLength
  arrowWingAngleDegrees
  arrowShadowColor
  arrowShadowBlurRadius
  arrowShadowOffsetX
  arrowShadowOffsetY
  arrowShadowOpacity
}
    `;
export const ConsolidatedEditVideoOverlaysFragmentDoc = gql`
    fragment ConsolidatedEditVideoOverlays on RegularUserVideo {
  id
  boundedCanvasOverlays {
    boundedCanvasTextOverlays {
      ...ConsolidatedEditCanvasTextOverlay
    }
    boundedCanvasBoxOverlays {
      ...ConsolidatedEditCanvasBoxOverlay
    }
    boundedCanvasArrowOverlays {
      ...ConsolidatedEditCanvasArrowOverlay
    }
  }
  processing_information {
    trim_id
  }
}
    ${ConsolidatedEditCanvasTextOverlayFragmentDoc}
${ConsolidatedEditCanvasBoxOverlayFragmentDoc}
${ConsolidatedEditCanvasArrowOverlayFragmentDoc}`;
export const ConsolidatedEditZoomInstructionFragmentDoc = gql`
    fragment ConsolidatedEditZoomInstruction on EditZoomInstructionsMetadata {
  id
  zoomCreatedBy
  lowerMs
  upperMs
}
    `;
export const ConsolidatedEditZoomInstructionsFragmentDoc = gql`
    fragment ConsolidatedEditZoomInstructions on RegularUserVideo {
  id
  editZoomInstructions {
    ...ConsolidatedEditZoomInstruction
  }
}
    ${ConsolidatedEditZoomInstructionFragmentDoc}`;
export const ConsolidatedEditVideoFragmentDoc = gql`
    fragment ConsolidatedEditVideo on RegularUserVideo {
  ...ConsolidatedEditVideoTrims
  ...ConsolidatedEditVideoOverlays
  ...ConsolidatedEditVideoName
  ...ConsolidatedEditVideoClips
  ...ConsolidatedEditVideoClipDimensions
  ...ConsolidatedEditVideoWaveform
  ...ConsolidatedEditVideoHasVariables
  ...ConsolidatedEditVideoTextReplacements
  ...ConsolidatedEditZoomInstructions
}
    ${ConsolidatedEditVideoTrimsFragmentDoc}
${ConsolidatedEditVideoOverlaysFragmentDoc}
${ConsolidatedEditVideoNameFragmentDoc}
${ConsolidatedEditVideoClipsFragmentDoc}
${ConsolidatedEditVideoClipDimensionsFragmentDoc}
${ConsolidatedEditVideoWaveformFragmentDoc}
${ConsolidatedEditVideoHasVariablesFragmentDoc}
${ConsolidatedEditVideoTextReplacementsFragmentDoc}
${ConsolidatedEditZoomInstructionsFragmentDoc}`;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;