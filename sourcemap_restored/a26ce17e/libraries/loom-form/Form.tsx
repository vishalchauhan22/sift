import React from 'react';

import { useFormState } from 'react-hook-form';

import { usePrevious } from './helpers/usePrevious';
import styles from './style.module.less';

import type { FieldValues, UseFormStateProps } from 'react-hook-form';

type Props<FormValues extends FieldValues> = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> &
  UseFormStateProps<FormValues>;

export function Form<FormValues extends FieldValues = object>({
  children,
  ...props
}: Props<FormValues>): JSX.Element {
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const { isSubmitting, isValidating, isValid } = useFormState({
    control: props.control || undefined,
  });

  const previouslyValidating = usePrevious(isValidating);
  const previouslySubmitting = usePrevious(isSubmitting);

  React.useEffect(() => {
    if (previouslySubmitting && !previouslyValidating && !isValid) {
      const form = formRef.current;

      if (form) {
        const invalidControl = form.querySelector(
          '[aria-invalid="true"]'
        ) as HTMLElement | null;

        if (invalidControl) {
          if (invalidControl.scrollIntoView) {
            invalidControl.scrollIntoView({ behavior: 'smooth' });
          }

          invalidControl.focus();
        }
      }
    }
  }, [previouslySubmitting, previouslyValidating, isValid]);

  return (
    <form ref={formRef} className={`${styles['loom-form']}`} {...props}>
      {children}
    </form>
  );
}
