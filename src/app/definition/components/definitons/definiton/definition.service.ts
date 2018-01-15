import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {IPagination} from "../../../../shared/components/pagination/model/pagination";
import {Definition} from "./definition.model";

@Injectable()
export class DefinitionService {

    private prefix: string;

    constructor(private HttpClient: HttpClient) {
        this.prefix = 'definitions/';
    }

    public all(): Observable<IPagination<Definition>> {
        return this.HttpClient.get<IPagination<Definition>>(`${this.prefix}`);
    }

    public course(id: number): Observable<Definition> {
        return this.HttpClient.get<Definition>(`${this.prefix}${id}`);
    }

    public store(data: Definition): Observable<Definition> {
        return this.HttpClient.post<Definition>(`${this.prefix}`, data);
    }

    public update(data: Definition): Observable<Definition> {
        return this.HttpClient.patch<Definition>(`${this.prefix}${data.id}`, data);
    }

    public restore (id: number) {
        return this.HttpClient.post(`${this.prefix}${id}/restore`, {});
    }

    public delete(id: number) {
        return this.HttpClient.delete(`${this.prefix}${id}`);
    }
}