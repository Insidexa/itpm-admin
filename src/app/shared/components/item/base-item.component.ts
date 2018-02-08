import {Component} from "@angular/core";

import {BaseItemFunctionality} from "./base-functionality";

@Component({
  selector: `base-item`,
  templateUrl: `./base-item.component.html`
})
export class BaseItemComponent extends BaseItemFunctionality {
  public removeBaseItem($event) {
    $event.preventDefault();
    $event.stopPropagation();

    this.item.deleted_at = new Date();

    this.removeItem(this.item.id);
  }

  public restoreBaseItem($event) {
    $event.preventDefault();
    $event.stopPropagation();

    this.item.deleted_at = null;

    this.restoreItem(this.item.id);
  }
}