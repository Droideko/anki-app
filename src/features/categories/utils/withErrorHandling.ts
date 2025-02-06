import { handleRepositoryError } from '@shared/utils/errorHandler';

const withErrorHandling = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    handleRepositoryError(error);
  }
};

export default withErrorHandling;
