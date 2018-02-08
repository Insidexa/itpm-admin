import {Injectable} from "@angular/core";

import {Observable} from "rxjs";

import {AppHttpClient, IPagination, Lesson} from 'itpm-shared';

@Injectable()
export class LessonService {
  private prefix: string;

  constructor(private HttpClient: AppHttpClient) {
    this.prefix = 'lessons/';
  }

  public lesson(id: number): Observable<Lesson> {
    return this.HttpClient.get<Lesson>(`${this.prefix}${id}`);
  }

  public all(courseId: number): Observable<IPagination<Lesson>> {
    return this.HttpClient.get<IPagination<Lesson>>(`${this.prefix}?course_id=${courseId}`);
  }

  public store(data: Lesson): Observable<Lesson> {
    return this.HttpClient.post<Lesson>(`${this.prefix}`, data);
  }

  public update(data: Lesson): Observable<Lesson> {
    return this.HttpClient.patch<Lesson>(`${this.prefix}${data.id}`, data);
  }

  public restore(id: number) {
    return this.HttpClient.post<Lesson>(`${this.prefix}${id}`, {});
  }

  public delete(id: number) {
    return this.HttpClient.delete(`${this.prefix}${id}`);
  }
}