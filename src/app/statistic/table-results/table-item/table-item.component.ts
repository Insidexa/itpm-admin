import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {statuses, tabs} from "./statuses";
import {User} from "../../../home/user";
import {Unit} from "../../../course/components/unit/unit";

@Component({
    selector: `[table-item]`,
    templateUrl: `./table-item.component.html`,
    styleUrls: [`./table-item.component.css`]
})
export class TableItemComponent implements OnInit {

    @Input() item: any;
    @Output() onClickUser = new EventEmitter<User>();
    @Output() onClickUnit = new EventEmitter<Unit>();

    private tabs: Object;
    private statuses: Object;

    constructor() {
        this.tabs = tabs;
        this.statuses = statuses;
    }

    byUser() {
        this.onClickUser.emit(this.item.user);
    }

    byUnit() {
        this.onClickUnit.emit(this.item.unit);
    }

    ngOnInit(): void {

    }

}