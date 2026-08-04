import { useForm as useRHForm } from 'react-hook-form';

import type { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';

export const useForm = <T extends FieldValues>(
  props?: UseFormProps<T>
): UseFormReturn<T> => {
  return useRHForm({
    ...props,
    // react-hook-form's auto focus requires `ref` properties to be accessible
    // for each control. Since Lens does not always expose ref, we roll our own
    // inside Form
    shouldFocusError: false,
  });
};
