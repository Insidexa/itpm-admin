import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";

import "rxjs/operator/map";
import "rxjs/operator/do";

import {environment} from "../../../../../environments/environment";
import {IPagination} from "../model/pagination";

@Injectable()
export class PaginationService<T> implements IPagination<T> {
    current_page: number;
    data: T[] = [];
    from: number;
    last_page: number;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;

    protected autoUpdateModel: boolean = true;

    constructor(private HttpClient: HttpClient) {
    }

    set cur_page(page: number) {
        this.current_page = page;
    }

    get cur_page() {
        return this.current_page;
    }

    public setPage(page: number) {
        this.cur_page = page;
        this.runModelUpdate();
    }

    protected runModelUpdate() {
        if (this.autoUpdateModel) {
            this.loadData();
        }
    }

    public autoUpdateData(flag: boolean) {
        this.autoUpdateModel = flag;
    }

    protected loadData() {
        this.HttpClient
            .get<any>(this.buildPath())
            .do((pagination: IPagination<T>) => {
                this.update(pagination);
            })
            .subscribe();
    }

    public update(pagination: IPagination<T>) {
        Object.assign(this, pagination);
        this.cur_page = pagination.current_page;
    }

    public updateModel(data: Array<T>) {
        this.data = data;
    }

    public buildPath(): string {
        const requestUrl = `${environment.apiHost}${environment.apiPrefix}${environment.adminPrefix}`;
        const data = this.path.replace(requestUrl, '').split('?');
        const path = data[0];
        let params = new HttpParams({
            fromString: data[1] ? data[1] : ''
        });

        params = params.set('page', this.current_page.toString());

        return `${path}/?${params.toString()}`;
    }

    protected findIndexByParam (value: any, key: string = 'id'): number {
        const index = this.data.findIndex((_model: T) => _model[key] === value);

        if (!this.data[index]) {
            throw new Error(`Item not exists in collection by value '${value}' and key '${key}'`);
        }

        return index;
    }

    public replaceInCollection (value: any, item: T, key: string = 'id') {
        const index = this.findIndexByParam(value, key);

        this.data[index] = item;

        return this;
    }

    public getFromCollection (value: any, key: string = 'id') {
        const index = this.findIndexByParam(value, key);

        return this.data[index];
    }

    public removeFromCollection(value: any, key: string = 'id') {
        const index = this.findIndexByParam(value, key);
        this.data.splice(index, 1);
        this.runModelUpdate();

        return this;
    }

    public addToCollection(model: T) {
        this.data.push(model);

        return this;
    }

}