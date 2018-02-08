import {Injectable} from "@angular/core";

import {Observable} from "rxjs/Observable";
import "rxjs/operator/map";

import {AppHttpClient, Schema} from 'itpm-shared';

@Injectable()
export class SchemaPageService {
  private prefix: string;

  constructor(private HttpClient: AppHttpClient) {
    this.prefix = 'schema/';
  }

  store(schema: Schema): Observable<Schema> {
    return this.HttpClient.post<Schema>(`${this.prefix}`, schema);
  }
}