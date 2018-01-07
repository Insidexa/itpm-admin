/*addUnit() {
 this.UnitService.store(this.unit).subscribe(lesson => {
 this.lesson.units.push(lesson);
 })
 }

 removeUnit($event, id) {
 $event.preventDefault();
 $event.stopPropagation();
 this.UnitService.delete(id).subscribe(() => {
 this.lesson.units.map((unit, index) => {
 if (unit.id === id) this.lesson.units.splice(index, 1);
 })
 });
 }*/

import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import 'rxjs/operator/map';

import {UnitService} from "./unit/unit.service";
import {Unit} from "./unit/unit";
import {PaginationService} from "../../../helpers/services/pagination/pagination.service";
import {IPagination} from "../../../helpers/services/pagination/pagination";

@Component({
    selector: `units`,
    templateUrl: `./units.component.html`
})
export class UnitsComponent implements OnInit {
    public unit: Unit = new Unit();

    constructor(private UnitService: UnitService,
                private ActivatedRoute: ActivatedRoute,
                public units: PaginationService<Unit>) {}

    public ngOnInit() {
        this.ActivatedRoute.params.subscribe(params => {
            const lessonId: number = +params['id'];
            this.unit.lesson_id = lessonId;
            this.UnitService.all(lessonId).subscribe((units: IPagination<Unit>) => {
                this.units.update(units);
            });
        })
    }

    public addUnit(unit: Unit) {
        this.UnitService.store(unit).subscribe((lesson: Unit) => {
            this.units.add(lesson);
        });
    }

    public removeUnit(id) {
        this.UnitService.delete(id).subscribe(() => {
            this.units.remove(id);
        });
    }
}