import {Component, OnDestroy, OnInit} from "@angular/core";

import {Subscription} from "rxjs/Subscription";
import "rxjs/operator/map";

import {SchemaPageService} from "./schema-page.service";
import {UnitService} from "../unit/unit/unit.service";

import {Schema, Unit, instances} from 'itpm-shared';

@Component({
  selector: `schema-page`,
  templateUrl: `./schema-page.component.html`,
})
export class SchemaPageComponent implements OnInit, OnDestroy {
  public types: Array<Object> = [];
  public schema: Schema;

  private subscription: Subscription;

  constructor(private SchemaPageService: SchemaPageService,
              private UnitService: UnitService) {
    this.types = instances.filter(instance => !instance.result);
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public ngOnInit() {
    this.subscription = this.UnitService.unit$.subscribe((unit: Unit) => {
      this.schema = unit.schema
        ? unit.schema
        : new Schema();
    });

    this.UnitService.callEvent('schema');
  }

  public save(schema: Schema) {
    this.UnitService.pushSchema(schema);
  }

}