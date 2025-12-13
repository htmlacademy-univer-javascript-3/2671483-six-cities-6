import { AxiosError } from 'axios';
import { DetailErrorData } from '../types/Error.type';

export const getErrorMessage = (error: AxiosError<DetailErrorData>): string => {
  if (error.response?.data) {
    const data = error.response.data;

    if (data.details && data.details.length > 0) {
      return data.details[0].messages[0];
    }

    if (data.message) {
      return data.message;
    }
  }
  return (
    error.message ||
    `An unknown error occurred (${error.response?.status || 'No Status'})`
  );
};
