import {Injectable} from "@angular/core";
import {HttpService} from "../../../http.service";
import {Schema} from "./schema";
import {Observable} from "rxjs/Observable";
import {Response} from '@angular/http';

import 'rxjs/operator/map';

@Injectable()
export class SchemaService {
    private prefix: string;
    private api: string;

    constructor(private http: HttpService) {
        this.prefix = 'schema/';
        this.api = `${this.http.adminPrefix}${this.prefix}`;
    }

    store(schema: Schema): Observable<Schema> {
        return this.http.post(`${this.api}`, schema).map((data: Response) => {
            return new Schema(data.json());
        });
    }
}