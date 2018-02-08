import {EventEmitter, Input, Output} from "@angular/core";

import {BaseItem} from "./base-item";
import {RoutesBaseItem} from "./base-item-routes";

export class BaseItemFunctionality {

  @Input() item: BaseItem;
  @Input() routes: RoutesBaseItem = new RoutesBaseItem();

  @Output() onRemove = new EventEmitter<number>();
  @Output() onRestore = new EventEmitter<number>();

  public removeItem(id: number) {
    this.onRemove.emit(id);
  }

  public restoreItem(id: number) {
    this.onRestore.emit(id);
  }

}