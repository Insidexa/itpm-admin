import {Component, EventEmitter, Input, Output} from "@angular/core";

import {Unit} from "./unit";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'unit',
    templateUrl: `./unit.component.html`
})
export class UnitComponent {

    @Input() unit: Unit;
    @Output() onRemove: EventEmitter<number> = new EventEmitter<number>();

    public courseId: number;

    constructor(private ActivatedRoute: ActivatedRoute) {
        this.ActivatedRoute.params.subscribe(params => {
            this.courseId = +params['courseId'];
        });
    }

    public removeUnit($event) {
        $event.preventDefault();
        $event.stopPropagation();

        this.onRemove.emit(this.unit.id);
    }
}