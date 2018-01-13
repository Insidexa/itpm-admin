import {Component, Input, OnInit} from "@angular/core";

import {Course} from "./course";
import {BaseItemFunctionality} from "../../base/item/base-functionality";

@Component({
    selector: `course`,
    templateUrl: `./course.component.html`
})
export class CourseComponent extends BaseItemFunctionality implements OnInit {
    @Input() course: Course;

    ngOnInit() {
        this.routes.child.name = 'lessons';
        this.routes.child.params = {'id': this.course.id};

        this.routes.edit.name = 'editCourse';
        this.routes.edit.params = {'id': this.course.id};
    }
}