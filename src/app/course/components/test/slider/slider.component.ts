import {Component, Input, OnInit} from "@angular/core";

import {Test} from 'itpm-shared';

@Component({
  selector: `test-slider`,
  templateUrl: './slider.component.html',
  styleUrls: [`./slider.component.css`]
})
export class SliderComponent implements OnInit {

  @Input() questions: Test[];

  ngOnInit(): void {

  }

  doNothing($event, questionIndex: number) {
    $event.preventDefault();
    const element = document.querySelector(`#question_${questionIndex}`);
    if (element) {
      element.scrollIntoView({behavior: "smooth"});
    }
  }

}