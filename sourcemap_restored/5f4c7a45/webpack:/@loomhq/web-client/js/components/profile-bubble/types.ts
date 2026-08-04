import { LoggedInUser } from '@js/common/current-user';

export type ProfileMenuItems = {
  label: string;
  href?: string;
  onClick?: (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
};

export type ProfileData = Pick<
  LoggedInUser,
  'avatars' | 'id' | 'firstName' | 'lastName' | 'email' | 'role'
>;

export const defaultProfileData: ProfileData = {
  avatars: [],
  id: NaN,
  firstName: null,
  lastName: null,
  email: '',
  role: '',
};
