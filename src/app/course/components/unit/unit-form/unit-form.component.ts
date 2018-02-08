import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Unit} from 'itpm-shared';

@Component({
  selector: `unit-form`,
  templateUrl: `./unit-form.component.html`
})
export class UnitFormComponent {
  @Output() onSubmit = new EventEmitter<Unit>();
  @Input() unit: Unit;

  public unitGroup: FormGroup;

  constructor(private FormBuilder: FormBuilder) {
    this.unitGroup = FormBuilder.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'description': [null]
    });
  }

  submit() {
    if (this.unitGroup.valid) {
      this.onSubmit.emit(this.unit);
    }
  }

}