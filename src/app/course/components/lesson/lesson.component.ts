import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Lesson} from "./lesson";
import {Unit} from "../unit/unit";
import {UnitService} from "../unit/unit.service";
import {LessonService} from "./lesson.service";

@Component({
    selector: 'lesson',
    templateUrl: `./lesson.component.html`
})
export class LessonComponent implements OnInit {

    public lesson: Lesson = new Lesson();
    public unit: Unit = new Unit();
    public courseId: number;

    constructor(
        private UnitService: UnitService,
        private LessonService: LessonService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            let lessonId:number = +params['id'];
            this.courseId = +params['courseId'];

            this.LessonService.lesson(lessonId).subscribe(course => {
                this.lesson = course;
                this.unit.lesson_id = this.lesson.id;
            });
        });
    }

    addUnit() {
        this.UnitService.store(this.unit).subscribe(lesson => {
            this.lesson.units.push(lesson);
        })
    }

    removeUnit($event, id) {
        $event.preventDefault();
        $event.stopPropagation();
        this.UnitService.delete(id).subscribe(() => {
            this.lesson.units.map((unit, index) => {
                if (unit.id === id) this.lesson.units.splice(index, 1);
            })
        });
    }
}