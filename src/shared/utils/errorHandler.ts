import { ApiError } from '@shared/api/apiHelpers';
// import { ErrorResponseData } from '@shared/types/global';
// import { isAxiosError } from 'axios';

export function handleRepositoryError(error: unknown): never {
  //  Sentry.captureException(error);
  // if (isAxiosError<ErrorResponseData>(error)) {}
  if (error instanceof ApiError) {
    const errorMessage = Array.isArray(error.data.message)
      ? error.data.message.join(', ')
      : error.data.message;

    throw new Error(
      errorMessage || 'An error occurred while processing the request.',
    );
  } else if (error instanceof Error) {
    throw new Error(error.message || 'An unexpected error occurred.');
  } else {
    throw new Error('An unexpected error occurred.');
  }
}
