import { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';
import { describe, expect, it } from 'vitest';
import { DetailErrorData } from '../types/error.type';
import { getErrorMessage } from './error-formatter';

describe('Utils: getErrorMessage', () => {
  const createMockAxiosError = (
    data?: DetailErrorData,
    message?: string,
    status?: number
  ): AxiosError<DetailErrorData> =>
    ({
      isAxiosError: true,
      name: 'AxiosError',
      message: message || '',
      config: { headers: new AxiosHeaders() },
      code: 'ERR_BAD_REQUEST',
      response: data
        ? ({
          data,
          status: status || 400,
          statusText: 'Bad Request',
          headers: {},
          config: { headers: new AxiosHeaders() },
        } as AxiosResponse<DetailErrorData>)
        : undefined,
      toJSON: () => ({}),
    } as AxiosError<DetailErrorData>);

  it('should return message from details array if present', () => {
    const errorData: DetailErrorData = {
      message: 'Validation failed',
      details: [
        {
          type: 'ValidationError',
          messages: ['Email must be a valid email address'],
        },
      ],
    };
    const error = createMockAxiosError(errorData);

    expect(getErrorMessage(error)).toBe('Email must be a valid email address');
  });

  it('should return top-level message if details are empty', () => {
    const errorData: DetailErrorData = {
      message: 'Service unavailable',
      details: [],
    };
    const error = createMockAxiosError(errorData);

    expect(getErrorMessage(error)).toBe('Service unavailable');
  });

  it('should return error.message if no response data is available', () => {
    const error = createMockAxiosError(undefined, 'Network Error');

    expect(getErrorMessage(error)).toBe('Network Error');
  });

  it('should return fallback message with status if everything else is missing', () => {
    const error = createMockAxiosError(undefined, '', 500);
    error.response = { status: 500 } as AxiosResponse<DetailErrorData>;

    expect(getErrorMessage(error)).toBe('An unknown error occurred (500)');
  });
});
