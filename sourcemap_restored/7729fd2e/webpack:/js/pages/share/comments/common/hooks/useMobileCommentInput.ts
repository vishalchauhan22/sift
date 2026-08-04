import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';
import { ReplyFromServer } from '@js/pages/share/common/comments/replyFromServer';
import create from 'zustand';

interface MobileCommentInputState {
  isOpen: boolean;
  replyId: string | null;
  comment: CommentFromServer | ReplyFromServer | null;
  setIsOpen: (isOpen: boolean) => void;
  setReplyId: (replyId: string | null) => void;
  setComment: (comment: CommentFromServer | ReplyFromServer | null) => void;
}

export const useMobileCommentInput = create<MobileCommentInputState>(set => ({
  isOpen: false,
  replyId: null,
  comment: null,
  setIsOpen: isOpen => set({ isOpen }),
  setReplyId: replyId => set({ replyId }),
  setComment: comment => set({ comment }),
}));
