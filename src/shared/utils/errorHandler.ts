import { ApiError } from '@shared/api/apiHelpers';
export class RepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RepositoryError';
  }
}

class NetworkError extends RepositoryError {
  constructor(message: string) {
    super(message || 'Network error');
    this.name = 'NetworkError';
  }
}

class DatabaseError extends RepositoryError {
  constructor(message: string) {
    super(message || 'Data base error');
    this.name = 'DatabaseError';
  }
}

export function handleRepositoryError(error: unknown): never {
  //  Sentry.captureException(error);
  if (error instanceof ApiError) {
    const errorMessage = Array.isArray(error.data.message)
      ? error.data.message.join(', ')
      : error.data.message;

    throw new NetworkError(
      errorMessage || 'An error occurred while processing the request.',
    );
  } else if (error instanceof Error) {
    throw new RepositoryError(error.message || 'An unexpected error occurred.');
  } else if (error instanceof DatabaseError) {
    throw new RepositoryError(error.message || 'Data base error');
  } else {
    throw new RepositoryError('An unexpected error occurred.');
  }
}
