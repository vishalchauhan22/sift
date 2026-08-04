import create from 'zustand';

interface LoginState {
  email_error: string | null;
  is_fetching: boolean;
  password_error: string | null;
  plain_error: string | null;
}

interface LoginActions {
  updateLoginEmailError: (err: string | null) => void;
  updateLoginIsFetching: (isFetching: boolean) => void;
  updateLoginPasswordError: (err: string | null) => void;
  updateLoginPlainError: (err: string | null) => void;
  clearLoginErrors: () => void;
}

type LoginStore = LoginState & LoginActions;

const DEFAULT_LOGIN_STATE: LoginState = {
  email_error: null,
  is_fetching: false,
  password_error: null,
  plain_error: null,
};

const loginStore = create<LoginStore>(set => ({
  ...DEFAULT_LOGIN_STATE,

  updateLoginEmailError: (err: string | null) =>
    set(state => ({ ...state, email_error: err })),

  updateLoginIsFetching: (isFetching: boolean) =>
    set(state => ({ ...state, is_fetching: isFetching })),

  updateLoginPasswordError: (err: string | null) =>
    set(state => ({ ...state, password_error: err })),

  updateLoginPlainError: (err: string | null) =>
    set(state => ({ ...state, plain_error: err })),

  clearLoginErrors: () =>
    set(state => ({
      ...state,
      plain_error: null,
      email_error: null,
      password_error: null,
    })),
}));

/**
 * Unified hook for login state management
 * Provides access to both state and actions in a single hook
 *
 * @example
 * const login = useLoginStore();
 *
 * // Access state
 * console.log(login.emailError, login.isFetching);
 *
 * // Use actions
 * login.updateEmailError('Invalid email');
 * login.setFetching(true);
 */
export const useLoginStore = (): {
  emailError: string | null;
  isFetching: boolean;
  passwordError: string | null;
  plainError: string | null;
  updateLoginEmailError: (err: string | null) => void;
  updateLoginIsFetching: (isFetching: boolean) => void;
  updateLoginPasswordError: (err: string | null) => void;
  updateLoginPlainError: (err: string | null) => void;
  clearLoginErrors: () => void;
} => {
  const store = loginStore();

  return {
    // State (with more intuitive names)
    emailError: store.email_error,
    isFetching: store.is_fetching,
    passwordError: store.password_error,
    plainError: store.plain_error,

    // Original action names for backward compatibility
    updateLoginEmailError: store.updateLoginEmailError,
    updateLoginIsFetching: store.updateLoginIsFetching,
    updateLoginPasswordError: store.updateLoginPasswordError,
    updateLoginPlainError: store.updateLoginPlainError,
    clearLoginErrors: store.clearLoginErrors,
  };
};
