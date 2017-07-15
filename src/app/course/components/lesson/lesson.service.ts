import {Injectable} from "@angular/core";

import 'rxjs/operator/map';
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {HttpService} from "../../../http.service";
import {Lesson} from "./lesson";

@Injectable()
export class LessonService {
    private prefix: string;
    private api: string;

    constructor(private http: HttpService) {
        this.prefix = 'lessons/';
        this.api = `${this.http.adminPrefix}${this.prefix}`;
    }

    lesson(id: number): Observable<Lesson> {
        return this.http.get(`${this.api}${id}`).map((data: Response) => {
            return new Lesson(data.json().data);
        });
    }

    all(courseId: number): Observable<Array<Lesson>> {
        return this.http.get(`${this.api}course/${courseId}`)
            .map((data: Response) => {

                let lessons: Array<Lesson> = [];

                data.json().data.map(lesson => {
                    lessons.push(new Lesson(lesson))
                });

                return lessons;
            });
    }

    store(data: Lesson): Observable<Lesson> {
        return this.http.post(`${this.api}`, data).map((data: Response) => {
            return new Lesson(data.json().data);
        });
    }

    update(data: Lesson) {
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