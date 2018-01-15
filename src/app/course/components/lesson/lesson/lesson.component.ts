import {Component, Input, OnInit} from "@angular/core";

import {Lesson} from "./lesson";
import {Unit} from "../../unit/unit/unit";
import {BaseItemFunctionality} from "../../../../shared/components/item/base-functionality";

@Component({
    selector: 'lesson',
    templateUrl: `./lesson.component.html`
})
export class LessonComponent extends BaseItemFunctionality implements OnInit {
    @Input() lesson: Lesson;

    public unit: Unit = new Unit();

    ngOnInit() {
        this.routes.child.name = 'units';
        this.routes.child.params = {
            'courseId': this.lesson.course_id,
            'id': this.lesson.id
        };

        this.routes.edit.name = 'editLesson';
        this.routes.edit.params = {
            'id': this.lesson.id
        };
    }
}