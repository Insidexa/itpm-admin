import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ResultService} from "./services/result.service";
import {IQuestion, IResult, ISchema} from "./models/result";
import Diagram from "../../helpers/diagram/types/Diagram";
import {AuthService} from "../../helpers/services/auth";
import {instances, DiagramFactory} from "../../helpers/diagram/instances";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  private diagramDiv: ElementRef;

  @ViewChild('goJSDiagram') set goJSDiagram (content: ElementRef) {
    this.diagramDiv = content;
    if (this.result) {
      this.initDiagram(this.result.schema);
    }
  }

  public visibleDiagram: boolean = false;
  public result: IResult;
  private diagram: Diagram;

  constructor(private ActivatedRoute: ActivatedRoute,
              private ResultService: ResultService,
              private AuthService: AuthService) {}

  ngOnInit() {
    this.ActivatedRoute.params.subscribe(params => {
      this.ResultService.getResult(+params['id']).subscribe(data => {
        this.result = data;

        if (this.ResultService.schemaIsFilled(this.result.schema)) {
          this.visibleDiagram = true;
        }
      });
    });
  }

  public makeImg () {
    const img = this.ResultService.makeImage(this.diagram);
    this.ResultService.printImage(img);
  }

  public makePdf () {
    const img = this.ResultService.makeImage(this.diagram);
    this.ResultService.downloadPDF(img)
  }

  public initDiagram (schema: ISchema) {
    let index = instances.findIndex((element, index) => schema.type === element.value);
    this.diagram = DiagramFactory(instances[index]['class'], this.diagramDiv, this.AuthService.getUser().role);
    this.diagram.initDiagram(schema);
  }

  public isCorrectAnswerQuestion (question: IQuestion) {
    return question.correct_answer.id === question.answer.id;
  }

}
