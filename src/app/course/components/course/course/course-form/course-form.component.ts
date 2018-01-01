import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Course} from "../course";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: `course-form`,
    templateUrl: `./course-form.component.html`
})
export class CourseFormComponent implements OnInit {
    @Output() onSubmit = new EventEmitter<Course>();
    @Input() course: Course;

    public courseGroup: FormGroup;

    constructor(private FormBuilder: FormBuilder) {
        this.courseGroup = FormBuilder.group({
            'name': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            'description': [null]
        });
    }

    ngOnInit(): void {

    }

    submit () {
        if (this.courseGroup.valid) {
            this.onSubmit.emit(this.course);
        }
    }

}