export interface ApiResponse<T = unknown> {
  success:    boolean
  data:       T
  message:    string
  pagination?: Pagination
}

export interface Pagination {
  total:   number
  page:    number
  limit:   number
  hasMore: boolean
}

export class AppError extends Error {
  constructor(
    public message:    string,
    public statusCode: number = 500,
    public code?:      string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function successResponse<T>(data: T, message = 'OK', pagination?: Pagination): ApiResponse<T> {
  return { success: true, data, message, pagination }
}

export function errorResponse(message: string, code?: string): Omit<ApiResponse<null>, 'data'> & { data: null } {
  return { success: false, data: null, message, ...(code && { code }) }
}
