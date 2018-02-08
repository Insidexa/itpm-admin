import {Injectable} from "@angular/core";

import {Observable} from "rxjs";

import {AppHttpClient, Course, IPagination} from "itpm-shared";

@Injectable()
export class CourseService {
  private prefix: string;

  constructor(private HttpClient: AppHttpClient) {
    this.prefix = 'courses/';
  }

  public course(id: number): Observable<Course> {
    return this.HttpClient.get<Course>(`${this.prefix}${id}`);
  }

  public all(): Observable<IPagination<Course>> {
    return this.HttpClient.get<IPagination<Course>>(`${this.prefix}`);
  }

  public store(data: Course): Observable<Course> {
    return this.HttpClient.post<Course>(`${this.prefix}`, data);
  }

  public update(data: Course): Observable<Course> {
    return this.HttpClient.patch<Course>(`${this.prefix}${data.id}`, data);
  }

  public restore(id: number) {
    return this.HttpClient.post(`${this.prefix}${id}/restore`, {});
  }

  public delete(id: number) {
    return this.HttpClient.delete(`${this.prefix}${id}`);
  }
}