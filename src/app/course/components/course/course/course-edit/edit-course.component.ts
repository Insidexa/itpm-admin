import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../course";
import {CourseService} from "../course.service";

@Component({
    selector: `edit-course`,
    templateUrl: `./edit-course.component.html`
})
export class EditCourseComponent implements OnInit {

    public course: Course = new Course();

    constructor(
        private CourseService: CourseService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.CourseService.course(+params['id']).subscribe(course => {
                this.course = course;
            })
        })
    }

    update(course: Course) {
        this.CourseService.update(course).subscribe(() => {
            this.router.navigate(['/panel/courses']);
        });
    }
}