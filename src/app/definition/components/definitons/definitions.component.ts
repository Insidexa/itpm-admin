import {Component, OnInit} from "@angular/core";

import {PaginationService} from "../../../shared/components/pagination/service/pagination.service";
import {IPagination} from "../../../shared/components/pagination/model/pagination";
import {Definition} from "./definiton/definition.model";
import {DefinitionService} from "./definiton/definition.service";

@Component({
    selector: 'definitions',
    templateUrl: `./definitions.component.html`,
    styleUrls: ['./definitions.component.css'],
    providers: [ PaginationService ]
})
export class DefinitionsComponent implements OnInit {
    public definition: Definition = new Definition();

    constructor(private DefinitionService: DefinitionService,
                public definitions: PaginationService<Definition>) {
    }

    ngOnInit(): void {
        this.DefinitionService.all().subscribe((pagination: IPagination<Definition>) => {
            this.definitions.update(pagination);
        });
    }

    public switchType (type) {
        console.log(type);
    }

    public addDefinition(newDefinition: Definition) {
        this.DefinitionService.store(newDefinition).subscribe((definition: Definition) => {
            this.definitions.addToCollection(definition);
            this.definition = new Definition();
        });
    }

    public removeDefinition(id: number) {
        this.DefinitionService.delete(id).subscribe(() => {
            let definition = this.definitions.getFromCollection(id);
            definition.deleted_at = new Date();
            this.definitions.replaceInCollection(id, definition);
        });
    }

    public restoreDefinition(id: number) {
        this.DefinitionService.restore(id).subscribe(() => {
            let definition = this.definitions.getFromCollection(id);
            definition.deleted_at = null;
            this.definitions.replaceInCollection(id, definition);
        });
    }

}