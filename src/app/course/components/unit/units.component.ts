import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import "rxjs/operator/map";

import {UnitService} from "./unit/unit.service";
import {IPagination, PaginationService, Unit} from "itpm-shared";

@Component({
  selector: `units`,
  templateUrl: `./units.component.html`,
  providers: [PaginationService]
})
export class UnitsComponent implements OnInit {
  public unit: Unit = new Unit();

  constructor(private UnitService: UnitService,
              private ActivatedRoute: ActivatedRoute,
              public units: PaginationService<Unit>) {
  }

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
      this.units.addToCollection(lesson);
    });
  }

  public removeUnit(id) {
    this.UnitService.delete(id).subscribe(() => {
      this.units.removeFromCollection(id);
    });
  }

  public restoreUnit(id: number) {
    this.UnitService.restore(id).subscribe(() => {
      // this.units.remove(id);
    });
  }
}