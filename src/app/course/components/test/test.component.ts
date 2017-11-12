import {Component, OnDestroy, OnInit} from "@angular/core";
import {Test} from "./test";
import {TestService} from "./test.service";
import {ActivatedRoute} from "@angular/router";
import {UnitService} from "../unit/unit.service";
import {Unit} from "../unit/unit";
import {Subscription} from "rxjs/Subscription";
import {Answer} from "./answer";
import {Question} from "./question";

@Component({
    selector: 'test',
    templateUrl: './test.component.html'
})
export class TestComponent implements OnInit, OnDestroy {

    public test: Test;
    private subscription: Subscription;

    constructor(
        private TestService: TestService,
        private UnitService: UnitService,
        private route: ActivatedRoute
    ) {}

    ngOnInit () {
        this.subscription = this.UnitService.unit$.subscribe((unit: Unit) => {
            this.test = unit.test
                ? this.TestService.fillableTest(unit.test)
                : this.TestService.initializeTest(+this.route.parent.params['value']['id']);
        });

        this.UnitService.callEvent('test');
    }

    ngOnDestroy () {
        this.subscription.unsubscribe();
    }

    isSelected(questionIndex: number, answerIndex: number) {
        if (this.test.questions[questionIndex].answers[answerIndex].hasOwnProperty('id')) {
            return this.test.questions[questionIndex].answer_id === this.test.questions[questionIndex].answers[answerIndex].id;
        } else {
            return this.test.questions[questionIndex].answer_id === answerIndex;
        }
    }

    save() {
        this.TestService.store(this.test).subscribe((test: Test) => {
            this.UnitService.pushTest(test);
            this.test = test;
        });
    }

    setRightAnswer(questionIndex: number, answerIndex: number) {
        if (this.test.questions[questionIndex].answers[answerIndex].hasOwnProperty('id')) {
            this.test.questions[questionIndex].answer_id = this.test.questions[questionIndex].answers[answerIndex].id;
        } else {
            this.test.questions[questionIndex].answer_id = answerIndex;
        }
    }
}