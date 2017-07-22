import {Component, ViewChild, OnInit, OnDestroy} from "@angular/core";

import 'rxjs/operator/map';
import {SchemaService} from "./schema.service";
import {Schema} from "./schema";
import instances from './diagram/instances';
import {ActivatedRoute} from "@angular/router";
import {UnitService} from "../unit/unit.service";
import {Unit} from "../unit/unit";
import {Subscription} from "rxjs/Subscription";
import Diagram from "./diagram/types/Diagram";

@Component({
    selector: `schema`,
    templateUrl: `./schema.component.html`,
    styleUrls: [`./schema.component.css`]
})
export class SchemaComponent implements OnInit, OnDestroy {
    @ViewChild('goJSDiagram') div;
    @ViewChild('fullscreenContainer') fullScreen;

    types: Array<Object> = [];
    items: Array<Object> = [];

    public type: string;
    private diagram: Diagram;
    private schema: Schema;

    private subscription: Subscription;
    private itemSub: Subscription;

    constructor(
        private SchemaService: SchemaService,
        private route: ActivatedRoute,
        private UnitService: UnitService
    ) {
        this.types = instances;
        this.schema = new Schema();
    }

    ngOnDestroy () {
        this.subscription.unsubscribe();
        this.itemSub.unsubscribe();
    }

    ngOnInit () {
        this.subscription = this.UnitService.unit$.subscribe((unit: Unit) => {
            this.schema = unit.schema
                ? unit.schema
                : new Schema();

            this.type = this.schema.type;

            this.initDiagram();

        });

        this.UnitService.callEvent('schema');
    }

    fullscreen () {
        let elem = this.fullScreen.nativeElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    }

    save() {
        let data = this.diagram.getModel();
        this.schema.palette = data.palette;
        this.schema.diagram = data.diagram;
        this.schema.type = this.type;
        this.schema.unit_id = +this.route.parent.params['value']['id'];
        this.SchemaService.store(this.schema).subscribe((schema: Schema) => {
            this.UnitService.pushSchema(schema);
            this.schema = schema;
        });
    }

    initDiagram () {
        let index = instances.findIndex((element, index) => this.type === element.value);
        this.diagram = new instances[index]['class'](this.div);
        this.itemSub = this.diagram.items$.subscribe((items: Array<Object>) => {
            this.items = items;
        });
        this.diagram.initDiagram(this.schema);
    }

    onSelectType() {
        if (this.type) {
            this.initDiagram();
        }
    }

}