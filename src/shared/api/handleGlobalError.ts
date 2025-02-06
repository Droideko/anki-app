import { AxiosError } from 'axios';

import { ErrorResponseData } from '@shared/types/global';

function handleGlobalError(error: AxiosError<ErrorResponseData>) {
  if (error.response) {
    const { status, data } = error.response;

    console.error(`Error ${status}:`, data?.message || data);
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Request error:', error.message);
  }
}

export default handleGlobalError;
