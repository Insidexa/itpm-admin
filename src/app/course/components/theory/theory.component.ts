import {Component, OnDestroy, OnInit} from "@angular/core";
import {Theory} from "./theory";
import {TheoryService} from "./theory.service";
import {UnitService} from "../unit/unit.service";
import {Unit} from "../unit/unit";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'theory',
    templateUrl: './theory.component.html'
})
export class TheoryComponent implements OnInit, OnDestroy {

    theory: Theory = new Theory();
    subscription: Subscription;

    constructor(private TheoryService: TheoryService,
                private UnitService: UnitService
    ) {}

    ngOnInit() {
        this.subscription = this.UnitService.unit$.subscribe((unit: Unit) => {
            this.theory = unit.theory ? unit.theory : new Theory();
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
        this.TheoryService.store(this.theory).subscribe((promise: Promise<Theory>) => {
            promise.then((theory: Theory) => {
                this.UnitService.pushTheory(theory);
                this.theory = theory;
            });
        })
    }
}