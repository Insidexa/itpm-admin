import {Injectable} from '@angular/core';
import {HttpService} from "../../../http.service";
import {Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {IPagination} from "../models/pagination";

@Injectable()
export class TableResultsService {

    private api: string;
    private params: Object = {};

    constructor(private HttpService: HttpService) {
        this.api = `statistics`;
    }

    protected checkParams() {
        let query = {};
        for (let key in this.params) {
            if (this.params[key]) {
                query[key] = this.params[key];
            }
        }

        return query;
    }

    public getStatistics(): Observable<IPagination> {
        return this
            .HttpService
            .get(`${this.api}`, {search: this.checkParams()})
            .map((response: Response) => response.json().data);
    }

    public byUser(id: number) {
        this.params['user_id'] = id;

        return this;
    }

    public byUnit(id: number) {
        this.params['unit_id'] = id;

        return this;
    }

    public bySearch(search: string) {
        this.params['search'] = search;

        return this;
    }

    public byTab(tab: number) {
        this.params['current_tab'] = tab;

        return this;
    }

    public byStatus(status: number) {
        this.params['status'] = status;

        return this;
    }

    public clearParams() {
        this.params = {};

        return this;
    }

}
