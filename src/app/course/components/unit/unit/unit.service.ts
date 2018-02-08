import {Injectable} from "@angular/core";

import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs";
import "rxjs/operator/map";

import {Unit, Test, Theory, Schema, IPagination, AppHttpClient} from 'itpm-shared';

@Injectable()
export class UnitService {
  private prefix: string;

  private unitSource = new Subject<Unit>();
  private testSource = new Subject<Test>();
  private theorySource = new Subject<Theory>();
  private schemaSource = new Subject<Schema>();
  private eventSource = new Subject<string>();

  unit$ = this.unitSource.asObservable();
  test$ = this.testSource.asObservable();
  theory$ = this.theorySource.asObservable();
  schema$ = this.schemaSource.asObservable();
  event$ = this.eventSource.asObservable();

  constructor(private HttpClient: AppHttpClient) {
    this.prefix = 'units/';
  }

  public pushUnit(unit: Unit) {
    this.unitSource.next(unit);
  }

  public pushTest(test: Test) {
    this.testSource.next(test);
  }

  public pushTheory(theory: Theory) {
    this.theorySource.next(theory);
  }

  public pushSchema(schema: Schema) {
    this.schemaSource.next(schema);
  }

  public callEvent(event: string) {
    this.eventSource.next(event);
  }

  public unit(id: number): Observable<Unit> {
    return this.HttpClient.get<Unit>(`${this.prefix}${id}`);
  }

  public all(lessonId: number): Observable<IPagination<Unit>> {
    return this.HttpClient.get<IPagination<Unit>>(`${this.prefix}?lesson_id=${lessonId}`);
  }

  public store(data: Unit): Observable<Unit> {
    return this.HttpClient.post<Unit>(`${this.prefix}`, data);
  }

  public update(data: Unit): Observable<Unit> {
    return this.HttpClient.patch<Unit>(`${this.prefix}${data.id}`, data);
  }

  public restore(id: number) {
    return this.HttpClient.post<Unit>(`${this.prefix}${id}`, {});
  }

  public delete(id: number) {
    return this.HttpClient.delete(`${this.prefix}${id}`);
  }
}