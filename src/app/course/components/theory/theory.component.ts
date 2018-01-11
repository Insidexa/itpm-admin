import {Component, OnDestroy, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {Subscription} from "rxjs/Subscription";

import {Theory} from "./theory";
import {TheoryService} from "./theory.service";
import {UnitService} from "../unit/unit/unit.service";
import {Unit} from "../unit/unit/unit";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'theory',
    templateUrl: './theory.component.html'
})
export class TheoryComponent implements OnInit, OnDestroy {

    public theory: Theory = new Theory();
    private subscription: Subscription;
    public theoryGroup: FormGroup;
    public ATTACHMENT_URL: string = environment.attachments;

    constructor(private TheoryService: TheoryService,
                private UnitService: UnitService,
                private FormBuilder: FormBuilder
    ) {
        this.theoryGroup = this.FormBuilder.group({
            'iframe': [null, Validators.required],
        });
    }

    ngOnInit() {
        this.subscription = this.UnitService.unit$.subscribe((unit: Unit) => {
            this.theory = unit.theory ? unit.theory : new Theory();
            this.theory.unit_id = unit.id;
        });

        this.UnitService.callEvent('theory');
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSelectFile($event) {
        this.theory.file = $event.srcElement.files[0];
    }

    save() {
        if (this.theoryGroup.valid) {
            this.TheoryService.store(this.theory).subscribe((theory: Theory) => {
                this.TheoryService.attachFile(this.theory.file, theory.id).subscribe((file) => {
                    this.UnitService.pushTheory(theory);
                    theory.file = file;
                    this.theory = theory;
                });
            });
        }
    }
}