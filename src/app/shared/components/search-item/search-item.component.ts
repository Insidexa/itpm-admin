import {Component, EventEmitter, Output} from "@angular/core";

enum TYPES {
  ALL = 0,
  ONLY_TRASHED = 1,
}

@Component({
  selector: 'search-item',
  templateUrl: './search-item.component.html'
})
export class SearchItemComponent {
  @Output() onChange: EventEmitter<TYPES> = new EventEmitter<TYPES>();

  public types = TYPES;

  public all() {
    this.onChange.emit(TYPES.ALL);
  }

  public onlyTrashed() {
    this.onChange.emit(TYPES.ONLY_TRASHED);
  }

}