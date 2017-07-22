import {Injectable} from "@angular/core";

import 'rxjs/operator/map';
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {HttpService} from "../../../http.service";
import {Unit} from "./unit";
import {Subject} from "rxjs/Subject";
import {Test} from "../test/test";
import {Theory} from "../theory/theory";
import {Schema} from "../schema/schema";

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

    constructor(private http: HttpService) {
        this.prefix = 'units/';
        this.api = `${this.http.adminPrefix}${this.prefix}`;
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
        return this.http.get(`${this.api}${id}`).map((data: Response) => {
            return new Unit(data.json().data);
        });
    }

    all(lessonId: number): Observable<Array<Unit>> {
        return this.http.get(`${this.api}lesson/${lessonId}`)
            .map((data: Response) => {

                let units: Array<Unit> = [];

                data.json().data.map(unit => {
                    units.push(new Unit(unit))
                });

                return units;
            });
    }

    store(data: Unit): Observable<Unit> {
        return this.http.post(`${this.api}`, data).map((data: Response) => {
            return new Unit(data.json().data);
        });
    }

    update(data: Unit) {
        return this.http.patch(`${this.api}${data.id}`, data).map((data: Response) => {
            return data.json();
        });
    }

    delete(id: number) {
        return this.http.delete(`${this.api}${id}`).map((data: Response) => {
            return data.json();
        });
    }
}