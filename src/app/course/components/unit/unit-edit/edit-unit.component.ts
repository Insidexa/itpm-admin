import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Unit} from "../unit/unit";
import {UnitService} from "../unit/unit.service";

@Component({
    selector: `edit-unit`,
    templateUrl: `./edit-unit.component.html`
})
export class EditUnitComponent implements OnInit {

    public unit: Unit = new Unit();

    constructor(
        private UnitService: UnitService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.UnitService.unit(+params['id']).subscribe(lesson => {
                this.unit = lesson;
            });
        });
    }

    updateUnit(unit: Unit) {
        this.UnitService.update(unit).subscribe(() => {
            this.location.back();
        });
    }
}