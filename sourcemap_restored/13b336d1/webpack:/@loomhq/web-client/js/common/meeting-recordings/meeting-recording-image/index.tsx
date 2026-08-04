import React from 'react';

import styles from './styles.module.css';

type MeetingRecordingImageProps = {
  size?: 'small' | 'large';
};
export function MeetingRecordingImage({
  size = 'large',
}: MeetingRecordingImageProps): JSX.Element {
  return (
    <video
      autoPlay
      // a11y improvement: allow user to control the video
      controls
      width={size === 'large' ? 647 : 320}
      height={size === 'large' ? 364 : 184}
      className={
        size === 'large' ? styles.aspectRatioLarge : styles.aspectRatioSmall
      }
      loop
      muted
      playsInline
      poster="https://cdn.loom.com/assets/marketing/use-case/meeting.png"
    >
      <source
        src="https://cdn.loom.com/assets/video/Loom-MeetingRecording.webm"
        type="video/webm"
      />
      <source
        src="https://cdn.loom.com/assets/video/Loom-MeetingRecording.mp4"
        type="video/mp4"
      />
    </video>
  );
}

/**
 * Alternative option for meeting recording image if user has
 * access to Automated/AI-powered meeting notes
 */
export function MeetingRecordingAMNImage({
  size = 'large',
}: MeetingRecordingImageProps): JSX.Element {
  return (
    <video
      autoPlay
      // a11y improvement: allow user to control the video
      controls
      width={size === 'large' ? 647 : 320}
      height={size === 'large' ? 364 : 184}
      className={
        size === 'large' ? styles.aspectRatioLarge : styles.aspectRatioSmall
      }
      loop
      muted
      playsInline
      poster="https://cdn.loom.com/assets/marketing/use-case/meeting.png"
    >
      <source
        src="https://cdn.loom.com/assets/video/Loom-AMN_Onboarding.webm"
        type="video/webm"
      />
      <source
        src="https://cdn.loom.com/assets/video/Loom-AMN_Onboarding.mp4"
        type="video/mp4"
      />
    </video>
  );
}
