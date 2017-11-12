import {Component, OnInit} from "@angular/core";

import 'rxjs/operator/map';
import {CourseService} from "./course.service";
import {Course} from "./course";

@Component({
    selector: `courses`,
    templateUrl: `./courses.component.html`
})
export class CoursesComponent implements OnInit {
    public courses: Array<Object> = [];

    public course: Course = new Course();

    constructor(private CourseService: CourseService) {
    }

    ngOnInit() {
        this.CourseService.all().subscribe(response => {
            this.courses = response.data;
        });
    }

    addCourse() {
        this.CourseService.store(this.course).subscribe(response => {
            this.courses.push(response.data);
            this.course = new Course();
        })
    }

    removeCourse($event, id) {
        $event.preventDefault();
        $event.stopPropagation();
        this.CourseService.delete(id).subscribe(() => {
            this.courses.map((course:any, index) => {
                if (course.id === id) {
                    this.courses.splice(index, 1);
                }
            });
        })
    }
}