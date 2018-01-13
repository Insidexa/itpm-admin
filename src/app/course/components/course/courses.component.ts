import {Component, OnInit} from "@angular/core";

import 'rxjs/operator/map';

import {CourseService} from "./course/course.service";
import {Course} from "./course/course";
import {PaginationService} from "../../../helpers/pagination/service/pagination.service";
import {IPagination} from "../../../helpers/pagination/model/pagination";

@Component({
    selector: `courses`,
    templateUrl: `./courses.component.html`,
    providers: [ PaginationService ]
})
export class CoursesComponent implements OnInit {
    public course: Course = new Course();

    constructor(private CourseService: CourseService,
                public courses: PaginationService<Course>) {
    }

    ngOnInit() {
        this.CourseService.all().subscribe((pagination: IPagination<Course>) => {
            this.courses.update(pagination);
        });
    }

    addCourse(newCourse: Course) {
        this.CourseService.store(newCourse).subscribe((course: Course) => {
            this.courses.add(course);
            this.course = new Course();
        });
    }

    removeCourse(id: number) {
        this.CourseService.delete(id).subscribe(() => {
            this.courses.remove(id);
        });
    }

    restoreCourse(id: number) {
        this.CourseService.restore(id).subscribe(() => {
            //this.courses.remove(id);
        });
    }
}