import {Component, Input} from "@angular/core";
import {PaginationService} from "./service/pagination.service";

@Component({
    selector: 'pagination',
    templateUrl: `./pagination.component.html`
})
export class PaginationComponent {
    @Input() paginator: PaginationService<any>;
    @Input() pageSize: number = 1;
    @Input() maxSize: number = 5;

    public changePage (page: number) {
        this.paginator.setPage(page);
    }

}