import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {SharedModule} from "../shared/shared.module";
import {DefinitionsComponent} from "./components/definitons/definitions.component";
import {DefinitionService} from "./components/definitons/definiton/definition.service";
import {DefinitionComponent} from "./components/definitons/definiton/definition.component";
import {EditDefinitionComponent} from "./components/definitons/definiton/definition-edit/edit-definition.component";
import {DefinitionFormComponent} from "./components/definitons/definiton/definition-form/definition-form.component";

const routes: Routes = [
    {
        path: '',
        component: DefinitionsComponent,
        data: {
            routeName: 'definitions'
        }
    },
    {
        path: ':id/edit',
        component: EditDefinitionComponent,
        data: {
            routeName: 'editDefinition'
        }
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NgbModule.forRoot(),
        SharedModule
    ],
    providers: [
        DefinitionService
    ],
    declarations: [
        DefinitionComponent,
        DefinitionsComponent,
        EditDefinitionComponent,
        DefinitionFormComponent
    ]
})
export class DefinitionModule {}