import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Unit} from "./unit";
import {UnitService} from "./unit.service";
import {Subscription} from "rxjs/Subscription";
import {Test} from "../test/test";
import {Theory} from "../theory/theory";

@Component({
    selector: 'unit',
    templateUrl: `./unit.component.html`
})
export class UnitComponent implements OnInit, OnDestroy {

    public unit: Unit = new Unit();
    private subEvent: Subscription;
    private subTest: Subscription;
    private subTheory: Subscription;

    constructor(
        private UnitService: UnitService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            let unit:number = +params['id'];

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

                this.UnitService.pushUnit(unit);

                this.unit = unit;
            });
        });
    }

    ngOnDestroy () {
        this.subEvent.unsubscribe();
        this.subTest.unsubscribe();
        this.subTheory.unsubscribe();
    }
}