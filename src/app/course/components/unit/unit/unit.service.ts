import {Injectable} from "@angular/core";

import 'rxjs/operator/map';
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {HttpService} from "../../../../http.service";
import {Unit} from "./unit";
import {Subject} from "rxjs/Subject";
import {Test} from "../../test/test";
import {Theory} from "../../theory/theory";
import {Schema} from "../../schema/schema";
import {IPagination} from "../../../../helpers/pagination/model/pagination";

@Injectable()
export class UnitService {
    private prefix: string;
    private api: string;

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

    constructor(private HttpService: HttpService) {
        this.prefix = 'units/';
        this.api = `${this.HttpService.adminPrefix}${this.prefix}`;
    }

    pushUnit(unit: Unit) {
        this.unitSource.next(unit);
    }

    pushTest (test: Test) {
        this.testSource.next(test);
    }

    pushTheory (theory: Theory) {
        this.theorySource.next(theory);
    }

    pushSchema (schema: Schema) {
        this.schemaSource.next(schema);
    }

    callEvent(event: string) {
        this.eventSource.next(event);
    }

    unit(id: number): Observable<Unit> {
        return this.HttpService.get(`${this.api}${id}`).map((data: Response) => {
            return new Unit(data.json().data);
        });
    }

    all(lessonId: number): Observable<IPagination<Unit>> {
        return this.HttpService.get(`${this.api}?lesson_id=${lessonId}`)
            .map((data: Response) => data.json().data);
    }

    store(data: Unit): Observable<Unit> {
        return this.HttpService.post(`${this.api}`, data).map((data: Response) => {
            return new Unit(data.json().data);
        });
    }

    update(data: Unit) {
        return this.HttpService.patch(`${this.api}${data.id}`, data).map((data: Response) => {
            return data.json();
        });
    }

    delete(id: number) {
        return this.HttpService.delete(`${this.api}${id}`).map((data: Response) => {
            return data.json();
        });
    }
}