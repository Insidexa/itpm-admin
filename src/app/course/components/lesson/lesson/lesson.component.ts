import {Component, Input, EventEmitter, Output} from "@angular/core";

import {Lesson} from "./lesson";
import {Unit} from "../../unit/unit/unit";

@Component({
    selector: 'lesson',
    templateUrl: `./lesson.component.html`
})
export class LessonComponent {

    @Input() lesson: Lesson;
    @Output() onRemove = new EventEmitter<number>();

    public unit: Unit = new Unit();

    removeLesson($event) {
        $event.preventDefault();
        $event.stopPropagation();

        this.onRemove.emit(this.lesson.id);
    }
}