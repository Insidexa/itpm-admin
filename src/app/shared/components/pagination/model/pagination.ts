export interface IPagination<T> {
    current_page: number;
    data: Array<T>;
    from: number;
    last_page: number;
    next_page_url: null | string;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    to: number;
    total: number;
}