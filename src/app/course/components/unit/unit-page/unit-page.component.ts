import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";

import {Unit} from "../unit/unit";
import {UnitService} from "../unit/unit.service";
import {Test} from "app/course/components/test/test";
import {Theory} from "../../theory/theory";
import {Schema} from "../../schema/schema";


@Component({
    selector: `unit-page`,
    templateUrl: `./unit-page.component.html`
})
export class UnitPageComponent implements OnInit, OnDestroy {

    private subEvent: Subscription;
    private subTest: Subscription;
    private subTheory: Subscription;
    private subSchema: Subscription;
    public unit: Unit;

    constructor(private UnitService: UnitService,
                private route: ActivatedRoute) {
    }

    public ngOnInit() {
        this.route.params.subscribe(params => {
            let unit: number = +params['id'];

            this.UnitService.unit(unit).subscribe(unit => {

                this.subEvent = this.UnitService.event$.subscribe(() => {
                    this.UnitService.pushUnit(this.unit);
                });

                this.subTest = this.UnitService.test$.subscribe((test: Test) => {
                    this.unit.test = test;
                });

                this.subTheory = this.UnitService.theory$.subscribe((theory: Theory) => {
                    this.unit.theory = theory;
                });

                this.subSchema = this.UnitService.schema$.subscribe((schema: Schema) => {
                    this.unit.schema = schema;
                });

                this.UnitService.pushUnit(unit);

                this.unit = unit;
            });
        });
    }

    public ngOnDestroy() {
        this.subEvent.unsubscribe();
        this.subTest.unsubscribe();
        this.subTheory.unsubscribe();
        this.subSchema.unsubscribe();
    }


}