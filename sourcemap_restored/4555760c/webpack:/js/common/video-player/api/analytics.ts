type AnalyticsInterface = {
  track: (event: string, payload?: Record<string, unknown>) => void;
};

let analyticsImpl: AnalyticsInterface;

export enum Events {
  EXTENDED_REACTION_BUTTON_CLICKED = 'Extended_Reaction_Button_Clicked',
  EXTENDED_REACTION_SEARCH_CLICKED = 'Extended_Reaction_Search_Clicked',
  EXTENDED_REACTION_SEARCHED = 'Extended_Reaction_Searched',
  FREQUENT_EXTENDED_REACTION_CLICKED = 'Frequent_extended_reaction_clicked',
  QUICK_ADD_EMOJI_PICKER_OPENED = 'Quick_Add_Emoji_Picker_Opened',
  QUICK_ADD_EMOJI_USED = 'Quick_Add_Emoji_Used',
  QUALITY_SELECTOR_CHANGE = 'Quality_selector_Change',
  SKIN_TONE_SELECTED = 'Skin_Tone_Selected',
  EMOJI_REACTION_LIST_TOGGLED = 'Emoji_Reaction_List_Toggled',
  VIDEO_TIMELINE_CLICKED = 'video_timeline_clicked',
  AI_EOVN_POST_COMMENT_CLICKED = 'AI_EOVN_Post_Comment_Clicked',
  AI_EOVN_NUDGE_CLICKED = 'AI_EOVN_Nudge_Clicked',
}

/* eslint-disable camelcase */
type TrackedEvents =
  | {
      event: Events.EXTENDED_REACTION_BUTTON_CLICKED;
      payload: { video_id: string };
    }
  | {
      event: Events.EXTENDED_REACTION_SEARCHED;
      payload: { video_id?: string; placeUsed?: string };
    }
  | {
      event: Events.EXTENDED_REACTION_SEARCH_CLICKED;
      payload: { video_id?: string };
    }
  | {
      event: Events.FREQUENT_EXTENDED_REACTION_CLICKED;
      payload: {
        video_id?: string;
        selected_emoji: string;
        is_suggested: boolean;
      };
    }
  | {
      event: Events.QUICK_ADD_EMOJI_PICKER_OPENED;
      payload: {
        video_id: string;
      };
    }
  | {
      event: Events.QUICK_ADD_EMOJI_USED;
      payload: {
        video_id: string;
        selected_emoji: string;
        // added from the emoji picker or from the full name (:<emojiName>:)
        from: 'picker' | 'full typed name';
      };
    }
  | {
      event: Events.SKIN_TONE_SELECTED;
      payload: { video_id?: string; skinTone: string };
    }
  | {
      event: Events.EMOJI_REACTION_LIST_TOGGLED;
      payload: { video_id?: string; variant: string };
    }
  | {
      event: Events.VIDEO_TIMELINE_CLICKED;
      payload: {
        video_id: string;
        timeline_timestamp: string | null;
      };
    }
  | {
      event: Events.AI_EOVN_POST_COMMENT_CLICKED;
      payload: {
        video_id: string;
        variant?: string;
        prompt_version: number;
        nudge_type: 'inquiry' | 'affirmation';
        exact_nudge_posted: boolean;
      };
    }
  | {
      event: Events.AI_EOVN_NUDGE_CLICKED;
      payload: {
        video_id: string;
        variant?: string;
        prompt_version: number;
        nudge_type: 'inquiry' | 'affirmation';
        source: 'player overlay' | 'right panel';
      };
    };
/* eslint-enable camelcase */

export function analyticsInit(analytics: AnalyticsInterface): void {
  if (!analyticsImpl) {
    analyticsImpl = analytics;
  }
}

export function track(event: TrackedEvents): void {
  if (analyticsImpl) {
    analyticsImpl.track(event.event, event.payload);
  }
}
