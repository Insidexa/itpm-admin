import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {Definition} from "../definition.model";

@Component({
    selector: `definition-form`,
    templateUrl: `./definition-form.component.html`
})
export class DefinitionFormComponent implements OnInit {
    @Output() onSubmit = new EventEmitter<Definition>();
    @Input() definition: Definition;

    public definitionGroup: FormGroup;

    constructor(private FormBuilder: FormBuilder) {
        this.definitionGroup = FormBuilder.group({
            'name': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            'description': [null]
        });
    }

    ngOnInit(): void {

    }

    submit () {
        if (this.definitionGroup.valid) {
            this.onSubmit.emit(this.definition);
        }
    }

}