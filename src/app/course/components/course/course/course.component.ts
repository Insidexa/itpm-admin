import {Component, EventEmitter, Input, Output} from "@angular/core";

import {Course} from "./course";

@Component({
    selector: `course`,
    templateUrl: `./course.component.html`
})
export class CourseComponent {

    @Input() course: Course;
    @Output() onRemove = new EventEmitter<number>();

    removeCourse($event) {
        $event.preventDefault();
        $event.stopPropagation();

        this.onRemove.emit(this.course.id);
    }

}