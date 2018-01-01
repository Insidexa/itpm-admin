import {IPagination} from "./pagination";
import {Injectable} from "@angular/core";
import {HttpService} from "app/http.service";
import {Response} from "@angular/http";

import 'rxjs/operator/map';
import 'rxjs/operator/do';

@Injectable()
export class PaginationService<T> implements IPagination<T> {
    current_page: number;
    data: T[];
    from: number;
    last_page: number;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;

    constructor(private HttpService: HttpService) {}

    set cur_page (page: number) {
        if (page) {
            this.current_page = page;
            this.loadData();
        }
    }

    protected loadData() {
        this.HttpService
            .get(this.buildPath())
            .map((response: Response) => {
                return response.json().data;
            })
            .do((pagination: IPagination<T>) => {
                this.update(pagination);
            })
            .subscribe();
    }

    public update(pagination: IPagination<T>) {
        Object.assign(this, pagination);
    }

    public updateModel (data: Array<T>) {
        this.data = data;
    }

    public buildPath (): string {
        const path = this.path.replace(`${this.HttpService.apiUrl}${this.HttpService.apiPrefix}`, '');
        return `${path}?page=${this.current_page}`;
    }

    public remove(id: number) {
        const index = this.data.findIndex((_model: T) => _model['id'] === id);
        this.data.splice(index, 1);
        this.loadData();
    }

    public add(model: T) {
        this.data.push(model);
    }

}