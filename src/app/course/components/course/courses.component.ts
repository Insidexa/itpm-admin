import {Component, OnInit} from "@angular/core";

import 'rxjs/operator/map';

import {CourseService} from "./course/course.service";
import {Course} from "./course/course";
import {PaginationService} from "../../../helpers/services/pagination/pagination.service";
import {IPagination} from "../../../helpers/services/pagination/pagination";

@Component({
    selector: `courses`,
    templateUrl: `./courses.component.html`
})
export class CoursesComponent implements OnInit {
    public course: Course = new Course();
    public PAGE_SIZE: number = 1;
    public MAX_SIZE: number = 5;

    constructor(private CourseService: CourseService,
                private courses: PaginationService<Course>) {
    }

    ngOnInit() {
        this.CourseService.all().subscribe((pagination: IPagination<Course>) => {
            this.courses.update(pagination);
        });
    }

    addCourse(course: Course) {
        this.CourseService.store(course).subscribe(response => {
            this.courses.add(response.data);
            this.course = new Course();
        });
    }

    removeCourse(id: number) {
        this.CourseService.delete(id).subscribe(() => {
            this.courses.remove(id);
        });
    }
}