import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {Lesson} from "../lesson/lesson";
import {LessonService} from "../lesson/lesson.service";
import {NamedRouteService} from "../../../../helpers/named-route/named-route.service";

@Component({
    selector: `edit-lesson`,
    templateUrl: `./edit-lesson.component.html`
})
export class EditLessonComponent implements OnInit {

    public lesson: Lesson = new Lesson();

    constructor(
        private LessonService: LessonService,
        private route: ActivatedRoute,
        private NamedRouteService: NamedRouteService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.LessonService.lesson(+params['id']).subscribe(lesson => {
                this.lesson = lesson;
            });
        });
    }

    update() {
        this.LessonService.update(this.lesson).subscribe(() => {
            this.NamedRouteService.navigateByName('lessons', {id: this.lesson.course_id});
        });
    }
}