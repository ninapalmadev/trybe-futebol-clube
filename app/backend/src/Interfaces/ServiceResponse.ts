type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND';

type ServiceResponseSuccessType = 'SUCCESSFUL' | 'NO_CONTENT' | 'CREATED';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: { message: string }
};

export type ServiceResponseSuccess<T> = {
  status: ServiceResponseSuccessType,
  data: T,
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
