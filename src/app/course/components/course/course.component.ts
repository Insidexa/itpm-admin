import {Component, OnInit} from "@angular/core";
import {Course} from "./course";
import {Lesson} from "../lesson/lesson";
import {LessonService} from "../lesson/lesson.service";
import {CourseService} from "./course.service";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: `course`,
    templateUrl: `./course.component.html`
})
export class CourseComponent implements OnInit {

    public course: Course = new Course();
    public lesson: Lesson = new Lesson();
    public lessons: Array<Lesson> = [];

    constructor(
        private CourseService: CourseService,
        private LessonService: LessonService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            let courseId:number = +params['id'];

            this.CourseService.course(courseId).subscribe(course => {
                this.course = course;
                this.lesson.cource_id = this.course.id;
            });
            this.LessonService.all(courseId).subscribe(lessons => {
                this.lessons = lessons;
            })
        });
    }

    addLesson() {
        this.LessonService.store(this.lesson).subscribe(lesson => {
            this.lessons.push(lesson);
        })
    }

    removeLesson($event, id) {
        $event.preventDefault();
        $event.stopPropagation();
        this.LessonService.delete(id).subscribe(() => {
            this.lessons.map((lesson, index) => {
                if (lesson.id === id) this.lessons.splice(index, 1);
            })
        });
    }
}