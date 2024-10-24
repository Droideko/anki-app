import { FieldValues, FieldPath, UseFormSetError } from 'react-hook-form';

import { ApiError } from '@shared/api/apiHelpers';

export function handleFormError<TFieldValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TFieldValues>,
  field: FieldPath<TFieldValues>,
  defaultMessage = 'Произошла ошибка. Пожалуйста, попробуйте снова.',
) {
  if (error instanceof ApiError) {
    const errorMessage = Array.isArray(error.data.message)
      ? error.data.message.join(', ')
      : error.data.message;

    setError(field, {
      type: 'server',
      message: errorMessage || defaultMessage,
    });
  } else if (error instanceof Error) {
    setError(field, {
      type: 'server',
      message: error.message || defaultMessage,
    });
  } else {
    setError(field, {
      type: 'server',
      message: defaultMessage,
    });
  }
}
