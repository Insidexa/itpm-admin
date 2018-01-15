import {Component, Input, OnInit} from "@angular/core";

import {Unit} from "./unit";
import {ActivatedRoute} from "@angular/router";
import {BaseItemFunctionality} from "../../../../shared/components/item/base-functionality";

@Component({
    selector: 'unit',
    templateUrl: `./unit.component.html`
})
export class UnitComponent extends BaseItemFunctionality implements OnInit {

    @Input() unit: Unit;

    public courseId: number;

    constructor(private ActivatedRoute: ActivatedRoute) {
        super();

        this.ActivatedRoute.params.subscribe(params => {
            this.courseId = +params['courseId'];
        });
    }

    ngOnInit() {
        this.routes.child.name = 'unitPage';
        this.routes.child.params = {
            'courseId': this.courseId,
            'lessonId': this.unit.lesson_id,
            'id': this.unit.id
        };

        this.routes.edit.name = 'editUnit';
        this.routes.edit.params = {
            'id': this.unit.id
        };
    }

}