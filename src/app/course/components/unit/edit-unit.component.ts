import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Unit} from "./unit";
import {UnitService} from "./unit.service";

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
            })
        })
    }

    update() {
        this.UnitService.update(this.unit).subscribe(() => {
            this.location.back();
        })
    }
}