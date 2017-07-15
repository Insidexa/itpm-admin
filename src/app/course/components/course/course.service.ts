import {Injectable} from "@angular/core";

import 'rxjs/operator/map';
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {HttpService} from "../../../http.service";
import {Course} from "./course";

@Injectable()
export class CourseService {
    private prefix: string;
    constructor(private http: HttpService) {
        this.prefix = 'courses/';
    }

    course(id: number): Observable<Course> {
        return this.http.get(`${this.http.adminPrefix}${this.prefix}${id}`).map((data: Response) => {
            return new Course(data.json().data);
        });
    }

    all() {
        return this.http.get(`${this.http.adminPrefix}${this.prefix}`).map((data: Response) => {
            return data.json();
        });
    }

    store(data) {
        return this.http.post(`${this.http.adminPrefix}${this.prefix}`, data).map((data: Response) => {
            return data.json();
        });
    }

    update(data) {
        return this.http.patch(`${this.http.adminPrefix}${this.prefix}${data.id}`, data).map((data: Response) => {
            return data.json();
        });
    }

    delete(id:number) {
        return this.http.delete(`${this.http.adminPrefix}${this.prefix}${id}`).map((data: Response) => {
            return data.json();
        });
    }
}