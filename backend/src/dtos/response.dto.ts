export type ApiResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: {
        code: string;
        message: string;
      };
    };

export const ok = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

export const fail = (code: string, message: string): ApiResponse<never> => ({
  success: false,
  error: { code, message },
});
