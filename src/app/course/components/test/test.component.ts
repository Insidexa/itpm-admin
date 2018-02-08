import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {Subscription} from "rxjs/Subscription";

import {TestService} from "./test.service";
import {UnitService} from "../unit/unit/unit.service";

import {Test, Unit} from 'itpm-shared';

@Component({
  selector: 'test',
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit, OnDestroy {

  public test: Test;
  private subscription: Subscription;

  constructor(private TestService: TestService,
              private UnitService: UnitService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.UnitService.unit$.subscribe((unit: Unit) => {
      this.test = unit.test
        ? this.TestService.fillableTest(unit.test)
        : this.TestService.initializeTest(+this.route.parent.params['value']['id']);
    });

    this.UnitService.callEvent('test');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isSelected(questionIndex: number, answerIndex: number) {
    if (this.test.questions[questionIndex].answers[answerIndex].hasOwnProperty('id')) {
      return this.test.questions[questionIndex].answer_id === this.test.questions[questionIndex].answers[answerIndex].id;
    } else {
      return this.test.questions[questionIndex].answer_id === answerIndex;
    }
  }

  save(test) {
    if (test.valid) {
      this.TestService.store(this.test).subscribe((test: Test) => {
        this.UnitService.pushTest(test);
        this.test = test;
      });
    }
  }

  setRightAnswer(questionIndex: number, answerIndex: number) {
    if (this.test.questions[questionIndex].answers[answerIndex].hasOwnProperty('id')) {
      this.test.questions[questionIndex].answer_id = this.test.questions[questionIndex].answers[answerIndex].id;
    } else {
      this.test.questions[questionIndex].answer_id = answerIndex;
    }
  }
}