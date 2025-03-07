interface ApiResponse<T> {
    status: 'success' | 'error';
    data?: T;
    message?: string;
    error?: string;
}

export default ApiResponse;