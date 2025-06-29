export interface IApiResponse<T> {
    success: boolean;
    message: string;
    result: T;
}