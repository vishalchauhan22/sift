export enum RUMEvents {
  RUMInit = 'RUM Init',
  Success = 'Marker Success',
  DupSuccess = 'Marker Success Duplicated',
  Error = 'Marker Error',
  PageLoadSuccess = 'Page Load Success',
  PageLoadFail = 'Page Load Fail',
  MarkerTimeout = 'Marker Timeout',
  TriggerStarts = 'Trigger Starts',
  TriggerEnds = 'Trigger Ends',
  TriggerCancelled = 'Trigger Cancelled',
  MarkerUpdated = 'Marker Updated',
}

// Note: SuccessMarkers should indicate something more specific
// than whether a feature successfully loaded or not (which should instead
// be handled by the FeatureWrapper).
// (A way to test if it should be a SuccessMarker is that
// the name can written as NounVerb).
export enum SuccessMarkers {
  VideoCanPlay = 'Video Can Play',
  // TODO(tatiana): Rename StreamingStart
  Streaming = 'Streaming',
  FirstSegmentDownloadFinished = 'First Segment Download Finished',
  // TODO(tatiana): Remove Artificial LCP
  ArtificialLCP = 'Artificial LCP Poster Load',
  // TODO(tatiana): Navigation should be changed to a FeatureWrapper
  Navigation = 'Navigation',
  // TODO(tatiana): Video Metadata should probably be VideoMetadataLoaded
  VideoMetadata = 'Video Metadata',
  // TODO(tatiana): VideoPlayer should be VideoPlayer Start
  VideoPlayer = 'Video Player',
  ShakaPlayerInit = 'Shaka Player Init',
  VideoPlayerReady = 'Video Player Ready',
  VideoSourceFetchStart = 'Video Source Fetch Start',
  VideoSourceFetched = 'Video Source Fetched',
  VideoSourceParsed = 'Video Source Parsed',
  TranscriptLoaded = 'Transcript Loaded',
  WaveformLoaded = 'Waveform Loaded',
  VariablesSuggestionPanelLoaded = 'Variables Suggestion Panel Loaded',
}

export enum ErrorMarkers {
  PageErrorBoundary = 'Page Error Boundary',
  ShareVideoIndexSharedErrorBoundary = 'Share Video Index Shared Error Boundary',
  SidebarTabErrorBoundary = 'Sidebar Tab Error Boundary',
  AiTabErrorBoundary = 'AI Tab Error Boundary',
  ShareVideoPlayerErrorBoundary = 'Share Video Player Error Boundary',
  SharePageCommentsErrorBoundary = 'Share Page Comments Error Boundary',
  EbtPageError = 'EbT Page Error',
  EbtTranscriptError = 'EbT Transcript Error',
  InviteLinkAcceptPageErrorBoundary = 'Invite Link Accept Page Error Boundary',
  ModalDevToolsError = 'Modal DevTools Error',
}

export enum SignupSuccessMarkers {
  // Note: Signup navigation is different from the above anon nav for Share Page
  Navigation = 'Signup Navigation Loaded',
  Form = 'Signup Form Loaded',
  Testimonial = 'Signup Testimonial Loaded',
}

export enum AiFeatureMarkers {
  AutoTitle = 'Auto Title',
  AutoTitleLoading = 'Auto Title Loading',
  AutoSummary = 'Auto Summary',
  AutoSummaryLoading = 'Auto Summary Loading',
  AutoChapters = 'Auto Chapters',
  AutoChaptersLoading = 'Auto Chapters Loading',
}

export enum LibrarySuccessMarkers {
  VideoGridLoaded = 'Video Grid Loaded',
  FolderGridLoaded = 'Folder Grid Loaded',
}

export enum WelcomeSuccessMarkers {
  WelcomePageLoaded = 'Welcome Page Loaded',
  WelcomeStepLoaded = 'Welcome Step Loaded',
}

// Triggers
export enum TriggerNames {
  TestButtonClicked = 'Test Button Clicked',
  EbtTrimUndoButtonClicked = 'Edit By Transcript Trim or Undo Button Clicked',
}

// Markers associated with a trigger
export enum MarkersForTriggers {
  TestLoaded = 'Test Loaded',
  VideoCanPlay = 'Video Can Play',
}

// Markers that should be uploaded to segment
export const SegmentMarkers = {
  [SuccessMarkers.VideoCanPlay]: SuccessMarkers.VideoCanPlay,
};

export const TriggersWithMarkers = {
  [TriggerNames.TestButtonClicked]: [MarkersForTriggers.TestLoaded],
  [TriggerNames.EbtTrimUndoButtonClicked]: [MarkersForTriggers.VideoCanPlay],
};

export const TrackedVideoProperties = [
  'viewersCanWeave',
  'cta',
  'commentsEnabled',
  'useEmojis',
  'useGif',
  'loomBrandedPlayer',
  'downloadEnabled',
  'showAnalytics',
  'showTranscriptToViewer',
  'suggestedPlaybackRate',
  'uploadComplete',
  'archived',
  'videoProperties',
  'organizationId',
  'privacy',
  'recordReplyEnabled',
  'waveformGeneration',
  'visibility',
  'isOwner',
  'isCommunityLoom',
  'isTeamShared',
  'currentUserCanEdit',
  'noAccess',
  'isOnWatchLaterList',
  'isPinned',
  'whiteLabelPlayer',
  'sourceDuration',
  'playableDuration',
];
