import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import 'rxjs/operator/map';

import {LessonService} from "./lesson/lesson.service";
import {Lesson} from "./lesson/lesson";
import {PaginationService} from "../../../helpers/services/pagination/pagination.service";
import {IPagination} from "../../../helpers/services/pagination/pagination";


@Component({
    selector: `lessons`,
    templateUrl: `./lessons.component.html`
})
export class LessonsComponent implements OnInit {
    public lesson: Lesson = new Lesson();

    constructor(private LessonService: LessonService,
                private ActivatedRoute: ActivatedRoute,
                private lessons: PaginationService<Lesson>) {}

    ngOnInit() {
        this.ActivatedRoute.params.subscribe(params => {
            const courseId: number = +params['id'];
            this.lesson.course_id = courseId;
            this.LessonService.all(courseId).subscribe((lessons: IPagination<Lesson>) => {
                this.lessons.update(lessons);
            });
        })
    }

    addLesson(lesson: Lesson) {
        this.LessonService.store(lesson).subscribe((lesson: Lesson) => {
            this.lessons.add(lesson);
        });
    }

    removeLesson(id) {
        this.LessonService.delete(id).subscribe(() => {
            this.lessons.remove(id);
        });
    }
}