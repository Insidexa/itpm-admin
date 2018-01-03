import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Course} from "../course";
import {CourseService} from "../course.service";
import {NamedRouteService} from "../../../../../helpers/named-route/named-route.service";

@Component({
    selector: `edit-course`,
    templateUrl: `./edit-course.component.html`
})
export class EditCourseComponent implements OnInit {

    public course: Course = new Course();

    constructor(
        private CourseService: CourseService,
        private route: ActivatedRoute,
        private NamedRouteService: NamedRouteService
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
            this.NamedRouteService.navigateByName('courses');
        });
    }
}