import { ApiResponseStatus } from '../constans';

export class ApiResponse<T> {
  data: T;
  message: string;
  type: ApiResponseStatus;

  constructor(data: T, message = '', type = ApiResponseStatus.SUCCESS) {
    this.data = data;
    this.message = message;
    this.type = type;
  }
}