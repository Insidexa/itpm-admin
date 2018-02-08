import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Lesson} from 'itpm-shared';

@Component({
  selector: `lesson-form`,
  templateUrl: `./lesson-form.component.html`
})
export class LessonFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Lesson>();
  @Input() lesson: Lesson;

  public lessonGroup: FormGroup;

  constructor(private FormBuilder: FormBuilder) {
    this.lessonGroup = FormBuilder.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'description': [null]
    });
  }

  ngOnInit(): void {

  }

  submit() {
    if (this.lessonGroup.valid) {
      this.onSubmit.emit(this.lesson);
    }
  }

}