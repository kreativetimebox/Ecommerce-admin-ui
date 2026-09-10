export type CustomerKind = 'B2C' | 'B2B';

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};