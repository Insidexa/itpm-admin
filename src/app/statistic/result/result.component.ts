import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ResultService} from "./services/result.service";
import {IQuestion, IResult, ISchema} from "./models/result";
import instances from "./schema/instances";
import Diagram from "../../course/components/schema/diagram/types/Diagram";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  public result: IResult;
  @ViewChild('goJSDiagram') div;
  private diagram: Diagram;

  constructor(private ActivatedRoute: ActivatedRoute,
              private ResultService: ResultService) {}

  ngOnInit() {
    this.ActivatedRoute.params.subscribe(params => {
      this.ResultService.getResult(+params['id']).subscribe(data => {
        this.result = data;

        this.initDiagram(this.result.schema);
      });
    });
  }

  public makeImg () {
    const img = this.diagram.getDiagram().makeImage({
      scale: 0.8
    });

    const width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    const height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    let windowImage = window.open('', 'PRINT', `height=${height},width=${width}`);

    windowImage.document.write('<html><head><title></title>');
    windowImage.document.write('</head><body onload="window.print()">');
    windowImage.document.write(`<img src="${img.src}" />`);
    windowImage.document.write('</body></html>');

    windowImage.document.close(); // necessary for IE >= 10
    windowImage.focus(); // necessary for IE >= 10*/

    // windowImage.close();
  }

  public initDiagram (schema: ISchema) {
    let index = instances.findIndex((element, index) => schema.type === element.value);
    this.diagram = new instances[index]['class'](this.div);
    this.diagram.initDiagram(schema);
  }

  public isCorrectAnswerQuestion (question: IQuestion) {
    return question.correct_answer.id === question.answer.id;
  }

}
