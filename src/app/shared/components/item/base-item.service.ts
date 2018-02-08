import {Injectable} from "@angular/core";

import {Observable} from "rxjs";

import {BaseItem} from "./base-item";
import {AppHttpClient, IPagination} from "itpm-shared";

@Injectable()
export class BaseItemService {
  private prefix: string;

  constructor(private HttpClient: AppHttpClient) {
    this.prefix = 'base-url/';
  }

  public course(id: number): Observable<BaseItem> {
    return this.HttpClient.get<BaseItem>(`${this.prefix}${id}`);
  }

  public all(): Observable<IPagination<BaseItem>> {
    return this.HttpClient.get<IPagination<BaseItem>>(`${this.prefix}`);
  }

  public store(baseItem: BaseItem): Observable<BaseItem> {
    return this.HttpClient.post<BaseItem>(`${this.prefix}`, baseItem);
  }

  public update(baseItem: BaseItem): Observable<BaseItem> {
    return this.HttpClient.patch<BaseItem>(`${this.prefix}${baseItem.id}`, baseItem);
  }

  public delete(id: number) {
    return this.HttpClient.delete(`${this.prefix}${id}`);
  }
}