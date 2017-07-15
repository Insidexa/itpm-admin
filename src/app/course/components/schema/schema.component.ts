import {Component, ViewChild, AfterViewInit} from "@angular/core";

import 'rxjs/operator/map';
import {SchemaService} from "./schema.service";
import {Schema} from "./schema";
import instances from './diagram/instances';

@Component({
    selector: `schema`,
    templateUrl: `./schema.component.html`
})
export class SchemaComponent implements AfterViewInit {
    @ViewChild('goJSDiagram') div;

    types: Array<Object> = [{value: 'wbs_obs', name: 'WBS/OBS'}];
    private schema: Schema = new Schema();
    private digram: DiagramInterface;

    constructor(private SchemaService: SchemaService) {}

    ngAfterViewInit(): void {}

    getModel () {
        console.log(this.digram.getModel());
    }

    onSelectType () {
        if (this.schema.type) {
            this.digram = new instances[this.schema.type](this.div);
        }
    }

}