import {Component, OnDestroy, OnInit} from "@angular/core";

import {Subscription} from "rxjs/Subscription";
import "rxjs/operator/map";

import {SchemaPageService} from "./schema-page.service";
import {UnitService} from "../unit/unit/unit.service";

import {
  Schema,
  Unit,
  instances,
  AuthService,
  Permissions,
  SchemaService,
} from 'itpm-shared';

@Component({
  selector: `schema-page`,
  templateUrl: `./schema-page.component.html`,
})
export class SchemaPageComponent implements OnInit, OnDestroy {
  public types: Array<Object> = [];
  public schema: Schema;
  public config: any = {};

  private subscription: Subscription;

  constructor(private SchemaPageService: SchemaPageService,
              private SchemaService: SchemaService,
              private UnitService: UnitService,
              private AuthService: AuthService) {
    this.types = instances.filter(instance => !instance.result);
    this.config['role'] = this.AuthService.getUser().role;
    this.config['permission'] = Permissions.FULL_ACCESS;
    this.config['controls'] = true;
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
    this.SchemaService.store(schema).subscribe((schema: Schema) => {
      this.UnitService.pushSchema(schema);
    });
  }

}