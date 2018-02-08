import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

import {Definition} from "itpm-shared";

import {RoutesBaseItem} from "../../../../shared/components/item/base-item-routes";

@Component({
  selector: 'definition',
  templateUrl: `./definition.component.html`,
  styleUrls: ['./definition.component.css']
})
export class DefinitionComponent implements OnInit {
  @Input() definition: Definition;

  @Output() onRemove = new EventEmitter<number>();
  @Output() onRestore = new EventEmitter<number>();

  public routes: RoutesBaseItem = new RoutesBaseItem();

  ngOnInit() {
    this.routes.edit.name = 'editDefinition';
    this.routes.edit.params = {'id': this.definition.id};
  }

  public removeDefinition(id: number) {
    this.onRemove.emit(id);
  }

  public restoreDefinition(id: number) {
    this.onRestore.emit(id);
  }
}