import {Injectable} from "@angular/core";

import {Observable} from "rxjs/Observable";

import {IPagination, Definition, AppHttpClient} from "itpm-shared";

@Injectable()
export class DefinitionService {

  private prefix: string;

  constructor(private HttpClient: AppHttpClient) {
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

  public restore(id: number) {
    return this.HttpClient.post(`${this.prefix}${id}/restore`, {});
  }

  public delete(id: number) {
    return this.HttpClient.delete(`${this.prefix}${id}`);
  }
}