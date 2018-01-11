import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs/Observable";
import 'rxjs/operator/map';

import {Schema} from "./schema";

@Injectable()
export class SchemaService {
    private prefix: string;

    constructor(private HttpClient: HttpClient) {
        this.prefix = 'schema/';
    }

    store(schema: Schema): Observable<Schema> {
        return this.HttpClient.post<Schema>(`${this.prefix}`, schema);
    }
}