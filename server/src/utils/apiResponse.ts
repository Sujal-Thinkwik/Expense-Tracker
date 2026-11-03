export type ApiSuccessResponse<T = unknown> = {
  success: true;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  error?: string;
  details?: unknown;
};

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export function successResponse<T>(message: string, data: T): ApiSuccessResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse(
  message: string,
  error?: string,
  details?: unknown
): ApiErrorResponse {
  return {
    success: false,
    message,
    error,
    details,
  };
}
