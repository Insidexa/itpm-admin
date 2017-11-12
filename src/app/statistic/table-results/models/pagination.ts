export interface IPagination {
    current_page: number;
    data: Array<any>;
    from: number;
    last_page: number;
    next_page_url: null|number;
    path: string;
    per_page: number;
    prev_page_url: null|number;
    to: number;
    total: number;
}