import {
  EDIT_PAGE_CLICK_SEARCH,
  EDIT_PAGE_CLICK_TRIM_WORD,
  EDIT_PAGE_CLICK_UNDO_TRIM_WORD,
  EDIT_PAGE_SELECT_WORDS,
} from '@js/pages/edit-video/common/events';

import * as analytics from '@js/utilities/analytics';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';
import {
  AlignmentLabelType,
  OverlayEventSourceType,
  ThicknessLabelType,
} from '@js/pages/common/overlays/common/types';

export const EDIT_AUTO_SAVE = 'Edit Auto Save';

export const fireAutoSaveAnalyticEvent = ({
  videoId,
  sourceDuration,
  playableDuration,
}: {
  videoId: string;
  sourceDuration: number;
  playableDuration: number;
}): void => {
  analytics.track(EDIT_AUTO_SAVE, {
    ...withIdentifiers(
      EDIT_AUTO_SAVE,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    sourceDuration,
    playableDuration,
  });
};

export const EDIT_CLICK_UPGRADE = 'Edit Click Upgrade';

type EditUpgradeEntryPoints =
  | 'trim_transcript'
  | 'transcript'
  | 'filler_word_removal'
  | 'silences_removal'
  | 'add_overlay'
  | 'add_background';

export const fireUpgradeAnalyticEvent = ({
  videoId,
  entryPoint,
}: {
  videoId: string;
  entryPoint: EditUpgradeEntryPoints;
}): void => {
  analytics.track(EDIT_CLICK_UPGRADE, {
    ...withIdentifiers(
      EDIT_CLICK_UPGRADE,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    entryPoint,
  });
};

export const EDIT_REVERT_TO_ORIGINAL = 'Edit - Revert to Original';

export const fireRevertToOriginalEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  analytics.track(EDIT_REVERT_TO_ORIGINAL, {
    ...withIdentifiers(
      EDIT_REVERT_TO_ORIGINAL,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    source: 'consolidated-editor',
  });
};

export const EDIT_CLICK_UNDO = 'Edit - Click Undo';

export const fireUndoClickEvent = ({ videoId }: { videoId: string }): void => {
  analytics.track(EDIT_CLICK_UNDO, {
    ...withIdentifiers(
      EDIT_CLICK_UNDO,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    source: 'consolidated-editor',
  });
};

export const EDIT_CLICK_REDO = 'Edit - Click Redo';

export const fireRedoClickEvent = ({ videoId }: { videoId: string }): void => {
  analytics.track(EDIT_CLICK_REDO, {
    ...withIdentifiers(
      EDIT_CLICK_REDO,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    source: 'consolidated-editor',
  });
};

export const EDIT_CLICK_FINISH = 'Edit Click Finish';

export const fireFinishClickEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  analytics.track(EDIT_CLICK_FINISH, {
    ...withIdentifiers(
      EDIT_CLICK_FINISH,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    source: 'consolidated-editor',
  });
};

export const EDIT_CLICK_BACK = 'Edit Click Back';

export const fireBackClickEvent = ({ videoId }: { videoId: string }): void => {
  analytics.track(EDIT_CLICK_BACK, {
    ...withIdentifiers(
      EDIT_CLICK_BACK,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    source: 'consolidated-editor',
  });
};

export const CONSOLIDATED_EDIT_FTUX_DISMISS = 'Consolidated Edit Ftux Dismiss';

export const fireProductTourDismissEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  analytics.track(
    CONSOLIDATED_EDIT_FTUX_DISMISS,
    withIdentifiers(
      CONSOLIDATED_EDIT_FTUX_DISMISS,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
};

export const CONSOLIDATED_EDIT_FTUX_TOUR_START =
  'Consolidated Edit Ftux Tour Start';

export const fireProductTourStartEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  analytics.track(
    CONSOLIDATED_EDIT_FTUX_TOUR_START,
    withIdentifiers(
      CONSOLIDATED_EDIT_FTUX_TOUR_START,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
};

export const CONSOLIDATED_EDIT_FTUX_COMPLETE =
  'Consolidated Edit Ftux Complete';

export const fireProductTourCompleteEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  analytics.track(
    CONSOLIDATED_EDIT_FTUX_COMPLETE,
    withIdentifiers(
      CONSOLIDATED_EDIT_FTUX_COMPLETE,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
};

export const CONSOLIDATED_EDIT_FTUX_TOUR_ADVANCE =
  'Consolidated Edit Ftux Tour Advance';

export const fireProductTourAdvanceEvent = ({
  videoId,
  nextStep,
}: {
  videoId: string;
  nextStep: number;
}): void => {
  analytics.track(CONSOLIDATED_EDIT_FTUX_TOUR_ADVANCE, {
    ...withIdentifiers(
      CONSOLIDATED_EDIT_FTUX_TOUR_ADVANCE,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    nextStep,
  });
};

export const CONSOLIDATED_EDIT_FTUX_DISPLAYED =
  'Consolidated Edit Ftux Displayed';

export const fireProductTourDisplayedEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  analytics.track(
    CONSOLIDATED_EDIT_FTUX_DISPLAYED,
    withIdentifiers(
      CONSOLIDATED_EDIT_FTUX_DISPLAYED,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
};

export const OVERLAYS_ENTRYPOINT_FTUX_DISPLAYED =
  'Overlays Entrypoint Ftux Displayed';

export const fireOverlaysEntrypointFtuxDisplayedEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  analytics.track(
    OVERLAYS_ENTRYPOINT_FTUX_DISPLAYED,
    withIdentifiers(
      OVERLAYS_ENTRYPOINT_FTUX_DISPLAYED,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
};

export const EDIT_TRANSCRIPT_TOGGLED = 'Edit Hide Transcript Toggled';

export const fireShowOrHideTranscriptButtonClickEvent = ({
  videoId,
  toggle,
}: {
  videoId: string;
  toggle: 'show' | 'hide';
}): void => {
  analytics.track(EDIT_TRANSCRIPT_TOGGLED, {
    ...withIdentifiers(
      EDIT_TRANSCRIPT_TOGGLED,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    toggle,
  });
};

export const fireSearchButtonClickEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  // Shared with variables search
  analytics.track(EDIT_PAGE_CLICK_SEARCH, {
    ...withIdentifiers(
      EDIT_PAGE_CLICK_SEARCH,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    source: 'consolidated-editor',
  });
};

export const fireSelectWordsEvent = ({
  videoId,
  highlightedTokensCount,
  originalWordCount,
}: {
  videoId: string;
  highlightedTokensCount: number;
  originalWordCount: number;
}): void => {
  // Shared with variables select words
  analytics.track(EDIT_PAGE_SELECT_WORDS, {
    ...withIdentifiers(
      EDIT_PAGE_SELECT_WORDS,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    source: 'consolidated_editor',
    highlightedTokensCount,
    originalWordCount,
  });
};

export const fireTrimWordsEvent = ({
  videoId,
  initialTokensAvailable,
  newNumDeletedTokens,
}: {
  videoId: string;
  initialTokensAvailable: number;
  newNumDeletedTokens: number;
}): void => {
  // Shared with variables trim word
  analytics.track(EDIT_PAGE_CLICK_TRIM_WORD, {
    ...withIdentifiers(
      EDIT_PAGE_CLICK_TRIM_WORD,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    source: 'consolidated_editor',
    initialTokensAvailable,
    newNumDeletedTokens,
  });
};

export const fireUndoTrimWordsEvent = ({
  videoId,
  initialTokensAvailable,
  newNumDeletedTokens,
}: {
  videoId: string;
  initialTokensAvailable: number;
  newNumDeletedTokens: number;
}): void => {
  // Shared with variables trim word
  analytics.track(EDIT_PAGE_CLICK_UNDO_TRIM_WORD, {
    ...withIdentifiers(
      EDIT_PAGE_CLICK_UNDO_TRIM_WORD,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    source: 'consolidated_editor',
    initialTokensAvailable,
    newNumDeletedTokens,
  });
};

export const EDIT_CLICK_SPLIT_AT = 'Edit - Click Split At';

export const fireSplitClickEvent = ({ videoId }: { videoId: string }): void => {
  analytics.track(EDIT_CLICK_SPLIT_AT, {
    ...withIdentifiers(
      EDIT_CLICK_SPLIT_AT,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    source: 'consolidated-editor',
  });
};

export const EDIT_DELETE_SELECTION = 'Edit Delete Selection';

export const fireDeleteSelectionEvent = ({
  videoId,
  msDeleted,
}: {
  videoId: string;
  msDeleted: number;
}): void => {
  analytics.track(EDIT_DELETE_SELECTION, {
    ...withIdentifiers(
      EDIT_DELETE_SELECTION,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    secondsDeleted: Math.round(msDeleted) / 1000,
    source: 'consolidated-editor',
  });
};

export const EDIT_DELETE_TRIMMED_CLIP = 'Edit - Delete Trimmed Clip';

export const fireDeletePlayRangeEvent = ({
  videoId,
  msDeleted,
}: {
  videoId: string;
  msDeleted: number;
}): void => {
  analytics.track(EDIT_DELETE_TRIMMED_CLIP, {
    ...withIdentifiers(
      EDIT_DELETE_TRIMMED_CLIP,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    secondsDeleted: Math.round(msDeleted) / 1000,
    source: 'consolidated-editor',
  });
};

export const EDIT_UPDATE_TIME_RANGE = 'Edit - Update Time Range';

export const fireUpdatePlayRangeEvent = ({
  videoId,
  handleSide,
}: {
  videoId: string;
  handleSide: 'left' | 'right';
}): void => {
  analytics.track(EDIT_UPDATE_TIME_RANGE, {
    ...withIdentifiers(
      EDIT_UPDATE_TIME_RANGE,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    source: 'consolidated-editor',
    handleSide,
  });
};

export const EDIT_MOVE_PLAYHEAD = 'Edit Move Playhead';

export const fireMovePlayheadEvent = ({
  videoId,
  currentPlayTimeMs,
}: {
  videoId: string;
  currentPlayTimeMs: number;
}): void => {
  analytics.track(EDIT_MOVE_PLAYHEAD, {
    ...withIdentifiers(
      EDIT_MOVE_PLAYHEAD,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    moved_to_second: Math.round(currentPlayTimeMs) / 1000,
  });
};

export const EDIT_HIGHLIGHT_WAVEFORM = 'Edit Highlight Waveform';

export const fireHighlightWaveformEvent = ({
  videoId,
  msHighlighted,
}: {
  videoId: string;
  msHighlighted: number;
}): void => {
  analytics.track(EDIT_HIGHLIGHT_WAVEFORM, {
    ...withIdentifiers(
      EDIT_HIGHLIGHT_WAVEFORM,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    secondsHighlighted: Math.round(msHighlighted) / 1000,
  });
};

export const EDIT_DELETE_ADD_CLIP = 'Edit - Delete Add Clip';

export const fireDeleteClipEvent = ({
  videoId,
  clipId,
}: {
  videoId: string;
  clipId: string;
}): void => {
  analytics.track(EDIT_DELETE_ADD_CLIP, {
    ...withIdentifiers(
      EDIT_DELETE_ADD_CLIP,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.videoClip(clipId, 'clipId')
    ),
    source: 'consolidated-editor',
  });
};

export const REPOSITION_CLIPS = 'Edit - reposition clips';

export const fireRepositionClipsEvent = ({
  videoId,
  clipId,
  position,
}: {
  videoId: string;
  clipId: string;
  position: 'left' | 'right';
}): void => {
  analytics.track(REPOSITION_CLIPS, {
    ...withIdentifiers(
      REPOSITION_CLIPS,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.videoClip(clipId, 'clipId')
    ),
    position,
    source: 'consolidated-editor',
  });
};

export const ADD_CLIP_AFTER = 'Edit - add clip after';

export const fireAddClipAfterEvent = ({
  videoId,
  clipId,
}: {
  videoId: string;
  clipId: string;
}): void => {
  analytics.track(ADD_CLIP_AFTER, {
    ...withIdentifiers(
      ADD_CLIP_AFTER,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.videoClip(clipId, 'clipId')
    ),
    source: 'consolidated-editor',
  });
};

export const OVERLAYS_WAVEFORM_FTUX_DISPLAYED =
  'Overlays Waveform Ftux Tour Displayed';

export const fireOverlaysWaveformFtuxDisplayedEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  analytics.track(
    OVERLAYS_WAVEFORM_FTUX_DISPLAYED,
    withIdentifiers(
      OVERLAYS_WAVEFORM_FTUX_DISPLAYED,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
};

export const OVERLAYS_WAVEFORM_FTUX_TOUR_ADVANCE =
  'Overlays Waveform Ftux Tour Advance';

export const fireOverlaysWaveformFtuxAdvanceEvent = ({
  videoId,
  nextStep,
}: {
  videoId: string;
  nextStep: number;
}): void => {
  analytics.track(OVERLAYS_WAVEFORM_FTUX_TOUR_ADVANCE, {
    ...withIdentifiers(
      OVERLAYS_WAVEFORM_FTUX_TOUR_ADVANCE,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    nextStep,
  });
};

export const OVERLAYS_WAVEFORM_FTUX_COMPLETE =
  'Waveform Overlays Ftux Complete';

export const fireOverlaysWaveformFtuxCompleteEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  analytics.track(
    OVERLAYS_WAVEFORM_FTUX_COMPLETE,
    withIdentifiers(
      OVERLAYS_WAVEFORM_FTUX_COMPLETE,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
};

export const EDIT_NEW_CLIP_ADDED = 'Edit - New Clip Added';
export const EDIT_NEW_CLIP_INSERTED = 'Edit - New Clip Inserted';

export const fireNewClipAddedEvent = ({
  videoId,
  selectedVideoId,
}: {
  videoId: string;
  selectedVideoId: string;
}): void => {
  analytics.track(EDIT_NEW_CLIP_ADDED, {
    ...withIdentifiers(
      EDIT_NEW_CLIP_ADDED,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.video(selectedVideoId, 'selectedVideoId')
    ),
    source: 'consolidated-editor',
  });
};

export const fireNewClipInsertedEvent = ({
  videoId,
  selectedVideoId,
  insertAtTimestamp,
}: {
  videoId: string;
  selectedVideoId: string;
  insertAtTimestamp: number;
}): void => {
  analytics.track(EDIT_NEW_CLIP_INSERTED, {
    ...withIdentifiers(
      EDIT_NEW_CLIP_INSERTED,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.video(selectedVideoId, 'selectedVideoId')
    ),
    insertAtTimestamp,
    source: 'consolidated-editor',
  });
};

export const EDIT_ZOOM_WAVEFORM = 'Edit Zoom Waveform';

export const fireZoomWaveformEvent = ({
  videoId,
  zoomPct,
}: {
  videoId: string;
  zoomPct: number;
}): void => {
  analytics.track(EDIT_ZOOM_WAVEFORM, {
    ...withIdentifiers(
      EDIT_ZOOM_WAVEFORM,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    zoom_pct: zoomPct,
  });
};

export const EDIT_FIT_WAVEFORM = 'Edit Fit Waveform';

export const fireZoomFitWaveformEvent = ({
  videoId,
  zoomPct,
}: {
  videoId: string;
  zoomPct: number;
}): void => {
  analytics.track(EDIT_FIT_WAVEFORM, {
    ...withIdentifiers(
      EDIT_FIT_WAVEFORM,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    zoom_pct: zoomPct,
  });
};

export const EDIT_CLICK_ADD_CLIP = 'Edit - Click Add Clip';
export const EDIT_CLICK_INSERT_CLIP = 'Edit - Click Insert Clip';

export const fireAddClipClickEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  analytics.track(
    EDIT_CLICK_ADD_CLIP,
    withIdentifiers(
      EDIT_CLICK_ADD_CLIP,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
};

export const fireInsertClipClickEvent = ({
  videoId,
  insertAtTimestamp,
}: {
  videoId: string;
  insertAtTimestamp: number;
}): void => {
  analytics.track(EDIT_CLICK_INSERT_CLIP, {
    ...withIdentifiers(
      EDIT_CLICK_INSERT_CLIP,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    insertAtTimestamp,
  });
};

export const EDIT_HIDE_WAVEFORM_TOGGLED = 'Edit Hide Waveform Toggled';

export const fireShowOrHideWaveformEvent = ({
  videoId,
  toggle,
}: {
  videoId: string;
  toggle: 'show' | 'hide';
}): void => {
  analytics.track(EDIT_HIDE_WAVEFORM_TOGGLED, {
    ...withIdentifiers(
      EDIT_HIDE_WAVEFORM_TOGGLED,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    toggle,
  });
};

// Overlays
export const EDIT_TOGGLE_OVERLAY = 'Edit Toggle Overlay';

export const fireAddOverlayClickedEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  analytics.track(
    EDIT_TOGGLE_OVERLAY,
    withIdentifiers(
      EDIT_TOGGLE_OVERLAY,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
};

export const EDIT_OVERLAY_CLICK_ADD_TEXT = 'Edit Overlay Click Add Text';

export const fireAddTextOverlayEvent = ({
  videoId,
  overlayId,
  source,
}: {
  videoId: string;
  overlayId: string;
  source: OverlayEventSourceType;
}): void => {
  analytics.track(EDIT_OVERLAY_CLICK_ADD_TEXT, {
    ...withIdentifiers(
      EDIT_OVERLAY_CLICK_ADD_TEXT,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    source,
  });
};

export const EDIT_OVERLAY_CLICK_ADD_ARROW = 'Edit Overlay Click Add Arrow';

export const fireAddArrowOverlayEvent = ({
  videoId,
  overlayId,
  source,
}: {
  videoId: string;
  overlayId: string;
  source: OverlayEventSourceType;
}): void => {
  analytics.track(EDIT_OVERLAY_CLICK_ADD_ARROW, {
    ...withIdentifiers(
      EDIT_OVERLAY_CLICK_ADD_ARROW,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    source,
  });
};

export const EDIT_OVERLAY_CLICK_ADD_BOX = 'Edit Overlay Click Add Box';

export const fireAddBoxOverlayEvent = ({
  videoId,
  overlayId,
  source,
}: {
  videoId: string;
  overlayId: string;
  source: OverlayEventSourceType;
}): void => {
  analytics.track(EDIT_OVERLAY_CLICK_ADD_BOX, {
    ...withIdentifiers(
      EDIT_OVERLAY_CLICK_ADD_BOX,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    source,
  });
};

// Box overlay events
export const EDIT_OVERLAY_BOX_CHANGE_COLOR = 'Edit Overlay Box Change Color';

export const fireChangeBoxColorEvent = ({
  videoId,
  overlayId,
  colorLabel,
}: {
  videoId: string;
  overlayId: string;
  colorLabel: string;
}): void => {
  analytics.track(EDIT_OVERLAY_BOX_CHANGE_COLOR, {
    ...withIdentifiers(
      EDIT_OVERLAY_BOX_CHANGE_COLOR,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    color: colorLabel,
  });
};

export const EDIT_OVERLAY_BOX_CHANGE_COLOR_TOGGLE_FILL_BOX =
  'Edit Overlay Box Change Color Toggle Fill Box';

export const fireChangeBoxFillEvent = ({
  videoId,
  overlayId,
  enabled,
}: {
  videoId: string;
  overlayId: string;
  enabled: boolean;
}): void => {
  analytics.track(EDIT_OVERLAY_BOX_CHANGE_COLOR_TOGGLE_FILL_BOX, {
    ...withIdentifiers(
      EDIT_OVERLAY_BOX_CHANGE_COLOR_TOGGLE_FILL_BOX,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    enabled,
  });
};

export const EDIT_OVERLAY_BOX_CHANGE_COLOR_TOGGLE_SHADOW =
  'Edit Overlay Box Change Color Toggle Shadow';

export const fireChangeBoxShadowEvent = ({
  videoId,
  overlayId,
  enabled,
}: {
  videoId: string;
  overlayId: string;
  enabled: boolean;
}): void => {
  analytics.track(EDIT_OVERLAY_BOX_CHANGE_COLOR_TOGGLE_SHADOW, {
    ...withIdentifiers(
      EDIT_OVERLAY_BOX_CHANGE_COLOR_TOGGLE_SHADOW,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    enabled,
  });
};

export const EDIT_OVERLAY_BOX_CHANGE_THICKNESS =
  'Edit Overlay Box Change Color Change Thickness';

export const fireChangeBoxThicknessEvent = ({
  videoId,
  overlayId,
  thicknessLabel,
}: {
  videoId: string;
  overlayId: string;
  thicknessLabel: ThicknessLabelType;
}): void => {
  analytics.track(EDIT_OVERLAY_BOX_CHANGE_THICKNESS, {
    ...withIdentifiers(
      EDIT_OVERLAY_BOX_CHANGE_THICKNESS,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    thickness: thicknessLabel,
  });
};

export const EDIT_OVERLAY_BOX_CLICK_COPIED = 'Edit Overlay Box Click Copied';

export const fireBoxOverlayDuplicatedEvent = ({
  videoId,
  overlayId,
}: {
  videoId: string;
  overlayId: string;
}): void => {
  analytics.track(
    EDIT_OVERLAY_BOX_CLICK_COPIED,
    withIdentifiers(
      EDIT_OVERLAY_BOX_CLICK_COPIED,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    )
  );
};

export const EDIT_OVERLAY_BOX_CLICK_DELETED = 'Edit Overlay Box Click Deleted';

export const fireBoxOverlayDeletedEvent = ({
  videoId,
  overlayId,
}: {
  videoId: string;
  overlayId: string;
}): void => {
  analytics.track(
    EDIT_OVERLAY_BOX_CLICK_DELETED,
    withIdentifiers(
      EDIT_OVERLAY_BOX_CLICK_DELETED,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    )
  );
};

// Arrow overlay events
export const EDIT_OVERLAY_ARROW_CHANGE_COLOR =
  'Edit Overlay Arrow Change Color';

export const fireChangeArrowColorEvent = ({
  videoId,
  overlayId,
  colorLabel,
}: {
  videoId: string;
  overlayId: string;
  colorLabel: string;
}): void => {
  analytics.track(EDIT_OVERLAY_ARROW_CHANGE_COLOR, {
    ...withIdentifiers(
      EDIT_OVERLAY_ARROW_CHANGE_COLOR,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    color: colorLabel,
  });
};

export const EDIT_OVERLAY_ARROW_CHANGE_COLOR_TOGGLE_SHADOW =
  'Edit Overlay Arrow Change Color Toggle Shadow';

export const fireChangeArrowShadowEvent = ({
  videoId,
  overlayId,
  enabled,
}: {
  videoId: string;
  overlayId: string;
  enabled: boolean;
}): void => {
  analytics.track(EDIT_OVERLAY_ARROW_CHANGE_COLOR_TOGGLE_SHADOW, {
    ...withIdentifiers(
      EDIT_OVERLAY_ARROW_CHANGE_COLOR_TOGGLE_SHADOW,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    enabled,
  });
};

export const EDIT_OVERLAY_ARROW_CHANGE_THICKNESS =
  'Edit Overlay Arrow Change Color Change Thickness';

export const fireChangeArrowThicknessEvent = ({
  videoId,
  overlayId,
  thicknessLabel,
}: {
  videoId: string;
  overlayId: string;
  thicknessLabel: ThicknessLabelType;
}): void => {
  analytics.track(EDIT_OVERLAY_ARROW_CHANGE_THICKNESS, {
    ...withIdentifiers(
      EDIT_OVERLAY_ARROW_CHANGE_THICKNESS,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    thickness: thicknessLabel,
  });
};

export const EDIT_OVERLAY_ARROW_CLICK_COPIED =
  'Edit Overlay Arrow Click Copied';

export const fireArrowOverlayDuplicatedEvent = ({
  videoId,
  overlayId,
}: {
  videoId: string;
  overlayId: string;
}): void => {
  analytics.track(
    EDIT_OVERLAY_ARROW_CLICK_COPIED,
    withIdentifiers(
      EDIT_OVERLAY_ARROW_CLICK_COPIED,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    )
  );
};

export const EDIT_OVERLAY_ARROW_CLICK_DELETED =
  'Edit Overlay Arrow Click Deleted';

export const fireArrowOverlayDeletedEvent = ({
  videoId,
  overlayId,
}: {
  videoId: string;
  overlayId: string;
}): void => {
  analytics.track(
    EDIT_OVERLAY_ARROW_CLICK_DELETED,
    withIdentifiers(
      EDIT_OVERLAY_ARROW_CLICK_DELETED,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    )
  );
};

// Text overlays
export const EDIT_OVERLAY_TEXT_CHANGE_COLOR = 'Edit Overlay Text Change Color';

export const fireChangeTextColorEvent = ({
  videoId,
  overlayId,
  colorLabel,
}: {
  videoId: string;
  overlayId: string;
  colorLabel: string;
}): void => {
  analytics.track(EDIT_OVERLAY_TEXT_CHANGE_COLOR, {
    ...withIdentifiers(
      EDIT_OVERLAY_TEXT_CHANGE_COLOR,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    color: colorLabel,
  });
};

export const EDIT_OVERLAY_TEXT_CHANGE_COLOR_TOGGLE_BACKGROUND =
  'Edit Overlay Text Change Color Toggle Background';

export const fireChangeTextBackgroundEvent = ({
  videoId,
  overlayId,
  enabled,
}: {
  videoId: string;
  overlayId: string;
  enabled: boolean;
}): void => {
  analytics.track(EDIT_OVERLAY_TEXT_CHANGE_COLOR_TOGGLE_BACKGROUND, {
    ...withIdentifiers(
      EDIT_OVERLAY_TEXT_CHANGE_COLOR_TOGGLE_BACKGROUND,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    enabled,
  });
};

export const EDIT_OVERLAY_TEXT_CHANGE_FONT = 'Edit Overlay Text Change Font';

export const fireChangeTextFontEvent = ({
  videoId,
  overlayId,
  fontLabel,
}: {
  videoId: string;
  overlayId: string;
  fontLabel: string;
}): void => {
  analytics.track(EDIT_OVERLAY_TEXT_CHANGE_FONT, {
    ...withIdentifiers(
      EDIT_OVERLAY_TEXT_CHANGE_FONT,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    font: fontLabel,
  });
};

export const EDIT_OVERLAY_TEXT_CHANGE_COLOR_TOGGLE_SHADOW =
  'Edit Overlay Text Change Color Toggle Shadow';

export const fireChangeTextShadowEvent = ({
  videoId,
  overlayId,
  enabled,
}: {
  videoId: string;
  overlayId: string;
  enabled: boolean;
}): void => {
  analytics.track(EDIT_OVERLAY_TEXT_CHANGE_COLOR_TOGGLE_SHADOW, {
    ...withIdentifiers(
      EDIT_OVERLAY_TEXT_CHANGE_COLOR_TOGGLE_SHADOW,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    enabled,
  });
};

export const EDIT_OVERLAY_TEXT_CHANGE_ALIGNMENT =
  'Edit Overlay Text Change Alignment';

export const fireChangeTextAlignmentEvent = ({
  videoId,
  overlayId,
  alignment,
}: {
  videoId: string;
  overlayId: string;
  alignment: AlignmentLabelType;
}): void => {
  analytics.track(EDIT_OVERLAY_TEXT_CHANGE_ALIGNMENT, {
    ...withIdentifiers(
      EDIT_OVERLAY_TEXT_CHANGE_ALIGNMENT,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    alignment,
  });
};

export const EDIT_OVERLAY_TEXT_CLICK_COPIED = 'Edit Overlay Text Click Copied';

export const fireTextOverlayDuplicatedEvent = ({
  videoId,
  overlayId,
}: {
  videoId: string;
  overlayId: string;
}): void => {
  analytics.track(
    EDIT_OVERLAY_TEXT_CLICK_COPIED,
    withIdentifiers(
      EDIT_OVERLAY_TEXT_CLICK_COPIED,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    )
  );
};

export const EDIT_OVERLAY_TEXT_CLICK_DELETED =
  'Edit Overlay Text Click Deleted';

export const fireTextOverlayDeletedEvent = ({
  videoId,
  overlayId,
}: {
  videoId: string;
  overlayId: string;
}): void => {
  analytics.track(
    EDIT_OVERLAY_TEXT_CLICK_DELETED,
    withIdentifiers(
      EDIT_OVERLAY_TEXT_CLICK_DELETED,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    )
  );
};

export const EDIT_OVERLAY_WAVEFORM_TOGGLE_OVERLAY_PIN =
  'Edit Overlay Waveform Toggle Overlay Pin';

export const fireOverlayPinToggleEvent = ({
  videoId,
  status,
  numOverlays,
}: {
  videoId: string;
  status: 'expand' | 'hide';
  numOverlays: number;
}): void => {
  analytics.track(EDIT_OVERLAY_WAVEFORM_TOGGLE_OVERLAY_PIN, {
    ...withIdentifiers(
      EDIT_OVERLAY_WAVEFORM_TOGGLE_OVERLAY_PIN,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    status,
    has_multiple_overlays: numOverlays > 1,
    num_overlays: numOverlays,
  });
};

export const EDIT_OVERLAY_WAVEFORM_DRAG_OVERLAY_PIN =
  'Edit Overlay Waveform Drag Overlay Pin';

export const fireOverlayPinDragEvent = ({
  videoId,
  numOverlays,
}: {
  videoId: string;
  numOverlays: number;
}): void => {
  analytics.track(EDIT_OVERLAY_WAVEFORM_DRAG_OVERLAY_PIN, {
    ...withIdentifiers(
      EDIT_OVERLAY_WAVEFORM_DRAG_OVERLAY_PIN,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    has_multiple_overlays: numOverlays > 1,
    num_overlays: numOverlays,
  });
};

export const EDIT_OVERLAY_WAVEFORM_DRAG_OVERLAY_RAIL =
  'Edit Overlay Waveform Drag Overlay Rail';

export const fireOverlayRailDragEvent = ({
  videoId,
  overlayId,
  overlayType,
}: {
  videoId: string;
  overlayId: string;
  overlayType: string;
}): void => {
  analytics.track(EDIT_OVERLAY_WAVEFORM_DRAG_OVERLAY_RAIL, {
    ...withIdentifiers(
      EDIT_OVERLAY_WAVEFORM_DRAG_OVERLAY_RAIL,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    type: overlayType,
  });
};

export const EDIT_OVERLAY_WAVEFORM_RESIZE_OVERLAY_RAIL =
  'Edit Overlay Waveform Resize Overlay Rail';

export const fireOverlayRailResizeEvent = ({
  videoId,
  overlayId,
  overlayType,
}: {
  videoId: string;
  overlayId: string;
  overlayType: string;
}): void => {
  analytics.track(EDIT_OVERLAY_WAVEFORM_RESIZE_OVERLAY_RAIL, {
    ...withIdentifiers(
      EDIT_OVERLAY_WAVEFORM_RESIZE_OVERLAY_RAIL,
      AnalyticsEntityId.video(videoId, 'videoId'),
      AnalyticsEntityId.canvasOverlay(overlayId, 'overlayId')
    ),
    type: overlayType,
  });
};

export const EDIT_BACKGROUND_BUTTON_CLICKED = 'Edit Background Button Clicked';

export const fireEditBackgroundButtonClickedEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  analytics.track(
    EDIT_BACKGROUND_BUTTON_CLICKED,
    withIdentifiers(
      EDIT_BACKGROUND_BUTTON_CLICKED,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
};

export const EDIT_BACKGROUND_HEX_CHANGED = 'Edit Background Hex Changed';

export const fireEditBackgroundHexChangedEvent = ({
  videoId,
  color,
}: {
  videoId: string;
  color: string;
}): void => {
  analytics.track(EDIT_BACKGROUND_HEX_CHANGED, {
    ...withIdentifiers(
      EDIT_BACKGROUND_HEX_CHANGED,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    color,
  });
};

export const EDIT_BACKGROUND_PRESET_CHANGED = 'Edit Background Preset Changed';

export const fireEditBackgroundPresetChangedEvent = ({
  videoId,
  name,
}: {
  videoId: string;
  name: string;
}): void => {
  analytics.track(EDIT_BACKGROUND_PRESET_CHANGED, {
    ...withIdentifiers(
      EDIT_BACKGROUND_PRESET_CHANGED,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    name,
  });
};

export const EDIT_BACKGROUND_REMOVED = 'Edit Background Removed';

export const fireEditBackgroundRemovedEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  analytics.track(
    EDIT_BACKGROUND_REMOVED,
    withIdentifiers(
      EDIT_BACKGROUND_REMOVED,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
};

export const EDIT_TTS_CLICK_REPLACE_AUDIO_BUTTON =
  'Edit TTS Click Replace Audio Button';

export const fireEditTtsClickReplaceAudioButtonEvent = ({
  videoId,
  originalWordCount,
}: {
  videoId: string;
  originalWordCount: number;
}): void => {
  analytics.track(EDIT_TTS_CLICK_REPLACE_AUDIO_BUTTON, {
    ...withIdentifiers(
      EDIT_TTS_CLICK_REPLACE_AUDIO_BUTTON,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    originalWordCount,
  });
};

export const EDIT_TTS_REACH_LENGTH_LIMIT = 'Edit TTS Reach Length Limit';

export const fireEditTtsReachLengthLimitEvent = ({
  videoId,
  attemptedWordCount,
  type,
}: {
  videoId: string;
  attemptedWordCount: number;
  type: 'ceiling' | 'floor';
}): void => {
  analytics.track(EDIT_TTS_REACH_LENGTH_LIMIT, {
    ...withIdentifiers(
      EDIT_TTS_REACH_LENGTH_LIMIT,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    attemptedWordCount,
    type,
  });
};

export const EDIT_TTS_CLICK_REPLACE = 'Edit TTS Click Replace';

// Hard coded "version" that we will update when we make meaningful changes to
// the TTS algorithm or model.
const TTS_ALGORITHM_VERSION = 'v1';

export const fireEditTtsClickReplaceEvent = ({
  videoId,
  originalWordCount,
  replacingWordCount,
}: {
  videoId: string;
  originalWordCount: number;
  replacingWordCount: number;
}): void => {
  analytics.track(EDIT_TTS_CLICK_REPLACE, {
    ...withIdentifiers(
      EDIT_TTS_CLICK_REPLACE,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    originalWordCount,
    replacingWordCount,
    version: TTS_ALGORITHM_VERSION,
  });
};

export const EDIT_TTS_CLICK_REVERT = 'Edit TTS Click Revert';

export const fireEditTtsClickRevertEvent = ({
  videoId,
  originalWordCount,
  replacingWordCount,
}: {
  videoId: string;
  originalWordCount: number;
  replacingWordCount: number;
}): void => {
  analytics.track(EDIT_TTS_CLICK_REVERT, {
    ...withIdentifiers(
      EDIT_TTS_CLICK_REVERT,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    originalWordCount,
    replacingWordCount,
    version: TTS_ALGORITHM_VERSION,
  });
};

export const EDIT_TTS_DISMISS_BANNER = 'Edit TTS Dismiss Banner';

export const fireEditTtsDismissBannerEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  analytics.track(
    EDIT_TTS_DISMISS_BANNER,
    withIdentifiers(
      EDIT_TTS_DISMISS_BANNER,
      AnalyticsEntityId.video(videoId, 'videoId')
    )
  );
};

export const EDIT_TTS_PROVIDE_FEEDBACK = 'Edit TTS Provide Feedback';

export const fireEditTtsProvideFeedbackEvent = ({
  videoId,
  replacementWordCount,
  replacementBucketCount,
  replacementDurationMs,
  rating,
  feedback, // Deliberate UGC for internal launch feedback collection
}: {
  videoId: string;
  replacementWordCount: number;
  replacementBucketCount: number;
  replacementDurationMs: number;
  rating: 'positive' | 'negative';
  feedback: string;
}): void => {
  analytics.track(EDIT_TTS_PROVIDE_FEEDBACK, {
    ...withIdentifiers(
      EDIT_TTS_PROVIDE_FEEDBACK,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    replacementWordCount,
    replacementBucketCount,
    replacementDurationMs,
    feedback,
    rating,
  });
};
