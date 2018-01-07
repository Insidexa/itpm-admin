import {Component, OnInit} from '@angular/core';
import {TableResultsService} from "./services/table-results.service";
import {IPagination} from "./models/pagination";
import {Unit} from "../../course/components/unit/unit/unit";
import {User} from "../../home/user";
import {IStatus, statuses, tabs} from "./table-item/statuses";
import {Subject} from "rxjs/Subject";

@Component({
    selector: 'app-table-results',
    templateUrl: './table-results.component.html',
    styleUrls: ['./table-results.component.css']
})
export class TableResultsComponent implements OnInit {

    public dataExaminations: IPagination;
    public tabs: Array<IStatus>;
    public statuses: any;
    public search: string;
    public searchSubject: Subject<string> = new Subject<string>();

    constructor(private TableResultsService: TableResultsService,) {
        this.tabs = Object.keys(tabs).map((key) => {
            return {id: +key, text: tabs[key]};
        });
        this.statuses = Object.keys(statuses).map((key) => {
            return {id: +key, text: statuses[key]};
        });
    }

    ngOnInit() {
        this.TableResultsService.getStatistics().subscribe(data => {
            this.dataExaminations = data;

            this.searchSubject
                .debounceTime(500)
                .distinctUntilChanged()
                .subscribe(model => {
                    this.TableResultsService.bySearch(model).getStatistics().subscribe(this.update.bind(this));
                })
        });
    }

    protected update (data) {
        this.dataExaminations = data;
    }

    public onSearchChange(search: string) {
        this.searchSubject.next(search);
    }

    public filterByTab(tab: number) {
        this.TableResultsService.byTab(tab).getStatistics().subscribe(this.update.bind(this));
    }

    public filterByStatus(status: number) {
        this.TableResultsService.byStatus(status).getStatistics().subscribe(this.update.bind(this));
    }

    public filterByUnit(unit: Unit) {
        this.TableResultsService.byUnit(unit.id).getStatistics().subscribe(this.update.bind(this));
    }

    public filterByUser(user: User) {
        this.TableResultsService.byUser(user.id).getStatistics().subscribe(this.update.bind(this));
    }

    public clearFilters() {
        this.search = '';
        this.searchSubject.next(this.search);
        this.TableResultsService.clearParams().getStatistics().subscribe(this.update.bind(this));
    }

}
